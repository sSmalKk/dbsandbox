import React, { useEffect, useState } from "react";
import { Sidebar } from "../../../components";
import { Helmet } from "react-helmet";
import { useGameStore } from "../../../store/gameStore"; // Zustand store
import Navegador from "components/Navegador";
import "./TextureMapList.css"; // Arquivo CSS para customizar o estilo da lista

const TextureMapList = () => {
  const [textureMap, setTextureMap] = useState([]);
  const { blockState, setBlockState, textures } = useGameStore();
  const { navegar } = Navegador(); // Usar o Navegador

  // Função para buscar as texturas ordenadas
  const fetchTextures = async () => {
    const token = localStorage.getItem("token") || process.env.JWT || "";
    try {
      const response = await fetch(
        `http://localhost:5000/admin/textures/list`,
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
        setTextureMap(data.data.data); // Use data.data assuming the API response contains a "data" array
      } else {
        console.error("Unexpected API response format", data);
      }
    } catch (error) {
      console.error("Error fetching textures:", error);
    }
  };

  useEffect(() => {
    fetchTextures();
  }, []);

  // Função para selecionar a textura e adicionar ao blockState
  const handleSelectTexture = (textureId) => {
    const selectedTexture = textureMap.find((texture) => texture._id === textureId);

    if (selectedTexture) {
      setBlockState(0, {
        ...blockState[0],
        textures: selectedTexture.texturemap || [],
      });

      alert(`Textura "${selectedTexture.name}" foi adicionada com sucesso!`);
    }
  };

  return (
    <>
      <Helmet>
        <title>Lista de Texturas</title>
      </Helmet>
      <div className="texturemap-list-container">
        <Sidebar />
        <div className="texturemap-list-content cardblack">
          <h2>Lista de Texturas</h2>
          <ul className="texturemap-list">
            {textureMap.length > 0 ? (
              textureMap.map((texture) => (
                <li key={texture._id} className="texturemap-item">
                  <div className="texturemap-info">
                    <strong>Nome:</strong> {texture.name} <br />
                    <strong>Descrição:</strong> {texture.description} <br />
                  </div>
                  <div className="texturemap-actions">
                    <button
                      onClick={() => handleSelectTexture(texture._id)}
                      className="select-button"
                    >
                      Selecionar
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
    </>
  );
};

export default TextureMapList;
