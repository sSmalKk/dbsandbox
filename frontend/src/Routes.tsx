import React from "react";
import { useRoutes } from "react-router-dom";
import NotFound from "pages/NotFound";
import Inventario from "pages/Inventory";
import LoginPage from "pages/Login";
import Landingpage from "pages/Landingpage";
import Register from "pages/Register";
import Configuration from "pages/Configuration";
import SandboxMenu from "pages/SandboxMenu";
import Loading from "pages/Loading";
import Post from "pages/Post";
import SandboxSurvival from "pages/SandboxSurvival";
import Dashboard from "pages/Dashboard";
import Item from "pages/Model/Item";
import Texture from "pages/Model/Texture";
import ModelList from "pages/Model/ModelList";
import TextureList from "pages/Model/TextureList";
import EditModel from "pages/Model/EditModel";

const ProjectRoutes = () => {
  let element = useRoutes([
    {
      path: "/*",
      element: <NotFound />,
    },
    {
      path: "/Landingpage", //pagina de listas, precisa atualizar adicionanod objetos (tipo os presentes no posts pra linkar os recomendados) quando carrregar a pagina, alem disso precisa de um search e um input de categoria
      element: <Landingpage />,
    },
    {
      path: "/sandboxmenu",
      element: <SandboxMenu />,
    },
    {
      path: "/sandboxsurvival",
      element: <SandboxSurvival />,
    },
    {
      path: "/dashboard",
      element: <Dashboard />,
    },
    {
      path: "/ItemCreator/EditModel",
      element: <EditModel />,
    },
    {
      path: "/ItemCreator/ModelList",
      element: <ModelList />,
    },
    {
      path: "/ItemCreator/TextureList",
      element: <TextureList />,
    },
    {
      path: "/ItemCreator/texture",
      element: <Texture />,
    },
    {
      path: "/ItemCreator/item",
      element: <Item />,
    },
    {
      path: "/inventario", //modelo de inventario, vai de base logo logo
      element: <Inventario />,
    },
    {
      path: "/", //tela que abre antes de logar
      element: <LoginPage />,
    },
    {
      path: "/register", // registro duhh
      element: <Register />,
    },
    {
      path: "/configuration",
      element: <Configuration />,
    },
    {
      path: "/loading",
      element: <Loading />,
    },
    {
      path: "/post",
      element: <Post />,
    },
  ]);

  return element;
};

export default ProjectRoutes;
