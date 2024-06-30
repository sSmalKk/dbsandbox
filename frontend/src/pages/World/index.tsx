import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Game from "components/Game/Game";
import Header from "components/Header";
import Configuration from "pages/Configuration";

function Sandbox() {
  const [userData, setUserData] = useState(null);
  const apiUrl = process.env.REACT_APP_API_URL;
  const token = localStorage.getItem('token') || process.env.JWT;
  const navigate = useNavigate();
 
  useEffect(() => {
    if (!token) {
      console.error('Token não configurado');
      navigate("/");

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
        // Redireciona para "/" em caso de erro ao buscar dados do usuário
        navigate("/");
      }
    };

    fetchUserData();
  }, [token, navigate]);


  return (
    <>
  
      <Game />

    </>
  );
}

export default Sandbox;
