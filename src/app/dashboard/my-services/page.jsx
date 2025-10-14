"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useSessionData } from "@/app/context/SessionContext";
import Link from "next/link";
import { Search } from "lucide-react";
import Loading from "@/app/loading";


export default function MyServicesPage() {
  const { user, status } = useSessionData();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingService, setEditingService] = useState(null); // ✅ Track which service is being edited
  const [editForm, setEditForm] = useState({
    title: "",
    description: "",
    price: "",
    location: "",
    category: "",
    image: "",
    availability: "",
  });

  // ===== SEARCH & PAGINATION STATE =====
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // ===== FETCH SERVICES BY EMAIL =====
  useEffect(() => {
    if (status === "loading") {
      return 
    } ;

    if (!user?.email) {
      toast.error("Please log in to view your services");
      setLoading(false);
      return;
    }

    const fetchServices = async () => {
      try {
        const res = await fetch(
          `/api/allservices?email=${encodeURIComponent(user.email)}`
        );
        if (!res.ok) throw new Error("Failed to fetch services");

        const data = await res.json();
        setServices(data);
      } catch (error) {
        console.error("Error fetching services:", error);
        toast.error("Failed to load services");
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

  if (loading) return <p className="text-center mt-10">Loading...</p>;

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

  return (
    <div className="max-w-6xl mx-auto p-6 min-h-screen">
      {/* ===== HEADER + SEARCH ===== */}
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          My Services
        </h1>
        <div className="mt-4 max-w-md mx-auto relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search by title, category, or description..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); // reset page on search
            }}
            className="w-full border dark:border-gray-600 bg-transparent pl-10 pr-3 py-2 rounded-lg focus:ring-2 focus:ring-lime-400 outline-none text-gray-900 dark:text-white"
          />
        </div>
      </div>

      {/* ===== NO SERVICES ===== */}
      {filteredServices.length === 0 ? (
        <p className="text-center text-gray-500">
          {services.length === 0
            ? "No services added yet."
            : "No services match your search."}
        </p>
      ) : (
        <>
          {/* ===== SERVICES GRID ===== */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedServices.map((service) => (
              <div
                key={service._id}
                className="bg-white dark:bg-[#1c1f3b] rounded-xl border shadow p-4 hover:shadow-lg transition"
              >
                {/* Make upper part clickable */}
                <Link href={`/allservices/${service._id}`} className="block w-full">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-40 object-cover rounded-lg mb-3"
                  />
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {service.title}
                  </h2>
                  <p className="text-gray-500 text-sm">{service.category}</p>
                  <p className="text-gray-700 dark:text-gray-300 font-medium mt-1">
                    {formatPrice(service.price)}
                  </p>
                  <p className="text-sm text-gray-500">{service.location}</p>
                </Link>

                {/* Buttons outside the link */}
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => openEditModal(service)}
                    className="flex-1 py-2 primary-btn hover:bg-lime-600 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(service._id)}
                    className="flex-1 py-2 bg-red-400 text-white rounded-md hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* ===== PAGINATION ===== */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-3 mt-10">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 disabled:opacity-40"
              >
                Prev
              </button>

              <span className="text-gray-700 dark:text-gray-300">
                Page {currentPage} of {totalPages}
              </span>

              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="px-3 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 disabled:opacity-40"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}

      {/* ===== EDIT MODAL ===== */}
      {editingService && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
          <div className="bg-white dark:bg-[#1c1f3b] p-6 rounded-2xl w-full max-w-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
              Edit Service
            </h2>

            <div className="space-y-3">
              <input
                type="text"
                name="title"
                value={editForm.title}
                onChange={handleEditChange}
                placeholder="Title"
                className="w-full border px-3 py-2 rounded-lg"
              />
              <textarea
                name="description"
                value={editForm.description}
                onChange={handleEditChange}
                placeholder="Description"
                className="w-full border px-3 py-2 rounded-lg"
              />
              <input
                type="number"
                name="price"
                value={editForm.price}
                onChange={handleEditChange}
                placeholder="Price"
                className="w-full border px-3 py-2 rounded-lg"
              />
              <input
                type="text"
                name="location"
                value={editForm.location}
                onChange={handleEditChange}
                placeholder="Location"
                className="w-full border px-3 py-2 rounded-lg"
              />
              <input
                type="text"
                name="category"
                value={editForm.category}
                onChange={handleEditChange}
                placeholder="Category"
                className="w-full border px-3 py-2 rounded-lg"
              />
              <input
                type="text"
                name="image"
                value={editForm.image}
                onChange={handleEditChange}
                placeholder="Image URL"
                className="w-full border px-3 py-2 rounded-lg"
              />
              <select
                name="availability"
                value={editForm.availability}
                onChange={handleEditChange}
                className="w-full border px-3 py-2 rounded-lg"
              >
                <option value="Available">Available</option>
                <option value="Unavailable">Unavailable</option>
              </select>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setEditingService(null)}
                className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                className="px-4 py-2 bg-lime-500 text-white rounded-lg hover:bg-lime-600"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
