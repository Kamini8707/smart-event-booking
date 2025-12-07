// src/pages/Landing.jsx
import React, { useEffect, useState } from "react";
import { eventsAPI } from "../api/api";
import EventCard from "../components/EventCard";

const CITIES = [
  "All",
  "Jhansi",
  "Gwalior",
  "Lucknow",
  "Kanpur",
  "Indore",
  "Delhi",
  "Agra",
  "Gurgaon",
  "Noida",
];

export default function Landing() {
  const [city, setCity] = useState("All");
  const [q, setQ] = useState("");
  const [events, setEvents] = useState([]);
  const [featured, setFeatured] = useState([]);

  async function loadEvents(cityFilter = "All", query = "") {
    try {
      const res = await eventsAPI.list({
        city: cityFilter === "All" ? undefined : cityFilter,
        q: query,
        limit: 50,
      });
      setEvents(res || []);
    } catch (e) {
      console.error(e);
      setEvents([]);
    }
  }

  async function loadFeatured() {
    try {
      const all = await eventsAPI.list({ limit: 50 });
      setFeatured((all || []).slice(0, 3));
    } catch (e) {
      setFeatured([]);
    }
  }

  useEffect(() => {
    loadEvents(city, q);
    loadFeatured();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [city]);

  async function onSearch(e) {
    e?.preventDefault();
    await loadEvents(city, q);
  }

  return (
    <div>
      {/* HERO */}
      <section className="w-full relative">
        <div
          className="w-full h-[58vh] bg-cover bg-center relative"
          style={{ backgroundImage: "url('/images/hero.jpg')" }}
        />
        <div className="absolute inset-0 hero-overlay flex items-center justify-center">
          <div className="text-center max-w-4xl px-6">
            <h1 className="text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg">
              Smart Event Booking
            </h1>
            <p className="mt-4 text-lg md:text-xl text-white/90">
              Discover curated events near you — music, talks, workshops and
              experiences handpicked for your city.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <a
                href="/events"
                className="px-6 py-3 rounded-md bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg"
              >
                Explore Events
              </a>
              <button
                onClick={() =>
                  window.scrollTo({
                    top: document.body.clientHeight / 3,
                    behavior: "smooth",
                  })
                }
                className="px-5 py-3 border rounded-md text-white/90 border-white/30"
              >
                See Featured
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Browse by city */}
      <section className="max-w-6xl mx-auto px-6 py-10">
        <h2 className="text-3xl font-bold mb-4">Browse by city</h2>
        <div className="flex gap-3 flex-wrap">
          {CITIES.map((c) => (
            <button
              key={c}
              onClick={() => setCity(c)}
              className={`city-chip px-4 py-2 rounded-full ${
                city === c
                  ? "bg-indigo-600 text-white shadow-md"
                  : "bg-white border"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Explore events + search */}
        <div className="mt-12">
          <form onSubmit={onSearch} className="flex gap-4 items-center mb-6">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search events"
              className="flex-1 border p-3 rounded shadow-sm"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded"
            >
              Search
            </button>
          </form>

          {events.length === 0 ? (
            <div className="py-16 text-center text-gray-500">
              No events found.
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              {events.map((ev) => (
                <EventCard key={ev.id} event={ev} />
              ))}
            </div>
          )}
        </div>

        {/* Featured */}
        <div className="mt-10">
          <h3 className="text-2xl font-semibold mb-4">Featured Events</h3>
          <div className="horizontal-scroll -mx-2 py-2">
            <div className="flex gap-6 px-2">
              {featured.map((ev) => (
                <div
                  key={ev.id}
                  className="horizontal-item w-[300px] card-ghost p-4"
                >
                  <img
                    src={`/images/${ev.img || "placeholder.jpg"}`}
                    alt={ev.title}
                    className="w-full h-40 object-cover rounded-md mb-3"
                    onError={(e) => (e.target.src = "/images/placeholder.jpg")}
                  />
                  <h4 className="font-semibold text-lg">{ev.title}</h4>
                  <div className="text-sm text-gray-600">{ev.location}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
