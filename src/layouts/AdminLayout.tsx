import { useNavigate, NavLink } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Menu, LayoutDashboard, Users, Settings } from "lucide-react";
import DefaultImgForUser from '../assets/defaultImgForUser.jpg'

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [user, setUser] = useState<{ name: string; avatar?: string }>({
        name: "Admin",
    });

    // LocalStorage'dan userni olish
    useEffect(() => {
        const savedProfile = localStorage.getItem("profile");
        if (savedProfile) {
            setUser(JSON.parse(savedProfile));
        }
    }, []);

    const handleLogout = () => {
        if (confirm("Chiqishni tasdiqlaysizmi?")) {
            localStorage.removeItem("isAuth");
            navigate("/login");
        }
    };

    const handleNavClick = () => {
        setSidebarOpen(false); // link bosilganda sidebar yopiladi
    };

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Overlay (mobil holat) */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`${sidebarOpen ? "translate-x-0" : "-translate-x-64"
                    } md:translate-x-0 fixed md:static top-0 left-0 h-full z-50 w-64 bg-gray-900 text-white flex flex-col transition-transform duration-300`}
            >
                <div className="p-4 text-2xl font-bold border-b border-gray-700">
                    Bug Buster
                </div>
                <nav className="flex-1 p-4 space-y-2">
                    <NavLink
                        to="/"
                        onClick={handleNavClick}
                        className={({ isActive }) =>
                            `flex items-center gap-2 px-3 py-2 rounded-lg transition ${isActive
                                ? "bg-gray-800 text-white"
                                : "text-gray-300 hover:bg-gray-800 hover:text-white"
                            }`
                        }
                    >
                        <LayoutDashboard className="w-5 h-5" />
                        Dashboard
                    </NavLink>

                    <NavLink
                        to="/users"
                        onClick={handleNavClick}
                        className={({ isActive }) =>
                            `flex items-center gap-2 px-3 py-2 rounded-lg transition ${isActive
                                ? "bg-gray-800 text-white"
                                : "text-gray-300 hover:bg-gray-800 hover:text-white"
                            }`
                        }
                    >
                        <Users className="w-5 h-5" />
                        Users
                    </NavLink>
                </nav>

                {/* Settings pastda fixed */}
                <div className="p-4 border-t border-gray-700">
                    <NavLink
                        to="/settings"
                        onClick={handleNavClick}
                        className={({ isActive }) =>
                            `flex items-center gap-2 px-3 py-2 rounded-lg transition ${isActive
                                ? "bg-gray-800 text-white"
                                : "text-gray-300 hover:bg-gray-800 hover:text-white"
                            }`
                        }
                    >
                        <Settings className="w-5 h-5" />
                        Settings
                    </NavLink>
                </div>
            </aside>

            {/* Main */}
            <div className="flex-1 flex flex-col">
                {/* Header */}
                <header className="h-14 bg-white shadow flex items-center justify-between px-4">
                    <div className="flex items-center gap-3">
                        {/* Burger menu doimiy */}
                        <button
                            className="text-gray-600 md:hidden"
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                        >
                            <Menu className="w-6 h-6" />
                        </button>

                        {/* User info */}
                        <div className="flex items-center gap-2">
                            <img
                                src={user.avatar || DefaultImgForUser}
                                alt="avatar"
                                className="w-8 h-8 rounded-full border object-cover"
                            />
                            <span className="text-gray-600">Hello, {user.name}</span>
                        </div>
                    </div>

                    <button
                        onClick={handleLogout}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                        Logout
                    </button>
                </header>

                <main className="flex-1 p-4 overflow-y-auto">{children}</main>
            </div>
        </div>
    );
};

export default AdminLayout;
