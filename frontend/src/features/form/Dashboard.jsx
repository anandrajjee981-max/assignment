import React, { useEffect, useState } from 'react';
import { Link } from 'react-router'; 
import axios from 'axios';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const Dashboard = () => {
  const [stats, setStats] = useState({ total: 0, solved: 0, pending: 0 });
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get('https://assignment-5skg.onrender.com/api/dashboard');
        
        // Extract arrays from actual API payload structure
        const solvedLeads = response.data.solve || [];
        const pendingLeads = response.data.pending || [];
        
        const totalCount = solvedLeads.length + pendingLeads.length;

        // 1. Setting Live Numeric Metrics
        setStats({
          total: totalCount,
          solved: solvedLeads.length,
          pending: pendingLeads.length
        });

        // 2. Formatting Data for Recharts distribution
        // Hum graphical data distributions metrics organize kar rahe hain
        const formattedChartData = [
          { name: 'Active Pending', count: pendingLeads.length },
          { name: 'Resolved Pipeline', count: solvedLeads.length },
          { name: 'Total Volume', count: totalCount },
        ];
        
        setChartData(formattedChartData);
        setLoading(false);
      } catch (error) {
        console.error("Dashboard metric parsing error:", error);
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#030303] text-white flex flex-col items-center justify-center font-sans">
        <div className="w-10 h-10 rounded-full border-2 border-zinc-800 border-t-white animate-spin mb-4"></div>
        <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-medium animate-pulse">Parsing API Matrix...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030303] bg-[radial-gradient(ellipse_60%_50%_at_50%_-10%,rgba(120,119,198,0.12),rgba(255,255,255,0))] text-zinc-200 p-6 md:p-12 font-sans antialiased">
      <div className="max-w-6xl mx-auto">
        
        {/* Navigation & Header Controls */}
        <header className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-zinc-900 pb-8">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-white bg-gradient-to-b from-white to-zinc-400 bg-clip-text text-transparent">
              Analytics Overview
            </h1>
            <p className="text-sm text-zinc-500 mt-1">Real-time telemetry and platform management navigation.</p>
          </div>

          {/* Premium Navigation Buttons */}
          <div className="flex flex-wrap gap-3 w-full md:w-auto">
            <Link to='/query' className="flex-1 md:flex-none">
              <button className="w-full px-5 py-2.5 text-xs font-medium uppercase tracking-wider rounded-xl bg-white text-black hover:bg-zinc-200 active:scale-95 transition-all duration-200 shadow-[0_4px_20px_rgba(255,255,255,0.05)]">
                Submit Your Query
              </button>
            </Link>
            
            <Link to='/detail' className="flex-1 md:flex-none">
              <button className="w-full px-5 py-2.5 text-xs font-medium uppercase tracking-wider rounded-xl bg-zinc-900/60 text-zinc-300 border border-white/[0.06] hover:bg-zinc-800/60 hover:border-white/[0.12] active:scale-95 transition-all duration-200 backdrop-blur-md">
                Total Provider
              </button>
            </Link>

            <Link to='/user' className="flex-1 md:flex-none">
              <button className="w-full px-5 py-2.5 text-xs font-medium uppercase tracking-wider rounded-xl bg-zinc-900/60 text-zinc-300 border border-white/[0.06] hover:bg-zinc-800/60 hover:border-white/[0.12] active:scale-95 transition-all duration-200 backdrop-blur-md">
                Check Status
              </button>
            </Link>
          </div>
        </header>

        {/* Dynamic Analytics Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="border border-white/[0.06] bg-zinc-950/40 backdrop-blur-xl p-6 rounded-2xl">
            <p className="text-xs font-medium uppercase tracking-widest text-zinc-500">Total volume</p>
            <h3 className="text-3xl font-semibold text-white mt-2 font-mono">{stats.total}</h3>
          </div>
          <div className="border border-white/[0.06] bg-zinc-950/40 backdrop-blur-xl p-6 rounded-2xl">
            <p className="text-xs font-medium uppercase tracking-widest text-emerald-500">Resolved ("solve")</p>
            <h3 className="text-3xl font-semibold text-emerald-400 mt-2 font-mono">{stats.solved}</h3>
          </div>
          <div className="border border-white/[0.06] bg-zinc-950/40 backdrop-blur-xl p-6 rounded-2xl">
            <p className="text-xs font-medium uppercase tracking-widest text-amber-500">Pending Actions</p>
            <h3 className="text-3xl font-semibold text-amber-400 mt-2 font-mono">{stats.pending}</h3>
          </div>
        </div>

        {/* High-Contrast Interactive Recharts Visualizer */}
        <div className="w-full border border-white/[0.06] bg-zinc-950/20 backdrop-blur-xl p-6 rounded-2xl shadow-2xl overflow-hidden">
          <div className="mb-6">
            <h2 className="text-lg font-medium text-white tracking-tight">System Status Allocation</h2>
            <p className="text-xs text-zinc-500 mt-0.5">Distribution graph of current live data matrices inside the database.</p>
          </div>

          <div className="w-full h-[320px] -ml-6 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 20, bottom: 0 }}>
                <defs>
                  <linearGradient id="chartGlow" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ffffff" stopOpacity={0.12}/>
                    <stop offset="95%" stopColor="#ffffff" stopOpacity={0.00}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#18181b" />
                <XAxis 
                  dataKey="name" 
                  stroke="#52525b" 
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                  dy={10}
                />
                <YAxis 
                  stroke="#52525b" 
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                  dx={-10}
                  allowDecimals={false} // Kyuki integer counts hain (1, 2, 3...)
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#09090b', 
                    borderColor: 'rgba(255,255,255,0.08)',
                    borderRadius: '12px',
                    fontSize: '12px',
                    color: '#fff'
                  }}
                  itemStyle={{ color: '#fff' }}
                  cursor={{ stroke: '#27272a', strokeWidth: 1 }}
                />
                <Area 
                  type="monotone" 
                  dataKey="count" 
                  stroke="#ffffff" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#chartGlow)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;