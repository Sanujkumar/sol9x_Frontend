
"use client";
import { useAuthStore } from "@/components/useAuthStor";
import UserProfile from "@/components/allStudents";
export default function AdminDashboard() {
  const {user} = useAuthStore();  
  return (  
    <div className="">
       <h1 className="text-3xl font-bold mb-6 text-gray-800">welcome to <span className="text-blue-500">{user?.name}</span> </h1>
       <div>
        <UserProfile/>
        </div>
    </div>
    
  );
}
