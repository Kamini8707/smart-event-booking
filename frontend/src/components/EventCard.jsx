// src/components/EventCard.jsx
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function EventCard({ event }) {
  const date = new Date(event.date);

  return (
    <motion.div
      whileHover={{ translateY: -6, scale: 1.01 }}
      className="card-ghost rounded-lg overflow-hidden"
    >
      <Link to={`/events/${event.id}`}>
        <div className="w-full h-44 bg-gray-200">
          <img
            src={`/images/${event.img || "placeholder.jpg"}`}
            alt={event.title}
            className="w-full h-full object-cover"
            onError={(e) => (e.target.src = "/images/placeholder.jpg")}
          />
        </div>
      </Link>

      <div className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold">{event.title}</h3>
            <div className="text-sm text-gray-600 mt-1">
              {event.location} • {date.toLocaleDateString()}
            </div>
          </div>
          <div>
            <Link
              to={`/events/${event.id}`}
              className="inline-block bg-blue-600 text-white px-3 py-2 rounded-md shadow-sm"
            >
              Details
            </Link>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div>
            <div className="font-bold">₹{Number(event.price).toFixed(2)}</div>
            <div className="text-sm text-gray-500">
              {event.available_seats} seats left
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
