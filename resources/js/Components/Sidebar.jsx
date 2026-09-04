import { Link, usePage } from '@inertiajs/react';

export default function Sidebar() {
    const { auth } = usePage().props;
    const { url } = usePage();

    return (
        <aside className="w-64 bg-[#12151c] h-screen fixed flex flex-col border-r border-gray-800">
            <div className="p-6 flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-500 rounded text-white flex items-center justify-center font-bold">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>
                </div>
                <div>
                    <h2 className="text-lg font-bold text-white leading-tight">USTP EcoDrain</h2>
                    <p className="text-xs text-blue-400">Cistern Monitor</p>
                </div>
            </div>

            <nav className="flex-1 px-4 py-4 space-y-2">
                <Link href={route('dashboard')} className={`flex items-center gap-3 py-2.5 px-4 rounded-lg font-medium transition ${url === '/dashboard' ? 'bg-[#1e2330] text-white border border-gray-700' : 'text-gray-400 hover:bg-[#1e2330] hover:text-white'}`}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
                    Dashboard
                </Link>
                <Link href="/maintenance" className={`flex items-center gap-3 py-2.5 px-4 rounded-lg font-medium transition ${url === '/maintenance' ? 'bg-[#1e2330] text-white border border-gray-700' : 'text-gray-400 hover:bg-[#1e2330] hover:text-white'}`}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                    Maintenance Log
                </Link>
                <Link href="map" className="flex items-center gap-3 py-2.5 px-4 rounded-lg text-gray-400 hover:bg-[#1e2330] hover:text-white transition">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"></path></svg>
                    Cistern Map
                </Link>
            </nav>

            <div className="mt-auto p-4 border-t border-gray-800">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-600 overflow-hidden">
                        <img src={`https://ui-avatars.com/api/?name=${auth.user.name}&background=0D8ABC&color=fff`} alt="Profile" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-white">{auth.user.name}</p>
                        <p className="text-xs text-gray-500">Operator Account</p>
                    </div>
                </div>
            </div>
        </aside>
    );
}