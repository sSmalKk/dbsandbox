import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Game from "components/Game";
import { Helmet } from "react-helmet";
import { Button, Input } from "../../components";
import Modal from "react-modal";

type UniverseData = {
  name: string;
  createdAt: string;
  age: number;
  startTime: string;
  hasTime: boolean;
  expansionRate: number;
  layers: number;
  seed: string;
};

const SandboxMenu: React.FC = () => {
  const [userData, setUserData] = useState<any>(null);
  const [currentMenu, setCurrentMenu] = useState<string>("main");
  const [universes, setUniverses] = useState<UniverseData[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newUniverseData, setNewUniverseData] = useState<UniverseData>({
    name: "",
    createdAt: "",
    age: 1000,
    startTime: "",
    hasTime: false,
    expansionRate: 1,
    layers: 1,
    seed: "",
  });
  const [interfaceOpen, setInterfaceOpen] = useState<boolean>(true);

  const apiUrl = process.env.REACT_APP_API_URL || "";
  const token = localStorage.getItem("token") || process.env.JWT || "";
  const navigate = useNavigate();
  const startTimeRef = useRef<Date | null>(null);
  const sessionStartRef = useRef<string | null>(null);

  useEffect(() => {
    if (!token) {
      console.error("Token not configured");
      navigate("/");
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await fetch(`${apiUrl}/admin/user/me`, {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await response.json();
        setUserData(data.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        navigate("/");
      }
    };
    console.debug(Response)
    fetchUserData();
  }, [token, navigate, apiUrl]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const currentTime = new Date();
      if (startTimeRef.current) {
        const timeElapsed = (currentTime.getTime() - startTimeRef.current.getTime()) / 1000;
        setNewUniverseData((prevData) => ({
          ...prevData,
          age: prevData.age + Math.round(timeElapsed),
          layers: Math.round((prevData.age / prevData.expansionRate) * 1),
        }));
      } else if (newUniverseData.hasTime) {
        startTimeRef.current = currentTime;
        sessionStartRef.current = currentTime.toLocaleTimeString();
        setNewUniverseData((prevData) => ({
          ...prevData,
          startTime: sessionStartRef.current,
        }));
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [newUniverseData.hasTime, newUniverseData.expansionRate]);
  const fetchRecentUniverses = async () => {
    try {
      const response = await fetch(`${apiUrl}/admin/universe/list`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`, // Ensure you have the token available
        },
        body: JSON.stringify({
          query: {
            userId: userData.id, // Replace with the actual user ID
          },
          options: {
            sort: { createdAt: -1 }, // Sort by creation date in descending order
            limit: 10, // Limit to the 10 most recent universes
          },
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch recent universes");
      }

      const data = await response.json();
      console.log(data.data, 'data'); // Handle the universe data as needed
    } catch (error) {
      console.error("Error fetching recent universes:", error);
      // Handle the error (e.g., navigate to an error page or show a message to the user)
    }
  };
  // Call the function to fetch the recent universes
  fetchRecentUniverses();


  const handleCreateUniverse = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const createdAt = new Date().toISOString();
    const updatedUniverseData = { ...newUniverseData, createdAt };

    try {
      const response = await fetch(`${apiUrl}/admin/universe/create`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(updatedUniverseData),
      });

      if (response.ok) {
        const data = await response.json();
        setUniverses([...universes, data.data]);
        setNewUniverseData({
          name: "",
          createdAt: "",
          age: 1000,
          startTime: "",
          hasTime: false,
          expansionRate: 1,
          layers: 1,
          seed: "",
        });
        setIsModalOpen(false);
      } else {
        const errorMessage = await response.text();
        console.error("Error creating universe:", errorMessage);
      }
    } catch (error) {
      console.error("Error creating universe:", error);
    }
  };

  const renderMenuContent = () => {
    switch (currentMenu) {
      case "mine-universe":
        return (
          <div style={{ zIndex: 99 }} className="flex bg-white justify-center items-center fixed inset-0">
            <div style={{ zIndex: 99, background: "#fff" }} className="w-2/3 bg-white text-gray-900 p-4 rounded-lg shadow-lg">
              {universes.map((universe, index) => (
                <div key={index} className="world-card border p-2 mb-2">
                  <h2>{universe.name}</h2>
                  <p>Created At: {universe.createdAt}</p>
                  <p>Age: {universe.age}</p>
                  <p>Layers: {universe.layers}</p>
                </div>
              ))}
              <div className="w-full bg-gray-200 p-4 rounded-lg">
                <h2 className="text-xl font-bold mb-4">Create Universe</h2>
                <form onSubmit={handleCreateUniverse} className="space-y-4">
                  <div>
                    <label className="block mb-2">
                      Name:
                      <Input
                        type="text"
                        name="name"
                        className="input-field"
                      />
                    </label>
                  </div>
                  <div>
                    <label className="block mb-2">
                      Age:
                      <Input
                        type="number"
                        name="age"
                        min="0"
                        className="input-field"
                      />
                    </label>
                  </div>
                  <div>
                    <label className="flex items-center mb-2">
                      <Input
                        type="checkbox"
                        name="hasTime"
                        className="mr-2"
                      />
                      <span>Has Time</span>
                    </label>
                  </div>
                  <div>
                    <label className="block mb-2">
                      Expansion Rate:
                      <Input
                        type="number"
                        name="expansionRate"
                        min="0"
                        className="input-field"
                      />
                    </label>
                  </div>
                  <div>
                    <label className="block mb-2">
                      Seed:
                      <Input
                        type="text"
                        name="seed"
                        className="input-field"
                      />
                    </label>
                  </div>
                  <div className="flex justify-between">
                    <Button type="submit" className="button-primary">
                      Create
                    </Button>
                    <Button type="button" onClick={() => setIsModalOpen(false)} className="button-secondary">
                      Cancel
                    </Button>
                    <Button type="button" onClick={() => setCurrentMenu("main")} className="button-secondary">
                      Back
                    </Button>
                  </div>
                </form>
              </div>

            </div>
          </div>
        );
      case "enter-universe":
      case "settings":
      case "items":
        return (
          <div style={{ zIndex: 99 }} className="flex bg-white justify-center items-center fixed inset-0">
            <div className="w-2/3 bg-white text-gray-900 p-4 rounded-lg shadow-lg">
              <h1>{currentMenu === "enter-universe" ? "Enter Universe" : currentMenu === "settings" ? "Settings" : "Items"}</h1>
              <Button onClick={() => setCurrentMenu("main")} className="button-secondary mt-4">
                Back
              </Button>
            </div>
          </div>
        );
      case "main":
      default:
        return (
          <div style={{ zIndex: 99 }} className="flex bg-white justify-center items-center fixed inset-0">
            <div style={{ background: "#fff" }} className="w-2/3 bg-white text-gray-900 p-4 rounded-lg shadow-lg">
              <h1>Welcome {userData && userData.username ? userData.username : "User"}</h1>
              <Button onClick={() => setCurrentMenu("mine-universe")} className="button-primary mt-4">
                My Universes
              </Button>
              <Button onClick={() => setCurrentMenu("enter-universe")} className="button-primary mt-4">
                Enter Universe
              </Button>
              <Button onClick={() => setCurrentMenu("settings")} className="button-primary mt-4">
                Settings
              </Button>
              <Button onClick={() => setCurrentMenu("items")} className="button-primary mt-4">
                Items
              </Button>
            </div>
          </div>
        );
    }
  };

  return (
    <>
      <Helmet>
        <title>Sandbox Menu</title>
      </Helmet>
      <div style={{ zIndex: 99 }} className={`flex bg-white justify-center items-center fixed inset-0 interface ${interfaceOpen ? "open" : "closed"}`}>
        {renderMenuContent()}
      </div>
      <Game
        setInterfaceOpen={setInterfaceOpen}
        interfaceOpen={interfaceOpen}
        textures={["../assets/textures/dirt.jpg", "./assets/textures/grass.jpg"]}
        chunks={[
          {
            position: [1, 0, 0],
            cubesArray: [
              [0, 0, 0, 0, { position: [1, 0, 0], cubesArray: [[0, 0, 0, 0, 0]] }],
              [1, 0, 0, 1, 0],
            ],
          },
        ]}
        renderDistance={10}
        canPlayerFly={true}
        isMouseLocked={false}
      />
    </>
  );
};

export default SandboxMenu;
