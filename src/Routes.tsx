import React from "react";
import { useRoutes } from "react-router-dom";
import NotFound from "pages/NotFound";
import Inventario from "pages/Inventory";
import LoginPage from "pages/Login";
import Register from "pages/Register";
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
import TexturePartList from "pages/Model/TexturePartList";
import TexturePart from "pages/Model/TexturePart";
const apiUrl = "https://ea3298-base-sandbox.dhiwise.co";

const ProjectRoutes = () => {
  let element = useRoutes([
    {
      path: "/*",
      element: <NotFound />,
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
    ,
    {
      path: "/ItemCreator/TexturePartList",
      element: <TexturePartList />,
    },
    {
      path: "/ItemCreator/TexturePart",
      element: <TexturePart />,
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
      element: <LoginPage apiUrl={apiUrl} />,
    },
    {
      path: "/register", // registro duhh
      element: <Register />,
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
