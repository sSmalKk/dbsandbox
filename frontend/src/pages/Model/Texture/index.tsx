import React, { useState } from "react";
import { Sidebar } from "../../../components";
import Game from "components/Game/Game";
import { Helmet } from "react-helmet";
import { useGameStore } from "../../../store/gameStore";
import "./EditTexture.css";

const token = localStorage.getItem("token") || process.env.JWT || "";
const Texture = () => {
  const {
    chunks,
    customModels,
    blockState,
    textures,
    setTextures,
    setBlockState,
  } = useGameStore();

  const [selectedTexture, setSelectedTexture] = useState("");
  const [newTextureName, setNewTextureName] = useState("");
  const [textureDescription, setTextureDescription] = useState(""); // Novo estado para descrição
  const [uploadedFile, setUploadedFile] = useState(null);

  // Função para lidar com o upload de arquivo
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    setUploadedFile(file);
  };

  // Função para enviar o arquivo de textura ao servidor
  const handleUpload = async () => {
    if (!uploadedFile) {
      alert("Selecione um arquivo primeiro!");
      return;
    }

    const formData = new FormData();
    formData.append("files", uploadedFile);

    try {
      const response = await fetch("http://localhost:5000/admin/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (data.status === "SUCCESS") {
        const uploadPath = data.data.uploadSuccess[0].path;

        // Atualiza as texturas no Zustand
        const textureName = newTextureName || uploadedFile.name;
        setTextures(textureName, "http://localhost:5000" + uploadPath);

        // Atualiza o blockState
        setBlockState(0, {
          ...blockState[0],
          texture: textureName,
        });

        // Criação do registro no servidor
        await createTextureRecord(textureName, textureDescription, uploadPath);

        alert("Textura enviada com sucesso!");
      }
    } catch (error) {
      console.error("Erro ao enviar a textura:", error);
    }
  };

  // Função para criar um registro de textura no backend
  const createTextureRecord = async (name, description, path) => {
    try {
      const response = await fetch(
        "http://localhost:5000/admin/modelos_texture/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name,
            description,
            link: path, // caminho do arquivo
          }),
        }
      );
      const result = await response.json();

      if (result.status === "SUCCESS") {
        console.log("Textura salva no servidor:", result.data);
      } else {
        console.error("Erro ao salvar a textura no servidor:", result);
      }
    } catch (error) {
      console.error("Erro ao criar o registro da textura:", error);
    }
  };

  return (
    <>
      <Helmet>
        <title>Editar Textura</title>
      </Helmet>

      <div className="edit-texture-container">
        <Sidebar />

        <div className="edit-texture-content">
          <div className="header">
            <h2>Editar Textura</h2>
          </div>

          {/* Seção de upload de arquivos */}
          <div className="upload-section cardblack">
            <h3>Upload de Textura</h3>
            <input type="file" onChange={handleFileUpload} />
            <input
              type="text"
              value={newTextureName}
              onChange={(e) => setNewTextureName(e.target.value)}
              placeholder="Nome da Textura (opcional)"
              className="input-field"
            />
            <textarea
              value={textureDescription}
              onChange={(e) => setTextureDescription(e.target.value)}
              placeholder="Descrição da Textura (opcional)"
              className="input-field"
            />
            <button onClick={handleUpload} className="upload-button">
              Upload e Salvar Textura
            </button>
          </div>

          {/* Seção para visualização das texturas atuais */}
          <div className="texture-list cardblack">
            <h3>Texturas Atuais</h3>
            <ul>
              {Object.keys(textures).map((texture) => (
                <li key={texture}>
                  <strong>{texture}</strong> -{" "}
                  <img
                    src={textures[texture]}
                    alt={texture}
                    className="texture-preview"
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <Game
        blockState={blockState}
        textures={textures}
        renderDistance={10}
        canPlayerFly={false}
        customModels={customModels}
        chunks={chunks}
      />
    </>
  );
};

export default Texture;
