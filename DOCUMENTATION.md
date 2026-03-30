# Shop API Documentation

A RESTful e-commerce API built with Node.js, Express, TypeORM, and SQLite.

## Tech Stack

- **Runtime:** Node.js + TypeScript
- **Framework:** Express 5
- **ORM:** TypeORM with SQLite
- **Auth:** JWT (access + refresh tokens)
- **Validation:** Zod
- **File Uploads:** Multer
- **Logging:** Winston
- **API Docs:** Swagger UI (`/api-docs`)

## Getting Started

### Prerequisites

- Node.js >= 18
- npm

### Setup

```bash
npm install
```

Create a `.env` file:

```env
PORT=3000
NODE_ENV=development
DB_NAME=db.sqlite
JWT_ACCESS_SECRET=your_access_secret
JWT_REFRESH_SECRET=your_refresh_secret
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d
```

### Run

```bash
npm run dev
```

Server starts at `http://localhost:3000`.  
Swagger UI available at `http://localhost:3000/api-docs`.

---

## API Reference

All endpoints are prefixed with `/api`. Protected routes require a Bearer token in the `Authorization` header.

### Accounts — `/api/users`

| Method | Endpoint            | Auth | Description              |
|--------|---------------------|------|--------------------------|
| POST   | `/register`         | No   | Register a new account   |
| POST   | `/login`            | No   | Login and receive tokens |
| GET    | `/profile`          | Yes  | Get current user profile |
| PUT    | `/profile`          | Yes  | Update profile           |
| PUT    | `/change-password`  | Yes  | Change password          |

### Catalog — `/api/products`

| Method | Endpoint       | Auth | Description                  |
|--------|----------------|------|------------------------------|
| POST   | `/`            | Yes  | Create a product             |
| GET    | `/`            | No   | List all products            |
| GET    | `/search?q=`   | No   | Search products by keyword   |
| GET    | `/:id`         | No   | Get product by ID            |
| PUT    | `/:id`         | Yes  | Update product               |
| DELETE | `/:id`         | Yes  | Delete product               |
| POST   | `/:id/image`   | Yes  | Upload product image (multipart/form-data) |

### Basket — `/api/cart`

| Method | Endpoint     | Auth | Description              |
|--------|--------------|------|--------------------------|
| POST   | `/`          | Yes  | Add item to basket       |
| GET    | `/`          | Yes  | Get current basket       |
| PUT    | `/:itemId`   | Yes  | Update item quantity     |
| DELETE | `/:itemId`   | Yes  | Remove item from basket  |
| DELETE | `/`          | Yes  | Clear entire basket      |

### Orders — `/api/orders`

| Method | Endpoint        | Auth | Description              |
|--------|-----------------|------|--------------------------|
| POST   | `/`             | Yes  | Place order from basket  |
| GET    | `/`             | Yes  | List user's orders       |
| GET    | `/:id`          | Yes  | Get order by ID          |
| PUT    | `/:id/status`   | Yes  | Update order status      |
| PUT    | `/:id/cancel`   | Yes  | Cancel an order          |

#### Order Statuses

`CREATED` → `PAID` → `SHIPPED` → `DELIVERED` / `CANCELLED`

---

## Project Structure

```
src/
├── config/         # DB, env, Swagger setup
├── middlewares/    # Auth, error handling, logging, file upload
├── modules/
│   ├── user/       # Registration, login, profile
│   ├── product/    # Catalog management
│   ├── cart/       # Basket management
│   └── order/      # Order lifecycle
├── utils/          # JWT, hashing, logger
├── app.ts          # Express app setup
└── server.ts       # Entry point
```

## Static Files

Uploaded product images are served from `/uploads`.
