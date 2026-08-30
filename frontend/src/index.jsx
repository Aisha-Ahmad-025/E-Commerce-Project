import { createRoot } from "react-dom/client";
import  AuthProvider from './context/AuthContext.jsx'
import App from "./App.jsx";
import './styles/global.css'
import { Provider } from "react-redux";
import store from "./redux/store.js";
createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <AuthProvider>
      <App />
    </AuthProvider>
  </Provider>,
);