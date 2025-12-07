// src/pages/Events.jsx
import React, { useEffect, useState } from "react";
import { eventsAPI } from "../api/api";
import EventCard from "../components/EventCard";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [q, setQ] = useState("");
  const [city, setCity] = useState("");

  const load = async (query = q, cityFilter = city) => {
    try {
      const arr = await eventsAPI.list({ q: query, city: cityFilter });
      setEvents(arr || []);
    } catch (e) {
      console.error("events list error", e);
      setEvents([]);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = async () => {
    await load();
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex gap-2 mb-6">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className="border p-2 rounded flex-1"
          placeholder="Search events"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Search
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {events.map((ev) => (
          <EventCard key={ev.id} event={ev} />
        ))}
      </div>
    </div>
  );
}
