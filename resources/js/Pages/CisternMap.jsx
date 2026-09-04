import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

export default function CisternMap() {
    const [activeId, setActiveId] = useState(1);

    // Initial recalibrated estimates based on the original image layout
    const cisterns = [
        { id: 1, name: 'Cistern 1', sensor: 'Online', quality: 'Clean', filter: 'Operational', capacity: 87, location: "Girl's Trade Building (Bldg 24)", top: '33%', left: '24%', needsMaintenance: false },
        { id: 2, name: 'Cistern 2', sensor: 'Online', quality: 'Clean', filter: 'Maintenance', capacity: 92, location: 'Old Engineering Building (Bldg 5)', top: '45%', left: '74%', needsMaintenance: true },
        { id: 3, name: 'Cistern 3', sensor: 'Online', quality: 'Clean', filter: 'Operational', capacity: 64, location: 'Open Field', top: '22%', left: '46%', needsMaintenance: false },
        { id: 4, name: 'Cistern 4', sensor: 'Online', quality: 'Clean', filter: 'Operational', capacity: 58, location: 'ICT Building (Bldg 9)', top: '35%', left: '64%', needsMaintenance: false },
        { id: 5, name: 'Cistern 5', sensor: 'Online', quality: 'Turbid', filter: 'Operational', capacity: 90, location: 'Cafeteria (Bldg 20)', top: '55%', left: '54%', needsMaintenance: false },
        { id: 6, name: 'Cistern 6', sensor: 'Online', quality: 'Clean', filter: 'Maintenance', capacity: 42, location: 'Food Innovation Center (Bldg 28)', top: '37%', left: '46%', needsMaintenance: true },
    ];

    const activeCistern = cisterns.find(c => c.id === activeId);

    const radius = 45;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (activeCistern.capacity / 100) * circumference;

    return (
        <AuthenticatedLayout>
            <Head title="Cistern Map" />

            <div className="flex gap-6 h-[calc(100vh-5rem)]">
                {/* Left Area: Interactive Map Container */}
                <div className="flex-1 bg-[#12151c] rounded-xl overflow-y-auto p-6 shadow-lg border border-gray-800 flex items-start justify-center">
                    
                    {/* The Shrink-Wrapped Coordinate System */}
                    <div className="relative w-full max-w-3xl">
                        <img 
                            src="/images/ustp-map.jpeg" 
                            alt="USTP Campus Map" 
                            className="w-full h-auto rounded-xl shadow-md"
                        />
                        
                        {/* Interactive Markers */}
                        {cisterns.map((cistern) => (
                            <button
                                key={cistern.id}
                                onClick={() => setActiveId(cistern.id)}
                                style={{ top: cistern.top, left: cistern.left }}
                                className="absolute transform -translate-x-1/2 -translate-y-1/2 group focus:outline-none z-10"
                            >
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold shadow-xl transition-all duration-300 ${
                                    activeId === cistern.id 
                                        ? 'bg-blue-600 text-white scale-110 ring-4 ring-blue-500/50' 
                                        : 'bg-gray-900 text-gray-300 hover:bg-gray-800 ring-2 ring-gray-700'
                                }`}>
                                    C{cistern.id}
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Right Area: Active Stats Panel */}
                <div className="w-80 flex flex-col gap-4">
                    <div className="bg-[#161a23] rounded-xl p-6 border border-gray-800 flex-1 flex flex-col">
                        <h2 className="text-xl font-bold text-white mb-6">{activeCistern.name} Status</h2>
                        
                        <div className="space-y-3 mb-8">
                            <p className="text-sm text-gray-400">Sensor : <span className="text-green-400 font-medium">{activeCistern.sensor}</span></p>
                            <p className="text-sm text-gray-400">Water Quality : <span className={`${activeCistern.quality === 'Clean' ? 'text-blue-400' : 'text-yellow-400'} font-medium`}>{activeCistern.quality}</span></p>
                            <p className="text-sm text-gray-400">Filter Status : <span className={`${activeCistern.needsMaintenance ? 'text-red-400' : 'text-green-400'} font-medium`}>{activeCistern.filter}</span></p>
                        </div>

                        {/* Capacity Ring */}
                        <div className="flex flex-col items-center justify-center mb-8 flex-1">
                            <div className="relative w-32 h-32 flex items-center justify-center">
                                <svg className="transform -rotate-90 w-32 h-32">
                                    <circle cx="64" cy="64" r={radius} stroke="currentColor" strokeWidth="12" fill="transparent" className="text-gray-800" />
                                    <circle 
                                        cx="64" cy="64" r={radius} 
                                        stroke="currentColor" strokeWidth="12" fill="transparent" 
                                        strokeDasharray={circumference} 
                                        strokeDashoffset={strokeDashoffset} 
                                        className="text-green-500 transition-all duration-1000 ease-out" 
                                    />
                                </svg>
                                <div className="absolute text-2xl font-bold text-white">{activeCistern.capacity}%</div>
                            </div>
                            <p className="text-gray-400 text-sm mt-4 font-medium uppercase tracking-wider">Capacity</p>
                        </div>

                        <div className="border-t border-gray-800 pt-6 flex items-start gap-3">
                            <svg className="w-5 h-5 text-gray-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                            <p className="text-sm text-gray-300 leading-tight">{activeCistern.location}</p>
                        </div>
                    </div>

                    {activeCistern.needsMaintenance && (
                        <div className="bg-orange-600/20 border border-orange-500/50 rounded-xl p-4 flex items-center gap-4">
                            <div className="bg-orange-500 text-white rounded p-2">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                            </div>
                            <div>
                                <p className="font-bold text-orange-500">{activeCistern.name}</p>
                                <p className="text-sm text-orange-400">Maintenance Needed</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}