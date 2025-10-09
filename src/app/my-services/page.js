"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

export default function MyServicesPage() {
  const { data: session } = useSession();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch services created by logged-in user
  useEffect(() => {
    if (!session?.user?.email) return;

    const fetchServices = async () => {
      try {
        const res = await fetch(`/api/allservices?email=${session.user.email}`);
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setServices(data);
      } catch (error) {
        toast.error("Failed to load your services");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [session]);

  // ✅ Delete a service
  const handleDelete = async (id) => {
    const confirmDelete = confirm("Are you sure you want to delete this service?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/allservices/${id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Service deleted");
        setServices((prev) => prev.filter((s) => s._id !== id));
      } else {
        toast.error("Failed to delete");
      }
    } catch (error) {
      toast.error("Error deleting service");
      console.error(error);
    }
  };

  // ✅ Loading UI
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0D1128] text-white">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
          className="w-10 h-10 border-4 border-lime-400 border-t-transparent rounded-full"
        ></motion.div>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-[#0D1128] text-white px-6 py-10">
      <h1 className="text-3xl font-bold mb-8 text-lime-400 text-center">
        My Services
      </h1>

      {services.length === 0 ? (
        <p className="text-center text-gray-400">You haven’t added any services yet.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <motion.div
              key={service._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-[#1c1f3b] border border-gray-700 rounded-xl shadow-md overflow-hidden hover:shadow-lime-400/10 transition-all"
            >
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-44 object-cover"
              />
              <div className="p-5 flex flex-col justify-between h-full">
                <div>
                  <h3 className="text-xl font-semibold text-lime-300 mb-1">
                    {service.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-2">
                    {service.category} • {service.location}
                  </p>
                  <p className="text-gray-300 text-sm mb-3">
                    {service.description}
                  </p>
                  <p className="text-lime-400 font-bold">৳ {service.price}</p>
                </div>

                <div className="mt-4 flex justify-between items-center">
                  <button
                    onClick={() => handleDelete(service._id)}
                    className="text-sm text-red-400 hover:text-red-300 transition"
                  >
                    Delete
                  </button>
                  <button
                    className="text-sm text-lime-400 border border-lime-400 px-3 py-1 rounded-md hover:bg-lime-400 hover:text-[#0D1128] transition"
                  >
                    Edit
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
}
