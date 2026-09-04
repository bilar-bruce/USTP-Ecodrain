import Sidebar from '@/Components/Sidebar';

export default function AuthenticatedLayout({ children }) {
    return (
        <div className="min-h-screen bg-[#0a0c10] text-gray-200 flex font-sans">
            
            {/* Inject the standalone Sidebar Component here */}
            <Sidebar />

            {/* Main Content Area */}
            <main className="flex-1 ml-64 p-10">
                {children}
            </main>
        </div>
    );
}