// Tracker.jsx
import { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer
} from "recharts";
import Spinner from "../components/Spinner";

const Tracker = () => {
  const [workouts, setWorkouts] = useState({});
  const [muscle, setMuscle] = useState("");
  const [exercise, setExercise] = useState("");
  const [sets, setSets] = useState("");
  const [reps, setReps] = useState("");
  const [weight, setWeight] = useState("");
  const [duration, setDuration] = useState("");
  const [notes, setNotes] = useState("");
  const [intensity, setIntensity] = useState("Medium");
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [savedSummaries, setSavedSummaries] = useState([]);
  const [filterDate, setFilterDate] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("workoutSummariesV2")) || [];
    setSavedSummaries(saved);
    if (saved.length && saved[0].photo) {
      setPhotoPreview(saved[0].photo);
    }
    generateSuggestions(saved);
  }, []);

  const handleAdd = () => {
    if (!muscle || !exercise) return;
    const entry = { exercise, sets, reps, weight };
    setWorkouts((prev) => ({
      ...prev,
      [muscle]: [...(prev[muscle] || []), entry],
    }));
    setExercise(""); setSets(""); setReps(""); setWeight("");
  };

  const handleDelete = (muscle, index) => {
    const updated = [...workouts[muscle]];
    updated.splice(index, 1);
    setWorkouts({ ...workouts, [muscle]: updated });
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(file);
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSummarySave = async () => {
    if (!duration && !notes && !photo) {
      alert("Please fill something before saving.");
      return;
    }

    setIsSubmitting(true);
    const today = new Date().toLocaleDateString("en-GB");
    const newSummary = {
      date: today,
      duration,
      notes,
      intensity,
      photo: photoPreview || null,
      workouts,
    };
    const updatedSummaries = [newSummary, ...savedSummaries];
    localStorage.setItem("workoutSummariesV2", JSON.stringify(updatedSummaries));
    setSavedSummaries(updatedSummaries);
    generateSuggestions(updatedSummaries);

    await new Promise((r) => setTimeout(r, 1000));
    alert("✅ Workout summary saved!");

    setWorkouts({}); setDuration(""); setNotes(""); setPhoto(null); setPhotoPreview(null);
    setIsSubmitting(false);
  };

  const handleExportPDF = (summary) => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text(`Workout Summary - ${summary.date}`, 14, 20);
    doc.setFontSize(12);
    doc.text(`Duration: ${summary.duration || "-"}`, 14, 30);
    doc.text(`Intensity: ${summary.intensity || "-"}`, 14, 37);
    doc.text(`Notes: ${summary.notes || "-"}`, 14, 44);

    const tableRows = [];
    if (summary.workouts) {
      Object.entries(summary.workouts).forEach(([muscle, exercises]) => {
        exercises.forEach((ex) => {
          tableRows.push([muscle, ex.exercise, ex.sets, ex.reps, ex.weight + " kg"]);
        });
      });
    }

    autoTable(doc, {
      startY: 50,
      head: [["Muscle", "Exercise", "Sets", "Reps", "Weight"]],
      body: tableRows,
    });

    if (summary.photo) {
      const pageWidth = doc.internal.pageSize.getWidth();
      const imgWidth = 60;
      const imgHeight = 60;
      const x = (pageWidth - imgWidth) / 2;
      doc.addPage();
      doc.setFontSize(14);
      doc.text("📸 Progress Photo", 14, 20);
      doc.addImage(summary.photo, "JPEG", x, 30, imgWidth, imgHeight);
    }

    doc.save(`Workout-Summary-${summary.date}.pdf`);
  };

  const generateSuggestions = (data) => {
    const last5 = data.slice(0, 5);
    const muscleCount = {};
    last5.forEach((summary) => {
      Object.keys(summary.workouts || {}).forEach((muscle) => {
        muscleCount[muscle] = (muscleCount[muscle] || 0) + 1;
      });
    });
    const allMuscles = ["Chest", "Back", "Legs", "Shoulders", "Biceps", "Triceps", "Core"];
    const skipped = allMuscles.filter((m) => !muscleCount[m]);
    const heavyWeights = last5.some((s) => {
      return Object.values(s.workouts || {}).flat().some((ex) => +ex.weight > 30);
    });

    const messages = [];
    if (skipped.length) messages.push(`😅 You skipped ${skipped.join(", ")} in last 5 workouts.`);
    if (!heavyWeights) messages.push("💡 Try increasing weight for more progressive overload!");
    if (last5.length >= 5 && last5.every(s => s.intensity === "Low")) messages.push("🔥 Push harder! All recent workouts are low intensity.");
    setSuggestions(messages);
  };

  const filteredSummaries = savedSummaries.filter((summary) => {
    if (!filterDate) return true;
    const formatted = new Date(filterDate).toLocaleDateString("en-GB");
    return summary.date === formatted;
  });

  const chartData = savedSummaries.map((summary) => ({
    date: summary.date,
    totalExercises: Object.values(summary.workouts || {}).reduce((acc, arr) => acc + arr.length, 0)
  }));

  return (
    <div className="min-h-screen bg-black text-white px-6 py-20">
      <h1 className="text-4xl font-bold text-yellow-400 text-center mb-10">💪 Workout Tracker</h1>

      {/* AI Suggestions */}
      {suggestions.length > 0 && (
        <div className="max-w-2xl mx-auto bg-gray-900 text-white p-4 rounded mb-10">
          <h2 className="text-xl font-bold text-pink-400 mb-2">🧠 AI Suggestions</h2>
          <ul className="list-disc list-inside space-y-1">
            {suggestions.map((s, i) => <li key={i}>{s}</li>)}
          </ul>
        </div>
      )}

      {/* Chart */}
      <div className="max-w-4xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg mb-10">
        <h2 className="text-2xl font-bold text-blue-400 mb-4">📊 Weekly Progress (Exercise Count)</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" stroke="#ccc" />
            <YAxis stroke="#ccc" />
            <Tooltip />
            <Legend />
            <Bar dataKey="totalExercises" fill="#facc15" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Filter */}
      <div className="max-w-3xl mx-auto mb-8 bg-gray-800 p-4 rounded flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex items-center gap-3 w-full">
          <label htmlFor="filterDate" className="text-sm font-semibold text-white">📅 Filter by Date:</label>
          <input
            type="date"
            id="filterDate"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="px-4 py-2 rounded bg-gray-700 text-white w-full"
          />
        </div>
        <button
          onClick={() => setFilterDate("")}
          className="bg-red-600 px-4 py-2 rounded hover:bg-red-700 text-white font-bold"
        >
          ❌ Clear Filter
        </button>
      </div>

      {/* Workout Form */}
      <div className="bg-gray-800 p-6 rounded-lg max-w-3xl mx-auto mb-10 shadow-lg space-y-4">
        <select value={muscle} onChange={(e) => setMuscle(e.target.value)} className="w-full px-4 py-2 rounded bg-gray-700 text-white">
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
        <input type="text" placeholder="Exercise" value={exercise} onChange={(e) => setExercise(e.target.value)} className="w-full px-4 py-2 rounded bg-gray-700 text-white" />
        <div className="grid grid-cols-3 gap-4">
          <input type="text" placeholder="Sets" value={sets} onChange={(e) => setSets(e.target.value)} className="px-4 py-2 rounded bg-gray-700 text-white" />
          <input type="text" placeholder="Reps" value={reps} onChange={(e) => setReps(e.target.value)} className="px-4 py-2 rounded bg-gray-700 text-white" />
          <input type="text" placeholder="Weight (kg)" value={weight} onChange={(e) => setWeight(e.target.value)} className="px-4 py-2 rounded bg-gray-700 text-white" />
        </div>
        <button onClick={handleAdd} className="bg-yellow-400 text-black px-6 py-2 rounded font-bold hover:bg-yellow-500 transition">Add Workout</button>
      </div>

      {/* Workout List */}
      <div className="max-w-6xl mx-auto space-y-10">
        {Object.keys(workouts).map((muscleGroup) => (
          <div key={muscleGroup} className="bg-gray-900 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-red-400 mb-4">{muscleGroup}</h2>
            <ul className="space-y-3">
              {workouts[muscleGroup].map((item, index) => (
                <li key={index} className="flex justify-between items-center bg-gray-800 px-4 py-3 rounded">
                  <div>
                    <p className="font-bold capitalize text-white text-lg">{item.exercise}</p>
                    <p className="text-sm text-gray-300">{item.sets} Sets x {item.reps} Reps @ {item.weight}kg</p>
                  </div>
                  <div className="flex gap-3 text-xl">
                    <button className="hover:text-yellow-400"><FaEdit /></button>
                    <button onClick={() => handleDelete(muscleGroup, index)} className="hover:text-red-500"><FaTrash /></button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Summary Input */}
      <div className="max-w-3xl mx-auto mt-12 bg-gray-800 p-6 rounded shadow-lg space-y-4">
        <input type="text" placeholder="Duration (e.g., 1 hour)" value={duration} onChange={(e) => setDuration(e.target.value)} className="w-full px-4 py-2 rounded bg-gray-700 text-white" />
        <select value={intensity} onChange={(e) => setIntensity(e.target.value)} className="w-full px-4 py-2 rounded bg-gray-700 text-white">
          <option value="Low">Low Intensity</option>
          <option value="Medium">Medium Intensity</option>
          <option value="High">High Intensity</option>
        </select>
        <textarea placeholder="Workout Notes" value={notes} onChange={(e) => setNotes(e.target.value)} className="w-full px-4 py-2 rounded bg-gray-700 text-white" rows={4} />
        <input type="file" accept="image/*" onChange={handlePhotoUpload} className="w-full" />
        {photoPreview && <img src={photoPreview} alt="Preview" className="mt-4 rounded max-h-64 object-contain mx-auto border-2 border-yellow-400" />}
        <button
          onClick={handleSummarySave}
          disabled={isSubmitting}
          className={`flex justify-center items-center gap-2 w-full px-6 py-2 rounded font-bold transition ${
            isSubmitting ? "bg-yellow-300 cursor-not-allowed" : "bg-yellow-400 hover:bg-yellow-500 text-black"
          }`}
        >
          {isSubmitting ? <Spinner /> : "✅ Save Summary"}
        </button>
      </div>

      {/* History */}
      <div className="max-w-4xl mx-auto mt-16 space-y-10">
        {filteredSummaries.map((summary, i) => (
          <div key={i} className="bg-gray-900 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold text-green-400 mb-2">📅 {summary.date}</h2>
            <p className="text-yellow-300">⏱️ Duration: {summary.duration}</p>
            <p className="text-yellow-300">🔥 Intensity: {summary.intensity}</p>
            <p className="text-white">📝 Notes: {summary.notes}</p>
            {summary.photo && <img src={summary.photo} alt="Workout" className="mt-4 rounded max-h-64 object-contain mx-auto border border-yellow-400" />}
            <button onClick={() => handleExportPDF(summary)} className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">📥 Download as PDF</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tracker;