# 🌐 Quiz App Frontend

A responsive, single-page quiz application frontend built using **React**, **Vite**, and **Tailwind CSS**, with token-based authentication and protected API access via Axios interceptors.

---

## ✨ Features

* 🔐 JWT Authentication with token handling via Axios interceptor
* 📆 Modular component architecture
* 📝 Create, display, and edit questions and options
* 🌈 Toast notifications
* ⚙️ REST API integration

---

## 📆 Tech Stack

* **React (Vite)**
* **TypeScript**
* **Tailwind CSS**
* **Axios**
* **React Context / useState (for auth + global state)**

---

## 🚀 Getting Started

### 📁 Clone the repo

```bash
git clone https://github.com/DevSharma06/callisto.git
cd callisto
```

### 📦 Install dependencies

```bash
npm install
```

### ▶️ Run the app

```bash
npm run dev
```

> App runs on [http://localhost:5173](http://localhost:5173)

---

## 🔐 Authentication Flow

* Login form sends credentials to `/api/auth/signin`
* JWT is stored in `localStorage`
* Axios interceptor attaches `Authorization: Bearer <token>` to every request
* If token is expired, user is logged out and redirected to login view

---

## ⚙️ Axios Setup

```ts
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

---

## 📁 Folder Structure

```
src/
├── components/       # Reusable components (inputs, toast, loader, etc.)
├── pages/            # Page-level components (Login, Dashboard, etc.)
├── services/         # API integration via Axios
├── context/          # Auth context or global state (if any)
├── App.tsx
└── main.tsx
```

---

## ✅ Available Scripts

| Command           | Description              |
| ----------------- | ------------------------ |
| `npm run dev`     | Start development server |
| `npm run build`   | Build for production     |
| `npm run preview` | Preview production build |

---

## 📄 Environment Variables

Create a `.env` file in the root:

```bash
VITE_API_URL=http://localhost:8080/api
```

---

## 🧪 Troubleshooting

* **CORS Issues?** Make sure the backend allows requests from `http://localhost:5173`
* **Token not set?** Verify `localStorage.getItem("token")` is returning a value
* **Axios errors?** Check browser console and Network tab for failed requests

---

## 🙋‍♂️ Author

Developed by Devender Sharma
