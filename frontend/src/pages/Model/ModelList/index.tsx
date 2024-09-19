import React, { useEffect, useState } from "react";
import { Sidebar } from "../../../components";
import Game from "components/Game/Game";
import { Helmet } from "react-helmet";
import { useGameStore } from "../../../store/gameStore"; // Zustand store
import Navegador from "components/Navegador";
import "./ModelList.css";

const ModelList = () => {
  const [customTextures, setCustomTextures] = useState([]);
  const {
    blockState,
    customModels,
    setCustomModels,
    setBlockState,
    chunks,
    textures,
  } = useGameStore();
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
        setCustomTextures(data.data.data); // Use data.data assuming the API response contains a "data" array
      } else {
        console.error("Unexpected API response format", data);
      }
    } catch (error) {
      console.error("Error fetching recent textures:", error);
    }
  };

  useEffect(() => {
    fetchRecentModels();
  }, []);

  // Function to handle hover (mouse enter) on a model
  const handleMouseEnter = (model) => {
    // Set the model in customModels
    const modelName = model.name;
    const modelMapArray = Array.isArray(model.modelmap) ? model.modelmap : [];

    // Update customModels and blockState
    setCustomModels(modelName, modelMapArray);
    setBlockState(0, {
      ...blockState[0],
      model: modelName,
    });
  };

  // Function to clear the block state on mouse leave
  const handleMouseLeave = () => {
    setBlockState(0, {
      ...blockState[0],
      model: null,
      name: null,
    });
  };

  const handleEdit = (textureId) => {
    // Salvar apenas o ID do modelo no localStorage
    localStorage.setItem("selectedModelId", textureId);
    // Redirecionar para a página de edição
    navegar(`/ItemCreator/Model/`);
  };    console.log(localStorage.getItem("token"));

  const handleDelete = async (textureId) => {
    const token = localStorage.getItem("token") || process.env.JWT || "";
    const confirmDelete = window.confirm(
      "Tem certeza que deseja deletar esse modelo?"
    );
    
    if (confirmDelete) {
      try {
        const response = await fetch(
          `http://localhost:5000/admin/modelos_model/delete/${textureId}`,
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
        <div className="texturemap-list-content cardblack">
          <h2>Lista de Modelos</h2>
          <ul className="texture-list">
            {customTextures.length > 0 ? (
              customTextures.map((texture) => (
                <li
                  key={texture._id || texture.id}
                  className="texture-item"
                  onMouseEnter={() => handleMouseEnter(texture)} // Handle hover
                  onMouseLeave={handleMouseLeave} // Reset on mouse leave
                >
                  <div className="texture-preview-wrapper">
                    <img
                      src={"http://localhost:5000/" + texture.link}
                      alt={texture.name}
                      className="texture-preview"
                    />
                  </div>
                  <div className="texture-info">
                    <strong>Nome:</strong> {texture.name} <br />
                    <strong>Descrição:</strong> {texture.description} <br />
                    <strong>Tipo:</strong> {texture.type} <br />
                  </div>

                  <div className="texture-actions">
                    <button
                      onClick={() => handleEdit(texture._id || texture.id)}
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(texture._id || texture.id)}
                    >
                      Excluir
                    </button>
                  </div>
                </li>
              ))
            ) : (
              <li className="no-textures">Nenhum modelo encontrado</li>
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
