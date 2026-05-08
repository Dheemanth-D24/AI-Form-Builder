import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Builder from "./pages/Builder";
import PublicForm from "./pages/PublicForm";
import Analytics from "./pages/Analytics";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/builder/:id" element={<Builder />} />
        <Route path="/form/:id" element={<PublicForm />} />
        <Route path="/analytics/:id" element={<Analytics />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;