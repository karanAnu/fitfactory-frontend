import blogs from "../data/blogs";
import { Link } from "react-router-dom";

const Blogs = () => {
  return (
    <div className="min-h-screen bg-black text-white px-6 py-20">
      <h1 className="text-4xl font-bold text-yellow-400 text-center mb-12">📝 All Blogs</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="bg-gray-900 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition duration-300"
          >
            <img src={blog.image} alt={blog.title} className="w-full h-52 object-cover" />
            <div className="p-6">
              <h3 className="text-xl font-bold text-yellow-300 mb-2">{blog.title}</h3>
              <p className="text-gray-300 mb-4">{blog.desc}</p>
              <Link
                to={`/blog/${blog.id}`}
                className="text-yellow-400 hover:underline font-semibold"
              >
                Read More →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blogs;