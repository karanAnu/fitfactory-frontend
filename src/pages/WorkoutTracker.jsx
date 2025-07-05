import React, { useState } from "react";

const WorkoutTracker = () => {
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [workouts, setWorkouts] = useState([
    {
      type: "",
      exercises: [
        { name: "", weight: "", reps: "", sets: "" },
      ],
    },
  ]);

  const handleWorkoutChange = (index, field, value) => {
    const updated = [...workouts];
    updated[index][field] = value;
    setWorkouts(updated);
  };

  const handleExerciseChange = (wIndex, eIndex, field, value) => {
    const updated = [...workouts];
    updated[wIndex].exercises[eIndex][field] = value;
    setWorkouts(updated);
  };

  const addWorkoutType = () => {
    setWorkouts([
      ...workouts,
      { type: "", exercises: [{ name: "", weight: "", reps: "", sets: "" }] },
    ]);
  };

  const addExercise = (index) => {
    const updated = [...workouts];
    updated[index].exercises.push({ name: "", weight: "", reps: "", sets: "" });
    setWorkouts(updated);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-6">🏋️ Workout Tracker</h2>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border p-2 rounded"
        />
      </div>

      {workouts.map((workout, wIndex) => (
        <div key={wIndex} className="mb-6 border p-4 rounded bg-white shadow">
          <label className="block font-medium mb-2">Workout Type</label>
          <input
            type="text"
            placeholder="e.g. Chest, Back, Legs"
            value={workout.type}
            onChange={(e) => handleWorkoutChange(wIndex, "type", e.target.value)}
            className="w-full mb-4 border p-2 rounded"
          />

          <h4 className="font-semibold mb-2">Exercises</h4>
          {workout.exercises.map((exercise, eIndex) => (
            <div
              key={eIndex}
              className="grid md:grid-cols-4 gap-3 mb-2 items-center"
            >
              <input
                type="text"
                placeholder="Exercise Name"
                value={exercise.name}
                onChange={(e) =>
                  handleExerciseChange(wIndex, eIndex, "name", e.target.value)
                }
                className="border p-2 rounded"
              />
              <input
                type="number"
                placeholder="Weight (kg)"
                value={exercise.weight}
                onChange={(e) =>
                  handleExerciseChange(wIndex, eIndex, "weight", e.target.value)
                }
                className="border p-2 rounded"
              />
              <input
                type="number"
                placeholder="Reps"
                value={exercise.reps}
                onChange={(e) =>
                  handleExerciseChange(wIndex, eIndex, "reps", e.target.value)
                }
                className="border p-2 rounded"
              />
              <input
                type="number"
                placeholder="Sets"
                value={exercise.sets}
                onChange={(e) =>
                  handleExerciseChange(wIndex, eIndex, "sets", e.target.value)
                }
                className="border p-2 rounded"
              />
            </div>
          ))}

          <button
            onClick={() => addExercise(wIndex)}
            className="text-sm text-blue-600 hover:underline mt-2"
          >
            ➕ Add Exercise
          </button>
        </div>
      ))}

      <button
        onClick={addWorkoutType}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        ➕ Add Another Workout Type
      </button>

      {/* Display Table */}
      {workouts.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-bold mb-4">📅 Summary for {date}</h3>
          {workouts.map((workout, i) => (
            <div key={i} className="mb-6">
              <h4 className="font-semibold text-blue-700">🔹 {workout.type}</h4>
              <table className="min-w-full bg-white border shadow rounded mt-2">
                <thead className="bg-gray-100 text-left">
                  <tr>
                    <th className="p-2 border">Exercise</th>
                    <th className="p-2 border">Weight</th>
                    <th className="p-2 border">Reps</th>
                    <th className="p-2 border">Sets</th>
                  </tr>
                </thead>
                <tbody>
                  {workout.exercises.map((ex, j) => (
                    <tr key={j} className="hover:bg-gray-50">
                      <td className="p-2 border">{ex.name}</td>
                      <td className="p-2 border">{ex.weight} kg</td>
                      <td className="p-2 border">{ex.reps}</td>
                      <td className="p-2 border">{ex.sets}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WorkoutTracker;