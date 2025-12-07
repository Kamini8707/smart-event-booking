import React, { useEffect, useState } from "react";
import { eventsAPI } from "../api/api";

export default function AdminDashboard() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    eventsAPI.list().then(setEvents).catch(console.error);
  }, []);

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h2 className="text-2xl mb-4">Admin Dashboard (Events)</h2>
      <div className="space-y-3">
        {events.map((e) => (
          <div
            key={e.id}
            className="p-4 bg-white shadow rounded flex justify-between"
          >
            <div>
              <div className="font-bold">{e.title}</div>
              <div className="text-sm text-gray-600">
                {e.location} • {new Date(e.date).toLocaleString()}
              </div>
            </div>
            <div>
              <button className="bg-yellow-400 text-white px-3 py-1 rounded mr-2">
                Edit
              </button>
              <button className="bg-red-500 text-white px-3 py-1 rounded">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
