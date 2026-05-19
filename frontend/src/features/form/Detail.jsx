import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Detail = () => {
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch provider data from your API
  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const response = await axios.get('https://assignment-5skg.onrender.com/api/detail');
        // Check if the data is wrapped in a "providers" key or direct array
        if (response.data && response.data.providers) {
          setProviders(response.data.providers);
        } else if (Array.isArray(response.data)) {
          setProviders(response.data);
        }
      } catch (err) {
        setError('Failed to load dashboard metrics.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProviders();
  }, []);

  // Quick stats calculation for dashboard cards
  const totalProviders = providers.length;
  const totalLeadsAssigned = providers.reduce((acc, p) => acc + (p.leadsAssignedCount || 0), 0);
  const averageUtilization = totalProviders 
    ? Math.round((totalLeadsAssigned / (totalProviders * 10)) * 100) 
    : 0;

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-slate-950 flex flex-col items-center justify-center gap-3">
        <div className="w-10 h-10 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
        <p className="text-slate-400 text-sm font-medium tracking-wide animate-pulse">Loading dashboard statistics...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <div className="bg-rose-500/10 border border-rose-500/20 backdrop-blur-md px-6 py-4 rounded-xl text-rose-400 text-sm text-center max-w-md">
          <p className="font-semibold mb-1">Data Stream Interrupted</p>
          <p className="opacity-80">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full min-h-screen bg-slate-950 text-slate-100 p-6 md:p-10 overflow-x-hidden">
      
      {/* Background Decorative Lighting Blobs */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Container Dashboard Layer */}
      <div className="relative max-w-6xl mx-auto space-y-8">
        
        {/* Dashboard Header */}
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
            Provider Metrics Central
          </h1>
          <p className="text-sm text-slate-400">Real-time allocation status, quotas updates, and active counts overview.</p>
        </div>

        {/* Top Analytics Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {/* Card 1 */}
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-md shadow-xl flex flex-col gap-2">
            <span className="text-xs font-semibold tracking-wider text-slate-400 uppercase">Total Providers</span>
            <span className="text-3xl font-bold tracking-tight text-white">{totalProviders}</span>
            <div className="text-[11px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full w-fit mt-1">
              Active Operational Nodes
            </div>
          </div>

          {/* Card 2 */}
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-md shadow-xl flex flex-col gap-2">
            <span className="text-xs font-semibold tracking-wider text-slate-400 uppercase">Leads Distributed</span>
            <span className="text-3xl font-bold tracking-tight text-white">{totalLeadsAssigned}</span>
            <div className="text-[11px] text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 rounded-full w-fit mt-1">
              Successfully Transferred
            </div>
          </div>

          {/* Card 3 */}
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-md shadow-xl flex flex-col gap-2">
            <span className="text-xs font-semibold tracking-wider text-slate-400 uppercase">Avg System Load</span>
            <span className="text-3xl font-bold tracking-tight text-white">{averageUtilization}%</span>
            <div className="text-[11px] text-purple-400 bg-purple-500/10 border border-purple-500/20 px-2 py-0.5 rounded-full w-fit mt-1">
              Quota Capacity Used
            </div>
          </div>
        </div>

        {/* Data Table Glass Card */}
        <div className="rounded-2xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-xl shadow-[0_12px_40px_rgba(0,0,0,0.5)] overflow-hidden">
          <div className="px-6 py-5 border-b border-white/[0.06] bg-white/[0.01]">
            <h3 className="font-bold text-lg text-white">Live Status Ledger</h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/[0.06] bg-white/[0.01] text-xs font-semibold uppercase tracking-wider text-slate-400">
                  <th className="px-6 py-4">Index</th>
                  <th className="px-6 py-4">Provider Name</th>
                  <th className="px-6 py-4">Database ID</th>
                  <th className="px-6 py-4">Assigned Leads</th>
                  <th className="px-6 py-4">Monthly Cap</th>
                  <th className="px-6 py-4 text-right">Status State</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04] text-sm text-slate-300">
                {providers.map((provider, idx) => {
                  const usagePercentage = ((provider.leadsAssignedCount || 0) / (provider.monthlyQouta || 10)) * 100;
                  
                  return (
                    <tr key={provider._id} className="hover:bg-white/[0.02] transition-colors duration-150 group">
                      {/* System Order Index */}
                      <td className="px-6 py-4 font-mono text-xs text-slate-500 group-hover:text-slate-400">
                        #{provider.providerNumber || idx + 1}
                      </td>
                      
                      {/* Identity Name */}
                      <td className="px-6 py-4 font-semibold text-white">
                        {provider.providerName}
                      </td>
                      
                      {/* Hash Token Identifier */}
                      <td className="px-6 py-4 font-mono text-xs text-slate-400 opacity-60 hover:opacity-100 transition-opacity">
                        {provider._id}
                      </td>
                      
                      {/* Count Indicator tracking fill bar representation */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <span className="font-medium text-slate-200">{provider.leadsAssignedCount}</span>
                          <div className="w-16 h-1.5 bg-white/10 rounded-full overflow-hidden hidden sm:block">
                            <div 
                              className="h-full bg-blue-500 rounded-full" 
                              style={{ width: `${Math.min(usagePercentage, 100)}%` }}
                            />
                          </div>
                        </div>
                      </td>
                      
                      {/* Threshold Maximum Limit */}
                      <td className="px-6 py-4 text-slate-400 font-medium">
                        {provider.monthlyQouta || 10}
                      </td>
                      
                      {/* Automated Capacity Alert Status Label */}
                      <td className="px-6 py-4 text-right">
                        {provider.leadsAssignedCount >= (provider.monthlyQouta || 10) ? (
                          <span className="inline-flex px-2.5 py-1 rounded-md text-xs font-medium bg-rose-500/10 border border-rose-500/20 text-rose-400">
                            Maxed Out
                          </span>
                        ) : provider.leadsAssignedCount >= 8 ? (
                          <span className="inline-flex px-2.5 py-1 rounded-md text-xs font-medium bg-amber-500/10 border border-amber-500/20 text-amber-400">
                            Near Limit
                          </span>
                        ) : (
                          <span className="inline-flex px-2.5 py-1 rounded-md text-xs font-medium bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                            Available
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Detail;