"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import cookies from "js-cookie";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const accessToken = cookies.get("accessToken");
    if (accessToken) {
      router.push("/profile");
    } else {
      router.push("/login");
    }
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="text-2xl font-semibold text-slate-700">Loading...</div>
    </div>
  );
}
