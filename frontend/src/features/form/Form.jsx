import React, { useState } from 'react';

const Form = () => {
  const [selectedService, setSelectedService] = useState('');

  return (
    // Wrapper container to demonstrate the glass effect over a dark background
    <div className="relative w-full min-h-screen bg-slate-950 flex items-center justify-center p-4 overflow-hidden">
      
      {/* Decorative background blobs for the glass blur to interact with */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-600/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-600/20 rounded-full blur-[100px] pointer-events-none" />

      {/* Main Glass Form Card */}
      <div className="relative w-full max-w-xl p-8 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]">
        
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white tracking-tight">Get in Touch</h2>
          <p className="text-slate-400 text-sm mt-1">Fill out the form below and our team will get back to you shortly.</p>
        </div>

        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          {/* Name and Phone (Grid) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Full Name</label>
              <input 
                type="text" 
                name="name" 
                placeholder="John Doe"
                className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.06] focus:ring-4 focus:ring-blue-500/10 transition-all duration-200" 
              />
            </div>
            
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Phone Number</label>
              <input 
                type="tel" 
                name="phone" 
                placeholder="+1 (555) 000-0000"
                className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.06] focus:ring-4 focus:ring-blue-500/10 transition-all duration-200" 
              />
            </div>
          </div>

          {/* City */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">City</label>
            <input 
              type="text" 
              name="city" 
              placeholder="New York"
              className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.06] focus:ring-4 focus:ring-blue-500/10 transition-all duration-200" 
            />
          </div>

          {/* Services (Glass Radio Group) */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Select a Service</label>
            <div className="grid grid-cols-2 gap-3">
              {[1, 2, 3, 4].map((num) => (
                <label 
                  key={num}
                  className={`flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer transition-all duration-200 select-none
                    ${selectedService === `service-${num}` 
                      ? 'border-blue-500/50 bg-blue-500/10 text-blue-400 font-medium' 
                      : 'border-white/[0.08] bg-white/[0.01] text-slate-400 hover:bg-white/[0.04] hover:text-slate-200'
                    }`}
                >
                  <input 
                    type="radio" 
                    name="service" 
                    value={`service-${num}`}
                    checked={selectedService === `service-${num}`}
                    onChange={(e) => setSelectedService(e.target.value)}
                    className="w-4 h-4 text-blue-500 border-white/20 bg-transparent focus:ring-blue-500/50 focus:ring-offset-0" 
                  />
                  <span>Service {num}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Description</label>
            <textarea 
              name="description" 
              rows="4"
              placeholder="Tell us more about your project or requirements..."
              className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.06] focus:ring-4 focus:ring-blue-500/10 transition-all duration-200 resize-none" 
            />
          </div>

          {/* Submit Button */}
          <button 
            type="submit"
            className="w-full py-4 bg-white text-slate-950 font-bold rounded-xl hover:bg-slate-100 active:scale-[0.99] shadow-lg shadow-white/5 transition-all duration-200 mt-2"
          >
            Submit Request
          </button>
        </form>
      </div>
    </div>
  );
};

export default Form;