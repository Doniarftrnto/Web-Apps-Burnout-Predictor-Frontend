'use client';

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation"; // Import 100% aman
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import {
    LayoutDashboard, BookOpen, BarChart2, History,
    Settings, LogOut, Plus
} from "lucide-react";

export default function Sidebar({ isOpen, onClose }) {
    const pathname = usePathname();
    const router = useRouter(); // <-- Urutan 1: Diciptakan paling atas
    const { setUser } = useAuth();

    // <-- Urutan 2: Baru dipakai di sini
    const handleLogout = async () => {
        try {
            await axios.post('http://localhost:5000/auth/logout', {}, { withCredentials: true });
            setUser(null);
            try { localStorage.removeItem('isAuthenticated'); localStorage.removeItem('user'); } catch (e) { }
            router.push('/login');
        } catch (error) {
            console.error("Gagal logout", error);
        }
    };

    const menuItems = [
        { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
        { name: "Journal", icon: BookOpen, path: "/dashboard/journal" },
        { name: "Analytics", icon: BarChart2, path: "/dashboard/analytics" },
        { name: "History", icon: History, path: "/dashboard/history" },
    ];

    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 bg-black/40 z-40 md:hidden transition-opacity" onClick={onClose} />
            )}

            <aside className={`fixed md:static top-0 left-0 z-50 w-64 h-screen bg-white border-r border-neutral-border flex flex-col justify-between p-6 transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}>
                <div>
                    <div className="flex items-center gap-3 mb-10 pl-2">
                        <div className="w-9 h-9 rounded-xl bg-sage-500 flex items-center justify-center text-white font-bold text-xl">
                            M
                        </div>
                        <span className="text-xl font-bold tracking-tight text-sage-dark">MoodLens</span>
                    </div>

                    <p className="text-[11px] font-bold text-text-muted/60 tracking-wider uppercase mb-3 pl-2">Main Menu</p>
                    <nav className="space-y-1 mb-8">
                        {menuItems.map((item) => {
                            const isActive = pathname === item.path;
                            const Icon = item.icon;
                            return (
                                <Link
                                    key={item.name}
                                    href={item.path}
                                    onClick={onClose}
                                    className={`flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-medium transition-all ${isActive
                                        ? "bg-sage-100 text-sage-dark font-semibold shadow-xs"
                                        : "text-text-muted hover:bg-mood-bg hover:text-sage-dark"
                                        }`}
                                >
                                    <Icon size={18} className={isActive ? "text-sage-dark" : "text-text-muted"} />
                                    {item.name}
                                </Link>
                            );
                        })}
                    </nav>

                    <div className="flex items-center justify-between mb-3 pl-2 pr-1">
                        <p className="text-[11px] font-bold text-text-muted/60 tracking-wider uppercase">Journal</p>
                        <button className="text-text-muted hover:text-sage-dark">
                            <Plus size={16} />
                        </button>
                    </div>
                    <div className="space-y-1">
                        <div className="p-2.5 rounded-xl bg-status-healthy/30 text-sage-dark text-xs font-medium truncate">
                            Overwhelmed with deadlines...
                        </div>
                        <div className="p-2.5 rounded-xl bg-mood-bg text-text-muted text-xs truncate hover:bg-sage-100/50 cursor-pointer">
                            Best day in a while!
                        </div>
                    </div>
                </div>

                <div>
                    <p className="text-[11px] font-bold text-text-muted/60 tracking-wider uppercase mb-3 pl-2">General</p>
                    <div className="space-y-1">
                        <Link href="/dashboard/settings" className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-text-muted hover:bg-mood-bg hover:text-sage-dark">
                            <Settings size={18} /> Settings
                        </Link>
                        <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-status-burnout hover:bg-status-burnout/10 transition-colors">
                            <LogOut size={18} /> Logout
                        </button>
                    </div>
                </div>
            </aside>
        </>
    );
}