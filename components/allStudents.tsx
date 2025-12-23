import { Url } from "@/lib/url";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAuthStore } from "./useAuthStor";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
interface StudentType {
  id: number;
  name: string;
  email: string;
  course: string;
}   

export default function UserProfile() {
  const [loading,setLoading] = useState(true);
  const [datas, setDatas] = useState<StudentType[]>([]);
    const [editingStudent, setEditingStudent] = useState<StudentType | null>(null);
   const token = useAuthStore((state) => state.token);
  const getDatas = async () => {
    if(!token){
        console.log("token is missing");  
        return;
    }
    try {
      setLoading(false)
      const res = await axios.get(
        `${Url}/api/admin/allStudents`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },  
        }
      );     
      setLoading(true)
      setDatas(res.data.allStudents); 
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getDatas();
  }, []);


  const handleDelete = async (id: number) => {
    if (!token) return;

    try {
      await axios.delete(`${Url}/api/admin/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setDatas((prev) => prev.filter((s) => s.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

   const handleUpdate = async () => {
    if (!token || !editingStudent) return;

    try {
      await axios.put(
        `${Url}/api/admin/edit/${editingStudent.id}`,
        editingStudent,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setEditingStudent(null);
      getDatas();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="w-full min-h-screen p-4">
       
        {!loading &&
        <div className="font-bold text-center">Loading....</div>
        }  
     <div className="grid grid-cols-3 space-x-4">
      {datas.map((student) => (
        <div
          key={student.id}
          className="border p-4 rounded-2xl bg-gray-300 space-y-2  hover:bg-gray-200 hover:border-2 border-blue-400"
        >
          <p>Name: {student.name}</p>
          <p>Email: {student.email}</p>
          <p>Course: {student.course}</p>
          <div className="space-x-2">
           <Button onClick={() => setEditingStudent(student)}>Edit</Button>
          <Button
                variant="destructive"
                onClick={() => handleDelete(student.id)}
              >
                Delete
          </Button>
          </div>
        </div>    
      ))}
      </div>

      {editingStudent && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-[400px] space-y-3">
            <h2 className="font-bold text-lg text-center">Edit Student</h2>

            <Input
              value={editingStudent.name}
              onChange={(e) =>
                setEditingStudent({ ...editingStudent, name: e.target.value })
              }
              placeholder="Name"
            />

            <Input
              value={editingStudent.email}
              onChange={(e) =>
                setEditingStudent({ ...editingStudent, email: e.target.value })
              }
              placeholder="Email"
            />

            <Input
              value={editingStudent.course}
              onChange={(e) =>
                setEditingStudent({ ...editingStudent, course: e.target.value })
              }
              placeholder="Course"
            />

            <div className="flex justify-between">
              <Button onClick={handleUpdate}>Save</Button>
              <Button
                variant="outline"
                onClick={() => setEditingStudent(null)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );       
}
