import React, { useState, useEffect } from "react";
import { Sidebar } from "../../../components";
import Game from "components/Game/Game";
import { Helmet } from "react-helmet";
import { useGameStore } from "../../../store/gameStore";
import Navegador from "components/Navegador";
import "./Item.css"; // Arquivo CSS para customizar o estilo da página de edição

const Item = () => {
  const { blockState, customModels, setBlockState, textures, chunks } =
    useGameStore();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [modelId, setModelId] = useState("");
  const [textureId, setTextureId] = useState("");
  const [modelList, setModelList] = useState([]);
  const [textureList, setTextureList] = useState([]);
  const { navegar } = Navegador();

  const fetchModelos = async () => {
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
        setModelList(data.data.data);
      }
    } catch (error) {
      console.error("Erro ao buscar modelos:", error);
    }
  };

  const fetchTextures = async () => {
    const token = localStorage.getItem("token") || process.env.JWT || "";
    try {
      const response = await fetch(
        `http://localhost:5000/admin/modelos_texturemap/list`,
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
        setTextureList(data.data.data);
      }
    } catch (error) {
      console.error("Erro ao buscar texturas:", error);
    }
  };

  const saveItem = async () => {
    const token = localStorage.getItem("token") || process.env.JWT || "";
    const itemId = localStorage.getItem("selectedItemId");

    const bodyData = {
      name,
      description,
      model: modelId,
      texture: textureId,
    };

    const url = itemId
      ? `http://localhost:5000/admin/modelos_item/update/${itemId}`
      : `http://localhost:5000/admin/modelos_item/create`;

    const method = itemId ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(bodyData),
      });

      const result = await response.json();

      if (result.status === "SUCCESS") {
        alert("Item salvo com sucesso!");
        localStorage.removeItem("selectedItemId");
        navegar("/ItemCreator/ItemList");
      } else {
        console.error("Erro ao salvar item:", result);
      }
    } catch (error) {
      console.error("Erro ao salvar item:", error);
    }
  };

  useEffect(() => {
    fetchModelos();
    fetchTextures();
    const itemId = localStorage.getItem("selectedItemId");
    if (itemId) {
      // Se houver item salvo, carregar os dados para edição
      // Adicionar fetch para buscar o item por ID e setar os estados adequados
    }
  }, []);

  return (
    <>
      <Helmet>
        <title>Editar Item</title>
      </Helmet>
      <div className="item-edit-container">
        <Sidebar />

        <div className="cardblack item-edit-content">
          <h2>Editar Item</h2>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nome do Item"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Descrição do Item"
          />

          <select value={modelId} onChange={(e) => setModelId(e.target.value)}>
            <option value="">Selecione um Modelo</option>
            {modelList.map((model) => (
              <option key={model._id} value={model._id}>
                {model.name}
              </option>
            ))}
          </select>

          <select
            value={textureId}
            onChange={(e) => setTextureId(e.target.value)}
          >
            <option value="">Selecione uma Textura</option>
            {textureList.map((texture) => (
              <option key={texture._id} value={texture._id}>
                {texture.name}
              </option>
            ))}
          </select>

          <button onClick={saveItem}>Salvar Item</button>
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

export default Item;
