import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

localStorage.removeItem('username');
createRoot(document.getElementById("root")!).render(<App />);
