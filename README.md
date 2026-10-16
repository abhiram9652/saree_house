# RangVeda — Handloom Saree Store (React + Vite)

A responsive, front-end-only ecommerce demo inspired by the look and feel of Indian handloom stores. This is an original starter project, not the source code of missamma.in and not affiliated with that business.

## Requirements
- Node.js (current LTS recommended)
- VS Code
- Internet connection for remote Unsplash product photos and Google Fonts

## Run in VS Code
1. Extract the ZIP file.
2. In VS Code, choose **File → Open Folder** and open `missamma-inspired-store`.
3. Open **Terminal → New Terminal**.
4. Run these commands:

```bash
npm install
npm run dev
```

5. Open the local URL printed in the terminal (usually `http://localhost:5173`).

## Included interactions
- Responsive desktop and mobile navigation
- Product search
- Category filters
- Sort by price
- Wishlist toggle and count
- Add-to-bag, quantity controls, remove item, cart subtotal
- Demo newsletter form

## Before using this for a real business
This is a front-end prototype. Cart contents are kept in React state and reset when the page reloads. Checkout is deliberately a demo and does not accept payments. To launch a real store, connect a backend/database, inventory and order handling, customer authentication as needed, shipping/tax rules, and a supported payment provider. Add your own licensed product photography, brand identity, policies and contact details. Do not enter real customer or payment information into this demo.

## Customise products
Edit the `products` array near the top of `src/App.jsx`. Each item has `id`, `name`, `category`, `price`, `oldPrice`, `tag`, `color`, and `image` fields.
