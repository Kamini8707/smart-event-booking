               ## 🎟️ Smart Event Booking System

A full-stack MERN-style project where users can browse events, filter by city, view event details, and book seats with instant QR-code confirmation.

#3 📸 Project Preview (Screenshots)

Replace these image paths with your actual screenshot filenames
(Place screenshots in a /screenshots folder)

#3 🚀 Live Features

- ✔ Browse events by city (Jhansi, Gwalior, Lucknow, Kanpur, Indore, Delhi, Agra, Gurgaon, Noida)
- ✔ Search events using keywords
- ✔ Detailed event page with image, description, date, and available seats
- ✔ Booking system—reserve seats with quantity selection
- ✔ Automatically generates QR code ticket after successful booking
- ✔ Admin dashboard (view events with edit/delete placeholders)
- ✔ Clean, responsive UI built using Tailwind + Framer Motion
- ✔ Dynamic backend API using Express + MySQL

🛠️ Tech Stack
### Frontend

- React (Vite)

- TailwindCSS

- React Router v6

- Framer Motion

- qrcode.react (for QR code)



### Backend

- Node.js (Express)

- MySQL2 (Promise pool)

- dotenv

- CORS

### Database

MySQL

### Tables:

- events

- bookings

  ## 📂 Project Structure

  ```pqsql
  smart-event-booking/
│```
```
├── frontend/
│   ├── public/
│   │   └── images/
│   ├── src/
│   │   ├── api/api.js
│   │   ├── components/
│   │   ├── pages/
│   │   ├── styles/
│   │   └── main.jsx
│   └── package.json
│
├── backend/
│   ├── routes/
│   │   └── events.js
│   │   └── bookings.js
│   ├── db.js
│   ├── server.js
│   └── package.json
│
└── README.md
```



## ⚙️ Installation & Setup
1️⃣ Clone the repository
``` bash
git clone https://github.com/your-username/smart-event-booking.git
cd smart-event-booking
```

2️⃣ Backend Setup

Install dependencies:
``` bash
cd backend
npm install
```

Create .env file:
```bash
DB_HOST=localhost
DB_USER=kamini
DB_PASS=Kamini@2003
DB_NAME=smart_event_booking
PORT=5000
```

Start backend:
```bash
npm run dev
```


Backend runs at:
``` bash
👉 http://localhost:5000
```

3️⃣ Frontend Setup
- Install dependencies:
``` bash
cd ../frontend
npm install
```

- Add .env:
``` bash
VITE_API_BASE=http://localhost:5000/api
```

- Start frontend:
``` bash
npm run dev
```


- Frontend runs at:
``` bash
👉 http://localhost:5173
```

### 🗄️ MySQL Database Setup

Create database:
``` sql
CREATE DATABASE smart_event_booking;
```

Create events table:
```sql
CREATE TABLE events (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255),
  description TEXT,
  location VARCHAR(255),
  city VARCHAR(100),
  category VARCHAR(100),
  date DATETIME,
  total_seats INT,
  available_seats INT,
  price DECIMAL(10,2),
  img VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

Create bookings table:
```sql
CREATE TABLE bookings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  event_id INT,
  quantity INT,
  booking_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (event_id) REFERENCES events(id)
);

```

### 📡 API Endpoints
GET /api/events

Fetch all events
Response:
```json
[
  { "id": 1, "title": "Jhansi Music Night", "city": "Jhansi", ... }
]
```

GET /api/events/:id

Fetch a single event

POST /api/bookings

Create a booking
Payload:
```json
{
  "event_id": 1,
  "quantity": 2
}
```


Response:
```json
{ "success": true, "bookingId": 15 }
```

### 🧪 Testing the Project

- Visit /events → list all events

- Click event → detailed page

- Click "Book Now" → checkout

- Confirm → QR code ticket appears



### 🔮 Future Enhancements

- User authentication (JWT)

- Payment gateway integration (Razorpay / Stripe)

- Admin CRUD for events

- Email/SMS ticket delivery

### ❤️ Author

Kamini Prajapati
Event Booking MERN Application — 2025
