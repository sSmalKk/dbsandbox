import React, { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./Routes";
import Header from "components/Header";
import Navmenublue from "components/Navmenublue";
import Navmenuwhite from "components/Navmenuwhite";

const apiUrl = process.env.REACT_APP_API_URL;

function App() {
  const [userData, setUserData] = useState(null);
  const token = localStorage.getItem('token') || process.env.JWT;

  useEffect(() => {
    if (!token) {
      console.error('Token não configurado');
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await fetch(`${apiUrl}/admin/user/me`, {
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`,
          }
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await response.json();
        setUserData(data.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [token]);

  

  return (
    <Router>
      {/* Condicional para renderizar diferentes HUDs com base em devMode */}
      

      <Routes />
      
    </Router>
  );
}

export default App;
