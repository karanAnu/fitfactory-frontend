import { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const Tracker = () => {
  const [workouts, setWorkouts] = useState({});
  const [muscle, setMuscle] = useState("");
  const [exercise, setExercise] = useState("");
  const [sets, setSets] = useState("");
  const [reps, setReps] = useState("");
  const [weight, setWeight] = useState("");
  const [duration, setDuration] = useState("");
  const [notes, setNotes] = useState("");

  const handleAdd = () => {
    if (!muscle || !exercise) return;

    const entry = { exercise, sets, reps, weight };

    setWorkouts((prev) => ({
      ...prev,
      [muscle]: [...(prev[muscle] || []), entry],
    }));

    setExercise("");
    setSets("");
    setReps("");
    setWeight("");
  };

  const handleDelete = (muscle, index) => {
    const updated = [...workouts[muscle]];
    updated.splice(index, 1);
    setWorkouts({ ...workouts, [muscle]: updated });
  };

  const handleSummarySave = () => {
    if (!duration && !notes) {
      alert("Please fill in Duration or Notes first.");
      return;
    }

    console.log("📊 Workout Summary Saved:");
    console.log("Duration:", duration);
    console.log("Notes:", notes);
    alert("✅ Workout summary saved!");

    // Optional Reset
    // setDuration("");
    // setNotes("");
  };

  return (
    <div className="min-h-screen bg-black text-white px-6 py-20">
      <h1 className="text-4xl font-bold text-yellow-400 text-center mb-10">
        💪 Workout Tracker
      </h1>

      {/* Input Form */}
      <div className="bg-gray-800 p-6 rounded-lg max-w-3xl mx-auto mb-10 shadow-lg space-y-4">
        <select
          value={muscle}
          onChange={(e) => setMuscle(e.target.value)}
          className="w-full px-4 py-2 rounded bg-gray-700 text-white"
        >
          <option value="">-- Select Muscle Group --</option>
          <option value="Chest">Chest</option>
          <option value="Triceps">Triceps</option>
          <option value="Back">Back</option>
          <option value="Biceps">Biceps</option>
          <option value="Legs">Legs</option>
          <option value="Shoulders">Shoulders</option>
          <option value="Core">Core</option>
          <option value="Forearms">Forearms</option>
          <option value="Full Body">Full Body</option>
        </select>

        <input
          type="text"
          placeholder="Exercise (e.g., Bench Press)"
          value={exercise}
          onChange={(e) => setExercise(e.target.value)}
          className="w-full px-4 py-2 rounded bg-gray-700 text-white"
        />

        <div className="grid grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Sets"
            value={sets}
            onChange={(e) => setSets(e.target.value)}
            className="px-4 py-2 rounded bg-gray-700 text-white"
          />
          <input
            type="text"
            placeholder="Reps"
            value={reps}
            onChange={(e) => setReps(e.target.value)}
            className="px-4 py-2 rounded bg-gray-700 text-white"
          />
          <input
            type="text"
            placeholder="Weight (kg)"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="px-4 py-2 rounded bg-gray-700 text-white"
          />
        </div>

        <button
          onClick={handleAdd}
          className="bg-yellow-400 text-black px-6 py-2 rounded font-bold hover:bg-yellow-500 transition"
        >
          Add Workout
        </button>
      </div>

      {/* Display Workouts */}
      <div className="max-w-6xl mx-auto space-y-10">
        {Object.keys(workouts).map((muscleGroup) => (
          <div key={muscleGroup} className="bg-gray-900 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-red-400 mb-4">{muscleGroup}</h2>
            <ul className="space-y-3">
              {workouts[muscleGroup].map((item, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center bg-gray-800 px-4 py-3 rounded"
                >
                  <div>
                    <p className="font-bold capitalize text-white text-lg">{item.exercise}</p>
                    <p className="text-sm text-gray-300">
                      {item.sets} Sets x {item.reps} Reps @ {item.weight}kg
                    </p>
                  </div>
                  <div className="flex gap-3 text-xl">
                    <button className="hover:text-yellow-400">
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(muscleGroup, index)}
                      className="hover:text-red-500"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Duration Section */}
      <div className="max-w-3xl mx-auto mt-16 bg-gray-800 p-6 rounded shadow-lg">
        <h2 className="text-2xl font-bold text-yellow-400 mb-4">⏱️ Workout Duration</h2>
        <input
          type="text"
          placeholder="e.g., 1 hour 10 minutes"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          className="w-full px-4 py-2 rounded bg-gray-700 text-white"
        />
      </div>

      {/* Notes Section */}
      <div className="max-w-3xl mx-auto mt-8 bg-gray-800 p-6 rounded shadow-lg">
        <h2 className="text-2xl font-bold text-yellow-400 mb-4">📝 Notes</h2>
        <textarea
          placeholder="Write any notes about today's workout..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full px-4 py-2 rounded bg-gray-700 text-white"
          rows={4}
        />
      </div>

     {/* Save Summary Button */}
<div className="max-w-3xl mx-auto text-center mt-6 mb-20">
  <button
    onClick={handleSummarySave}
    className="bg-yellow-400 text-black px-6 py-2 rounded font-bold hover:bg-yellow-500 transition"
  >
    Save Summary
  </button>
</div>
    </div>
  );
};

export default Tracker;