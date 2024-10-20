import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Button, Input, Text } from "../../components";

export default function LoginPage() {
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [serverUrl, setServerUrl] = useState(localStorage.getItem("server") || "");
  const [message, setMessage] = useState<string>("");
  const [role, setRole] = useState(localStorage.getItem("userRole") || "admin"); // "admin" por padrão

  useEffect(() => {
    const savedServerUrl = localStorage.getItem("server");
    if (savedServerUrl) {
      setServerUrl(savedServerUrl);
    }
  }, []);

  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const username = (e.currentTarget.elements.namedItem("login-username") as HTMLInputElement).value;
    const password = (e.currentTarget.elements.namedItem("login-password") as HTMLInputElement).value;
    
    // Seleção da rota com base no tipo de usuário
    const loginRoute = role === "admin" ? "/admin/auth/login" : "/client/auth/login";

    const formData = JSON.stringify({
      username,
      password,
    });

    try {
      const response = await fetch(`${serverUrl}${loginRoute}`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Device-Secret': 'myjwtclientsecret',
          'Credentials': 'include'
        },
        body: formData
      });

      if (response.ok) {
        const data = await response.json();
        const authToken = data.data.token;
        localStorage.setItem('token', authToken);
        setLoginSuccess(true);
        setLoginError(false);
        window.location.href = "/dashboard";
      } else {
        const errorMessage = await response.text();
        setMessage(errorMessage);
        setLoginError(true);
        setLoginSuccess(false);
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setLoginError(true);
      setLoginSuccess(false);
    }
  };

  const handleServerSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const serverInput = (e.currentTarget.elements.namedItem("server-url") as HTMLInputElement).value;
    setServerUrl(serverInput);
    localStorage.setItem("server", serverInput);
  };

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedRole = e.target.value;
    setRole(selectedRole);
    localStorage.setItem("userRole", selectedRole); // Salva o tipo de usuário no localStorage
  };

  return (
    <>
      <Helmet>
        <title>Role Player</title>
        <meta name="description" content="Web site created using create-react-app" />
      </Helmet>
      <div className="flex flex-col items-center justify-start w-[32%] md:w-full mt-[19px] ml-[830px] mr-[72px] md:mx-5">
        
        {/* Se não houver servidor salvo, mostrar o campo para adicionar a URL do servidor */}
        {!serverUrl && (
          <form onSubmit={handleServerSubmit} className="flex flex-col items-center justify-start w-full p-5 gap-4 bg-black-900_60">
            <Text size="md" as="p" className="mb-3 text-white">
              Add Server URL
            </Text>
            <Input
              name="server-url"
              placeholder="Server URL"
              defaultValue={serverUrl}
              className="w-full h-[57px] text-gray-A700 bg-gray-800 rounded px-2"
            />
            <Button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded w-full">
              Save Server
            </Button>
          </form>
        )}

        {/* Formulário de Login */}
        <form onSubmit={handleLoginSubmit} className="flex flex-col items-center justify-start w-full p-5 bg-black-900_60 gap-4">
          {loginSuccess && (
            <div className="flex flex-col items-center justify-center w-full bg-green-300">
              <Text size="s" as="p" className="!text-green-700 !font-inter">
                Login successful!
              </Text>
            </div>
          )}
          {loginError && (
            <div className="flex flex-col items-center justify-start w-full p-5 bg-red-300">
              <Text size="s" as="p" className="mt-[29px] !text-red-700 !font-inter">
                Failed to login. Please try again.
              </Text>
            </div>
          )}
          <div className="flex flex-col w-full gap-4">
            <div className="flex flex-col items-start justify-start w-full">
              <Text size="md" as="p" className="tracking-[0.50px] text-white">
                Login
              </Text>
              <Input
                name="login-username"
                placeholder="Login"
                className="w-full h-[57px] text-gray-A700 bg-gray-800 rounded px-2"
              />
            </div>
            <div className="flex flex-col items-start justify-start w-full">
              <Text size="md" as="p" className="tracking-[0.50px] text-white">
                Password
              </Text>
              <Input
                name="login-password"
                type="password"
                placeholder="********"
                className="w-full h-[57px] text-gray-A700 bg-gray-800 rounded px-2"
              />
            </div>

            {/* Dropdown de seleção de papel (Admin ou Cliente) */}
            <div className="flex flex-col w-full">
              <Text size="md" as="p" className="tracking-[0.50px] text-white mb-2">
                Login as
              </Text>
              <select
                id="role"
                name="role"
                value={role}
                onChange={handleRoleChange}
                className="w-full h-[57px] text-black bg-gray-800 p-2 rounded border border-gray-300">
                <option value="client">Cliente</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <Button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded w-full">
              Login
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
