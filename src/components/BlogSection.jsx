import { Link } from "react-router-dom";
import blogs from "../data/blogs"; // ✅ Import from central blog data

const BlogSection = () => {
  return (
    <section id="blogs" className="bg-black text-white py-20 px-4">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-4xl font-bold text-yellow-400">📝 FitFactory Blogs</h2>
        <p className="mt-4 text-gray-400 text-lg">
          Read expert tips, workout guides, and stay motivated!
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="bg-gray-900 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition duration-300"
          >
            <div className="h-52 w-full overflow-hidden">
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-yellow-300 mb-2">
                {blog.title}
              </h3>
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
    </section>
  );
};

export default BlogSection;