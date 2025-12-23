"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import Link from "next/link";
import { useAuthStore } from "./useAuthStor";
import { json } from "stream/consumers";

export default function Navbar() {
  const router = useRouter();

  const { user, token, setAuth, clearAuth } = useAuthStore(); 

  const handleLogout = () => {
    clearAuth();  
    router.push("/login");
  };

  return (
    <nav className="flex justify-between items-center p-4 bg-blue-200 shadow h-16 w-full">
      <Link href="/" className="text-xl font-semibold">
        Home
      </Link>

      <div className="flex gap-3">
        {token && user?.role === "ADMIN" && (
          <Button variant="link" onClick={() => router.push("/admin")}>
            Admin Dashboard
          </Button>
        )}
   
        {token && user?.role === "STUDENT" && (
          <Button variant="link" onClick={() => router.push("/user")}>
            Student Dashboard
          </Button>
        )}

        {token && (
          <Button className="bg-blue-500" onClick={handleLogout}>
            Logout
          </Button>
        )}
      </div>
    </nav>
  );
}
