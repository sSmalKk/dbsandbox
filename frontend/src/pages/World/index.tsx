import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Game from "components/Game";
function Sandbox() {
  const [userData, setUserData] = useState(null);
  const apiUrl = process.env.REACT_APP_API_URL;
  const token = localStorage.getItem('token') || process.env.JWT;
  const navigate = useNavigate();




  const textures = [[
    "./assets/textures/dirt.jpg", "./assets/textures/dirt.jpg", "./assets/textures/dirt.jpg",
    "./assets/textures/dirt.jpg", "./assets/textures/dirt.jpg", "./assets/textures/dirt.jpg"
  ],[
    "./assets/textures/grass.jpg", "./assets/textures/grass.jpg", "./assets/textures/grass.jpg",
    "./assets/textures/grass.jpg", "./assets/textures/grass.jpg", "./assets/textures/grass.jpg"
  ]];

  const cubesArray = [[[0, 0, 0],
      [5, 0, 5, 1]],
      [[1, 0, 0],
      [0, 0, 0, 1], [0, 0, 1, 1], [0, 0, 2, 1], [0, 0, 3, 1], [0, 0, 4, 1], [0, 0, 5, 1], [0, 0, 6, 1], [0, 0, 7, 1], [0, 0, 8, 1], [0, 0, 9, 1],
      [1, 0, 0, 1], [1, 0, 1, 1], [1, 0, 2, 1], [1, 0, 3, 1], [1, 0, 4, 1], [1, 0, 5, 1], [1, 0, 6, 1], [1, 0, 7, 1], [1, 0, 8, 1], [1, 0, 9, 1],
      [2, 0, 0, 1], [2, 0, 1, 1], [2, 0, 2, 1], [2, 0, 3, 1], [2, 0, 4, 1], [2, 0, 5, 1], [2, 0, 6, 1], [2, 0, 7, 1], [2, 0, 8, 1], [2, 0, 9, 1],
      [3, 0, 0, 1], [3, 0, 1, 1], [3, 0, 2, 1], [3, 0, 3, 1], [3, 0, 4, 1], [3, 0, 5, 1], [3, 0, 6, 1], [3, 0, 7, 1], [3, 0, 8, 1], [3, 0, 9, 1],
      [4, 0, 0, 1], [4, 0, 1, 1], [4, 0, 2, 1], [4, 0, 3, 1], [4, 0, 4, 1], [4, 0, 5, 1], [4, 0, 6, 1], [4, 0, 7, 1], [4, 0, 8, 1], [4, 0, 9, 1],
      [5, 0, 0, 1], [5, 0, 1, 1], [5, 0, 2, 1], [5, 0, 3, 1], [5, 0, 4, 1], [5, 0, 5, 1], [5, 0, 6, 1], [5, 0, 7, 1], [5, 0, 8, 1], [5, 0, 9, 1],
      [6, 0, 0, 1], [6, 0, 1, 1], [6, 0, 2, 1], [6, 0, 3, 1], [6, 0, 4, 1], [6, 0, 5, 1], [6, 0, 6, 1], [6, 0, 7, 1], [6, 0, 8, 1], [6, 0, 9, 1],
      [7, 0, 0, 1], [7, 0, 1, 1], [7, 0, 2, 1], [7, 0, 3, 1], [7, 0, 4, 1], [7, 0, 5, 1], [7, 0, 6, 1], [7, 0, 7, 1], [7, 0, 8, 1], [7, 0, 9, 1],
      [8, 0, 0, 1], [8, 0, 1, 1], [8, 0, 2, 1], [8, 0, 3, 1], [8, 0, 4, 1], [8, 0, 5, 1], [8, 0, 6, 1], [8, 0, 7, 1], [8, 0, 8, 1], [8, 0, 9, 1],
      [9, 0, 0, 1], [9, 0, 1, 1], [9, 0, 2, 1], [9, 0, 3, 1], [9, 0, 4, 1], [9, 0, 5, 1], [9, 0, 6, 1], [9, 0, 7, 1], [9, 0, 8, 1], [9, 0, 9, 1],]
      ];

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
        navigate("/");
      }
    };

    fetchUserData();
  }, [token, navigate]);
  return (
    <>
      <Game/>
    </>
  );
}

export default Sandbox;
