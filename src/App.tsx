import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, useLocation } from "react-router-dom";
import Routes from "./Routes";
import Header from "components/Header";
import { ServerStatus }  from "components/ServerStatus";

 
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
        const response = await fetch(`https://localhost:5000/admin/user/me`, {
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`,
          }
        });

        if (!response.ok) {
          if (response.status === 401 || response.status === 403) {
            localStorage.clear();
            window.location.href = "/";
          }
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
      <PageLayout userData={userData} />
    </Router>
  );
}

function PageLayout({ userData }) {
  const location = useLocation();

  const showHeaderRoutes = ['/', '/LandingPage', '/register', '/post']; // Rotas onde o Header deve ser exibido
  const showHeader = showHeaderRoutes.includes(location.pathname);

  return (
    <>
      {showHeader && (
        <Header 
          heading={userData} 
          Status={userData} 
          text={userData} 
          className="flex flex-row md:flex-col justify-between items-center w-full md:h-auto p-[5px] md:gap-10 bg-black-900_60" 
          life={0} 
        />
      )}
      <ServerStatus/>
      <Routes />
    </>
  );
}

export default App;
