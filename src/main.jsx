// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
import App from "./App.js";
// import './index.css'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )

function createRoot(rootElement) {
  return {
    render(App) {
      const app = App();
      rootElement.appendChild(app);
    },
  };
}

createRoot(document.getElementById("root")).render(App);
