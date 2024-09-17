import React, { useEffect, useState } from "react";
import { Sidebar } from "../../../components";
import Game from "components/Game/Game";
import { Helmet } from "react-helmet";
import { useGameStore } from "../../../store/gameStore"; // Zustand store
import Navegador from "components/Navegador";

const ModelList = () => {
  const [modelos, setModelos] = useState([]);
  const { blockState, customModels, chunks, textures } = useGameStore();
  const { navegar } = Navegador(); // Usar o Navegador

  useEffect(() => {
    const token = localStorage.getItem("token") || process.env.JWT || "";

    const fetchRecentUniverses = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/admin/universe/list`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({}),
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch recent universes");
        }

        const data = await response.json();
      } catch (error) {
        console.error("Error fetching recent universes:", error);
      }
    };
  }, []);

  const handleEdit = (modeloId) => {
    // Salvar apenas o ID do modelo no localStorage
    localStorage.setItem("selectedModelId", modeloId);
    // Redirecionar para a página de edição
    navegar(`/ItemCreator/EditModel/`);
  };

  return (
    <>
      <Helmet>
        <title>Lista de Modelos</title>
      </Helmet>
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          zIndex: "999",
          backgroundColor: "#f0f0f030",
        }}
      >
        <Sidebar />
        <div
          style={{ padding: "20px", width: "100%", backgroundColor: "#f0f0f0" }}
        >
          <h2>Lista de Modelos</h2>
          <ul>
            {modelos.map((modelo) => (
              <li key={modelo.id}>
                {modelo.name} (Tipo: {modelo.type}){" "}
                <button onClick={() => handleEdit(modelo.id)}>Editar</button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <Game
        blockState={blockState}
        customModels={customModels}
        textures={textures}
        chunks={chunks}
        renderDistance={10}
        canPlayerFly={false}
      />
    </>
  );
};

export default ModelList;
