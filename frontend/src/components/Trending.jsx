// src/components/Trending.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function Trending({ events }) {
  if (!events || events.length === 0) return null;
  const top = events.slice(0, 8);
  return (
    <div className="mt-6">
      <h3 className="text-xl font-semibold mb-3">Trending near you</h3>
      <div className="flex gap-4 overflow-x-auto py-2">
        {top.map((ev) => (
          <Link
            key={ev.id}
            to={`/events/${ev.id}`}
            className="min-w-[220px] bg-white rounded-lg shadow p-3 hover:scale-[1.02] transition-transform"
          >
            <div className="h-32 rounded-md overflow-hidden mb-2">
              <img
                src={ev.img || "/images/placeholder.jpg"}
                alt={ev.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-sm font-semibold">{ev.title}</div>
            <div className="text-xs text-gray-500">
              {ev.city} • {new Date(ev.date).toLocaleDateString()}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
