'use client';

import StatCard from "@/components/dashboard/StatCard";
import { BookOpen, TrendingUp, Flame, Smile } from "lucide-react";

export default function Dashboard() {
    const activities = [
        { title: "Mindful Breathing", duration: "5 mins" },
        { title: "Guided Meditation", duration: "10 mins" },
        { title: "Evening Reflection", duration: "3 mins" },
    ];

    // Heatmap color classes mapped to the theme variables in globals.css
    const heatmapClasses = {
        burnout: 'bg-status-burnout/70',
        healthy: 'bg-status-healthy/70',
        risk: 'bg-status-risk/70',
        neutral: 'bg-sage-200'
    };

    // Sample heatmap pattern (25 squares) — replace with real data when available
    const heatmapData = Array.from({ length: 25 }).map((_, i) => {
        if (i % 7 === 0) return 'burnout';
        if (i % 5 === 0) return 'risk';
        if (i % 3 === 0) return 'healthy';
        return 'neutral';
    });

    // Recent journal entries sample data
    const recentEntries = [
        {
            statusKey: 'burnout',
            statusLabel: 'Burnout',
            snippet: "I've been feeling overwhelmed with deadlines. The pressure at work is relentless and I barely slept last night. Everything feels like too much right now.",
            date: '2026-09-06',
            sentiment: '-0.72',
            percent: 84
        },
        {
            statusKey: 'risk',
            statusLabel: 'At risk',
            snippet: "I've been feeling overwhelmed with deadlines. The pressure at work is relentless and I barely slept last night. Everything feels like too much right now.",
            date: '2026-09-05',
            sentiment: '-0.61',
            percent: 55
        },
        {
            statusKey: 'healthy',
            statusLabel: 'Healthy',
            snippet: "I felt productive today. I successfully completed my main goals and still had time for some light exercise. Although I felt tired in the afternoon, I was able to take a break and regain my focus.",
            date: '2026-09-04',
            sentiment: '0.81',
            percent: 76
        }
    ];

    const statusBadge = {
        burnout: 'bg-status-burnout/20 text-status-burnout',
        risk: 'bg-status-risk/20 text-amber-700',
        healthy: 'bg-status-healthy/20 text-sage-700'
    };

    return (
        <div className="space-y-8 animate-fade-in">
            <div>
                <h1 className="text-3xl font-bold text-text-dark">Dashboard</h1>
                <p className="text-text-muted text-sm mt-1">Your well being overview based on your entries</p>
            </div>

            {/* ROW 1: Stat cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                <StatCard
                    title="Total Journal"
                    value="15"
                    change="📈 +3 this week"
                    isPositive={true}
                    icon={BookOpen}
                    iconBg="bg-sage-100"
                    iconColor="text-sage-dark"
                />
                <StatCard
                    title="Burnout Probability"
                    value="78%"
                    change="📉 +3.45% this week"
                    isPositive={false}
                    icon={TrendingUp}
                    iconBg="bg-status-burnout/20"
                    iconColor="text-status-burnout"
                />
                <StatCard
                    title="Current Streak"
                    value="3d"
                    change="🔥 Keep it up!"
                    isPositive={true}
                    icon={Flame}
                    iconBg="bg-status-healthy/30"
                    iconColor="text-sage-700"
                />
                <StatCard
                    title="Avg Sentiment"
                    value="-0.11"
                    change="⚠️ Declining 30d"
                    isPositive={false}
                    icon={Smile}
                    iconBg="bg-status-risk/30"
                    iconColor="text-amber-700"
                />
            </div>

            {/* ROW 2: Chart + Recommendations + Heatmap */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-stretch">
                <div className="md:col-span-2 bg-white p-6 rounded-2xl border border-neutral-border flex flex-col h-full">
                    <div>
                        <h3 className="font-bold text-text-dark mb-2">Burnout probability - Last 14 days</h3>
                        <p className="text-xs text-text-muted mb-4">Load your data to see the graph</p>
                    </div>
                    <div className="flex-1 min-h-[220px] flex items-center justify-center border-2 border-dashed border-sage-100 rounded-xl text-sage-500 font-medium text-sm">
                        [Area recharts line graph]
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-neutral-border flex flex-col h-full">
                    <h3 className="font-bold text-text-dark mb-4">Recommendation Activities</h3>
                    <div className="space-y-3 mt-2">
                        {activities.map((a, i) => (
                            <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-sage-100/50 border border-sage-200/40">
                                <div className="flex items-center gap-3">
                                    <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-sage-100 text-sage-dark">🍃</span>
                                    <div className="text-sm font-medium text-sage-dark">
                                        {a.title}
                                        <div className="text-xs text-text-muted font-normal">{a.duration}</div>
                                    </div>
                                </div>
                                <span className="text-sage-400 text-sm">&gt;</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* New column: Heatmap */}
                <div className="bg-white p-6 rounded-2xl border border-neutral-border flex flex-col h-full">
                    <h3 className="font-bold text-text-dark mb-4">Heatmap calendar on this week</h3>
                    <div className="grid grid-cols-5 gap-2 mt-2">
                        {heatmapData.map((type, idx) => (
                            <div key={idx} className={`h-6 w-6 rounded-md ${heatmapClasses[type]}`} />
                        ))}
                    </div>
                </div>
            </div>

            {/* ROW 3: Recent Journal Entries */}
            <div className="bg-white p-6 rounded-2xl border border-neutral-border mt-4">
                <h3 className="font-bold text-text-dark mb-4">Recent Journal Entries</h3>
                <div className="space-y-4">
                    {recentEntries.map((e, idx) => (
                        <div key={idx} className="flex items-start justify-between p-4 bg-white rounded-lg border border-neutral-border/60">
                            <div className="flex items-start gap-4">
                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${statusBadge[e.statusKey]}`}>
                                    {e.statusLabel}
                                </span>
                                <div className="max-w-[70ch]">
                                    <p className="text-sm text-text-dark">{e.snippet}</p>
                                    <div className="text-xs text-text-muted mt-2">
                                        {e.date} · sentiment: <span className="font-semibold">{e.sentiment}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="text-right ml-4">
                                <div className={`${e.statusKey === 'burnout' ? 'text-status-burnout' : e.statusKey === 'risk' ? 'text-amber-700' : 'text-sage-700'} text-2xl font-bold`}>
                                    {e.percent}%
                                </div>
                                <div className="text-xs text-text-muted">{e.statusLabel}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
