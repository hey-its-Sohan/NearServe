"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useSessionData } from "@/app/context/SessionContext";
import Link from "next/link";
import { Search, Edit, Trash2, Plus } from "lucide-react";
import Loading from "@/app/loading";

export default function MyServicesPage() {
  const { user, status } = useSessionData();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingService, setEditingService] = useState(null);
  const [editForm, setEditForm] = useState({
    title: "",
    description: "",
    price: "",
    location: "",
    category: "",
    image: "",
    availability: "",
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // ===== FETCH SERVICES BY PROVIDER ID =====
  useEffect(() => {
    if (status === "loading") {
      return;
    }

    if (!user?.id) {
      toast.error("Please log in to view your services");
      setLoading(false);
      return;
    }

    const fetchServices = async () => {
      try {
        console.log("Fetching services for provider:", user.id);

        const res = await fetch(
          `/api/allservices?providerId=${encodeURIComponent(user.id)}`
        );

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.error || "Failed to fetch services");
        }

        const data = await res.json();
        console.log("Fetched services:", data);
        setServices(data);
      } catch (error) {
        console.error("Error fetching services:", error);
        toast.error(error.message || "Failed to load services");
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [user, status]);

  if (status === "loading" || loading) {
    return <Loading />;
  }

  // ===== HANDLE DELETE =====
  const handleDelete = async (id) => {
    try {
      const confirmed = confirm("Are you sure you want to delete this service?");
      if (!confirmed) return;

      const res = await fetch(`/api/allservices/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        toast.success("Service deleted successfully");
        setServices((prev) => prev.filter((s) => s._id !== id));
      } else {
        toast.error("Failed to delete service");
      }
    } catch (err) {
      toast.error("Error deleting service");
    }
  };

  // ===== HANDLE EDIT MODAL OPEN =====
  const openEditModal = (service) => {
    setEditingService(service);
    setEditForm({
      title: service.title,
      description: service.description,
      price: service.price,
      location: service.location,
      category: service.category,
      image: service.image,
      availability: service.availability,
    });
  };

  // ===== HANDLE EDIT FORM CHANGE =====
  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  // ===== HANDLE SAVE EDIT =====
  const handleSaveEdit = async () => {
    try {
      const res = await fetch(`/api/allservices/${editingService._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editForm),
      });

      if (res.ok) {
        toast.success("Service updated successfully");
        setServices((prev) =>
          prev.map((s) =>
            s._id === editingService._id ? { ...s, ...editForm } : s
          )
        );
        setEditingService(null);
      } else {
        toast.error("Failed to update service");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong while updating");
    }
  };

  // ===== FILTER SERVICES BASED ON SEARCH =====
  const filteredServices = services.filter(
    (service) =>
      service.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ===== PAGINATION LOGIC =====
  const totalPages = Math.ceil(filteredServices.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedServices = filteredServices.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // ===== FORMAT PRICE =====
  const formatPrice = (price) =>
    new Intl.NumberFormat("en-BD", {
      style: "currency",
      currency: "BDT",
      minimumFractionDigits: 0,
    }).format(price);

  // ===== GET STATUS BADGE =====
  const getStatusBadge = (availability) => {
    const statusConfig = {
      Available: { color: "bg-green-100 text-green-800", text: "Available" },
      Unavailable: { color: "bg-red-100 text-red-800", text: "Unavailable" },
      Limited: { color: "bg-yellow-100 text-yellow-800", text: "Limited" }
    };

    const config = statusConfig[availability] || statusConfig.Available;

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
        {config.text}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="fix-alignment">
        {/* ===== HEADER ===== */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              My Services
            </h1>
            <p className="text-gray">
              Manage your service listings ({services.length} total)
            </p>
          </div>

          <Link
            href="/dashboard/post-service"
            className="flex items-center gap-2 px-4 py-2 primary-btn rounded-lg"
          >
            <Plus className="w-4 h-4" />
            Add New Service
          </Link>
        </div>

        {/* ===== SEARCH ===== */}
        <div className="mb-8">
          <div className="max-w-md relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search your services..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full border border-border bg-background pl-10 pr-3 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
            />
          </div>
        </div>

        {/* ===== NO SERVICES ===== */}
        {services.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Plus className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              No services yet
            </h3>
            <p className="text-gray mb-6">
              Start by adding your first service to get bookings
            </p>
            <Link
              href="/add-service"
              className="inline-flex items-center gap-2 px-6 py-3 primary-btn rounded-lg"
            >
              <Plus className="w-4 h-4" />
              Add Your First Service
            </Link>
          </div>
        ) : (
          <>
            {/* ===== SERVICES GRID ===== */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedServices.map((service) => (
                <div
                  key={service._id}
                  className="bg-card border border-border rounded-xl shadow-sm hover:shadow-md transition-shadow"
                >
                  {/* Service Image and Info - Clickable */}
                  <Link href={`/allservices/${service._id}`} className="block p-4">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-semibold text-foreground line-clamp-1">
                        {service.title}
                      </h3>
                      {getStatusBadge(service.availability)}
                    </div>
                    <p className="text-sm text-primary font-medium mb-1">
                      {service.category}
                    </p>
                    <p className="text-lg font-bold text-foreground mb-2">
                      {formatPrice(service.price)}
                    </p>
                    <p className="text-sm text-gray line-clamp-2">
                      {service.description}
                    </p>
                    <p className="text-sm text-gray mt-2">
                      📍 {service.location}
                    </p>
                  </Link>

                  {/* Action Buttons */}
                  <div className="flex gap-2 p-4 border-t border-border">
                    <button
                      onClick={() => openEditModal(service)}
                      className="flex-1 flex items-center justify-center gap-2 py-2 bg-primary text-white rounded-lg hover:bg-primary/70 transition"
                    >
                      <Edit className="w-4 h-4" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(service._id)}
                      className="flex-1 flex items-center justify-center gap-2 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* ===== PAGINATION ===== */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-4 mt-8">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 border border-border rounded-lg bg-background text-foreground hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>

                <span className="text-foreground">
                  Page {currentPage} of {totalPages}
                </span>

                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 border border-border rounded-lg bg-background text-foreground hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}

        {/* ===== EDIT MODAL ===== */}
        {editingService && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50 p-4">
            <div className="bg-card border border-border p-6 rounded-2xl w-full max-w-lg shadow-lg">
              <h2 className="text-xl font-semibold mb-4 text-foreground">
                Edit Service
              </h2>

              <div className="space-y-4">
                <input
                  type="text"
                  name="title"
                  value={editForm.title}
                  onChange={handleEditChange}
                  placeholder="Service Title"
                  className="w-full border border-border px-4 py-3 rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                />
                <textarea
                  name="description"
                  value={editForm.description}
                  onChange={handleEditChange}
                  placeholder="Description"
                  rows="3"
                  className="w-full border border-border px-4 py-3 rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="number"
                    name="price"
                    value={editForm.price}
                    onChange={handleEditChange}
                    placeholder="Price"
                    className="w-full border border-border px-4 py-3 rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                  />
                  <input
                    type="text"
                    name="category"
                    value={editForm.category}
                    onChange={handleEditChange}
                    placeholder="Category"
                    className="w-full border border-border px-4 py-3 rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                  />
                </div>
                <input
                  type="text"
                  name="location"
                  value={editForm.location}
                  onChange={handleEditChange}
                  placeholder="Location"
                  className="w-full border border-border px-4 py-3 rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                />
                <input
                  type="text"
                  name="image"
                  value={editForm.image}
                  onChange={handleEditChange}
                  placeholder="Image URL"
                  className="w-full border border-border px-4 py-3 rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                />
                <select
                  name="availability"
                  value={editForm.availability}
                  onChange={handleEditChange}
                  className="w-full border border-border px-4 py-3 rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                >
                  <option value="Available">Available</option>
                  <option value="Unavailable">Unavailable</option>
                  <option value="Limited">Limited Availability</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setEditingService(null)}
                  className="px-6 py-3 border border-border rounded-lg bg-background text-foreground hover:bg-accent transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveEdit}
                  className="px-6 py-3 primary-btn rounded-lg hover:opacity-90 transition"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}