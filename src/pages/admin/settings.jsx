import React, { useEffect, useRef, useState } from "react";
import { User, Mail, Lock, LogOut, Trash2, Save, X, Camera } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/context/userContext";

const API_URL = import.meta.env.VITE_API_URL
    ? `${import.meta.env.VITE_API_URL}/auth`
    : "https://niwali-backend-production.up.railway.app/api/auth";

export default function Settings() {
    const navigate = useNavigate();
    const { user, setUser, loading } = useUser();

    const [username, setUsername] = useState(user?.username || "");
    const [email, setEmail] = useState(user?.email || "");
    const [avatarPreview, setAvatarPreview] = useState(null);
    const [savingProfile, setSavingProfile] = useState(false);
    const [uploadingImage, setUploadingImage] = useState(false);

    const fileInputRef = useRef(null);

    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [changingPassword, setChangingPassword] = useState(false);

    const [deletingAccount, setDeletingAccount] = useState(false);

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const getImageUrl = (imagePath) => {
        if (!imagePath) return "";
        if (imagePath.startsWith("blob:") || imagePath.startsWith("http") || imagePath.startsWith("data:")) {
            return imagePath;
        }

        // Fallback if an absolute local path somehow got saved by mistake
        if (imagePath.includes(":\\") || imagePath.startsWith("C:")) {
            return ""; // Prevents broken local filesystem paths from crashing browser requests
        }

        const base = import.meta.env.VITE_API_URL.replace(/\/api$/, "");
        const cleanPath = imagePath.startsWith("/") ? imagePath : `/${imagePath}`;
        return `${base}${cleanPath}`;
    };

    const profileImage =
        avatarPreview ||
        getImageUrl(user?.profile_image) ||
        `https://ui-avatars.com/api/?name=${encodeURIComponent(username || "User")}`;

    useEffect(() => {
        if (user) {
            setUsername(user.username || "");
            setEmail(user.email || "");
        }
    }, [user]);

    useEffect(() => {
        return () => {
            if (avatarPreview) URL.revokeObjectURL(avatarPreview);
        };
    }, [avatarPreview]);

    const handleUpdateProfile = async () => {
        setSavingProfile(true);
        setMessage("");
        setError("");

        try {
            const res = await fetch(`${API_URL}/profile`, {
                method: "PUT",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",

                },
                body: JSON.stringify({ username, email }),
            });
            const data = await res.json();

            if (!res.ok) throw new Error(data.message || "Failed to update profile");

            setUser(data.user);
            setMessage("Profile updated successfully.");
        } catch (err) {
            setError(err.message);
        } finally {
            setSavingProfile(false);
        }
    };

    const handleImageClick = () => fileInputRef.current?.click();

    const handleImageChange = async (e) => {
        const file = e.target.files?.[0];

        if (!file) return;

        if (!file.type.startsWith("image/")) {
            setError("Please select an image file.");
            return;
        }

        if (file.size > 25 * 1024 * 1024) {
            setError("Image must be smaller than 25MB.");
            return;
        }

        setMessage("");
        setError("");

        const previewUrl = URL.createObjectURL(file);
        setAvatarPreview(previewUrl);

        try {
            setUploadingImage(true);

            const formData = new FormData();

            formData.append("profileImage", file);

            const res = await fetch(`${API_URL}/profile/image`, {
                method: "PUT",
                credentials: "include",
                body: formData,
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(
                    data.message || "Failed to upload photo"
                );
            }

            setUser(data.user);

            setAvatarPreview(null);

            setMessage("Profile image updated successfully.");

        } catch (err) {
            console.error("IMAGE UPLOAD ERROR:", err);

            setAvatarPreview(null);

            setError(err.message);

        } finally {
            setUploadingImage(false);

            URL.revokeObjectURL(previewUrl);

            e.target.value = "";
        }
    };

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        setMessage("");
        setError("");

        if (!currentPassword || !newPassword || !confirmPassword) {
            setError("Please fill in all password fields.");
            return;
        }
        if (newPassword.length < 6) {
            setError("New password must be at least 6 characters.");
            return;
        }
        if (newPassword !== confirmPassword) {
            setError("New passwords do not match.");
            return;
        }

        try {
            setChangingPassword(true);

            const res = await fetch(`${API_URL}/password`, {
                method: "PUT",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",

                },
                body: JSON.stringify({ currentPassword, newPassword }),
            });
            const data = await res.json();

            if (!res.ok) throw new Error(data.message || "Failed to change password");

            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
            setShowPasswordModal(false);
            setMessage("Password changed successfully.");
        } catch (err) {
            setError(err.message);
        } finally {
            setChangingPassword(false);
        }
    };

    const handleLogout = async () => {
        setMessage("");
        setError("");
        try {
            const res = await fetch(`${API_URL}/logout`, {
                method: "POST", credentials: "include",
            });
            const data = await res.json();

            if (!res.ok) throw new Error(data.message || "Logout failed");

            setUser(null);
            navigate("/");
        } catch (err) {
            setError(err.message);
        }
    };

    const handleDeleteAccount = async () => {
        const confirmed = window.confirm(
            "Are you sure you want to permanently delete your account? This action cannot be undone."
        );
        if (!confirmed) return;

        try {
            setDeletingAccount(true);
            setMessage("");
            setError("");

            const res = await fetch(`${API_URL}/account`, {
                method: "DELETE", credentials: "include",
            });
            const data = await res.json();

            if (!res.ok) throw new Error(data.message || "Failed to delete account");

            setUser(null);
            navigate("/login");
        } catch (err) {
            setError(err.message);
        } finally {
            setDeletingAccount(false);
        }
    };

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-50 text-gray-900">
                <p className="text-sm text-neutral-400">Loading settings...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 px-4 py-8 text-gray-900 sm:px-6">
            <div className="mx-auto max-w-5xl">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold">Settings</h1>
                    <p className="mt-1 text-sm text-neutral-500">Manage your account and dashboard preferences.</p>
                </div>

                {message && (
                    <div className="mb-5 rounded-lg border border-green-500/20 bg-green-500/10 px-4 py-3 text-sm text-green-600">
                        {message}
                    </div>
                )}

                {error && (
                    <div className="mb-5 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-600">
                        {error}
                    </div>
                )}

                {/* MY PROFILE */}
                <section className="rounded-xl border border-gray-200 bg-white shadow-sm">
                    <div className="border-b border-gray-200 px-6 py-5">
                        <h2 className="text-lg font-semibold">My Profile</h2>
                        <p className="mt-1 text-sm text-neutral-500">Manage your personal account information.</p>
                    </div>

                    <div className="p-6">
                        <div className="mb-7 flex items-center gap-4">
                            <div className="relative cursor-pointer" onClick={handleImageClick}>
                                <img
                                    src={profileImage}
                                    alt="Profile"
                                    className="h-16 w-16 rounded-full border border-gray-200 object-cover"
                                />
                                <div className="absolute bottom-0 right-0 flex h-6 w-6 items-center justify-center rounded-full bg-green-500 text-white">
                                    <Camera size={13} />
                                </div>
                            </div>
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="hidden"
                            />
                            <div>
                                <p className="font-semibold text-gray-900">{username}</p>
                                <p className="text-xs text-neutral-500">
                                    {user?.role === "admin" ? "Administrator" : "User"}
                                </p>
                                <p className="mt-1 text-xs text-neutral-400">
                                    {uploadingImage ? "Uploading image..." : "Click image to change"}
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                            <div>
                                <label htmlFor="username-input" className="mb-2 block text-sm font-medium text-neutral-700">Username</label>
                                <div className="relative">
                                    <User size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                                    <input
                                        id="username-input"
                                        type="text"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        className="w-full rounded-lg border border-gray-300 bg-gray-50 py-2.5 pl-10 pr-3 text-sm text-gray-900 outline-none transition focus:border-[#00D5C8]"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="email-input" className="mb-2 block text-sm font-medium text-neutral-700">Email</label>
                                <div className="relative">
                                    <Mail size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                                    <input
                                        id="email-input"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full rounded-lg border border-gray-300 bg-gray-50 py-2.5 pl-10 pr-3 text-sm text-gray-900 outline-none transition focus:border-[#00D5C8]"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 flex justify-end">
                            <button
                                type="button"
                                onClick={handleUpdateProfile}
                                disabled={savingProfile}
                                className="flex items-center gap-2 rounded-lg bg-green-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-green-600 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                <Save size={16} />
                                {savingProfile ? "Saving..." : "Update Profile"}
                            </button>
                        </div>
                    </div>
                </section>

                {/* ACCOUNT SECURITY */}
                <section className="mt-6 rounded-xl border border-gray-200 bg-white shadow-sm">
                    <div className="border-b border-gray-200 px-6 py-5">
                        <h2 className="text-lg font-semibold">Account Security</h2>
                        <p className="mt-1 text-sm text-neutral-500">Manage your password and account access.</p>
                    </div>

                    <div className="divide-y divide-gray-200">
                        <div className="flex items-center justify-between px-6 py-5">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
                                    <Mail size={18} className="text-neutral-500" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-900">Email</p>
                                    <p className="mt-1 text-xs text-neutral-500">{email}</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-between px-6 py-5">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
                                    <Lock size={18} className="text-neutral-500" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-900">Password</p>
                                    <p className="mt-1 text-xs text-neutral-500">Keep your account secure.</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setShowPasswordModal(true)}
                                className="rounded-lg bg-gray-100 px-4 py-2 text-xs font-semibold transition hover:bg-gray-200"
                            >
                                Change Password
                            </button>
                        </div>

                        <div className="flex items-center justify-between px-6 py-5">
                            <div>
                                <p className="text-sm font-medium text-gray-900">Log out</p>
                                <p className="mt-1 text-xs text-neutral-500">Sign out of your current account.</p>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-2 rounded-lg bg-gray-100 px-4 py-2 text-xs font-semibold transition hover:bg-gray-200"
                            >
                                <LogOut size={15} />
                                Log out
                            </button>
                        </div>
                    </div>
                </section>

                {/* DANGER ZONE */}
                <section className="mt-6 rounded-xl border border-red-200 bg-white shadow-sm">
                    <div className="border-b border-red-200 px-6 py-5">
                        <h2 className="text-lg font-semibold text-red-600">Danger Zone</h2>
                        <p className="mt-1 text-sm text-neutral-500">Permanent actions for your account.</p>
                    </div>

                    <div className="flex items-center justify-between px-6 py-5">
                        <div>
                            <p className="text-sm font-medium text-gray-900">Delete Account</p>
                            <p className="mt-1 max-w-xl text-xs text-neutral-500">
                                Permanently delete your account and remove access to the dashboard. This action cannot be undone.
                            </p>
                        </div>
                        <button
                            onClick={handleDeleteAccount}
                            disabled={deletingAccount}
                            className="flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-500/20 disabled:opacity-50"
                        >
                            <Trash2 size={15} />
                            {deletingAccount ? "Deleting..." : "Delete Account"}
                        </button>
                    </div>
                </section>
            </div>

            {/* CHANGE PASSWORD MODAL */}
            {showPasswordModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
                    <div className="w-full max-w-md rounded-xl border border-gray-200 bg-white shadow-2xl">
                        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-5">
                            <div>
                                <h2 className="text-lg font-semibold text-gray-900">Change Password</h2>
                                <p className="mt-1 text-xs text-neutral-500">Update your account password.</p>
                            </div>
                            <button
                                onClick={() => setShowPasswordModal(false)}
                                className="text-neutral-400 transition hover:text-gray-900"
                            >
                                <X size={19} />
                            </button>
                        </div>

                        <form onSubmit={handlePasswordChange} className="space-y-4 p-6">
                            <div>
                                <label className="mb-2 block text-sm font-medium text-neutral-700">Current Password</label>
                                <input
                                    type="password"
                                    value={currentPassword}
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                    className="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-[#00D5C8]"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-neutral-700">New Password</label>
                                <input
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-[#00D5C8]"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-neutral-700">Confirm New Password</label>
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-[#00D5C8]"
                                />
                            </div>

                            <div className="flex justify-end gap-3 pt-3">
                                <button
                                    type="button"
                                    onClick={() => setShowPasswordModal(false)}
                                    className="rounded-lg px-4 py-2.5 text-sm font-medium hover:bg-gray-100"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={changingPassword}
                                    className="rounded-lg bg-[#00D5C8] px-4 py-2.5 text-sm font-semibold text-[#101315] hover:bg-[#12E4D7] disabled:opacity-50"
                                >
                                    {changingPassword ? "Updating..." : "Update Password"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}