"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <nav className="bg-blue-500 p-4 text-white flex justify-between">
      <div>
        <Link href="/" className="mr-4">
          Home
        </Link>
        {user && (
          <Link href="/dashboard" className="mr-4">
            Dashboard
          </Link>
        )}
      </div>
      <div>
        {user ? (
          <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded">
            Logout
          </button>
        ) : (
          <>
            <Link href="/login" className="mr-4">
              Login
            </Link>
            <Link href="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
