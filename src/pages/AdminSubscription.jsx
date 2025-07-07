// src/pages/AdminSubscription.jsx
import { useState } from "react";
import axios from "axios";

const AdminSubscription = () => {
  const [email, setEmail] = useState("");
  const [subscriptionStart, setSubscriptionStart] = useState("");
  const [subscriptionEnd, setSubscriptionEnd] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleUpdate = async () => {
    try {
      setLoading(true);
      setMessage("");

      // Step 1: Get user by email
      const userRes = await axios.get(
        `http://localhost:5000/api/auth/user-by-email?email=${email}`
      );
      const userId = userRes.data._id;

      // Step 2: Update subscription
      await axios.put(`http://localhost:5000/api/users/${userId}/subscription`, {
        subscriptionStart,
        subscriptionEnd,
      });

      setMessage("✅ Subscription updated successfully!");
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to update subscription");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white px-6 py-20">
      <h1 className="text-3xl font-bold text-yellow-400 text-center mb-8">
        🛠️ Admin - Set User Subscription
      </h1>

      <div className="max-w-xl mx-auto bg-gray-800 p-6 rounded space-y-4 shadow-lg">
        <input
          type="email"
          placeholder="User Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 rounded bg-gray-700 text-white"
        />
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 text-sm">Start Date</label>
            <input
              type="date"
              value={subscriptionStart}
              onChange={(e) => setSubscriptionStart(e.target.value)}
              className="w-full px-4 py-2 rounded bg-gray-700 text-white"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm">End Date</label>
            <input
              type="date"
              value={subscriptionEnd}
              onChange={(e) => setSubscriptionEnd(e.target.value)}
              className="w-full px-4 py-2 rounded bg-gray-700 text-white"
            />
          </div>
        </div>
        <button
          onClick={handleUpdate}
          disabled={loading}
          className="bg-yellow-400 text-black px-6 py-2 rounded font-bold hover:bg-yellow-500 transition w-full"
        >
          {loading ? "Updating..." : "📤 Update Subscription"}
        </button>
        {message && <p className="text-center mt-2">{message}</p>}
      </div>
    </div>
  );
};

export default AdminSubscription;