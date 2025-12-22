import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar = ({ isOpen }: SidebarProps) => {
  const menuItems = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Projects', href: '#' },
    { name: 'Documents', href: '#' },
    { name: 'Settings', href: '#' },
  ];

  return (
    <aside 
      className={cn(
        "border-r bg-gray-50 h-[calc(100vh-4rem)] sticky top-16 overflow-y-auto transition-all duration-300",
        isOpen ? "w-64" : "w-0 -ml-px border-r-0 opacity-0 pointer-events-none"
      )}
    >
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="block px-4 py-2 rounded-md hover:bg-gray-200 transition-colors whitespace-nowrap"
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
