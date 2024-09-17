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

  const fetchRecentModels = async () => {
    const token = localStorage.getItem("token") || process.env.JWT || "";
    try {
      const response = await fetch(
        `http://localhost:5000/admin/modelos_model/list`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({

          }),
        }
      );

      const data = await response.json();
      if (Array.isArray(data.data.data)) {
        setModelos(data.data.data); // Use data.data assuming the API response contains a "data" array
      } else {
        console.error("Unexpected API response format", data);
      }
    } catch (error) {
      console.error("Error fetching recent models:", error);
    }
  };

  useEffect(() => {
    fetchRecentModels();
  }, []);

  const handleEdit = (modeloId) => {
    // Salvar apenas o ID do modelo no localStorage
    localStorage.setItem("selectedModelId", modeloId);
    // Redirecionar para a página de edição
    navegar(`/ItemCreator/EditModel/`);
  };

  const handleDelete = async (modeloId) => {
    const token = localStorage.getItem("token") || process.env.JWT || "";
    const confirmDelete = window.confirm("Are you sure you want to delete this model?");
    
    if (confirmDelete) {
      try {
        const response = await fetch(
          `http://localhost:5000/admin/modelos_model/delete/${modeloId}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const result = await response.json();
        if (result.status === "SUCCESS") {
          alert("Model deleted successfully!");
          // Re-fetch models to force refresh after deletion
          fetchRecentModels();
        } else {
          console.error("Error deleting model:", result);
        }
      } catch (error) {
        console.error("Error deleting model:", error);
      }
    }
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
            {Array.isArray(modelos) && modelos.length > 0 ? (
              modelos.map((modelo) => (
                <li key={modelo._id || modelo.id}>
                  {modelo.name} (Tipo: {modelo.type}){" "}
                  <button onClick={() => handleEdit(modelo._id || modelo.id)}>Editar</button>
                  <button onClick={() => handleDelete(modelo._id || modelo.id)}>Excluir</button>
                </li>
              ))
            ) : (
              <li>Nenhum modelo encontrado</li>
            )}
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
