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
import ModelList from "pages/Model/ModelList";
import TextureList from "pages/Model/TextureList";
import ItemList from "pages/Model/ItemList";
import Texture from "pages/Model/Texture";
import TextureMap from "pages/Model/TextureMap";
import Model from "pages/Model/Model";
import Item from "pages/Model/Item";
import TextureMapList from "pages/Model/TextureMapList";

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
      path: "/ItemCreator/ModelList",
      element: <ModelList />,
    },
    {
      path: "/ItemCreator/Model",
      element: <Model />,
    },
    {
      path: "/ItemCreator/TextureList",
      element: <TextureList />,
    },
    {
      path: "/ItemCreator/Texture",
      element: <Texture />,
    },
    {
      path: "/ItemCreator/TextureMapList",
      element: <TextureMapList />,
    },
    {
      path: "/ItemCreator/TextureMap",
      element: <TextureMap />,
    },
    {
      path: "/ItemCreator/ItemList",
      element: <ItemList />,
    },
    ,
    {
      path: "/ItemCreator/Item",
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
