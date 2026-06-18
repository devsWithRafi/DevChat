# 💬 DevChat

A modern, feature-rich real-time chat application built with the **PERN** stack

Live Demo: [Visit here](https://dev-chat-three-theta.vercel.app)

<div style='display:flex; flex-wrap:wrap; gap:10px'>
    <img src="https://i.ibb.co.com/1twM9PDT/download.png" width="350" height="200"/>
    <img src="https://i.ibb.co.com/kg72fRRZ/New-Project.jpg" width="350" height="200"/>
    <img src="https://i.ibb.co.com/JwrPMVzd/Whats-App-Image-2026-06-18-at-8-36-39-PM.jpg" width="350" height="200"/>
    <img src="https://i.ibb.co.com/nN5f7vQZ/Whats-App-Image-2026-06-18-at-8-46-47-PM.jpg" width="350" height="200"/>
</div>

## 🌟 Features

### 💬 Real-Time Messaging

- **Instant Communication:** Lightning-fast message delivery using WebSocket technology
- **Message Persistence:** All messages stored securely in PostgreSQL database
- **Online/Offline Indicators:** Real-time status updates for all users

### 👥 Group Chat Functionality

- **Create Custom Groups:** Build communities around your interests
- **Group Management:** Edit group information, add/remove members
- **Join Requests:** User can join any group
- **Multi-User Conversations:** Seamless group messaging with multiple participants

### 📸 Rich Media Support

- **Image Sharing:** Send and receive images in conversations
- **Cloud Storage:** Efficient media handling with Cloudinary integration

### 👤 User Profiles

- **Profile Customization:** Edit personal information and profile pictures
- **Avatar Management:** Upload and update profile images

### 🎨 Modern UI/UX

- **Skeleton Loading:** Smooth loading states with skeleton screens
- **Responsive Design:** Seamless experience across all devices
- **Dark Theme:** Eye-friendly dark mode interface

## 🛠️ Tech Stack

### Frontend

```json
{
    "framework": "React 19",
    "language": "TypeScript",
    "styling": "Tailwind CSS",
    "stateManagement": "Redux Toolkit",
    "httpClient": "Axios",
    "realtime": "Socket.IO Client",
    "uiComponents": "shadcn/heroui"
    "authentication": "Clerk auth",
}
```

#### Key Dependencies:

<table>
    <tr>
      <td><strong>React</strong></td>
      <td>Modern component-based UI library</td>
    </tr>
    <tr>
      <td><strong>TypeScript</strong></td>
      <td>Type-safe development for robust code</td>
    </tr>
    <tr>
      <td><strong>Tailwind CSS</strong></td>
      <td>Utility-first CSS framework for rapid UI development</td>
    </tr>
    <tr>
      <td><strong>Redux Toolkit</strong></td>
      <td>Simplified state management with minimal boilerplate</td>
    </tr>
    <tr>
      <td><strong>Socket.IO Client</strong></td>
      <td>Real-time bidirectional event-based communication</td>
    </tr>
    <tr>
      <td><strong>Clerk Auth</strong></td>
      <td>User management and authentications</td>
    </tr>
</table>

### Backend

```json
{
    "runtime": "Node.js",
    "framework": "Express.js",
    "database": "PostgreSQL",
    "orm": "Prisma",
    "realtime": "Socket.IO",
    "authentication": "JWT",
    "authentication": "Clerk auth",
    "fileUpload": "Multer",
    "cloudStorage": "Cloudinary"
}
```

#### Key Dependencies:

<table>
    <tr>
      <td><strong>Express.js</strong></td>
      <td>Fast, minimalist web framework</td>
    </tr>
    <tr>
      <td><strong>Prisma ORM</strong></td>
      <td>Next-generation TypeScript ORM for PostgreSQL</td>
    </tr>
    <tr>
      <td><strong>Socket.IO</strong></td>
      <td>Real-time engine for WebSocket communication</td>
    </tr>
    <tr>
      <td><strong>JWT</strong></td>
      <td>Secure token-based authentication</td>
    </tr>
    <tr>
      <td><strong>BcryptJS</strong></td>
      <td>Password hashing and encryption</td>
    </tr>
    <tr>
      <td><strong>Multer</strong></td>
      <td>Multipart/form-data handling for file uploads</td>
    </tr>
    <tr>
      <td><strong>Cloudinary</strong></td>
      <td>Cloud-based media management and delivery</td>
    </tr>
    <tr>
      <td><strong>Clerk Auth</strong></td>
      <td>User management and authentications</td>
    </tr>
</table>

## 🚀 Installation

### Prerequisites

- Node.js (v24 LTS)
- PostgreSQL (v17 - latest)
- `npm` or `pnpm` package manager
- Cloudinary account (for image uploads)

#### Step-1: Clone the Repository

```bash
git clone https://github.com/devsWithRafi/DevChat.git
```

#### Step-2: Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file
cp .env

# Configure environment variables
# Edit .env with your credentials
```

#### Backend Environment Variables:

```env
PORT=4000
CLIENT_URL="http://localhost:5173"

# cloudinary
CLOUDINARY_CLOUD_NAME=<your-cloudinary-cloud-name>
CLOUDINARY_API_SECRET=<your-cloudinary-api-secret>
CLOUDINARY_API_KEY=<your-cloudinary-api-key>

# clerk (auth)
CLERK_PUBLISHABLE_KEY=<Your-clerk-publish-key>
CLERK_SECRET_KEY=<Your-clerk-secret-key>
CLERK_WEBHOOK_KEY=<Your-clerk-webhook-key>

# Database URL
DATABASE_URL="postgresql://<username>:<password>@localhost:5432/<database-name>"
```

```bash
# Run Prisma migrations
npx prisma migrate dev --init <name>
npx prisma generate

# Start the backend server
npm run dev
```

#### Step-3: Frontend Setup

```bash
# Navigate to frontend directory (from root)
cd ..
cd frontend

# Install dependencies
npm install
# or
pnpm install

# Create .env file
cp .env

# Configure environment variables
# Edit .env with your backend URL
```

#### Frontend Environment Variables:

```env
VITE_SERVER_URL="http://localhost:4000"

# clerk (auth)
CLERK_PUBLISHABLE_KEY=<Your-clerk-publish-key>
CLERK_SECRET_KEY=<Your-clerk-secret-key>
CLERK_SIGN_IN_URL=/sign-in
CLERK_SIGN_UP_URL=/sign-up
```

```bash
# Start the development server
npm run dev
# or
pnpm dev
```


## 👨‍💻 Author

### **Saiful Islam Rafi**

- **GitHub**: [@devsWithRafi](https://github.com/devsWithRafi)
- **LinkedIn**: https://www.linkedin.com/in/md-saiful-islam-rafi
- **Email**: [devsaifulislamrafi@gmail.com](mailto:devsaifulislamrafi@gmail.com)
- **Portfolio**: https://saiful-islam-rafi-resume.vercel.app/

---

<p align="center">
⭐ If you find this project helpful, please consider giving it a star! <br>
Made with ❤️ and ☕
</p>

---