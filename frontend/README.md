# 🛍️ SwiftShop Frontend  
### **React.js (Vite) · TailwindCSS · Axios · React Router · Context API**

SwiftShop Frontend is a modern, fast, and fully responsive e-commerce UI built using **React + Vite**.  
It communicates with the Django REST API to deliver a smooth shopping experience — from browsing products to placing orders and tracking them.

---

## 🚀 Features (Frontend)

### 👤 **User Experience**
- User registration & login (JWT saved in localStorage)
- Responsive navigation bar + protected routes
- Auto redirect based on user authentication
- Modern, clean UI across all pages

### 🛒 **E-Commerce Functionality**
- Product Listing Page
- Product Details Page with:
  - Primary & fallback product image
  - Ratings + Reviews section
  - Add to Cart button
  - Buy Now button
- Shopping Cart:
  - Add, remove, update quantity
  - Cart stored in localStorage
- Checkout flow
- Order Details Page with:
  - Address details
  - Items breakdown
  - Payment summary
  - Track Order button
- **Order Tracking Page** (modern horizontal/vertical timeline)

### ✉️ **Email & Payment Interactions**
- Invoice button → triggers backend Celery PDF email
- Payment → triggers receipt email
- Payment success / failure UI states

### 📱 **Fully Responsive Design**
- Mobile-first responsive approach
- Tailwind utility classes
- Smooth layout on all devices

---

## 🧰 Tech Stack (Frontend)

### **⚡ React (with Vite)**
Why?
- Extremely fast hot reload  
- Small builds  
- Minimal config  
- Perfect for modern SPAs  

### **🎨 TailwindCSS**
Why?
- Utility-first styling → faster development  
- Consistent spacing, colors, typography  
- Mobile responsiveness built-in  
- Perfect for modern UI design  

### **🔀 React Router v6**
Why?
- Clean route definitions  
- Nested routes support  
- Simpler redirects & params  
- Great for SPAs with multiple pages  

### **📦 Axios**
Why?
- Cleaner API requests than fetch  
- Auto-attach JWT tokens (interceptors)  
- Global error handling  
- Lightweight and reliable  

### **🧠 React Context API**
Used for:
- Cart management  
- Authentication state (optional)  

Why?
- No heavy library like Redux needed  
- Simple, clean, minimal global state  
- Persistent cart using localStorage  

### **🖼️ React Icons**
Why?
- Minimal, beautiful icons  
- Zero config  

---

## 📂 Project Structure
```
frontend/
│
├── src/
│ ├── components/
│ │ ├── Navbar/
│ │ ├── Footer/
│ │ ├── ProductCard.jsx
│ │ ├── AddToCartButton.jsx
│ │
│ ├── pages/
│ │ ├── Home.jsx
│ │ ├── Products.jsx
│ │ ├── ProductItem.jsx
│ │ ├── Cart.jsx
│ │ ├── Checkout.jsx
│ │ ├── Orders.jsx
│ │ ├── OrderDetails.jsx
│ │ ├── TrackOrder.jsx
│ │ ├── Login.jsx
│ │ └── Register.jsx
│ │
│ ├── context/
│ │ ├── CartContext.jsx
│ │
│ ├── utils/
│ │ ├── axios.js
│ │
│ ├── App.jsx
│ ├── main.jsx
│ └── index.css
│
└── vite.config.js
```


---

## 🔌 API Communication

Using **Axios** with a custom client:

- Global base URL  
- Authorization header for protected routes  
- Automatic token attach (optional)  
- Error handling  

Example:

```js
import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8000/api/",
});
```

## 💻 Getting Started
Install dependencies
```bash
npm install

Start development server
npm run dev
```

Runs at → http://localhost:5173

### 🔥 Why React for SwiftShop?
- Component-based architecture → reusable UI
- Fast UI rendering for product-heavy pages
- Excellent developer experience using Vite
- Easy integration with REST APIs
- Strong ecosystem: Router, Tailwind, Axios
- Perfect for decoupled Django backend

### 🧪 Future Frontend Enhancements
-Dark mode
- Skeleton loading states
- Dedicated admin dashboard (React)
- Product filters (price, brand, categories)
- Search suggestions / autocomplete
- Checkout form validation improvements
- Wishlist page
- Toast notifications

🤝 Contributing

We welcome:
- UI/UX improvements
- Code cleanup
- Performance enhancements
- New features

Fork the repo → send PR → get merged 🎉

📧 Support

If you find issues or need help: **aditya98gupta@gmail.com**