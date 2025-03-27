import { useState } from "react";

// ICONS
import { Plus, Kanban } from 'lucide-react';


const App = () => {
  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <nav className="bg-gray-950 backdrop-blur-sm border-b-2 border-gray-800 px-4 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="font-cursive text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent flex items-center gap-2">
            <Kanban className="w-8 h-8" />
            WalnutBoard
          </h1>
          <button
            onClick={() => setShowAddModal(true)}
            className="cursor-pointer bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-2 rounded-lg flex items-center gap-2 hover:opacity-90 transition-opacity"
          >
            <Plus size={20} />
          </button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 h-[calc(100vh-8rem)]">
        </div>
      </main>
    </div>
  );
}

export default App;