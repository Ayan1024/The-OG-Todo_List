import React from 'react';

function Navbar() {
  return (
    <nav className="bg-slate-700 text-white py-3">
      <div className="container mx-auto flex justify-between items-center px-4">
        {/* Logo */}
        <div className="logo">
          <span className="font-bold text-xl">iTask</span>
        </div>

        {/* Navigation Links */}
        <ul className="flex gap-10">
          <li className="cursor-pointer hover:font-bold transition-all">Home</li>
          <li className="cursor-pointer hover:font-bold transition-all">Your Tasks</li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
