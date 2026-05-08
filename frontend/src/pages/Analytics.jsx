import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

import { Bar, Pie } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

export default function Analytics() {
  const { id } = useParams();

  const [responses, setResponses] = useState([]);

  useEffect(() => {
    API.get(`/responses/${id}`)
      .then(res => setResponses(res.data))
      .catch(err => console.error(err));
  }, []);

  // Count submissions by date
  const dateCounts = {};

  responses.forEach((r) => {
    const date = new Date(r.createdAt).toLocaleDateString();

    dateCounts[date] = (dateCounts[date] || 0) + 1;
  });

  const barData = {
    labels: Object.keys(dateCounts),
    datasets: [
  {
    label: "Responses",
    data: Object.values(dateCounts),
    backgroundColor: [
      "#3B82F6",
      "#10B981",
      "#F59E0B",
      "#EF4444",
      "#8B5CF6",
      "#EC4899"
    ],
    borderRadius: 6
  },
],
  };

  // Example pie chart using first field
  const fieldCounts = {};

  responses.forEach((r) => {
    const firstAnswer = Object.values(r.answers)[0];

    if (firstAnswer) {
      fieldCounts[firstAnswer] =
        (fieldCounts[firstAnswer] || 0) + 1;
    }
  });

  const pieData = {
    labels: Object.keys(fieldCounts),
    datasets: [
  {
    data: Object.values(fieldCounts),
    backgroundColor: [
      "#3B82F6",
      "#10B981",
      "#F59E0B",
      "#EF4444",
      "#8B5CF6",
      "#EC4899",
      "#14B8A6"
    ],
  },
],
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <h1 className="text-3xl font-bold mb-6">
        Analytics Dashboard
      </h1>

      {/* SUMMARY */}
      <div className="bg-white p-6 rounded-xl shadow mb-6">
        <h2 className="text-2xl font-semibold">
          Total Responses: {responses.length}
        </h2>
      </div>

      {/* BAR CHART */}
      <div className="bg-white p-6 rounded-xl shadow mb-6">
        <h2 className="text-xl font-bold mb-4">
          Responses by Date
        </h2>

        <Bar data={barData} />
      </div>

      {/* PIE CHART */}
      <div className="bg-white p-6 rounded-xl shadow mb-6">
        <h2 className="text-xl font-bold mb-4">
          First Field Distribution
        </h2>

        <div className="max-w-sm">
          <Pie data={pieData} />
        </div>
      </div>

      {/* RAW RESPONSES */}
      <div className="bg-white p-6 rounded-xl shadow">

        <h2 className="text-xl font-bold mb-4">
          Responses
        </h2>

        {responses.map((r, i) => (
          <div
            key={i}
            className="border-b py-2"
          >
            <pre className="text-sm">
              {JSON.stringify(r.answers, null, 2)}
            </pre>
          </div>
        ))}

      </div>

    </div>
  );
}