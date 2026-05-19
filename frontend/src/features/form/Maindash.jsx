import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Maindash = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Fetching Leads from API
  const fetchLeads = async () => {
    try {
      const response = await axios.get('https://assignment-5skg.onrender.com/api/auth/total');
      setLeads(response.data.total || []);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching leads:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  // 2. Patch Request to Mark Complete
  const handleMarkComplete = async (id) => {
    try {
      await axios.patch(`https://assignment-5skg.onrender.com/api/lead/${id}`, {
        iscomplete: 'completed'
      });
      
      // Live UI Update without hard reload
      fetchLeads();
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update status. Please try again.");
    }
  };

  // Premium Loading Skeleton
  if (loading) {
    return (
      <div className="min-h-screen bg-[#030303] text-white flex flex-col items-center justify-center font-sans">
        <div className="relative w-12 h-12 rounded-full border-2 border-zinc-800 border-t-white animate-spin mb-4"></div>
        <p className="text-xs text-zinc-500 tracking-[0.2em] uppercase font-medium animate-pulse">
          Loading Console
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030303] bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))] text-zinc-200 p-6 md:p-12 font-sans antialiased">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <header className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-zinc-900 pb-6">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-white bg-gradient-to-b from-white to-zinc-400 bg-clip-text text-transparent">
              Executive Dashboard
            </h1>
            <p className="text-sm text-zinc-500 mt-1">Manage and monitor incoming pipeline service requests.</p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-zinc-900/50 border border-zinc-800 rounded-lg text-xs text-zinc-400 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Live Database Synced
          </div>
        </header>

        {/* Grid Cards Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {leads.map((lead) => (
            <div 
              key={lead._id} 
              className="relative group overflow-hidden rounded-2xl border border-white/[0.06] bg-zinc-950/40 backdrop-blur-xl p-6 transition-all duration-500 hover:border-white/[0.12] hover:bg-zinc-900/30 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col justify-between"
            >
              {/* Card Ambient Glow Effect on Hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div>
                {/* Meta Header */}
                <div className="flex justify-between items-start gap-4 mb-5">
                  <div className="truncate">
                    <h3 className="text-lg font-medium text-white tracking-tight truncate group-hover:text-zinc-100 transition-colors">
                      {lead.name}
                    </h3>
                    <span className="text-[10px] font-mono text-zinc-600 block mt-0.5 tracking-wider uppercase">
                      ID: {lead._id.slice(-8)}...
                    </span>
                  </div>
                  
                  {/* Status Badge */}
                  <span className={`text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full font-semibold border ${
                    lead.iscomplete === 'pending' 
                      ? 'bg-amber-500/[0.06] text-amber-400 border-amber-500/20' 
                      : 'bg-emerald-500/[0.06] text-emerald-400 border-emerald-500/20'
                  }`}>
                    {lead.iscomplete}
                  </span>
                </div>

                {/* Main Information Stack */}
                <div className="space-y-3 text-sm border-t border-zinc-900 pt-4">
                  <div className="flex justify-between">
                    <span className="text-zinc-500 text-xs">Service Type</span>
                    <span className="text-zinc-300 font-medium">{lead.service}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500 text-xs">City / Region</span>
                    <span className="text-zinc-300 font-medium">{lead.city}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500 text-xs">Contact</span>
                    <span className="text-zinc-400 font-mono text-xs tracking-tight">{lead.phone}</span>
                  </div>

                  {/* Description Box */}
                  <div className="mt-4 bg-black/40 rounded-xl p-3 border border-white/[0.03] min-h-[70px]">
                    <span className="text-[10px] uppercase tracking-wider text-zinc-600 block mb-1 font-medium">
                      Requirement Details
                    </span>
                    <p className="text-zinc-400 text-xs leading-relaxed line-clamp-3">
                      {lead.description || "No dynamic notes attached to this lead document."}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Button Segment */}
              <div className="mt-6 pt-4 border-t border-zinc-900/60">
                {lead.iscomplete === 'pending' ? (
                  <button
                    onClick={() => handleMarkComplete(lead._id)}
                    className="w-full relative group/btn overflow-hidden rounded-xl bg-white text-black font-medium text-xs py-3 tracking-wider uppercase transition-all duration-300 hover:bg-zinc-200 active:scale-[0.98] shadow-[0_4px_20px_rgba(255,255,255,0.1)]"
                  >
                    Mark As Complete
                  </button>
                ) : (
                  <div className="w-full py-2.5 text-center text-xs font-medium text-zinc-600 border border-zinc-900 rounded-xl bg-zinc-950/20 cursor-not-allowed select-none">
                    ✓ Task Resolved
                  </div>
                )}
              </div>

            </div>
          ))}
        </div>

        {/* Fallback Empty State */}
        {leads.length === 0 && (
          <div className="text-center py-24 border border-dashed border-zinc-800 rounded-2xl bg-zinc-950/20 backdrop-blur-sm">
            <p className="text-zinc-500 text-sm tracking-wide">No records found inside the pipeline database.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Maindash;