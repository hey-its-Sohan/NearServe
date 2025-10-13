"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
// import { useSession } from "next-auth/react";

export default function MyServicesPage() {

  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);


  const providerName = "SmartFix Services";

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch("/api/allservices");
        const data = await res.json();


        const myServices = data.filter(
          (service) => service.providerName === providerName
        );

        setServices(myServices);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load services");
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white text-center">
        My Services
      </h1>

      {services.length === 0 ? (
        <p className="text-center text-gray-500">No services added yet.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service._id}
              className="bg-white dark:bg-[#1c1f3b] rounded-xl border shadow p-4"
            >
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
                ৳{service.price}
              </p>
              <p className="text-sm text-gray-500">{service.location}</p>

              <div className="flex gap-2 mt-4">
                <button className="flex-1 py-2 bg-lime-500 text-white rounded-md hover:bg-lime-600 transition">
                  Edit
                </button>
                <button
                  onClick={async () => {
                    try {
                      const res = await fetch(`/api/allservices/${service._id}`, {
                        method: "DELETE",
                      });
                      if (res.ok) {
                        toast.success("Service deleted");
                        setServices((prev) =>
                          prev.filter((s) => s._id !== service._id)
                        );
                      } else toast.error("Failed to delete service");
                    } catch (err) {
                      toast.error("Error deleting");
                    }
                  }}
                  className="flex-1 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
