import React, { useEffect, useState } from "react";
import { Sidebar } from "../../../components";
import { Helmet } from "react-helmet";
import { useGameStore } from "../../../store/gameStore"; // Zustand store
import Navegador from "components/Navegador";
import "./TextureMap.css"; // Arquivo CSS para customizar o estilo

const TextureMap = () => {
  const [availableTextures, setAvailableTextures] = useState([]); // Lista de texturas disponíveis
  const [textureMap, setTextureMap] = useState([]); // Mapa de texturas
  const { blockState, setBlockState } = useGameStore();
  const { navegar } = Navegador(); // Usar o Navegador

  // Carregar texturas disponíveis da API
  const fetchTextures = async () => {
    const token = localStorage.getItem("token") || process.env.JWT || "";
    try {
      const response = await fetch(
        `http://localhost:5000/admin/texture/list`,
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
        setAvailableTextures(data.data.data);
      } else {
        console.error("Unexpected API response format", data);
      }
    } catch (error) {
      console.error("Error fetching textures:", error);
    }
  };

  // Carregar o texturemap existente do blockState
  useEffect(() => {
    if (blockState && blockState[0].textures) {
      setTextureMap(blockState[0].textures || []);
    }
    fetchTextures(); // Carrega as texturas disponíveis
  }, [blockState]);

  // Função para adicionar uma nova textura ao texturemap
  const handleAddTexture = (textureId) => {
    const selectedTexture = availableTextures.find(
      (texture) => texture._id === textureId
    );

    if (selectedTexture) {
      const updatedTextureMap = [...textureMap, { _id: selectedTexture._id }];
      setTextureMap(updatedTextureMap);

      // Atualizar o blockState com o novo texturemap
      setBlockState(0, {
        ...blockState[0],
        textures: updatedTextureMap,
      });
    }
  };

  // Função para remover uma textura do texturemap
  const handleRemoveTexture = (textureId) => {
    const updatedTextureMap = textureMap.filter(
      (texture) => texture._id !== textureId
    );
    setTextureMap(updatedTextureMap);

    // Atualizar o blockState com o texturemap atualizado
    setBlockState(0, {
      ...blockState[0],
      textures: updatedTextureMap,
    });
  };

  return (
    <>
      <Helmet>
        <title>Editor de Texturemap</title>
      </Helmet>
      <div className="texturemap-editor-container">
        <Sidebar />
        <div className="texturemap-editor-content cardblack">
          <h2>Editor de Texturemap</h2>

          {/* Exibição do texturemap atual */}
          <div className="current-texturemap cardblack">
            <h3>Texturemap Atual</h3>
            {textureMap.length > 0 ? (
              <ul className="texturemap-list">
                {textureMap.map((texture) => (
                  <li key={texture._id} className="texturemap-item">
                    <strong>ID da Textura:</strong> {texture._id}
                    <button
                      onClick={() => handleRemoveTexture(texture._id)}
                      className="remove-button"
                    >
                      Remover
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p>Nenhuma textura no mapa atual.</p>
            )}
          </div>

          {/* Adicionar novas texturas ao texturemap */}
          <div className="add-texture-section cardblack">
            <h3>Adicionar Nova Textura</h3>
            <ul className="available-textures-list">
              {availableTextures.length > 0 ? (
                availableTextures.map((texture) => (
                  <li key={texture._id} className="available-texture-item">
                    <strong>{texture.name}</strong> - {texture.description}
                    <button
                      onClick={() => handleAddTexture(texture._id)}
                      className="add-button"
                    >
                      Adicionar
                    </button>
                  </li>
                ))
              ) : (
                <p>Carregando texturas disponíveis...</p>
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default TextureMap;
