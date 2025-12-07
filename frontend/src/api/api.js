// frontend/src/api/api.js
const BASE = import.meta.env.VITE_API_BASE || "/api";

const jsonOrThrow = async (res) => {
  if (!res.ok) {
    const text = await res.text();
    // try json parse
    try {
      const parsed = JSON.parse(text);
      throw new Error(parsed.error || JSON.stringify(parsed));
    } catch {
      throw new Error(text || `HTTP ${res.status}`);
    }
  }
  return res.json();
};

export const eventsAPI = {
  async list(params = {}) {
    const paramsArr = [];
    if (params.q) paramsArr.push(`q=${encodeURIComponent(params.q)}`);
    if (params.city) paramsArr.push(`city=${encodeURIComponent(params.city)}`);
    if (params.limit)
      paramsArr.push(`limit=${encodeURIComponent(params.limit)}`);
    const query = paramsArr.length ? `?${paramsArr.join("&")}` : "";
    const res = await fetch(`${BASE}/events${query}`);
    // if backend returns array directly:
    return jsonOrThrow(res);
  },

  async get(id) {
    const res = await fetch(`${BASE}/events/${id}`);
    return jsonOrThrow(res);
  },

  async details(id) {
    return this.get(id);
  },
};

export const bookingsAPI = {
  async create(payload) {
    const res = await fetch(`${BASE}/bookings`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return jsonOrThrow(res); // returns { bookingId }
  },

  async list() {
    const res = await fetch(`${BASE}/bookings`);
    return jsonOrThrow(res);
  },
};
