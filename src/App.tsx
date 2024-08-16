import Login from "./Screens/Auth/Login";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./Screens/Dashboard";
import Products_continuation from "./Screens/Products_continuation";
import EditPassword from "./Screens/Edit_password";
import EditProfile from "./Screens/Edit_profile";
import Trafic from "./Screens/Trafic";
import MicroConsumption from "./Screens/micro_consumption";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route
          path="/products_continuation"
          element={<Products_continuation />}
        />
        <Route path="/edit_password" element={<EditPassword />} />
        <Route path="/edit_profile" element={<EditProfile />} />
        <Route path="/trafic" element={<Trafic />} />
        <Route path="/micro_consumption" element={<MicroConsumption />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
