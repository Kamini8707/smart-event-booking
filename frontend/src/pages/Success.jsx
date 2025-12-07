// frontend/src/pages/Success.jsx
import React from "react";
import { useParams, Link } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react"; // named export

export default function Success() {
  const { bookingId } = useParams();

  if (!bookingId)
    return <div className="p-12 text-center">Missing booking id.</div>;

  return (
    <div className="p-12 text-center">
      <h2 className="text-3xl font-bold">Booking Confirmed!</h2>
      <p className="mt-4">Booking ID: {bookingId}</p>

      <div className="mx-auto mt-6 w-48">
        <QRCodeCanvas value={`booking:${bookingId}`} size={200} />
      </div>

      <p className="mt-6">Download the QR code and present it at the event.</p>

      <div className="mt-6">
        <Link to="/events" className="text-blue-600">
          Back to events
        </Link>
      </div>
    </div>
  );
}
