
import { useAuthStore } from "./useAuthStor";

export default function UserProfile() {
  const { user } = useAuthStore();

  if (!user) return null;

  return (
    <div className="border p-4 rounded-2xl bg-gray-300 space-y-2 w-1/2 hover:bg-gray-200 hover:border-2 border-blue-400">
      <h2 className="font-bold">User Profile</h2>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>
      <p>Course: {user.course}</p>
    </div>
  );
}
