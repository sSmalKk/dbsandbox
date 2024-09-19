import React, { useEffect, useState } from "react";
import { Sidebar } from "../../../components";
import { Helmet } from "react-helmet";
import { useGameStore } from "../../../store/gameStore"; // Zustand store
import Navegador from "components/Navegador";
import "./ItemList.css"; // Arquivo CSS para customizar o estilo da lista

const ItemList = () => {
  const [itens, setItens] = useState([]);
  const { navegar } = Navegador(); // Usar o Navegador

  const fetchItens = async () => {
    const token = localStorage.getItem("token") || process.env.JWT || "";
    try {
      const response = await fetch(
        `http://localhost:5000/admin/modelos_item/list`,
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
        setItens(data.data.data); // Use data.data assumindo que a resposta da API contém um array de dados
      } else {
        console.error("Formato inesperado na resposta da API", data);
      }
    } catch (error) {
      console.error("Erro ao buscar itens:", error);
    }
  };

  useEffect(() => {
    fetchItens();
  }, []);

  const handleEdit = (itemId) => {
    // Salvar o ID do item no localStorage
    localStorage.setItem("selectedItemId", itemId);
    // Redirecionar para a página de edição
    navegar(`/ItemCreator/EditItem/`);
  };

  const handleDelete = async (itemId) => {
    const token = localStorage.getItem("token") || process.env.JWT || "";
    const confirmDelete = window.confirm(
      "Tem certeza que deseja deletar esse item?"
    );

    if (confirmDelete) {
      try {
        const response = await fetch(
          `http://localhost:5000/admin/modelos_item/delete/${itemId}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const result = await response.json();
        if (result.status === "SUCCESS") {
          alert("Item deletado com sucesso!");
          // Re-fetch items para forçar atualização após deletar
          fetchItens();
        } else {
          console.error("Erro ao deletar item:", result);
        }
      } catch (error) {
        console.error("Erro ao deletar item:", error);
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>Lista de Itens</title>
      </Helmet>
      <div className="item-list-container">
        <Sidebar />
        <div className="item-list-content">
          <h2>Lista de Itens</h2>
          <ul className="item-list">
            {itens.length > 0 ? (
              itens.map((item) => (
                <li key={item._id || item.id} className="item-item">
                  <div className="item-info">
                    <strong>Nome:</strong> {item.name} <br />
                    <strong>Descrição:</strong> {item.description} <br />
                    <strong>Modelo ID:</strong> {item.model} <br />
                    <strong>Textura ID:</strong> {item.texture} <br />
                  </div>
                  <div className="item-actions">
                    <button onClick={() => handleEdit(item._id || item.id)}>
                      Editar
                    </button>
                    <button onClick={() => handleDelete(item._id || item.id)}>
                      Excluir
                    </button>
                  </div>
                </li>
              ))
            ) : (
              <li className="no-itens">Nenhum item encontrado</li>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default ItemList;
