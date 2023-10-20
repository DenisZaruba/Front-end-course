import Image from "next/image";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import axios from "axios";
import { Courses } from "@/src/interfaces/courses.interface";
import CourseItem from "@/src/components/CourseItem/CourseItem";
import Link from "next/link";
import toast from "react-hot-toast";

export default function Home() {
  const [courses, setCourses] = useState<Courses[]>([]);

  const fetchData = () => {
    try {
      axios
        .get("http://localhost:4025/api/courses")
        .then((res) => res.data)
        .then((data) => setCourses(data));
    } catch (error: any) {
      error?.message && toast.error(error?.message);
    }
  };

  const deleteItem = (id: string) => {
    try {
      axios
        .delete(`http://localhost:4025/api/courses/${id}`)
        .then((res) => res.data)
        .then((data) => {
          fetchData();
          toast.success("Course deleted succesfully");
        });
    } catch (error: any) {
      error?.message && toast.error(error?.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <main>
      <div className="flex items-center justify-between mx-1">
        <h2 className="text-lg my-3 text-yellow-200">MongoDB - LAB</h2>
        <Link className="hover:text-yellow-200" href={"/create"}>
          Add course
        </Link>
      </div>
      <div className="flex flex-col gap-3">
        {courses.map((item) => {
          return (
            <div key={item._id} className="flex gap-3 items-stretch flex-1">
              <Link className="cursor-pointer flex-1" href={`/course/${item._id}`}>
                <CourseItem author={item.author} content={item.content} title={item.title} />
              </Link>
              <div
                onClick={() => deleteItem(item._id)}
                className="bg-red-600 text-white text-lg w-10 flex justify-center items-center cursor-pointer "
              >
                X
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
