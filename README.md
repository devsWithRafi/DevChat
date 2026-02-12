# 💬 DevChat

A modern, feature-rich real-time chat application built with the **PERN** stack

Live Demo: [Visit here](https://devchat-frontend-khaki.vercel.app/)

<div style='display:flex; flex-wrap:wrap; gap:10px'>
    <img src="https://i.ibb.co.com/pvmGwLYh/devchat-3.jpg" width="350" height="200"/>
    <img src="https://i.ibb.co.com/GvThykwh/devchat-2.jpg" width="350" height="200"/>
    <img src="https://i.ibb.co.com/xKK4Cskn/devchat-4.jpg" width="350" height="200"/>
    <img src="https://i.ibb.co.com/08xksby/devchat-1.jpg" width="350" height="200"/>
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
    "encryption": "BcryptJS",
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

#### Environment Variables:

```env
PORT=4000
JWT_SECRET="<your-secreet>"
CLIENT_URL="http://localhost:5173"

# cloudinary
CLOUDINARY_CLOUD_NAME="<your-cloud-name>"
CLOUDINARY_API_SECRET="<your-api-secreet>"
CLOUDINARY_API_KEY="your-api-key"

# Database Url
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

#### Environment Variables:

```env
VITE_SERVER_URL="http://localhost:4000"
```

```bash
# Start the development server
npm run dev
# or
pnpm dev
```

## Demo Accounts - You can use for test

```env
Email: rafi@gmail.com
Password: saiful999

Email: mamun@gmail.com
Password: mamun999

Email: sadia@gmail.com
Password: sadia999

Email: ashiq@gmail.com
Password: ashiq999

Email: monzil@gmail.com
Password: monzil999

Email: ayesha@gmail.com
Password: ayesha999
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
