// src/pages/Checkout.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { eventsAPI, bookingsAPI } from "../api/api";

export default function Checkout() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const ev = await eventsAPI.get(id);
        if (mounted) setEvent(ev);
      } catch (err) {
        console.error("failed to load event", err);
      }
    })();
    return () => (mounted = false);
  }, [id]);

  if (!event) return <div className="py-20 text-center">Loading...</div>;

  const handlePay = async () => {
    setLoading(true);
    try {
      // bookingsAPI.create now returns parsed JSON (see api.js)
      const data = await bookingsAPI.create({
        event_id: id,
        quantity: Number(qty),
      });

      // your backend should return something like { bookingId: 123 } or full booking
      const bookingId = data?.bookingId || data?.id || data?.booking?.id;
      if (bookingId) {
        navigate(`/success/${bookingId}`);
      } else {
        // fallback: show success page with returned object id or raw
        navigate(`/success/${encodeURIComponent(JSON.stringify(data))}`);
      }
    } catch (err) {
      console.error("booking failed", err);
      alert("Booking failed: " + (err.message || "Unknown error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h2 className="text-3xl font-bold mb-4">{event.title}</h2>
      <p className="mb-2">Price: ₹{event.price}</p>

      <label className="mr-2">Quantity:</label>
      <input
        type="number"
        min="1"
        value={qty}
        onChange={(e) => setQty(e.target.value)}
        className="border p-2 rounded w-20"
      />

      <button
        onClick={handlePay}
        disabled={loading}
        className="mt-6 bg-blue-600 text-white px-4 py-2 rounded"
      >
        {loading ? "Processing..." : "Confirm & Pay"}
      </button>
    </div>
  );
}
