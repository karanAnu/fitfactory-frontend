import { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";

const Subscription = () => {
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);

  const userId = localStorage.getItem("userId"); // ✅ Get userId from localStorage

  useEffect(() => {
    const fetchSubscription = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/users/get-user/${userId}`);
        setSubscription(res.data.user?.subscription || null);
      } catch (err) {
        console.error("❌ Failed to fetch subscription:", err);
      } finally {
        setLoading(false);
      }
    };

    if (userId) fetchSubscription();
  }, [userId]);

  const getDaysLeft = () => {
    if (!subscription?.endDate) return 0;
    const today = dayjs();
    const end = dayjs(subscription.endDate);
    return end.diff(today, "day");
  };

  if (loading) {
    return <div className="text-center text-white mt-20">Loading...</div>;
  }

  if (!subscription?.startDate || !subscription?.endDate) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-yellow-400 mb-4">🙁 No Active Subscription</h2>
          <p className="text-gray-300">Please contact gym admin to start your plan.</p>
        </div>
      </div>
    );
  }

  const daysLeft = getDaysLeft();
  const expired = daysLeft < 0;
  const expiringSoon = daysLeft >= 0 && daysLeft <= 5;

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="bg-gray-900 p-6 rounded-lg shadow-lg max-w-md w-full space-y-4 border border-yellow-500">
        <h2 className="text-2xl font-bold text-yellow-400">📄 Subscription Details</h2>
        
        <p>
          <span className="font-semibold text-gray-300">Start Date:</span>{" "}
          {dayjs(subscription.startDate).format("DD MMM YYYY")}
        </p>

        <p>
          <span className="font-semibold text-gray-300">End Date:</span>{" "}
          {dayjs(subscription.endDate).format("DD MMM YYYY")}
        </p>

        <p>
          <span className="font-semibold text-gray-300">Days Left:</span>{" "}
          {daysLeft > 0 ? daysLeft : 0}
        </p>

        {expired && (
          <p className="text-red-500 font-bold">❌ Your subscription has expired!</p>
        )}

        {expiringSoon && !expired && (
          <p className="text-orange-400 font-bold">
            ⚠️ Subscription ending in {daysLeft} day{daysLeft !== 1 && "s"}!
          </p>
        )}

        {!expired && !expiringSoon && (
          <p className="text-green-500 font-bold">✅ Active Subscription</p>
        )}
      </div>
    </div>
  );
};

export default Subscription;