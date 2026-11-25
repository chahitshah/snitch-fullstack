import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from "react-redux";
import { store } from "./app/store.js";

import AppRoutes from "./app/App.routes.jsx"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <AppRoutes />
    </Provider>
  </StrictMode>
)
