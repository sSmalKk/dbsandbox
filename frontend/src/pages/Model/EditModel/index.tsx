import React, { useEffect, useState } from "react";
import { Sidebar } from "../../../components";
import Game from "components/Game/Game";
import { Helmet } from "react-helmet";
import { useGameStore } from "../../../store/gameStore";
import Draggable from "react-draggable"; // For the draggable input windows
import "./EditModel.css"; // Import CSS for styling

const token = localStorage.getItem("token") || process.env.JWT || "";
const savedModelId = localStorage.getItem("modelId");

const EditModel = () => {
  const {
    blockState,
    customModels,
    chunks,
    textures,
    setCustomModels,
    setBlockState,
  } = useGameStore();

  const [newModel, setNewModel] = useState(!savedModelId); // Se não houver um ID salvo, força a criação de um novo modelo
  const [modelId, setModelId] = useState(savedModelId || null);
  const [tipoSelecionado, setTipoSelecionado] = useState(1);
  const [selectedPlane, setSelectedPlane] = useState(null);
  const [modelName, setModelName] = useState("");
  const [modelData, setModelData] = useState({
    name: "",
    isActive: true,
    isDeleted: false,
    modelmap: [],
  });
  // Carregar modelo do banco se houver um ID salvo
  useEffect(() => {
    if (modelId) {
      const fetchModel = async () => {
        try {
          const response = await fetch(
            `http://localhost:5000/admin/modelos_model/${modelId}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (!response.ok) {
            throw new Error("Failed to fetch the model");
          }

          const data = await response.json();
          if (data.status === "SUCCESS") {
            // Certifique-se de que modelmap seja sempre um array
            const modelMapArray = Array.isArray(data.data.modelmap)
              ? data.data.modelmap
              : [];
            setModelData(data.data);
            setCustomModels(data.data.name, modelMapArray);
            setBlockState(0, {
              ...blockState[0],
              model: data.data.name,
              name: data.data.name,
            });
          }
        } catch (error) {
          console.error("Error fetching the model:", error);
        }
      };
      fetchModel(); // Chama a função fetchModel
    }
  }, [modelId, token, setCustomModels, setBlockState]);
  console.log("teste",blockState)

  const handleCreateModel = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/admin/modelos_model/create",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: modelName,
            isActive: true,
            isDeleted: false,
          }),
        }
      );
      const result = await response.json();
      if (result.status === "SUCCESS") {
        setModelId(result.data.id);
        localStorage.setItem("modelId", result.data.id);
        console.log("done", result.data.id);

        setNewModel(false);
      }
    } catch (error) {
      console.error("Error creating model:", error);
    }
  };

  // Função para salvar atualizações do modelo
  const handleSaveModel = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/admin/modelos_model/partial-update/${modelId}`,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            modelmap: customModels[modelData.name],
            isActive: true,
            isDeleted: false,
          }),
        }
      );
      const result = await response.json();
      if (result.status === "SUCCESS") {
        console.log("Model updated successfully:", result);
      }
    } catch (error) {
      console.error("Error updating model:", error);
    }
  };

  // Handle dropdown change for model type
  const handleDropdownChange = (e) => {
    const selectedType = parseInt(e.target.value, 10);
    setTipoSelecionado(selectedType);
    setBlockState(0, { ...blockState[0], type: selectedType });
  };

  // Handle changes in position, rotation, or render state of a plane
  const handleMapInputChange = (planeIndex, field, axis, value) => {
    const updatedPlanes = [...customModels[modelData.name]];
    updatedPlanes[planeIndex] = {
      ...updatedPlanes[planeIndex],
      [field]:
        axis !== null
          ? updatedPlanes[planeIndex][field].map((v, i) =>
              i === axis ? parseFloat(value) : v
            )
          : value,
    };
    setCustomModels(modelData.name, updatedPlanes);
  };

  // Add a new plane to the customModels
// Função para adicionar um novo plano ao customModels
const handleAddPlane = () => {
  const newPlane = {
    position: [0, 0, 0],
    rotation: [0, 0, 0],
    texture: "string",
    render: true,
  };

  const updatedPlanes = Array.isArray(customModels[modelData.name])
    ? [...customModels[modelData.name]]
    : []; // Inicializa como array vazio, se não for um array

  setCustomModels(modelData.name, [...updatedPlanes, newPlane]);
};

  // Remove a plane from the customModels
  const handleRemovePlane = (index) => {
    const updatedPlanes = customModels[modelData.name].filter(
      (_, i) => i !== index
    );
    setCustomModels(modelData.name, updatedPlanes);
    if (selectedPlane === index) {
      setSelectedPlane(null);
    } else if (selectedPlane > index) {
      setSelectedPlane(selectedPlane - 1);
    }
  };

  // Limpar o ID salvo do localStorage
  const handleClearLocalStorage = () => {
    localStorage.removeItem("modelId");
    setModelId(null);
    setNewModel(true);
  };
  console.log(modelData.name);
  return (
    <>
      <Helmet>
        <title>
          {newModel ? "Criar Novo Modelo" : `Editando: ${modelData.name}`}
        </title>
      </Helmet>

      {/* Modal para definir o nome do modelo */}
      {newModel && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Definir Nome do Modelo</h3>
            <input
              type="text"
              value={modelName}
              onChange={(e) => setModelName(e.target.value)}
              placeholder="Digite o nome do modelo"
            />
            <button onClick={handleCreateModel}>Criar Modelo</button>
          </div>
        </div>
      )}

      <div className="edit-model-container">
        <Sidebar />
        <div className="edit-model-content">
          <div className="header">
            <h2>
              {newModel ? "Criar Novo Modelo" : `Editando: ${modelData.name}`}
            </h2>
            <button className="close-button" onClick={handleClearLocalStorage}>
              Clear
            </button>
          </div>

          {/* Informações Básicas */}
          <div className="w-48 min-h-8 cardblack rounded-lg z-10 p-5">
            <h3>Informações Básicas</h3>
            <div className="basic-info">
              <label>Tipo do Modelo:</label>
              <select
                value={tipoSelecionado}
                onChange={handleDropdownChange}
                className="input-field"
              >
                <option value={1}>Bloco</option>
                <option value={2}>Esfera</option>
                <option value={3}>Plano</option>
              </select>
            </div>
          </div>

          {/* Section to display and edit planes */}
          <div className="w-48 min-h-8 cardblack rounded-lg z-10 p-5">
            <h3>Lista de Planos</h3>
                        <ul>
              {Array.isArray(customModels[modelData.name]) &&
                customModels[modelData.name].map((plane, index) => (
                  <li key={index} onClick={() => setSelectedPlane(index)}>
                    <strong>Plano {index + 1}</strong> - Posição:{" "}
                    {plane.position.join(", ")}
                    <button onClick={() => handleRemovePlane(index)}>
                      Remover
                    </button>
                  </li>
                ))}
            </ul>
            <button className="add-plane-btn" onClick={handleAddPlane}>
              Adicionar Novo Plano
            </button>
          </div>

          {/* Editor de Planos */}
          {selectedPlane !== null &&
            customModels[modelData.name] &&
            customModels[modelData.name][selectedPlane] && (
              <Draggable>
                <div className="w-48 min-h-8 cardblack rounded-lg z-10 p-5">
                  <h4>Editar Plano {selectedPlane + 1}</h4>
                  <label>Posição:</label>
                  {["X", "Y", "Z"].map((axis, i) => (
                    <input
                      key={axis}
                      type="number"
                      step="0.1"
                      value={
                        customModels[modelData.name][selectedPlane].position[
                          i
                        ] || 0
                      }
                      onChange={(e) =>
                        handleMapInputChange(
                          selectedPlane,
                          "position",
                          i,
                          e.target.value
                        )
                      }
                      className="input-small"
                    />
                  ))}

                  <label>Rotação:</label>
                  {["X", "Y", "Z"].map((axis, i) => (
                    <input
                      key={axis}
                      type="number"
                      step="0.1"
                      value={
                        customModels[modelData.name][selectedPlane].rotation[
                          i
                        ] || 0
                      }
                      onChange={(e) =>
                        handleMapInputChange(
                          selectedPlane,
                          "rotation",
                          i,
                          e.target.value
                        )
                      }
                      className="input-small"
                    />
                  ))}

                  <label>Renderizar:</label>
                  <input
                    type="checkbox"
                    checked={
                      customModels[modelData.name][selectedPlane].render ||
                      false
                    }
                    onChange={(e) =>
                      handleMapInputChange(
                        selectedPlane,
                        "render",
                        null,
                        e.target.checked
                      )
                    }
                  />
                </div>
              </Draggable>
            )}

          {/* Botão de Salvar */}
          <button className="save-button" onClick={handleSaveModel}>
            Salvar Modelo
          </button>
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

export default EditModel;
