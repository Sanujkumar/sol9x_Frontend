
"use client";
import UserProfile from "@/components/studentProfile";
import { useAuthStore } from "@/components/useAuthStor";
interface UserType{
  id: string,
  name: string,
  email: string,
  course: string
}
export default function AdminDashboard() { 
  const { user } = useAuthStore();

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">welcome to <span className="text-blue-500">{user?.name}</span> </h1>
        <div>
          <UserProfile/>
        </div>

    </div>
  );
}
