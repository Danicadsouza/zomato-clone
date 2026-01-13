import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./components/MainLayout/MainLayout";
import DeliveryPage from "./pages/DeliveryPage/DeliveryPage";

const App = () => {
  return (
    <Routes>
      
      <Route path="/" element={<Navigate to="/explore/order/delivery" />} />
      
      <Route path="/explore" element={<MainLayout />}>
        <Route path="order">
           <Route path="delivery" element={<DeliveryPage />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/explore/order/delivery" />} />
    </Routes>
  );
};

export default App;