import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Game from "components/Game/Game";
import { Helmet } from "react-helmet";
import { Button } from "../../components"; // Importei apenas o Button para o exemplo
import { RigidBodyContext } from "@react-three/rapier/dist/declarations/src/RigidBody";

type UniverseData = {
  name: string;
  CreateAt: string; // Deve ser uma string formatada como data
  age: number;
  Sectiontime: string; // Deve ser uma string formatada como hora
  hastime: boolean;
  expansionRate: number; // Valor estático de expansão
  layers: number; // Valor dinâmico calculado
  actlayers: number; // Valor dinâmico calculado
};

function SandboxSurvival() {
  const [userData, setUserData] = useState<any>(null);
  const [interfaceOpen] = useState(true);
  const [loadingLayer, setLoadingLayer] = useState<number>(1); // Estado para o layer que está sendo carregado
  const [universeData, setUniverseData] = useState<UniverseData>({
    name: "test",
    CreateAt: "",
    age: 10,
    Sectiontime: "11:11:11",
    hastime: true,
    expansionRate: 20,
    layers: 1,
    actlayers: 1,
  });

  // Definindo o blockState para diferentes tipos de blocos
  const blockState = {
    0: { texture: 'stone', model: 'box', RigidBody: "fixed", RigidBodyType: "cuboid" }, // Bloco voxel padrão
    1: { texture: 'wood', model: 'globe', RigidBody: "fixed", RigidBodyType: "cuboid" }, // Globo
    2: { texture: 'brick', model: 'stairs', RigidBody: "fixed", RigidBodyType: "cuboid" }, // Forma personalizada (escada para teste)
  };

  const customModels = {
    stairs: [
      { position: [0, 0, 0.5], rotation: [0, 0, 0], render: true },   // Frente
      { position: [0, 0, 0], rotation: [-Math.PI / 2, 0, 0], render: true },  // Trás
      // Adicione mais configurações de planos customizados aqui
    ],
    customModelName: [
      { position: [0, 0, 0.5], rotation: [0, 0, 0], render: true },   // Exemplo para um modelo customizado
      // Adicione as configurações do modelo customizado aqui
    ],
  };


  const setlayer = (increase: boolean) => {
    setUniverseData((prevData) => {
      let newActLayers = prevData.actlayers;
      if (increase) {
        newActLayers = Math.min(prevData.actlayers + 1, prevData.layers);
      } else {
        newActLayers = Math.max(prevData.actlayers - 1, 1);
      }
      return { ...prevData, actlayers: newActLayers };
    });
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = parseInt(event.target.value);
    if (!isNaN(value)) {
      value = Math.max(0, Math.min(value, universeData.layers));
      setUniverseData((prevData) => ({ ...prevData, actlayers: value }));
    }
  };

  const handleIncrease = () => {
    setUniverseData((prevData) => ({
      ...prevData,
      actlayers: Math.min(prevData.actlayers + 1, prevData.layers),
    }));
  };

  const handleDecrease = () => {
    setUniverseData((prevData) => ({
      ...prevData,
      actlayers: Math.max(prevData.actlayers - 1, 0),
    }));
  };

  const apiUrl = process.env.REACT_APP_API_URL;
  const token = localStorage.getItem('token') || process.env.JWT;
  const navigate = useNavigate();
  const startTimeRef = useRef<Date | null>(null);

  const textures = {
    stone: '/assets/textures/cubes/stone.png',
    wood: '/assets/textures/cubes/wood.png',
    brick: '/assets/textures/cubes/stone.png',
  };

  const chunks = [
    {
      position: [1, 0, 0],
      cubesArray: [
        [0, 0, 0, 2],
        [1, 0, 0, 0],
        [2, 0, 0, 0],
        [3, 0, 0, 0],
      ],
    },
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

    const updateSectionTime = () => {
      if (universeData.hastime) {
        const currentDate = new Date();
        const formattedTime = `${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`;
        setUniverseData((prevData) => ({
          ...prevData,
          Sectiontime: formattedTime,
        }));
        startTimeRef.current = currentDate;
      }
    };

    updateSectionTime();
    fetchUserData();
    const intervalId = setInterval(() => {
      const currentTime = new Date();
      if (startTimeRef.current) {
        const timeElapsed = (currentTime.getTime() - startTimeRef.current.getTime()) / 1000;
        setUniverseData((prevData) => ({
          ...prevData,
          age: prevData.age + Math.round(timeElapsed),
          layers: Math.round(prevData.age / prevData.expansionRate * 1),
        }));

        // Atualiza o estado do layer que está sendo carregado
        setLoadingLayer((prevLayer) => {
          const nextLayer = prevLayer < universeData.layers ? prevLayer + 1 : 1; // Volta ao primeiro layer se atingir o último
          return nextLayer;
        });
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [token, navigate, universeData.hastime, universeData.expansionRate, universeData.layers]);


  if (!userData) {
    return null;
  }

  return (
    <>
      <Helmet>
        <title>Sandbox Admin</title>
      </Helmet>

      {interfaceOpen && (
        <div className="w-full top-0 bottom-0 left-0 right-0" style={{ position: 'fixed', zIndex: 100 }}>
          <Button className="top-5 right-5" >x</Button>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '50px' }}>
            <Button onClick={handleDecrease}>-</Button>
            <input
              type="number"
              value={universeData.actlayers}
              onChange={handleInputChange}
              style={{ width: '50px', margin: '0 10px' }}
            />
            <Button onClick={handleIncrease}>+</Button>
          </div>
        </div>
      )}
      <div className="top-0 left-0" style={{ position: 'fixed', zIndex: 90 }}>
        <h1>Sectiontime: {universeData.Sectiontime}</h1>
        <h1>Age: {universeData.age}</h1>
        <h1>Expansion Rate: {universeData.expansionRate}</h1>
        <h1>Layers: {universeData.layers}</h1>
        <h1>Active Layer: {universeData.actlayers}</h1>
      </div>

      <Game
  customModels={customModels}
  blockState={blockState}
  canPlayerFly={true}
  textures={textures}
  chunks={chunks}
  renderDistance={15}
  gravity={[0, -9.81, 0]}
  pointLightPosition={[5, 10, 5]}
  initialPlayerPosition={[2, 20, 2]}
  isMouseLocked={true}
  sunPosition={[150, 50, 150]}
  ambientLightIntensity={1.5}
  pointLightIntensity={0.5}
  fov={60}
  keyboardMap={[
    { name: "forward", keys: ["w", "W"] },
    { name: "backward", keys: ["s", "S"] },
    { name: "left", keys: ["a", "A"] },
    { name: "right", keys: ["d", "D"] },
    { name: "shift", keys: ["Shift"] },
    { name: "jump", keys: ["Space"] },
    { name: "inventory", keys: ["e", "E"] },
    { name: "layerp", keys: ["ArrowUp"] },
    { name: "layerm", keys: ["ArrowDown"] },
    { name: "escape", keys: ["ESC", "Escape"] },
  ]}
/>
    </>
  );
}

export default SandboxSurvival;