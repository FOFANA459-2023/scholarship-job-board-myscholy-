import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter
import './index.css';
import App from './App.jsx';

// Define the base URL
const baseUrl = "/scholarship-job-board-myscholy-";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename={baseUrl}> {/* Wrap App with BrowserRouter and set basename */}
      <App />
    </BrowserRouter>
  </StrictMode>,
);