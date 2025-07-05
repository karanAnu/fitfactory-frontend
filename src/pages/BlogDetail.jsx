import { useParams, useNavigate } from "react-router-dom";
import blogs from "../data/blogs"; // ✅ Centralized blog data

const BlogDetail = () => {
  const { id } = useParams();
  const blog = blogs.find((b) => b.id === id);
  const navigate = useNavigate();

  if (!blog) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-red-500 text-xl">Blog not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white px-6 py-20">
      <button
        onClick={() => navigate(-1)}
        className="bg-yellow-400 text-black px-4 py-2 rounded mb-6 hover:bg-yellow-500"
      >
        ← Back
      </button>
      <div className="max-w-4xl mx-auto bg-gray-900 p-6 rounded-lg shadow-lg">
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-64 object-cover rounded mb-6"
        />
        <h1 className="text-3xl font-bold text-yellow-400 mb-4">{blog.title}</h1>
        <p className="text-gray-300 whitespace-pre-line">{blog.content}</p>
      </div>
    </div>
  );
};

export default BlogDetail;