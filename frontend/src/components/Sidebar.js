import React from 'react';
import '../styles/Sidebar.css';
import { useNavigate } from 'react-router-dom';
const Sidebar = () => {
    const Navigate=useNavigate();
    const dashboard=()=>{
        Navigate('/')
    }
  return (
    <div className="sidebar">
      <ul>
        <li className="active" onClick={dashboard}>Dashboard</li>
        <li >Inventory</li>
        <li>Order</li>
        <li>Returns</li>
        <li>Customers</li>
        <li>Shipping</li>
        <li>Channel</li>
        <li>Integrations</li>
        <li>Calculators <i class="bi bi-chevron-down down1"></i></li>
        <li>Reports <i class="bi bi-chevron-down down"></i></li>
        <li>Account <i class="bi bi-chevron-down down"></i></li>
        
      </ul>
    </div>
  );
};

export default Sidebar;
