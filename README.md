# 🛒 E-Commerce Backend API

A clean, scalable e-commerce backend built with **Node.js**, **Express**, **Prisma ORM**, and **SQLite**, designed to demonstrate API design, database modeling, and backend architecture best practices.

This project was built as part of a take-home assignment to showcase:

* RESTful API design
* Proper data modeling & relations
* Authentication & authorization
* Clean architecture (controller → service → DB)

---

## 🚀 Tech Stack

* **Node.js** (v18+ recommended)
* **Express.js** – HTTP framework
* **Prisma ORM** – Database ORM
* **SQLite** – Database (easy local setup)
* **JWT** – Authentication
* **Zod** – Request validation
* **Swagger (OpenAPI 3)** – API documentation

---

## 🧱 Architecture Overview

```
src/
├── app.js
├── server.js
├── config/
|   ├── jwt.js
│   ├── prisma.js
│  
├── middleware/
│   ├── auth.js
│   ├── asyncHandler.js
│   ├── validate.js
│   └── role.js
├── modules/
│   ├── auth/
│   ├── product/
│   ├── cart/
│   └── order/
├── swagger/
|   └── index.js
│   └── paths/
└── utils/ 
|   └── response.js
| 
prisma/
    ├── schema.prisma
    └── migrations/
```

### Design Principles

* **Separation of concerns** (controller / service / schema)
* **Stateless JWT authentication**
* **Role-based access control**
* **Centralized error handling**
* **Schema-first validation (Zod)**

---

## 🔐 Authentication & Roles

### Roles

* `CUSTOMER`
* `ADMIN`

### Authentication

* JWT-based authentication
* Token must be sent via header:

```
Authorization: Bearer <JWT_TOKEN>
```

---

## 📦 Core Features

### 👤 User Management

* Register
* Login
* Role-based access (Admin / Customer)

### 🛍 Products

* Admin can create, update, delete products
* Public product listing & details
* Pagination & filtering (price, category)

### 🛒 Cart

* One cart per user
* Add / remove items
* Auto-calculated totals

### 📑 Orders

* Place order from cart
* Stock deduction
* Order history (customer)
* View all orders (admin)

---

## 🗄 Database Schema

* **User** → One Cart, Many Orders
* **Cart** → Many CartItems
* **Order** → Many OrderItems
* **Product** → Used in Cart & Orders

All relations are normalized and indexed for performance.

---

## ⚙️ Setup Instructions

### 1️⃣ Clone Repository

```bash
git clone https://github.com/woruz/ecommerce-apis.git
cd ecommerce-apis
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Environment Variables

Create `.env` file:

```bash
cp .env.sample .env
```

### 4️⃣ Database Setup

```bash
npx prisma migrate dev
npx prisma generate
```

### 5️⃣ Start Server

```bash
npm run dev
```

Server runs at:

```
http://localhost:3000
```

---

## 📘 API Documentation (Swagger)

Swagger UI available at:

```
http://localhost:3000/api-docs
```

Includes:

* Authentication
* Products
* Cart
* Orders

---

## 🧪 API Testing Flow (Recommended)

1. Register Admin
2. Login Admin → create products
3. Register Customer
4. Login Customer → add to cart
5. Place order
6. View orders

---

## ❗ Error Handling

* Centralized error handler
* Consistent response format

### Success Response

```json
{
  "status": "success",
  "message": "Success",
  "data": {}
}
```

### Error Response

```json
{
  "status": "error",
  "message": "Validation failed",
  "errors": []
}
```

---

## 🧠 Assumptions & Trade-offs

* SQLite used for simplicity (can be swapped with Postgres)
* No payment gateway integration
* Focused on backend correctness over UI
* Single-cart-per-user design

---

## 🧪 Testing (Optional)

Basic unit/integration tests can be added using:

* Jest
* Supertest

---

## ✅ Evaluation Checklist

* ✔ RESTful APIs
* ✔ Clean architecture
* ✔ Proper DB relations & indexes
* ✔ Auth & RBAC
* ✔ Swagger documentation
* ✔ Scalable structure

---

## Database Schema

The database schema is provided in `schema.sql`.

It defines:
- Users with role-based access (ADMIN / CUSTOMER)
- Products & categories
- Shopping carts (1 cart per user)
- Orders with immutable order items

Design considerations:
- Normalized relational design
- Snapshot pricing for orders
- Indexes added for common query patterns

Although Prisma ORM is used in the implementation, a raw SQL schema
is provided to clearly demonstrate database design, relationships,
and indexing decisions independent of ORM abstractions.


## 👨‍💻 Author

**Backend Developer**
Email: [sabil.danish1997@gmail.com](mailto:sabil.danish1997@gmail.com)

---

> This project is intentionally simple yet scalable, focusing on clarity, correctness, and maintainability rather than over-engineering.
