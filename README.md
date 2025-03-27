# Proxi: Connecting Local Experts with Ease

## 📚 Overview
Proxi is a platform that seamlessly connects users with local experts for various services. It bridges the gap between service seekers and skilled professionals by enabling location-based matching, verified profiles, and smooth communication.

## 🚀 Features Implemented
- **Role-Based Access Control:**  
   - Users can post service requests and browse or connect with experts.
   - Providers receive notifications and can respond with offers or accept requests.
- **Real-Time Matching:**  
   - Location-based service matching using OpenStreetMap API.
- **Verified Profiles & Reviews:**  
   - Ensures trust with profile verification and user reviews.
- **Secure Payment Gateway:**  
   - Payments handled via Stripe.
- **Notification System:**  
   - Real-time notifications for new service requests.

## 🛠️ Technology Stack
- **Frontend:** React.js, Material UI (MUI)
- **Backend:** Node.js with Express
- **Database:** MongoDB
- **Geolocation API:** OpenStreetMap API for location-based matching
- **Authentication:** Firebase Authentication
- **Payment Gateway:** Stripe

## 📡 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/ROHIT-J0SHI/Proxi.git
````

### 2. Setup Frontend
```bash
Copy
Edit
cd frontend
npm install
npm run dev
```
### 3. Setup Backend
``` bash
Copy
Edit
cd ../backend
npm install
npm start
```
🔐 Environment Variables
Create a .env file in the backend directory with the following keys:
```bash 
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
FIREBASE_ADMIN_SDK=config/firebase-admin-sdk.json
```

## 📍 How Geolocation Works
OpenStreetMap API fetches the latitude and longitude of the user’s city to match services and experts in the vicinity.

This enables real-time and accurate service matching.


## 📧 Contact
For queries or feedback, please contact rohitjoshii55555@gmail.com.


