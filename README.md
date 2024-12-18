# UniTab

UniTab is a robust platform designed to prevent simultaneous application access across multiple tabs and browsers. It features real-time session management, user authentication via Google OAuth 2.0, and seamless user experience. The project consists of a **frontend** (React) and a **backend** (Node.js, Express, and Socket.IO) for real-time communication.

---
## **Database Design**
Below is the database design for UniTab:

<img width="812" alt="image" src="https://github.com/user-attachments/assets/eb64e564-8eba-4ef2-a60a-52604821da90" />

You can view the interactive database diagram [here](https://dbdiagram.io/d/67598ca146c15ed4790b8918)
---

---
## **UI**

### **Login Page**

<img width="805" alt="image" src="https://github.com/user-attachments/assets/8cf9215a-ff98-4e6f-a0aa-f60ec3554561">


### **Home / Dashboard Page**

<img width="1241" alt="image" src="https://github.com/user-attachments/assets/7d678dc7-a909-4bb4-b381-0814fc5179b6">


### **Search Filter (on application name)**


<img width="1228" alt="image" src="https://github.com/user-attachments/assets/82049165-5fd2-4aed-98b7-6115ce10c201">

<img width="1202" alt="image" src="https://github.com/user-attachments/assets/50213c6c-e6d6-46df-8739-2cac871353e6">


### **Multiple Tab Detection**


<img width="1339" alt="image" src="https://github.com/user-attachments/assets/2c20ae28-7488-46e6-852a-bc7043b38ee1">

<img width="1295" alt="image" src="https://github.com/user-attachments/assets/c87c1d17-6dbd-483f-ba80-5eb2f143ad8a" />



### **Upon selecting the `Cancel` option (User is redirected to the home screen on the second tab)**


<img width="1470" alt="image" src="https://github.com/user-attachments/assets/eb3571f3-8e6b-481c-80bf-e613fc0474e8">
  

### **Upon selecting `Logout of all the other tabs` (User is redirected to the home screen on the first tab)**


<img width="1478" alt="image" src="https://github.com/user-attachments/assets/e3960620-f025-433f-996d-28403dd48e91">

### **Audit Logs for the activities**

<img width="1131" alt="image" src="https://github.com/user-attachments/assets/d42623b6-6365-423e-9365-97c5770acadf" />


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
- Node.js with Express.js + TypeScript
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
   git clone https://github.com/Shivam-Samant/UniTab.git
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
   git clone https://github.com/Shivam-Samant/UniTab.git
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
