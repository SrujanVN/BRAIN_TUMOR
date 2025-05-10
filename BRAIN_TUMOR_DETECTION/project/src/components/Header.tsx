import React from 'react';
import { Brain } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-10 bg-black/30 py-4 shadow-lg backdrop-blur-md">
      <div className="container mx-auto flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold text-white">Brain Tumor Detection</h1>
        </div>
      </div>
    </header>
  );
};

export default Header;
