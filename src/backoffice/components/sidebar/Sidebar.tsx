'use client'

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import SidebarView from './Sidebar.view';
import { sidebarItems } from './sidebar.data';
import { SidebarProps } from './sidebar.type';

const Sidebar = ({isOpen, onToggle}: SidebarProps) => {
  const pathname = usePathname();
  const [expandedSubmenu, setExpandedSubmenu] = useState<string | null>(null);
  const handleSubmenuClick = (title: string) => {
    setExpandedSubmenu(expandedSubmenu === title ? null : title);
  };

  return (
    <SidebarView
      items={sidebarItems}
      isOpen={isOpen}
      onToggle={() => {
        onToggle();
        localStorage.setItem('sidebarOpen', JSON.stringify(!isOpen));
      }}
      activeMenu={pathname}
      expandedSubmenu={expandedSubmenu}
      handleSubmenuClick={handleSubmenuClick}
    />
  );
};

export default Sidebar;
