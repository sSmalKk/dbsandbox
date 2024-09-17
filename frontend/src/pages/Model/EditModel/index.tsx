import React, { useState } from "react";
import { Sidebar } from "../../../components";
import Game from "components/Game/Game";
import { Helmet } from "react-helmet";
import { useGameStore } from "../../../store/gameStore";
import "./EditModel.css"; // Import CSS for styling

const token = localStorage.getItem("token") || process.env.JWT || "";

const EditModel = () => {
  const {
    blockState,
    customModels,
    chunks,
    textures,
    setCustomModels,
    setBlockState,
  } = useGameStore();

  const [modelData, setModelData] = useState({
    name: "",
    type: 1,
    texture: "",
    isDeleted: false,
    isActive: true,
    modelmap: [
      {
        position: [0, 0, 0],
        rotation: [0, 0, 0],
        texture: "string",
        render: true,
      }, // Plane 1
      {
        position: [1, 1, 1],
        rotation: [0, 0, 0],
        texture: "string",
        render: true,
      }, // Plane 2
    ],
  });

  const [newModel, setNewModel] = useState(false);
  const [tipoSelecionado, setTipoSelecionado] = useState(1);

  // Handle changes to individual planes' position and rotation
  const handleMapInputChange = (planeIndex, field, axis, value) => {
    setModelData((prev) => {
      const updatedMap = [...prev.modelmap];
      updatedMap[planeIndex] = {
        ...updatedMap[planeIndex],
        [field]:
          axis !== null
            ? updatedMap[planeIndex][field].map((v, i) =>
                i === axis ? parseFloat(value) : v
              )
            : value,
      };
      return { ...prev, modelmap: updatedMap };
    });
  };

  // Handle input change for model name
  const handleNameChange = (e) => {
    setModelData((prev) => ({ ...prev, name: e.target.value }));
  };

  // Handle dropdown change for model type
  const handleDropdownChange = (e) => {
    const selectedType = parseInt(e.target.value, 10);
    setTipoSelecionado(selectedType);
    setModelData((prev) => ({ ...prev, type: selectedType }));
  };

  // Handle creating a new model
  const handleCreateModel = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/admin/modelos_item/create",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({data:modelData}),
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      console.log("Model created successfully:", result);

      // Update Zustand store with new model
      setCustomModels(modelData.name, modelData.modelmap);
    } catch (error) {
      console.error("Error creating model:", error);
    }
  };

  // Handle saving the model to the Zustand store
  const handleSaveModel = () => {
    console.log("Saving model to Zustand store:", modelData);
  
    // Set the block state with the name "stairs" and its properties
    setBlockState(0, {
      name: "stairs", // Force the name to be "stairs"
      texture: modelData.modelmap[0].texture, // Assign only the first texture
      model: "stairs", // Set the model name to "stairs"
      textures: modelData.modelmap.map((plane) => plane.texture), // Keep multiple textures in the textures array
      RigidBody: blockState[0].RigidBody,
      RigidBodyType: blockState[0].RigidBodyType,
    });
  
    // Update Zustand store with the custom model named "stairs"
    setCustomModels("stairs", modelData.modelmap);
  };
  
  return (
    <>
      <Helmet>
        <title>
          {newModel ? "Criar Novo Modelo" : `Editando: ${modelData.name}`}
        </title>
      </Helmet>

      <div className="edit-model-container">
        <Sidebar />
        <div className="edit-model-content">
          <h2>
            {newModel ? "Criar Novo Modelo" : `Editando: ${modelData.name}`}
          </h2>

          <div className="edit-model-sidebar">
            <h3>Lista de Planos</h3>
            <ul>
              {modelData.modelmap.map((plane, index) => (
                <li key={index}>
                  <strong>Plano {index + 1}</strong> - Posição:{" "}
                  {plane.position.join(", ")}
                </li>
              ))}
            </ul>
          </div>

          <div className="edit-model-form">
            <label>
              Nome do Modelo:
              <input
                type="text"
                value={modelData.name}
                onChange={handleNameChange}
                className="input-field"
              />
            </label>

            <label>
              Tipo do Modelo:
              <select
                value={tipoSelecionado}
                onChange={handleDropdownChange}
                className="input-field"
              >
                <option value={1}>Bloco</option>
                <option value={2}>Esfera</option>
                <option value={3}>Plano</option>
              </select>
            </label>

            <div className="plane-edit-section">
              {modelData.modelmap.map((plane, index) => (
                <div key={index} className="plane-edit">
                  <h4>Plano {index + 1} - Editar</h4>
                  <label>
                    Posição:
                    <input
                      type="number"
                      value={plane.position[0]}
                      onChange={(e) =>
                        handleMapInputChange(
                          index,
                          "position",
                          0,
                          e.target.value
                        )
                      }
                      className="input-small"
                    />
                    <input
                      type="number"
                      value={plane.position[1]}
                      onChange={(e) =>
                        handleMapInputChange(
                          index,
                          "position",
                          1,
                          e.target.value
                        )
                      }
                      className="input-small"
                    />
                    <input
                      type="number"
                      value={plane.position[2]}
                      onChange={(e) =>
                        handleMapInputChange(
                          index,
                          "position",
                          2,
                          e.target.value
                        )
                      }
                      className="input-small"
                    />
                  </label>

                  <label>
                    Rotação:
                    <input
                      type="number"
                      value={plane.rotation[0]}
                      onChange={(e) =>
                        handleMapInputChange(
                          index,
                          "rotation",
                          0,
                          e.target.value
                        )
                      }
                      className="input-small"
                    />
                    <input
                      type="number"
                      value={plane.rotation[1]}
                      onChange={(e) =>
                        handleMapInputChange(
                          index,
                          "rotation",
                          1,
                          e.target.value
                        )
                      }
                      className="input-small"
                    />
                    <input
                      type="number"
                      value={plane.rotation[2]}
                      onChange={(e) =>
                        handleMapInputChange(
                          index,
                          "rotation",
                          2,
                          e.target.value
                        )
                      }
                      className="input-small"
                    />
                  </label>

                  <label>
                    Renderizar:
                    <input
                      type="checkbox"
                      checked={plane.render}
                      onChange={(e) =>
                        handleMapInputChange(
                          index,
                          "render",
                          null,
                          e.target.checked
                        )
                      }
                    />
                  </label>
                </div>
              ))}
            </div>

            <div className="button-container">
              <button onClick={handleSaveModel} className="btn-save">
                Salvar
              </button>
              <button onClick={handleCreateModel} className="btn-create-new">
                Criar Novo
              </button>
            </div>
          </div>
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
