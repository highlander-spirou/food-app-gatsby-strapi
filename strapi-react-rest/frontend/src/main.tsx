import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ShoppingCartProvider } from "./context/ShoppingCartContext";
import { StoreProvider } from "./context/StoreContext";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <StoreProvider>
    <ShoppingCartProvider>
      <App />
    </ShoppingCartProvider>
  </StoreProvider>,
)
