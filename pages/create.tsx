import axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";
import toast from "react-hot-toast";

// Define the types for the component's props and state
interface CreateProps {}

interface CreateState {
  author: string;
  title: string;
  content: string;
}

export default function Create(props: CreateProps) {
  const [state, setState] = useState<CreateState>({
    author: "",
    title: "",
    content: "",
  });

  const router = useRouter();

  const handleAuthorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, author: e.target.value });
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, title: e.target.value });
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setState({ ...state, content: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addCourse();
  };

  const addCourse = () => {
    try {
      axios
        .post("http://localhost:4025/api/courses", { ...state })
        .then((res) => res.data)
        .then((data) => {
          toast.success("Course added");
          router.push("/");
        });
    } catch (error: any) {
      error?.message && toast.error(error?.message);
    }
  };

  return (
    <form className="mx-2" onSubmit={handleSubmit}>
      <div className="mb-6">
        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Author
        </label>
        <input
          type="text"
          id="author"
          value={state.author}
          onChange={handleAuthorChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Author"
          required
        />
      </div>
      <div className="mb-6">
        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Title
        </label>
        <input
          type="text"
          placeholder="Title"
          id="title"
          value={state.title}
          onChange={handleTitleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
        />
      </div>
      <div className="mb-6">
        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Content
        </label>
        <textarea
          id="content"
          placeholder="Content"
          value={state.content}
          onChange={handleContentChange}
          className="bg-gray-50 border h-20 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
        />
      </div>
      <button
        type="submit"
        className="text-white bg-blue-700 hover-bg-blue-800 focus-ring-4 focus-outline-none focus-ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover-bg-blue-700 dark:focus-ring-blue-800"
      >
        Submit
      </button>
    </form>
  );
}
