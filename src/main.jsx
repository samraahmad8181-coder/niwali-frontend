import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { CartProvider } from './context/cartContext.jsx'
import App from './App.jsx'
import { UserProvider } from "@/context/userContext";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CartProvider>
      <UserProvider>
        <App />
      </UserProvider> {/* <-- Close UserProvider first */}
    </CartProvider>   {/* <-- Close CartProvider second */}
  </StrictMode>
)