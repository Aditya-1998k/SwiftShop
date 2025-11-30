## 🚀 **SwiftShop — Modern Full-Stack E-Commerce Platform**  
### **Django REST Framework · React.js (Vite) · Celery · RabbitMQ**

SwiftShop is a modern, scalable, and fully decoupled e-commerce platform built for both learning and production-ready architecture.  
It features a powerful Django backend, a clean React frontend, async processing using Celery, and automatic PDF invoice & receipt generation.

---

## 🌟 **Key Features**

### 👤 **User Features**
- User Registration & Login (JWT Authentication)
- Automatic **Welcome Email** (Django Signals + Celery)
- Profile management (username, email)
- Address book (add/edit/delete addresses)
- Add to Cart / Remove from Cart
- Buy Now flow
- Checkout & Payment
- Order History
- **Order Tracking Timeline**
- Product Reviews & Ratings
- Email notifications:
  - **Invoice PDF** after order creation
  - **Payment Receipt PDF** after successful payment

---

## 🛍️ **E-Commerce Features**
- Product listing with price, brand, description
- Product detail page with:
  - Primary image  
  - Additional images  
  - Reviews  
  - Ratings  
- Categories & filtering  
- Fully responsive modern UI  
- Persistent cart (LocalStorage)  
- Clean & minimal “Add to Cart” + “Buy Now” buttons  

---

## ⚙️ **Backend — Django REST Framework (DRF)**

### Implemented Features:
- JWT Auth (Access + Refresh tokens)
- Modular Django apps:
  - `users`
  - `product`
  - `orders`
  - `cart`
  - `payments`
- DRF serializers & viewsets
- Pagination, filtering, search
- Order creation with multiple order items
- **Signal-based events**:
  - Welcome email
  - Order invoice
  - Payment receipt
- Background tasks using Celery + RabbitMQ
- PDF generation using ReportLab (Unicode supported)

---

## 🎨 **Frontend — React + Vite + TailwindCSS**

### Highlights:
- Fully responsive component-based UI  
- Smooth navigation using React Router v6  
- Axios-based API layer  
- Global Cart state using Context API  
- Product details page:
  - Star ratings  
  - Review list  
  - Modern layout  
- Order details page:
  - Shipping address  
  - Items summary  
  - Invoice button  
- Order tracking page:
  - Horizontal / minimal / modern timeline  

---

## 🌀 **Asynchronous Processing — Celery + RabbitMQ**

### Background Tasks:
- Send Welcome Email on signup  
- Generate & send Invoice PDF  
- Generate & send Payment Receipt PDF  
- Future support for:
  - Inventory sync  
  - Scheduled cleanup  
  - Recommendation engines  

Broker used → **RabbitMQ**  
Worker → **Celery Worker**

---

## 🗄️ **Database & Cache**
- Primary DB: **SQLite**  
- Message broker: **RabbitMQ**  
- Option for Redis as cache (future)

---

## 📁 Project Structure
```
SwiftShop/
│
├── backend/
│ ├── backend/ # Django settings & celery config
│ ├── users/ # Auth, welcome email
│ ├── product/ # Products, images, reviews
│ ├── orders/ # Orders, items, tracking, invoices
│ ├── payments/ # Payment model, payment receipts
│ ├── cart/ # Cart endpoints
│ ├── celery.py
│ └── manage.py
│
├── frontend/
│ ├── src/
│ ├── components/
│ ├── pages/
│ ├── context/
│ └── vite.config.js
│
└── README.md
```

