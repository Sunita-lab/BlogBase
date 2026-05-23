# BlogBase 📝

A full-stack blog management application built as **Task 1** of the MERN Stack Internship at **Xyzon Innovations**.

## 🌐 Live Demo

[https://blog-base-taupe.vercel.app](https://blog-base-taupe.vercel.app)

## ✨ Features

- **Create** — Write and publish new blog posts
- **Read** — Browse all blogs or view a single post in detail
- **Update** — Edit existing blog content, tags, and status
- **Delete** — Remove blogs with confirmation prompt
- Draft / Published status for each blog
- Tag support for categorization
- Splash screen with loading animation
- Skeleton loading for better UX
- Fully responsive and modern UI

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React, Vite, React Router DOM, Axios |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas (via Mongoose) |
| Deployment | Vercel (frontend), Render (backend) |

## 📁 Project Structure

```
BlogBase/
├── client/                  # React frontend
│   └── src/
│       ├── pages/
│       │   ├── Splash.jsx       # Splash screen
│       │   ├── BlogList.jsx     # All blogs
│       │   ├── BlogDetail.jsx   # Single blog view
│       │   └── BlogForm.jsx     # Create & Edit form
│       ├── components/
│       │   └── SkeletonCard.jsx # Loading skeleton
│       ├── api.js               # Axios instance
│       └── App.jsx              # Routes
└── server/                  # Node + Express backend
    ├── models/
    │   └── Blog.js              # Mongoose schema
    ├── routes/
    │   └── blogRoutes.js        # CRUD API routes
    ├── .env                     # Environment variables (not committed)
    └── index.js                 # Entry point
```

## 🚀 Getting Started Locally

### Prerequisites
- Node.js installed
- MongoDB Atlas account

### 1. Clone the repository
```bash
git clone https://github.com/Sunita-lab/BlogBase.git
cd BlogBase
```

### 2. Backend setup
```bash
cd server
npm install
```

Create a `.env` file in `server/`:
```
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
```

```bash
npm run dev
```

### 3. Frontend setup
```bash
cd ../client
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## 📡 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/blogs` | Get all blogs |
| GET | `/api/blogs/:id` | Get single blog |
| POST | `/api/blogs` | Create new blog |
| PUT | `/api/blogs/:id` | Update blog |
| DELETE | `/api/blogs/:id` | Delete blog |

## 🔗 Deployment

- **Frontend** deployed on [Vercel](https://vercel.com)
- **Backend** deployed on [Render](https://render.com)
- **Database** hosted on [MongoDB Atlas](https://mongodb.com/atlas)

---

Built with ❤️ during MERN Stack Internship at **Xyzon Innovations**

