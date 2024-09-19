import React, { useEffect, useState } from "react";
import { Sidebar } from "../../../components";
import Game from "components/Game/Game";
import { Helmet } from "react-helmet";
import { useGameStore } from "../../../store/gameStore"; // Zustand store
import Navegador from "components/Navegador";
import "./ModelList.css"; // Arquivo CSS para customizar o estilo da lista

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
          body: JSON.stringify({}),
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
    const confirmDelete = window.confirm(
      "Tem certeza que deseja deletar esse modelo?"
    );

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
          alert("Modelo deletado com sucesso!");
          // Re-fetch models to force refresh after deletion
          fetchRecentModels();
        } else {
          console.error("Erro ao deletar modelo:", result);
        }
      } catch (error) {
        console.error("Erro ao deletar modelo:", error);
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>Lista de Modelos</title>
      </Helmet>
      <div className="model-list-container">
        <Sidebar />
        <div className="model-list-content">
          <h2>Lista de Modelos</h2>
          <ul className="model-list">
            {modelos.length > 0 ? (
              modelos.map((modelo) => (
                <li key={modelo._id || modelo.id} className="model-item">
                  <div className="model-info">
                    <strong>Nome:</strong> {modelo.name} <br />
                    <strong>Tipo:</strong> {modelo.type} <br />
                  </div>
                  <div className="model-actions">
                    <button
                      onClick={() => handleEdit(modelo._id || modelo.id)}
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(modelo._id || modelo.id)}
                    >
                      Excluir
                    </button>
                  </div>
                </li>
              ))
            ) : (
              <li className="no-models">Nenhum modelo encontrado</li>
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
