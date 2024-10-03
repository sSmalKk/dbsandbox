import React, { useEffect, useState } from "react";
import { Sidebar } from "../../../components";
import { Helmet } from "react-helmet";
import "./TexturePart.css"; // Import your CSS styles

const token = localStorage.getItem("token") || process.env.JWT || "";

const TexturePart = () => {
  // States for managing texture parts
  const [textureData, setTextureData] = useState({
    name: "",
    description: "",
    isActive: true,
    isDeleted: false,
    tag: "",
    rule: "",
  });
  const [tagData, setTagData] = useState({
    name: "",
    description: "",
    isActive: true,
    isDeleted: false,
  });
  const [ruleData, setRuleData] = useState({
    name: "",
    description: "",
    isActive: true,
    isDeleted: false,
  });

  // Dropdown values
  const [availableParts, setAvailableParts] = useState([]);
  const [availableTags, setAvailableTags] = useState([]);
  const [availableRules, setAvailableRules] = useState([]);

  // Selected values
  const [selectedPart, setSelectedPart] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [selectedRule, setSelectedRule] = useState("");

  // Fetch lists
  const fetchParts = async () => {
    try {
      const response = await fetch("http://localhost:5000/admin/modelos_part/list", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setAvailableParts(data.data);
    } catch (error) {
      console.error("Error fetching texture parts:", error);
    }
  };

  const fetchTags = async () => {
    try {
      const response = await fetch("http://localhost:5000/admin/modelos_tag/list", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setAvailableTags(data.data);
    } catch (error) {
      console.error("Error fetching tags:", error);
    }
  };

  const fetchRules = async () => {
    try {
      const response = await fetch("http://localhost:5000/admin/modelos_rule/list", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setAvailableRules(data.data);
    } catch (error) {
      console.error("Error fetching rules:", error);
    }
  };

  useEffect(() => {
    fetchParts();
    fetchTags();
    fetchRules();
  }, []);

  // Handle Select Change and Fetch Data
  const handleSelectPart = (id) => {
    const selected = availableParts.find((part) => part._id === id);
    setTextureData(selected);
    setSelectedPart(id);
  };

  const handleSelectTag = (id) => {
    const selected = availableTags.find((tag) => tag._id === id);
    setTagData(selected);
    setSelectedTag(id);
  };

  const handleSelectRule = (id) => {
    const selected = availableRules.find((rule) => rule._id === id);
    setRuleData(selected);
    setSelectedRule(id);
  };

  // Save functions
  const handleSavePart = async () => {
    try {
      const response = await fetch(
        selectedPart
          ? `http://localhost:5000/admin/modelos_part/partial-update/${selectedPart}`
          : "http://localhost:5000/admin/modelos_part/create",
        {
          method: selectedPart ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(textureData),
        }
      );
      const result = await response.json();
      if (result.status === "SUCCESS") {
        alert("Texture Part saved successfully");
        fetchParts();
      }
    } catch (error) {
      console.error("Error saving texture part:", error);
    }
  };

  const handleSaveTag = async () => {
    try {
      const response = await fetch(
        selectedTag
          ? `http://localhost:5000/admin/modelos_tag/partial-update/${selectedTag}`
          : "http://localhost:5000/admin/modelos_tag/create",
        {
          method: selectedTag ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(tagData),
        }
      );
      const result = await response.json();
      if (result.status === "SUCCESS") {
        alert("Tag saved successfully");
        fetchTags();
      }
    } catch (error) {
      console.error("Error saving tag:", error);
    }
  };

  const handleSaveRule = async () => {
    try {
      const response = await fetch(
        selectedRule
          ? `http://localhost:5000/admin/modelos_rule/partial-update/${selectedRule}`
          : "http://localhost:5000/admin/modelos_rule/create",
        {
          method: selectedRule ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(ruleData),
        }
      );
      const result = await response.json();
      if (result.status === "SUCCESS") {
        alert("Rule saved successfully");
        fetchRules();
      }
    } catch (error) {
      console.error("Error saving rule:", error);
    }
  };

  return (
    <>
      <Helmet>
        <title>Manage Texture Part, Tag, and Rule</title>
      </Helmet>

      <div className="edit-texturemap-container">
        <Sidebar />
        <div className="edit-texturemap-content">
          <h2>Manage Texture Part, Tag, and Rule</h2>

          {/* Texture Part */}
          <div className="cardblack rounded-lg p-5">
            <h3>Texture Part</h3>
            <select
              value={selectedPart}
              onChange={(e) => handleSelectPart(e.target.value)}
            >
              <option value="">Select a Texture Part</option>
              {availableParts.map((part) => (
                <option key={part._id} value={part._id}>
                  {part.name}
                </option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Name"
              value={textureData.name}
              onChange={(e) =>
                setTextureData({ ...textureData, name: e.target.value })
              }
            />
            <textarea
              placeholder="Description"
              value={textureData.description}
              onChange={(e) =>
                setTextureData({ ...textureData, description: e.target.value })
              }
            />
            <button onClick={handleSavePart}>Save Texture Part</button>
          </div>

          {/* Tag */}
          <div className="cardblack rounded-lg p-5">
            <h3>Tag</h3>
            <select
              value={selectedTag}
              onChange={(e) => handleSelectTag(e.target.value)}
            >
              <option value="">Select a Tag</option>
              {availableTags.map((tag) => (
                <option key={tag._id} value={tag._id}>
                  {tag.name}
                </option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Tag Name"
              value={tagData.name}
              onChange={(e) =>
                setTagData({ ...tagData, name: e.target.value })
              }
            />
            <textarea
              placeholder="Tag Description"
              value={tagData.description}
              onChange={(e) =>
                setTagData({ ...tagData, description: e.target.value })
              }
            />
            <button onClick={handleSaveTag}>Save Tag</button>
          </div>

          {/* Rule */}
          <div className="cardblack rounded-lg p-5">
            <h3>Rule</h3>
            <select
              value={selectedRule}
              onChange={(e) => handleSelectRule(e.target.value)}
            >
              <option value="">Select a Rule</option>
              {availableRules.map((rule) => (
                <option key={rule._id} value={rule._id}>
                  {rule.name}
                </option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Rule Name"
              value={ruleData.name}
              onChange={(e) =>
                setRuleData({ ...ruleData, name: e.target.value })
              }
            />
            <textarea
              placeholder="Rule Description"
              value={ruleData.description}
              onChange={(e) =>
                setRuleData({ ...ruleData, description: e.target.value })
              }
            />
            <button onClick={handleSaveRule}>Save Rule</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TexturePart;
