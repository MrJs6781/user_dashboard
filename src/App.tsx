import Login from "./Screens/Auth/Login";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./Screens/Dashboard";
import Products_continuation from "./Screens/Products_continuation";
import EditPassword from "./Screens/Edit_password";
import EditProfile from "./Screens/Edit_profile";
import Trafic from "./Screens/Trafic";
import MicroConsumption from "./Screens/micro_consumption";
import ConnectionHistory from "./Screens/Connection_history";
import ErrorReport from "./Screens/Error_report";
import CardexTraffic from "./Screens/Cardex_traffic";
import CardexFinancial from "./Screens/Cardex_financial";
import ForgetPassword from "./Screens/Auth/ForgetPassword";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/forget_password" element={<ForgetPassword />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route
          path="/products_continuation"
          element={<Products_continuation />}
        />
        <Route path="/edit_password" element={<EditPassword />} />
        <Route path="/edit_profile" element={<EditProfile />} />
        <Route path="/trafic" element={<Trafic />} />
        <Route path="/micro_consumption" element={<MicroConsumption />} />
        <Route path="/connection_history" element={<ConnectionHistory />} />
        <Route path="/error_report" element={<ErrorReport />} />
        <Route path="/cardex_traffic" element={<CardexTraffic />} />
        <Route path="/cardex_financial" element={<CardexFinancial />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
