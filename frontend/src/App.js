import "./App.css";
import AppRouter from "./routes/AppRouter";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-center" />
      <AppRouter />
    </BrowserRouter>
  );
}