"use client";


import { useEffect, useMemo, useState } from "react";

const ROLES = ["customer", "provider", "admin"];

export function useUser() {
  const [role, setRole] = useState("customer");
  const [name, setName] = useState("User");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const qRole = params.get("role");
    const lsRole = localStorage.getItem("nearserve_role");

    if (qRole && ROLES.includes(qRole)) {
      setRole(qRole);
      localStorage.setItem("nearserve_role", qRole);
    } else if (lsRole && ROLES.includes(lsRole)) {
      setRole(lsRole);
    }
    const lsName = localStorage.getItem("nearserve_name");
    if (lsName) setName(lsName);
  }, []);

  const user = useMemo(
    () => ({ id: "demo", name, email: "demo@nearserve.local", role }),
    [name, role]
  );

  return { user, setRole };
}
