import Login from "./Screens/Auth/Login";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./Screens/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
