import React, { useState, useEffect } from "react";

const Settings: React.FC = () => {
    const [profile, setProfile] = useState({
        name: "Admin User",
        email: "admin@example.com",
        avatar: "",
    });

    const [theme, setTheme] = useState<"light" | "dark">("light");
    const [notifications, setNotifications] = useState({
        email: true,
        push: false,
        sms: false,
    });
    const [twoFA, setTwoFA] = useState(false);

    // LocalStorage dan o'qish
    useEffect(() => {
        const savedProfile = localStorage.getItem("profile");
        const savedTheme = localStorage.getItem("theme");
        const savedNotifications = localStorage.getItem("notifications");
        const saved2FA = localStorage.getItem("twoFA");

        if (savedProfile) setProfile(JSON.parse(savedProfile));
        if (savedTheme) setTheme(savedTheme as "light" | "dark");
        if (savedNotifications) setNotifications(JSON.parse(savedNotifications));
        if (saved2FA) setTwoFA(saved2FA === "true");
    }, []);

    // Avatarni preview va saqlash
    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfile({ ...profile, avatar: reader.result as string });
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    // Saqlash tugmasi
    const handleSave = () => {
        localStorage.setItem("profile", JSON.stringify(profile));
        localStorage.setItem("theme", theme);
        localStorage.setItem("notifications", JSON.stringify(notifications));
        localStorage.setItem("twoFA", String(twoFA));

        alert("✅ Settings saved to localStorage!");
    };

    return (
        <div className="space-y-8 max-w-3xl mx-auto">
            {/* Profile */}
            <section className="bg-white shadow rounded-lg p-6 space-y-4">
                <h2 className="text-xl font-semibold border-b pb-2">👤 Profile</h2>
                <div className="flex items-center gap-4">
                    <img
                        src={profile.avatar || "https://via.placeholder.com/80"}
                        alt="Avatar"
                        className="w-20 h-20 rounded-full border object-cover"
                    />
                    <input type="file" accept="image/*" onChange={handleAvatarChange} />
                </div>
                <input
                    type="text"
                    className="w-full border rounded p-2"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    placeholder="Full Name"
                />
                <input
                    type="email"
                    className="w-full border rounded p-2"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    placeholder="Email"
                />
            </section>

            {/* Theme */}
            <section className="bg-white shadow rounded-lg p-6 space-y-4">
                <h2 className="text-xl font-semibold border-b pb-2">🌗 Theme</h2>
                <button
                    onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                    className="px-4 py-2 border rounded-lg"
                >
                    Switch to {theme === "light" ? "Dark" : "Light"} Mode
                </button>
            </section>

            {/* Notifications */}
            <section className="bg-white shadow rounded-lg p-6 space-y-4">
                <h2 className="text-xl font-semibold border-b pb-2">🔔 Notifications</h2>
                {Object.entries(notifications).map(([key, value]) => (
                    <label key={key} className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={value}
                            onChange={(e) =>
                                setNotifications({ ...notifications, [key]: e.target.checked })
                            }
                        />
                        {key.charAt(0).toUpperCase() + key.slice(1)} Notifications
                    </label>
                ))}
            </section>

            {/* Security */}
            <section className="bg-white shadow rounded-lg p-6 space-y-4">
                <h2 className="text-xl font-semibold border-b pb-2">🔒 Security</h2>
                <label className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        checked={twoFA}
                        onChange={(e) => setTwoFA(e.target.checked)}
                    />
                    Enable Two-Factor Authentication (2FA)
                </label>
            </section>

            <div className="flex justify-end gap-2">
                <button
                    onClick={() => window.location.reload()}
                    className="px-4 py-2 border rounded"
                >
                    Cancel
                </button>
                <button
                    onClick={handleSave}
                    className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                    Save Changes
                </button>
            </div>
        </div>
    );
};

export default Settings;
