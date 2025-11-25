# 🚀 SwiftShop  
### Full-Stack E-Commerce Application  
**Built with Django REST Framework · React.js · Celery · Redis · SQLite**

SwiftShop is a modern, API-driven e-commerce platform designed for speed, scalability, and clean architecture.  
It uses a fully decoupled stack where **Django REST Framework** powers the backend, **React** handles the frontend, and **Celery** manages background jobs.

---

## 🛠️ Tech Stack

### **Backend — Django REST Framework**
- JWT Authentication (access + refresh tokens)
- Modular Django apps (Users, Products, Orders, Payments)
- Class-based views & viewsets
- Pagination, filtering, search
- Role-based permissions
- Automatic API docs (Swagger / Redoc)

### **Frontend — React + TailwindCSS**
- React Router v6
- Fully responsive UI
- Global state with Context API / Redux
- API integration using Axios
- Product browsing, search, cart & checkout pages

### **Async Processing — Celery**
- Redis as Broker & Backend
- Background tasks:
  - Order confirmation emails  
  - Inventory updates  
  - Payment verification  
  - Periodic cleanup tasks via Celery Beat

### **Database & Cache**
- SQLite for relational data
- Redis for caching frequently hit endpoints

---

## 📁 Project Structure
```
SwiftShop/
│
├── backend/
│ ├── config/
│ ├── users/
│ ├── products/
│ ├── orders/
│ ├── payments/
│ ├── celery.py
│ └── requirements.txt
│
├── frontend/
│ ├── src/
│ ├── components/
│ ├── pages/
│ └── package.json
│
└── README.md
```

---

## 🔥 Features

### **Customer Features**
- User Registration & Login (JWT)
- Browse products with search & filters
- Cart & Wishlist management
- Address management
- Checkout & order tracking
- Email notifications

### **Admin Features**
- Product CRUD
- Order management
- Inventory updates
- User management dashboard (optional)

---

## ⚙️ Installation & Setup

### 📌 Clone the repository
```bash
git clone https://github.com/your-username/swiftshop.git
cd swiftshop

cd backend
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```
Visit: http://127.0.0.1:8000

## 🚀 Start Celery Worker

```bash
celery -A backend worker -l info
```

### Start Celery Beat (Optional for scheduled tasks)
```bash
celery -A backend beat -l info
```

## Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
Run: http://localhost:5173



