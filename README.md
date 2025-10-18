# Nike Store React App

A modern, responsive Nike product showcase and checkout demo built with React, Vite, and Tailwind CSS.

## Features

- Product page with color/size selection, dynamic images, and "Add to Cart"
- Global cart state with localStorage persistence
- Checkout form with payment validation (Luhn, expiry, name)
- Animated product transitions and color-matched gradients
- Accessible, keyboard-friendly UI
- Responsive design

## Tech Stack

- React 18+
- Vite
- Tailwind CSS
- Lucide React Icons

## Getting Started

1. **Install dependencies:**

````````
npm install
````````

2. **Run the dev server:**

````````
npm run dev
````````

3. **Build for production:**

````````
npm run build
````````

## Project Structure

- `src/pages/ProductPage.jsx` – Main product display and add to cart
- `src/pages/Checkout.jsx` – Checkout form and order summary
- `src/context/CartContext.jsx` – Cart state/context logic
- `src/components/` – Navbar, Hero, and other UI components
- `public/` – Static assets (images, logo, etc.)

## Customization

- Add more products, colors, or sizes by editing `colorAssets` and related arrays in `ProductPage.jsx`.
- Update images in the `public/` folder to match your products.

## License

MIT

---

*This is a demo project for learning and prototyping. Not for production use without further security and backend integration.*
