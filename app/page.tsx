import React from 'react';
import { 
  Activity, 
  AlertTriangle, 
  Settings, 
  Cpu, 
  ShieldAlert, 
  Gauge, 
  Thermometer, 
  Zap 
} from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, color }: any) => (
  <div className="glass-panel p-6 rounded-xl flex items-center gap-4">
    <div className={`p-3 rounded-lg ${color}`}>
      <Icon className="w-6 h-6 text-white" />
    </div>
    <div>
      <p className="text-sm text-zinc-400 font-medium">{title}</p>
      <h3 className="text-2xl font-bold">{value}</h3>
    </div>
  </div>
);

export default function Dashboard() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 border-r border-zinc-800 p-6 flex flex-col gap-8">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-emerald-500 rounded flex items-center justify-center">
            <Activity className="text-black w-5 h-5" />
          </div>
          <span className="font-bold text-xl tracking-tight uppercase">Sentry IoT</span>
        </div>
        
        <nav className="flex flex-col gap-2">
          {['Dashboard', 'Assets', 'Analytics', 'Settings'].map((item) => (
            <button 
              key={item} 
              className={`text-left px-4 py-2 rounded-lg text-sm transition-colors ${item === 'Dashboard' ? 'bg-zinc-800 text-emerald-400' : 'text-zinc-400 hover:text-white hover:bg-zinc-900'}`}
            >
              {item}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold">Asset Health Overview</h1>
            <p className="text-zinc-400">System status: All critical nodes monitored.</p>
          </div>
          <div className="flex gap-3">
            <div className="bg-emerald-500/10 border border-emerald-500/50 text-emerald-400 px-4 py-2 rounded-full text-xs font-semibold uppercase flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> System Healthy
            </div>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <StatCard title="Active Assets" value="124" icon={Cpu} color="bg-blue-600" />
          <StatCard title="Avg Health Score" value="84%" icon={Gauge} color="bg-emerald-600" />
          <StatCard title="Open Alerts" value="3" icon={AlertTriangle} color="bg-amber-500" />
          <StatCard title="Energy Usage" value="1.2 MW" icon={Zap} color="bg-purple-600" />
        </div>

        {/* Asset Table Area */}
        <div className="glass-panel rounded-xl overflow-hidden">
          <div className="p-6 border-b border-zinc-800 flex justify-between items-center">
            <h2 className="font-semibold text-lg">High-Priority Assets</h2>
            <button className="text-sm text-emerald-400 font-medium hover:underline">View All</button>
          </div>
          <table className="w-full text-left">
            <thead className="bg-zinc-900/50 text-zinc-500 text-xs uppercase">
              <tr>
                <th className="px-6 py-4">Asset ID</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Health</th>
                <th className="px-6 py-4">Vibration (mm/s)</th>
                <th className="px-6 py-4">Temp (°C)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {[ 
                { id: 'TURB-042', status: 'Warning', health: 64, vib: 0.85, temp: 88.2, color: 'text-amber-500' },
                { id: 'COMP-009', status: 'Critical', health: 22, vib: 1.45, temp: 112.8, color: 'text-red-500' },
                { id: 'PUMP-001', status: 'Optimal', health: 98, vib: 0.12, temp: 42.5, color: 'text-emerald-500' }
              ].map((row) => (
                <tr key={row.id} className="hover:bg-zinc-900/50 transition-colors">
                  <td className="px-6 py-4 font-mono text-sm">{row.id}</td>
                  <td className={`px-6 py-4 text-xs font-bold uppercase ${row.color}`}>{row.status}</td>
                  <td className="px-6 py-4">
                    <div className="w-full bg-zinc-800 rounded-full h-1.5 w-24">
                      <div 
                        className={`h-1.5 rounded-full ${row.health > 80 ? 'bg-emerald-500' : row.health > 50 ? 'bg-amber-500' : 'bg-red-500'}`}
                        style={{ width: `${row.health}%` }}
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4 font-mono text-zinc-400">{row.vib}</td>
                  <td className="px-6 py-4 font-mono text-zinc-400">{row.temp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Alerts Feed Section */}
        <div className="mt-10">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <ShieldAlert className="text-red-500" /> Predictive Alerts Feed
          </h2>
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-red-500/5 border border-red-500/20 flex gap-4">
              <div className="p-2 bg-red-500/20 rounded h-fit text-red-500">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold text-red-400">Critical: High Temperature Threshold</h4>
                <p className="text-sm text-zinc-400">Air Compressor (COMP-009) exceeds safe operating limits. Automatic shutdown initiated.</p>
                <span className="text-xs text-zinc-500 mt-2 block">12 minutes ago</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}