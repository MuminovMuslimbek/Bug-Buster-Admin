import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Lock } from "lucide-react";

const Login: React.FC = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();

        if (username === "admin" && password === "admin") {
            localStorage.setItem("isAuth", "true");
            navigate("/");
        } else {
            setError("❌ Username yoki password noto‘g‘ri!");
        }
    };

    return (
        <div className="h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black">
            <div className="bg-gray-900/90 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-96 border border-gray-700">
                <h1 className="text-3xl font-bold mb-6 text-center text-white">
                    Admin Login
                </h1>
                {error && (
                    <p className="text-red-500 mb-3 text-sm text-center">{error}</p>
                )}
                <form onSubmit={handleLogin} className="space-y-4">
                    {/* Username */}
                    <div className="flex items-center border border-gray-700 rounded-lg p-2 bg-gray-800 focus-within:ring-2 focus-within:ring-blue-500">
                        <User className="w-5 h-5 text-gray-400 mr-2" />
                        <input
                            type="text"
                            placeholder="Username"
                            className="flex-1 bg-transparent outline-none text-white"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

                    {/* Password */}
                    <div className="flex items-center border border-gray-700 rounded-lg p-2 bg-gray-800 focus-within:ring-2 focus-within:ring-blue-500">
                        <Lock className="w-5 h-5 text-gray-400 mr-2" />
                        <input
                            type="password"
                            placeholder="Password"
                            className="flex-1 bg-transparent outline-none text-white"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    {/* Button */}
                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-2 rounded-lg font-semibold shadow-md hover:opacity-90 transition"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
