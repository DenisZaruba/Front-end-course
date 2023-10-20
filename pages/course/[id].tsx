import { Courses } from "@/src/interfaces/courses.interface";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

export default function Course() {
  const [courses, setCourses] = useState<Courses>();
  const { query } = useRouter();

  const fetchData = (id: string | string[]) => {
    try {
      axios
        .get(`http://localhost:4025/api/courses/${id}`)
        .then((res) => res.data)
        .then((data) => setCourses(data));
    } catch (error) {}
  };

  useEffect(() => {
    if (query.id) {
      fetchData(query.id);
    }
  }, [query]);

  console.log("courses", courses);

  return (
    <div className="m-5 bg-slate-400 rounded-md">
      <p className="text-lg text-white mb-3">{courses?.title}</p>
      <p className="text-md text-white mb-2">{courses?.content}</p>
      <p className="text-sm text-white ">{courses?.author}</p>
    </div>
  );
}
