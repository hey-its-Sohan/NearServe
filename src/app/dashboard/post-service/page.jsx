// src/app/(nav)/add-service/page.jsx
"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

export default function AddServicePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    description: "",
    longDescription: "",
    category: "",
    price: "",
    location: "",
    providerName: "",
    contact: "",
    image: "",
    availability: "Available",
    rating: "",
  });

  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [debugInfo, setDebugInfo] = useState("");

  // Fetch user data when session is available
  useEffect(() => {
    const fetchUserData = async () => {
      if (session?.user?.email) {
        try {
          setDebugInfo("Fetching user data...");
          const response = await fetch(`/api/users?email=${encodeURIComponent(session.user.email)}`);

          if (response.ok) {
            const userData = await response.json();
            setUser(userData);
            setDebugInfo(`User data loaded: ${userData.name} (${userData.id})`);

            // Auto-fill provider information if user is a provider
            if (userData.role === 'provider') {
              setForm(prev => ({
                ...prev,
                providerName: userData.name || "",
                contact: userData.contact || "",
              }));
            }
          } else {
            const errorData = await response.json();
            setDebugInfo(`Error fetching user: ${errorData.error}`);
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
          setDebugInfo(`Error: ${error.message}`);
        }
      }
    };

    fetchUserData();
  }, [session]);

  if (status === "loading") return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
    </div>
  );

  if (!session) {
    router.push("/signin");
    return null;
  }

  // Show loading if user data is still being fetched
  if (user === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading user data...</p>
          <p className="text-sm text-gray-500 mt-2">{debugInfo}</p>
        </div>
      </div>
    );
  }

  // Check if user is a provider
  if (user && user.role !== 'provider') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h2>
          <p className="text-gray-600">Only providers can add services.</p>
          <button
            onClick={() => router.push('/')}
            className="mt-4 px-6 py-2 bg-primary text-white rounded-lg"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const isValidImageUrl = (url) => {
    if (!url) return true;
    try {
      const validExtensions = ["jpg", "jpeg", "png", "gif", "webp"];
      const urlObj = new URL(url);
      const ext = urlObj.pathname.split(".").pop().toLowerCase();
      return validExtensions.includes(ext);
    } catch {
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.image && !isValidImageUrl(form.image)) {
      toast.error("Please enter a valid direct image URL (jpg, png, gif, webp).");
      return;
    }

    // Check if user data is loaded
    if (!user || !user.id) {
      toast.error("User data not loaded. Please try again.");
      return;
    }

    setLoading(true);
    setDebugInfo("Submitting service...");

    try {
      // Prepare service data with provider information
      const serviceData = {
        title: form.title,
        description: form.description,
        longDescription: form.longDescription,
        category: form.category,
        price: parseInt(form.price),
        location: form.location,
        providerName: form.providerName || user.name,
        contact: form.contact || user.contact,
        image: form.image,
        availability: form.availability,
        rating: parseFloat(form.rating) || 0,
        // CRITICAL: Add provider identification
        providerId: user.id,
        providerEmail: session.user.email,
      };

      console.log("Service data being sent:", serviceData);
      setDebugInfo(`Sending service data with providerId: ${user.id}`);

      const res = await fetch("/api/allservices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(serviceData),
      });

      const responseData = await res.json();
      console.log("API response:", responseData);

      if (res.ok) {
        toast.success("Service added successfully!");
        setForm({
          title: "",
          description: "",
          longDescription: "",
          category: "",
          price: "",
          location: "",
          providerName: user.name || "",
          contact: user.contact || "",
          image: "",
          availability: "Available",
          rating: "",
        });
        setDebugInfo("Service added successfully!");
        router.push("/allservices");
      } else {
        toast.error(responseData.error || "Failed to add service!");
        setDebugInfo(`Error: ${responseData.error}`);
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");
      setDebugInfo(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="fix-alignment">
        <div className="max-w-3xl mx-auto p-6 bg-card rounded-2xl shadow-md border border-border">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Add New Service
            </h1>
            <p className="text-gray">
              Create a new service listing for customers to book
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Service Basic Info */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground border-b pb-2">
                Service Information
              </h3>

              <input
                type="text"
                name="title"
                placeholder="Service Title *"
                value={form.title}
                onChange={handleChange}
                className="w-full border border-border px-4 py-3 rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />

              <textarea
                name="description"
                placeholder="Short Description *"
                value={form.description}
                onChange={handleChange}
                className="w-full border border-border px-4 py-3 rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                rows="3"
                required
              />

              <textarea
                name="longDescription"
                placeholder="Detailed Description (Optional)"
                value={form.longDescription}
                onChange={handleChange}
                className="w-full border border-border px-4 py-3 rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                rows="4"
              />
            </div>

            {/* Service Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground border-b pb-2">
                Service Details
              </h3>

              <div className="grid sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="category"
                  placeholder="Category * (e.g., Electrical, Plumbing)"
                  value={form.category}
                  onChange={handleChange}
                  className="w-full border border-border px-4 py-3 rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
                <input
                  type="number"
                  name="price"
                  placeholder="Price (৳) *"
                  value={form.price}
                  onChange={handleChange}
                  className="w-full border border-border px-4 py-3 rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="location"
                  placeholder="Service Area * (e.g., Dhanmondi, Dhaka)"
                  value={form.location}
                  onChange={handleChange}
                  className="w-full border border-border px-4 py-3 rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
                <input
                  type="text"
                  name="image"
                  placeholder="Service Image URL (Optional)"
                  value={form.image}
                  onChange={handleChange}
                  className="w-full border border-border px-4 py-3 rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            {/* Provider Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground border-b pb-2">
                Your Information
              </h3>

              <div className="grid sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="providerName"
                  placeholder="Your Name/Business Name *"
                  value={form.providerName}
                  onChange={handleChange}
                  className="w-full border border-border px-4 py-3 rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
                <input
                  type="text"
                  name="contact"
                  placeholder="Contact Number *"
                  value={form.contact}
                  onChange={handleChange}
                  className="w-full border border-border px-4 py-3 rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <select
                  name="availability"
                  value={form.availability}
                  onChange={handleChange}
                  className="w-full border border-border px-4 py-3 rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="Available">Available</option>
                  <option value="Unavailable">Unavailable</option>
                  <option value="Limited">Limited Availability</option>
                </select>

                <input
                  type="number"
                  name="rating"
                  placeholder="Initial Rating (0-5)"
                  value={form.rating}
                  onChange={handleChange}
                  step="0.1"
                  min="0"
                  max="5"
                  className="w-full border border-border px-4 py-3 rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || !user}
              className="w-full py-4 primary-btn text-white font-semibold rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Adding Service...
                </div>
              ) : (
                "Add Service"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}