import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { PinLeftIcon } from '@radix-ui/react-icons';
import { Menu } from 'lucide-react';

const menuItems = [
  { name: 'Branches', path: '/staff/branches' },
  { name: 'Majors', path: '/staff/majors' },
  { name: 'Admission Types', path: '/staff/admission-types' },
  { name: 'Scholarships', path: '/staff/scholarships' }
];

const SideBar: React.FC = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile top bar */}
      <div className="flex items-center justify-between bg-gray-900 px-4 py-3 text-white shadow-lg md:hidden">
        <div className="text-lg font-bold">Data Provider Hub</div>
        <button
          onClick={() => setOpen((v) => !v)}
          className="focus:outline-none"
          aria-label="Open sidebar menu"
        >
          <Menu size={28} />
        </button>
      </div>
      {/* Sidebar */}
      <aside
        className={`
                    fixed left-0 top-0 z-40 flex h-full w-60 flex-col bg-gray-900 text-white shadow-lg transition-transform
                    duration-300 md:static
                    ${open ? 'translate-x-0' : '-translate-x-full'}
                    md:min-h-screen md:translate-x-0
                `}
      >
        <div className="mb-8 hidden border-b border-gray-700 py-4 text-center text-2xl font-bold md:block">
          Data Provider Hub
        </div>
        <nav className="flex-1">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center px-8 py-3 no-underline transition-colors ${
                location.pathname === item.path
                  ? 'bg-gray-800 font-bold text-blue-400'
                  : 'hover:bg-gray-800'
              }`}
              onClick={() => setOpen(false)}
            >
              <span className="mr-4"></span>
              {item.name}
            </Link>
          ))}
        </nav>
        <div className="mt-auto px-8 pb-4">
          <button
            className="flex w-full cursor-pointer items-center border-none bg-none py-3 text-base text-red-600"
            onClick={() => {
              // Add logout logic here
            }}
          >
            <PinLeftIcon className="mr-4" />
            Logout
          </button>
        </div>
      </aside>
      {/* Overlay for mobile */}
      {open && (
        <div
          className="fixed inset-0 z-30 bg-black/40 md:hidden"
          onClick={() => setOpen(false)}
        ></div>
      )}
    </>
  );
};

export default SideBar;
