# UniTab

---

## **Features**

- **Google OAuth 2.0 Authentication**
  - Secure user login with Google.
- **Real-Time Session Management**
  - Detect and handle simultaneous application usage across multiple tabs and browsers.
- **Conflict Resolution**
  - Notify users of session conflicts with options to cancel or log out from other sessions.
- **Activity Logs**
  - Maintain audit logs for user activities, such as login, app selection, and session handling.
- **Dynamic Application Dashboard**
  - Display and filter applications with a responsive UI.

---

## **Tech Stack**

### **Frontend**
- React.js
- Material-UI (MUI) for modern and responsive design
- Axios for API communication
- Socket.IO Client for real-time updates

### **Backend**
- Node.js with Express.js
- MongoDB with Mongoose
- Google Auth Library for OAuth
- Socket.IO for WebSocket communication

---

## **Installation Guide**

### **1. Prerequisites**

- Node.js v20+ installed on your machine.
- MongoDB server running locally or a connection string for a cloud instance (e.g., MongoDB Atlas).
- A Google Cloud project with OAuth 2.0 credentials configured (Client ID and Client Secret).
- Git for version control.

---

### **2. Backend Installation**

1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd UniTab/server
   ```

2. **Install Dependencies**:
  ```bash
  npm install
  ```
3. **Copy .env.example file to .env and modify the placeholder values accordingly**
4. **Seed the application details via below command**
   ```bash
   npm run seed:applications
   ```
5. **For build the server, run the below script**
   ```bash
   npm run build
   ```
6. **To run the server, run the below script**
   ```bash
   npm start
   ```

### **3. Frontend Installation**

1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd UniTab/client
   ```

2. **Install Dependencies**:
  ```bash
  npm install
  ```
3. **Copy .env.example file to .env and modify the placeholder values accordingly**
6. **To run the server, run the below script**
   ```bash
   npm start
   ```
