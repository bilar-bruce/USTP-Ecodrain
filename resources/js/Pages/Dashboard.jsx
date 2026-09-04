import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard() {
    const cisterns = [
        { id: 1, name: 'Cistern 1', level: 87, sensor: 'ONLINE', quality: 'CLEAN', filter: 'Operational', needsMaintenance: false },
        { id: 2, name: 'Cistern 2', level: 92, sensor: 'ONLINE', quality: 'CLEAN', filter: 'Requires Maintenance', needsMaintenance: true },
        { id: 3, name: 'Cistern 3', level: 64, sensor: 'ONLINE', quality: 'CLEAN', filter: 'Operational', needsMaintenance: false },
        { id: 4, name: 'Cistern 4', level: 58, sensor: 'ONLINE', quality: 'CLEAN', filter: 'Operational', needsMaintenance: false },
        { id: 5, name: 'Cistern 5', level: 90, sensor: 'ONLINE', quality: 'CLEAN', filter: 'Operational', needsMaintenance: false },
        { id: 6, name: 'Cistern 6', level: 42, sensor: 'ONLINE', quality: 'CLEAN', filter: 'Requires Maintenance', needsMaintenance: true },
    ];

    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />
            
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-white">Campus Cistern & Filter Monitoring</h1>
                <p className="text-gray-400 mt-1">Live status, volumetric telemetry, and filter analytics for active utility nodes.</p>
            </header>

            {/* Global Overview Metric Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="p-6 rounded-xl bg-[#161a23] border border-gray-800">
                    <p className="text-gray-400 text-sm font-medium uppercase tracking-wide">Total Harvested Water</p>
                    <p className="text-4xl font-bold text-white mt-2">
                        14,250 <span className="text-xl text-blue-500 font-medium">Liters</span>
                    </p>
                </div>
                
                <div className="p-6 rounded-xl bg-[#161a23] border border-gray-800">
                    <p className="text-gray-400 text-sm font-medium uppercase tracking-wide">Overall Capacity</p>
                    <p className="text-4xl font-bold text-white mt-2">
                        72 <span className="text-xl text-cyan-400 font-medium">%</span>
                    </p>
                </div>

                <div className="p-6 rounded-xl bg-[#161a23] border border-red-500/30">
                    <p className="text-gray-400 text-sm font-medium uppercase tracking-wide">Active Filter Alerts</p>
                    <p className="text-4xl font-bold text-red-400 mt-2">
                        2 <span className="text-xl text-red-500/70 font-medium">Nodes Require Maintenance</span>
                    </p>
                </div>
            </div>

            {/* 6-Cistern Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {cisterns.map((cistern) => (
                    <div 
                        key={cistern.id} 
                        className={`p-6 rounded-xl bg-[#161a23] border ${cistern.needsMaintenance ? 'border-red-500/50' : 'border-gray-800'} flex gap-6 items-center hover:border-gray-600 transition-colors duration-300`}
                    >
                        {/* Pill Tank Graphic */}
                        <div className="w-16 h-32 rounded-[2rem] border-2 border-gray-700 bg-gray-900 relative overflow-hidden flex-shrink-0 flex items-center justify-center">
                            <div 
                                className="absolute bottom-0 w-full bg-gradient-to-t from-blue-600 to-cyan-400 transition-all duration-1000 ease-in-out"
                                style={{ height: `${cistern.level}%` }}
                            ></div>
                            <span className="relative z-10 text-xs font-bold text-white drop-shadow-md">
                                {cistern.level}%
                            </span>
                        </div>

                        {/* Status Metrics */}
                        <div className="flex-1 space-y-2">
                            <h3 className="text-xl font-semibold text-white mb-3">{cistern.name}</h3>
                            <p className="text-sm text-gray-400 flex gap-2 items-center">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                                Sensor: <span className="text-green-400 font-medium">{cistern.sensor}</span>
                            </p>
                            <p className="text-sm text-gray-400 flex gap-2 items-center">
                                <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                                Water Quality: <span className="text-blue-400 font-medium">{cistern.quality}</span>
                            </p>
                            <p className="text-sm text-gray-400 flex gap-2 items-center">
                                <span className={`w-1.5 h-1.5 rounded-full ${cistern.needsMaintenance ? 'bg-red-500' : 'bg-green-500'}`}></span>
                                Filter: <span className={`${cistern.needsMaintenance ? 'text-red-400' : 'text-green-400'} font-medium`}>{cistern.filter}</span>
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </AuthenticatedLayout>
    );
}