import React from "react";

export default function CourseItem({ title, content, author }: { title: string; content: string; author: string }) {
  return (
    <div className="w-full rounded-md bg-slate-700 p-5">
      <p className="text-lg text-white mb-3">{title}</p>
      <p className="text-md text-white mb-2">{content}</p>
      <p className="text-sm text-white ">{author}</p>
    </div>
  );
}
