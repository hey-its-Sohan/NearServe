"use client";

// import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

export default function AddServicePage() {
  //   const { data: session, status } = useSession();
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

  //   if (status === "loading") return <p>Loading...</p>;
  //   if (!session) {
  //     router.push("/login");
  //     return null;
  //   }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Image URL validation
  const isValidImageUrl = (url) => {
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

    setLoading(true);

    try {
      const res = await fetch("/api/allservices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        toast.success("Service added successfully!");
        setForm({
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
        router.push("/allservices");
      } else {
        toast.error("Failed to add service!");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white dark:bg-[#1c1f3b] rounded-2xl shadow-md mt-10">
      <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        Add New Service
      </h1>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Service Title"
          value={form.title}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded-lg"
          required
        />

        <textarea
          name="description"
          placeholder="Short Description"
          value={form.description}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded-lg"
          required
        />

        <textarea
          name="longDescription"
          placeholder="Detailed Description"
          value={form.longDescription}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded-lg h-28"
        />

        <div className="grid sm:grid-cols-2 gap-4">
          <input
            type="text"
            name="category"
            placeholder="Category (e.g. Electrical)"
            value={form.category}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-lg"
          />
          <input
            type="number"
            name="price"
            placeholder="Price (৳)"
            value={form.price}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-lg"
            required
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <input
            type="text"
            name="location"
            placeholder="Location (e.g. Dhanmondi, Dhaka)"
            value={form.location}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-lg"
          />
          <input
            type="text"
            name="providerName"
            placeholder="Provider Name"
            value={form.providerName}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-lg"
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <input
            type="text"
            name="contact"
            placeholder="Contact Number"
            value={form.contact}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-lg"
          />
          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={form.image}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-lg"
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <select
            name="availability"
            value={form.availability}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-lg"
          >
            <option value="Available">Available</option>
            <option value="Unavailable">Unavailable</option>
          </select>

          <input
            type="number"
            name="rating"
            placeholder="Rating (1–5)"
            value={form.rating}
            onChange={handleChange}
            step="0.1"
            min="0"
            max="5"
            className="w-full border px-4 py-2 rounded-lg"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 primary-btn text-white font-semibold rounded-lg transition"
        >
          {loading ? "Adding..." : "Add Service"}
        </button>
      </form>
    </div>
  );
}
