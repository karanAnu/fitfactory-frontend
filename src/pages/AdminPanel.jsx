import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminPanel = () => {
  const [messages, setMessages] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch all contact messages
  const fetchMessages = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/contact/all");
      setMessages(res.data);
    } catch (err) {
      console.error("❌ Error fetching messages:", err);
    }
  };

  // Delete message by ID
  const deleteMessage = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/contact/${id}`);
      setMessages((prev) => prev.filter((msg) => msg._id !== id));
    } catch (err) {
      console.error("❌ Error deleting message:", err);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  // Filter messages based on search term
  const filteredMessages = messages.filter((msg) => {
    const values = `${msg.name} ${msg.email} ${msg.phone} ${msg.message}`.toLowerCase();
    return values.includes(searchTerm.toLowerCase());
  });

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">📩 Admin Panel - Contact Messages</h2>

      <div className="mb-6">
        <input
          type="text"
          placeholder="🔍 Search messages..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {filteredMessages.length === 0 ? (
        <p className="text-center text-gray-500">No messages found.</p>
      ) : (
        <ul className="space-y-4">
          {filteredMessages.map((msg) => (
            <li
              key={msg._id}
              className="bg-white border border-gray-200 p-4 rounded-xl shadow-md hover:shadow-lg transition-all"
            >
              <p><span className="font-semibold">👤 Name:</span> {msg.name}</p>
              <p><span className="font-semibold">📧 Email:</span> {msg.email}</p>
              <p><span className="font-semibold">📞 Phone:</span> {msg.phone}</p>
              <p><span className="font-semibold">📝 Message:</span> {msg.message}</p>
              <p><span className="font-semibold">📅 Date:</span> {new Date(msg.createdAt).toLocaleString()}</p>
              <button
                onClick={() => deleteMessage(msg._id)}
                className="mt-4 px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
              >
                🗑 Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminPanel;