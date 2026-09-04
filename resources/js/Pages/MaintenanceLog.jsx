import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

export default function MaintenanceLog() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedLog, setSelectedLog] = useState(null);

    const logs = [
        { id: 1, cistern: 'Cistern 3', desc: 'Replaced Filter Layers', type: 'routine', date: '2026-09-01 08:30 AM', technician: 'Jane Doe' },
        { id: 2, cistern: 'Cistern 5', desc: 'Broken Sensors', type: 'error', date: '2026-09-02 3:15 PM', technician: 'John Smith' },
        { id: 3, cistern: 'Cistern 1', desc: 'Broken Sensors', type: 'error', date: '2026-09-03 09:00 AM', technician: 'Jane Doe' },
        { id: 4, cistern: 'Cistern 2', desc: 'Replaced Filter Layers', type: 'routine', date: '2026-09-03 11:45 AM', technician: 'Mark Lee' },
        { id: 5, cistern: 'Cistern 4', desc: 'Replaced Filter Layers', type: 'routine', date: '2026-09-04 10:20 AM', technician: 'Jane Doe' },
    ];

    // Filter logic for the search bar
    const filteredLogs = logs.filter(log => 
        log.cistern.toLowerCase().includes(searchQuery.toLowerCase()) || 
        log.desc.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <AuthenticatedLayout>
            <Head title="Maintenance Log" />
            
            <div className="flex justify-between items-end mb-8">
                <header>
                    <h1 className="text-3xl font-bold text-white">Maintenance Log</h1>
                    <p className="text-gray-400 mt-1">Complete service events and sensor replacement database.</p>
                </header>
                
                <div className="relative w-64">
                    <svg className="w-4 h-4 absolute left-3 top-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                    <input 
                        type="text" 
                        placeholder="Search here" 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-[#161a23] border border-gray-700 text-white rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:border-blue-500 transition"
                    />
                </div>
            </div>

            <div className="bg-[#12151c] border border-gray-800 rounded-xl overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-gray-800 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                            <th className="py-4 px-6">Cisterns</th>
                            <th className="py-4 px-6">Description</th>
                            <th className="py-4 px-6 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800/50">
                        {filteredLogs.length > 0 ? filteredLogs.map((log) => (
                            <tr key={log.id} className="hover:bg-[#161a23] transition">
                                <td className="py-4 px-6 font-medium text-white flex items-center gap-3">
                                    <span className={`w-1 h-5 rounded-full ${log.type === 'error' ? 'bg-red-500' : 'bg-blue-500'}`}></span>
                                    {log.cistern}
                                </td>
                                <td className="py-4 px-6 text-gray-400">
                                    {log.desc}
                                </td>
                                <td className="py-4 px-6 text-right">
                                    <button 
                                        onClick={() => setSelectedLog(log)}
                                        className="text-sm text-blue-500 hover:text-blue-400 hover:underline focus:outline-none"
                                    >
                                        See more
                                    </button>
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan="3" className="py-8 text-center text-gray-500">No logs found matching your search.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* See More Modal Overlay */}
            {selectedLog && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-[#161a23] border border-gray-700 p-8 rounded-xl w-[400px] shadow-2xl relative">
                        <button 
                            onClick={() => setSelectedLog(null)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-white"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                        </button>
                        
                        <h2 className="text-2xl font-bold text-white mb-1">{selectedLog.cistern}</h2>
                        <p className={`text-sm font-medium mb-6 ${selectedLog.type === 'error' ? 'text-red-400' : 'text-blue-400'}`}>
                            {selectedLog.type === 'error' ? 'Critical Error' : 'Routine Maintenance'}
                        </p>
                        
                        <div className="space-y-4">
                            <div>
                                <p className="text-xs text-gray-500 uppercase">Description</p>
                                <p className="text-gray-200">{selectedLog.desc}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 uppercase">Date Logged</p>
                                <p className="text-gray-200">{selectedLog.date}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 uppercase">Assigned Technician</p>
                                <p className="text-gray-200">{selectedLog.technician}</p>
                            </div>
                        </div>

                        <button 
                            onClick={() => setSelectedLog(null)}
                            className="mt-8 w-full bg-[#1e2330] hover:bg-gray-700 text-white font-medium py-2 rounded-lg transition"
                        >
                            Close Details
                        </button>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}