## High Level Architecture
```
                                  ┌──────────────────────────┐
                                  │        Browser / User     │
                                  │ (React + Vite Frontend)   │
                                  └─────────────┬────────────┘
                                                │
                                                │ HTTP Requests (Axios)
                                                ▼
                         ┌────────────────────────────────────────────┐
                         │               Django Backend               │
                         │        (Django REST Framework API)         │
                         ├────────────────────────────────────────────┤
                         │  ✔ Product APIs                            │
                         │  ✔ Cart / Order APIs                       │
                         │  ✔ Payment APIs                            │
                         │  ✔ User Auth (JWT)                         │
                         │  ✔ Signals (Order/Payment Hooks)           │
                         └──────┬───────────────┬──────────────┬──────┘
                                │               │              │
                                │               │              │
                                │               │              │
                    JWT Auth    │     CORS      │     DB ORM   │
               (Access/Refresh) │ (React <->    │   (SQLite)   │
                                │  Backend)     │              │
                                ▼               ▼              ▼
      ┌──────────────────┐  ┌────────────────┐  ┌────────────────────┐
      │ django-simplejwt │  │  django-cors    │  │     SQLite DB      │
      │ (token signing)  │  │  (CORS headers) │  │ Orders, Products…   │
      └──────────────────┘  └────────────────┘  └────────────────────┘

                                │
                                │ Signals Trigger
                                ▼
                  ┌─────────────────────────────────┐
                  │        Django Signals            │
                  │  (post_save on Order/Payment)    │
                  └─────────────────┬────────────────┘
                                    │
                                    │ Push async job
                                    ▼
                      ┌─────────────────────────────┐
                      │        RabbitMQ Queue        │
                      │  (Message Broker for Celery) │
                      └──────────────┬──────────────┘
                                     │
                                     │ Celery Worker pulls job
                                     ▼
                   ┌────────────────────────────────────────┐
                   │               Celery Worker             │
                   │  ✔ Generate PDF Invoice                 │
                   │  ✔ Generate Payment Receipt             │
                   │  ✔ Send Emails (EmailMessage)           │
                   │  ✔ Background processing                │
                   └──────────────────────────┬─────────────┘
                                              │
                                              │ Email Delivery
                                              ▼
                               ┌────────────────────────────────┐
                               │         Email SMTP Server      │
                               │ (Gmail / Mailtrap / Custom)   │
                               └────────────────────────────────┘
```

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
celery -A backend worker --loglevel=info
```

### Start Celery Beat (Optional for scheduled tasks)
```bash
celery -A backend beat -l info
```

### For Debugging use shell
```bash
python manage.py shell
```

## Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
Run: http://localhost:5173


## 📦 **Email Features**

All emails in SwiftShop are sent asynchronously using **Celery workers**, ensuring the main Django server stays fast and responsive.

### **Sent via Celery**
- **Welcome Email** (plain text) — automatically sent when a new user registers  
- **Order Invoice (PDF)** — generated after order creation  
- **Payment Receipt (PDF)** — generated after successful online payment  

### **PDF Features**
- Unicode support (includes ₹ symbol)  
- Professionally formatted  
- Auto-generated with ReportLab  
- Includes:
  - Store name  
  - Customer details  
  - Order items  
  - Totals, discounts  
  - Payment details  

---

## 🚀 **Asynchronous Programming (Celery + RabbitMQ)**

SwiftShop uses **Celery** with **RabbitMQ** as the message broker to handle time-consuming tasks in the background.

### 🧠 **Why Asynchronous Tasks?**
Django request/response cycle should be fast.  
But tasks like:
- Sending emails  
- Generating PDFs  
- Processing payments  
- Running scheduled jobs  

…are expensive and slow.

Using Celery ensures these tasks run **outside the main thread**, keeping the application smooth.

### ⚙️ **How It Works**
1. Django triggers a task (e.g., `send_invoice_task.delay(order.id)`)
2. Task is sent to **RabbitMQ** (message broker queue)
3. **Celery Worker** continuously listens to the queue
4. Worker picks up the task and executes it in the background
5. Django immediately returns a response to the user (no waiting)

### 🧩 **What SwiftShop Runs Asynchronously**
- Welcome Email (Signal → Celery Task)
- Order Invoice PDF Generation
- Payment Receipt PDF Generation
- Future tasks:
  - Inventory sync
  - SMS notifications
  - Scheduled cleanup (Celery Beat)

### 🧵 **Celery Worker Command**
```bash
celery -A backend worker --loglevel=info
```


## 🐇 **RabbitMQ Broker**

RabbitMQ is used as the message broker for SwiftShop.  
It handles routing and queueing messages between Django and Celery, making background task execution reliable and fast.

- Acts as a buffer between Django and Celery  
- Guarantees message delivery  
- Ideal for email, PDF generation, and payment events  
- Battle-tested and highly performant  


---

## 📜 **Order Flow Summary**

1. **User creates account** → Welcome email sent (async)  
2. **User places an order** → Order saved in database  
3. **Signal triggers** → Celery sends invoice PDF  
4. **User completes online payment**  
5. **Payment saved** with transaction ID  
6. **Signal triggers** → Celery sends payment receipt PDF  
7. **User can track order progress** via tracking timeline  

---

## 🗺️ **Roadmap**

- Admin dashboard (React)  
- Razorpay / Stripe payment integration  
- Product inventory & stock management  
- Recommendation engine using RAG (AI-based)  
- Dockerization (Frontend + Backend + Worker + RabbitMQ)  
- CI/CD pipeline using Jenkins  
- VPS deployment guide (DigitalOcean / Hetzner)  
- SEO optimization (product pages)
- Review moderation & reporting system  

---

## 🤝 **Contributing**

We welcome:

- Pull requests  
- Feature suggestions  
- Bug reports  
- Documentation improvements  

Fork the project, submit your PR, and help SwiftShop grow!

---

## 📧 **Support**

If you have questions, suggestions, or feedback, feel free to contact:  
**aditya98gupta@gmail.com**

