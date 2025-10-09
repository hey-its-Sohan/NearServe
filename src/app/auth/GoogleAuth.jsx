import { Button } from "@/components/ui/button";
import React from "react";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";

const GoogleAuth = () => {
  const handleGoogleAuth = () => {
    signIn("google");
  };
  return (
    <div>
      <button
      onClick={handleGoogleAuth}
        type="button"
        className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-50 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all shadow-sm"
      >
        <FcGoogle className="w-5 h-5" />
        Continue with Google
      </button>
    </div>
  );
};

export default GoogleAuth;
