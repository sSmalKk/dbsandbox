import React, { useEffect, useState } from "react";
import { Sidebar } from "../../../components";
import Game from "components/Game/Game";
import { Helmet } from "react-helmet";
import { useGameStore } from "../../../store/gameStore";
import "./TextureMap.css"; // Import your CSS styles

const token = localStorage.getItem("token") || process.env.JWT || "";
const savedTextureMapId = localStorage.getItem("textureMapId");

const TextureMap = () => {
  const { blockState, textures, setBlockState, setTextures } = useGameStore();

  const [newTextureMap, setNewTextureMap] = useState(!savedTextureMapId); // Se não houver um ID salvo, cria um novo mapa
  const [textureMapId, setTextureMapId] = useState(savedTextureMapId || null);
  const [textureName, setTextureName] = useState("");
  const [textureDescription, setTextureDescription] = useState("");
  const [textureData, setTextureData] = useState({
    name: "",
    description: "",
    isActive: true,
    isDeleted: false,
    texturemap: [],
  });

  const [availableTextures, setAvailableTextures] = useState([]); // Para armazenar as texturas possíveis
  const [selectedTexture, setSelectedTexture] = useState(""); // Para a textura selecionada no dropdown

  // Fetch recent textures to populate dropdown options
  const fetchRecentTextures = async () => {
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
        setAvailableTextures(data.data.data); // Alimenta o dropdown com as texturas
      } else {
        console.error("Unexpected API response format", data);
      }
    } catch (error) {
      console.error("Error fetching recent textures:", error);
    }
  };

  // Busca texturas recentes assim que o componente monta
  useEffect(() => {
    fetchRecentTextures();

    if (textureMapId) {
      const fetchTextureMap = async () => {
        try {
          const response = await fetch(
            `http://localhost:5000/admin/modelos_texturemap/${textureMapId}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (!response.ok) throw new Error("Failed to fetch the texture map");

          const data = await response.json();
          if (data.status === "SUCCESS") {
            const textureMapArray = Array.isArray(data.data.texturemap)
              ? data.data.texturemap
              : [];
            setTextureData({ ...data.data, texturemap: textureMapArray });
            setBlockState(0, {
              ...blockState[0],
              textures: textureMapArray.map((texture) => texture.id), // Associa as texturas IDs
            });
          }
        } catch (error) {
          console.error("Error fetching the texture map:", error);
        }
      };
      fetchTextureMap();
    }
  }, [textureMapId, token, setTextures, setBlockState]);

  const handleCreateTextureMap = async () => {
    if (!textureName || !textureDescription) {
      alert("Preencha todos os campos.");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/admin/modelos_texturemap/create",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: textureName,
            description: textureDescription,
            isActive: true,
            isDeleted: false,
          }),
        }
      );
      const result = await response.json();
      if (result.status === "SUCCESS") {
        setTextureMapId(result.data.id);
        localStorage.setItem("textureMapId", result.data.id);
        setNewTextureMap(false); // Fecha o modal após a criação
      }
    } catch (error) {
      console.error("Error creating texture map:", error);
    }
  };
  const handleSaveTextureMap = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/admin/modelos_texturemap/partial-update/${textureMapId}`,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            texturemap: textureData.texturemap.map((t) => t.id), // Envia apenas IDs das texturas
            isActive: textureData.isActive,
            isDeleted: textureData.isDeleted,
          }),
        }
      );
      const result = await response.json();
      if (result.status === "SUCCESS") {
        console.log("Texture map updated successfully:", result);
      }
    } catch (error) {
      console.error("Error updating texture map:", error);
    }
  };

  const handleAddTexture = () => {
    const selectedTextureData = availableTextures.find(
      (texture) => texture.id === selectedTexture
    );

    if (!selectedTextureData) {
      alert("Selecione uma textura válida.");
      return;
    }

    setTextureData((prevState) => ({
      ...prevState,
      texturemap: [...prevState.texturemap, selectedTextureData],
    }));

    setSelectedTexture(""); // Limpa a seleção
  };

  const handleRemoveTexture = (index) => {
    setTextureData((prevState) => ({
      ...prevState,
      texturemap: prevState.texturemap.filter((_, i) => i !== index),
    }));
  };

  const handleClearLocalStorage = () => {
    localStorage.removeItem("textureMapId");
    setTextureMapId(null);
    setNewTextureMap(true); // Mostra o modal para criação de novo mapa
  };
  console.log(availableTextures);
  return (
    <>
      <Helmet>
        <title>
          {newTextureMap
            ? "Criar Novo TextureMap"
            : `Editando: ${textureData.name}`}
        </title>
      </Helmet>

      {newTextureMap && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Definir Nome e Descrição do TextureMap</h3>
            <input
              type="text"
              value={textureName}
              onChange={(e) => setTextureName(e.target.value)}
              placeholder="Digite o nome do TextureMap"
            />
            <textarea
              value={textureDescription}
              onChange={(e) => setTextureDescription(e.target.value)}
              placeholder="Digite a descrição"
            />
            <button onClick={handleCreateTextureMap}>Criar TextureMap</button>
          </div>
        </div>
      )}

      <div className="edit-texturemap-container">
        <Sidebar />
        <div className="edit-texturemap-content">
          <div className="header">
            <h2>
              {newTextureMap
                ? "Criar Novo TextureMap"
                : `Editando: ${textureData.name}`}
            </h2>
            <button className="close-button" onClick={handleClearLocalStorage}>
              Limpar
            </button>
          </div>

          {/* Lista de texturas */}
          <div className="cardblack rounded-lg p-5">
            <h3>Lista de Texturas</h3>
            <ul>
              {textureData.texturemap.map((texture, index) => (
                <li key={texture.id}>
                  <strong>Textura {index + 1}</strong> - {texture.description}
                  <button onClick={() => handleRemoveTexture(index)}>
                    Remover
                  </button>
                </li>
              ))}
            </ul>

            {/* Dropdown para selecionar nova textura */}
            <select
              value={selectedTexture}
              onChange={(e) => setSelectedTexture(e.target.value)}
            >
              <option value="">Selecione uma textura</option>
              {availableTextures.map((texture) => (
                <option key={texture.id} value={texture.id}>
                  {texture.name} - {texture.description}
                </option>
              ))}
            </select>

            <button className="add-texture-btn" onClick={handleAddTexture}>
              Adicionar Nova Textura
            </button>
          </div>

          <button className="save-button" onClick={handleSaveTextureMap}>
            Salvar TextureMap
          </button>
        </div>
      </div>

      <Game
        blockState={blockState}
        textures={textures}
        renderDistance={10}
        canPlayerFly={false}
        customModels={{}} // Não usamos models aqui
        chunks={[]}
      />
    </>
  );
};

export default TextureMap;
