import React, { useState, useEffect } from "react";
import { listEntries, deleteEntry } from "../store/CentralizedDatabaseActions";
import { useHistory } from "react-router-dom";

const ListPage = ({ modelType, mode }) => {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    setLoading(true);
    const data = await listEntries(mode, modelType);
    setEntries(data);
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this entry?")) {
      await deleteEntry(mode, modelType, id);
      fetchEntries();
    }
  };

  const handleCreate = () => {
    history.push(`/create/${modelType}`);
  };

  const handleEdit = (id) => {
    history.push(`/edit/${modelType}/${id}`);
  };

  return (
    <div>
      <h1>List of {modelType}</h1>
      <button onClick={handleCreate}>Create New {modelType}</button>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry) => (
              <tr key={entry._id}>
                <td>{entry._id}</td>
                <td>{entry.name || "No Name"}</td>
                <td>
                  <button onClick={() => handleEdit(entry._id)}>Edit</button>
                  <button onClick={() => handleDelete(entry._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ListPage;
