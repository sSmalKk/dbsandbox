import React, { useState, useEffect } from "react";
import { Sidebar } from "../../../components";
import Game from "components/Game/Game";
import { Helmet } from "react-helmet";
import { useGameStore } from "../../../store/gameStore";
const token = localStorage.getItem("token") || process.env.JWT || "";

const EditModel = () => {
  const { blockState, customModels, chunks, textures } = useGameStore();

  const [modelData, setModelData] = useState({
    name: "",
    type: 1,
    texture: [],
    isDeleted: false,
    isActive: true,
    modelmap: [
      { position: [0, 0, 0], rotation: [0, 0, 0], texture: "string" }, // Plane 1
      { position: [1, 1, 1], rotation: [0, 0, 0], texture: "string" }, // Plane 2
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
        [field]: updatedMap[planeIndex][field].map((v, i) =>
          i === axis ? parseFloat(value) : v
        ),
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
          body: JSON.stringify(modelData),
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const contentType = response.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== -1) {
        const result = await response.json();
        console.log("Model created successfully:", result);
      } else {
        console.error("Response is not JSON");
      }
    } catch (error) {
      console.error("Error creating model:", error);
    }
  };
  console.log("token:", token);
  console.log("token:", modelData);

  return (
    <>
      <Helmet>
        <title>
          {newModel ? "Criar Novo Modelo" : `Editando: ${modelData.name}`}
        </title>
      </Helmet>

      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(128, 128, 128, 0.5)",
          color: "#fff",
        }}
      >
        <Sidebar />
        <div style={{ padding: "20px", width: "100%" }}>
          {newModel ? (
            <div>
              <h2>Criar Novo Modelo</h2>
              <label>
                Nome do Modelo:
                <input
                  type="text"
                  value={modelData.name}
                  onChange={handleNameChange}
                  style={{ color: "#000", margin: "10px", padding: "10px" }}
                />
              </label>

              <label>
                Tipo do Modelo:
                <select
                  value={tipoSelecionado}
                  onChange={handleDropdownChange}
                  style={{ color: "#000", margin: "10px", padding: "10px" }}
                >
                  <option value={1}>Bloco</option>
                  <option value={2}>Esfera</option>
                  <option value={3}>Plano</option>
                </select>
              </label>

              <button
                onClick={handleCreateModel}
                style={{
                  padding: "10px",
                  marginTop: "20px",
                  backgroundColor: "#444",
                  color: "#fff",
                }}
              >
                Criar Modelo
              </button>
            </div>
          ) : (
            <div>
              <h2>Editando: {modelData.name}</h2>
              <div>
                {modelData.modelmap.map((plane, index) => (
                  <div key={index}>
                    <h4>Plane {index + 1} - Position</h4>
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
                      style={{ margin: "10px" }}
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
                      style={{ margin: "10px" }}
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
                      style={{ margin: "10px" }}
                    />

                    <h4>Plane {index + 1} - Rotation</h4>
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
                      style={{ margin: "10px" }}
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
                      style={{ margin: "10px" }}
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
                      style={{ margin: "10px" }}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
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
