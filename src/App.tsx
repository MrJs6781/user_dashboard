import Login from "./Screens/Auth/Login";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./Screens/Dashboard";
import Products_continuation from "./Screens/Products_continuation";
import Trafic from "./Screens/Trafic";
import MicroConsumption from "./Screens/micro_consumption";
import ConnectionHistory from "./Screens/Connection_history";
import ErrorReport from "./Screens/Error_report";
import CardexTraffic from "./Screens/Cardex_traffic";
import CardexFinancial from "./Screens/Cardex_financial";
import ForgetPassword from "./Screens/Auth/ForgetPassword";
import Education from "./Screens/Education";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/forget_password" element={<ForgetPassword />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route
          path="/renew"
          element={<Products_continuation />}
        />
        <Route path="/traffic" element={<Trafic />} />
        <Route path="/consume" element={<MicroConsumption />} />
        <Route path="/history" element={<ConnectionHistory />} />
        <Route path="/error_report" element={<ErrorReport />} />
        <Route path="/traffic_cardex" element={<CardexTraffic />} />
        <Route path="/shop_cardex" element={<CardexFinancial />} />
        <Route path="/tutorial" element={<Education />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
