'use client'

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import SidebarView from './Sidebar.view';
import { sidebarItems } from './sidebar.data';

const Sidebar = () => {
  const pathname = usePathname();
  const [expandedSubmenu, setExpandedSubmenu] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem('sidebarOpen');
    if (saved !== null) {
      setIsSidebarOpen(JSON.parse(saved));
    }
  }, []);

  const handleSubmenuClick = (title: string) => {
    setExpandedSubmenu(expandedSubmenu === title ? null : title);
  };

  return (
    <SidebarView
      items={sidebarItems}
      isOpen={isSidebarOpen}
      onToggle={() => {
        setIsSidebarOpen(!isSidebarOpen);
        localStorage.setItem('sidebarOpen', JSON.stringify(!isSidebarOpen));
      }}
      activeMenu={pathname}
      expandedSubmenu={expandedSubmenu}
      handleSubmenuClick={handleSubmenuClick}
    />
  );
};

export default Sidebar;
