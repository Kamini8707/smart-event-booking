// src/pages/EventDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { eventsAPI } from "../api/api";

export default function EventDetails() {
  const { id } = useParams();
  const [ev, setEv] = useState(null);

  useEffect(() => {
    let mounted = true;
    eventsAPI
      .details(id)
      .then((d) => mounted && setEv(d))
      .catch((e) => {
        console.error(e);
        if (mounted) setEv(null);
      });
    return () => (mounted = false);
  }, [id]);

  if (!ev) return <div className="py-20 text-center">Loading...</div>;

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="max-w-4xl mx-auto text-center">
        <img
          src={`/images/${ev.img || "placeholder.jpg"}`}
          alt={ev.title}
          className="mx-auto h-48 object-cover rounded-lg"
          onError={(e) => (e.target.src = "/images/placeholder.jpg")}
        />
        <h1 className="text-4xl font-bold mt-6">{ev.title}</h1>
        <p className="mt-3 text-gray-600">{ev.description}</p>

        <div className="mt-8">
          <div className="text-lg">
            Location: <strong>{ev.location}</strong>
          </div>
          <div className="mt-2 text-lg">
            Date: <strong>{new Date(ev.date).toLocaleString()}</strong>
          </div>
          <div className="mt-4 text-2xl font-bold">Price: ₹{ev.price}</div>
          <div className="mt-2 text-sm text-gray-600">
            Available seats: {ev.available_seats}
          </div>

          <div className="mt-8 flex justify-center gap-4">
            <Link
              to={`/checkout/${ev.id}`}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg shadow"
            >
              Book Now
            </Link>
            <Link
              to="/events"
              className="text-gray-600 px-4 py-3 rounded-lg border"
            >
              Back
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
