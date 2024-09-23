import React, { useEffect, useState } from "react";
import { Sidebar } from "../../../components";
import Game from "components/Game/Game";
import { Helmet } from "react-helmet";
import { useGameStore } from "../../../store/gameStore"; // Zustand store
import Navegador from "components/Navegador";
import "./TextureList.css";

const TextureList = () => {
  const [customTextures, setCustomTextures] = useState([]);
  const { blockState, customModels, chunks, textures } = useGameStore();
  const { navegar } = Navegador(); // Usar o Navegador

  const fetchRecentModels = async () => {
    const token = localStorage.getItem("token") || process.env.JWT || "";
    try {
      const response = await fetch(
        `http://localhost:5000/admin/modelos_texture/list`,
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

  const handleEdit = (textureId) => {
    // Salvar apenas o ID do texture no localStorage
    localStorage.setItem("selectedModelId", textureId);
    // Redirecionar para a página de edição
    navegar(`/ItemCreator/EditModel/`);
  };

  const handleDelete = async (textureId) => {
    const token = localStorage.getItem("token") || process.env.JWT || "";
    const confirmDelete = window.confirm(
      "Tem certeza que deseja deletar essa textura?"
    );

    if (confirmDelete) {
      try {
        const response = await fetch(
          `http://localhost:5000/admin/modelos_texturemap/delete/${textureId}`,
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
          alert("Textura deletada com sucesso!");
          // Re-fetch models to force refresh after deletion
          fetchRecentModels();
        } else {
          console.error("Erro ao deletar textura:", result);
        }
      } catch (error) {
        console.error("Erro ao deletar textura:", error);
      }
    }
  };console.log(customTextures)
  return (
    <>
      <Helmet>
        <title>Lista de Texturas</title>
      </Helmet>
      <div className="model-list-container">
        <Sidebar />
        <div className="texturemap-list-content cardblack">
          <h2>Lista de Texturas</h2>
          <ul className="texture-list">
            {customTextures.length > 0 ? (
              customTextures.map((texture) => (
                <li key={texture._id || texture.id} className="texture-item">
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
              <li className="no-textures">Nenhuma textura encontrada</li>
            )}
          </ul>
        </div>
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
};

export default TextureList;
