'use client'

import Navbar from '@/backoffice/components/navbar';
import Sidebar from '@/backoffice/components/sidebar';
import { deleteSessionGoogle } from '@/lib/next-auth/action';
import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';

// const Sidebar = dynamic(() => import('@/backoffice/components/sidebar'), {
//   ssr: false,
// });

// const Navbar = dynamic(() => import('@/backoffice/components/navbar'), {
//   ssr: false,
// });

const BackofficeLayout = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Handle localStorage after component mounts
  useEffect(() => {
    const deleteSession = async () => {
      await deleteSessionGoogle();
    };
    deleteSession();
    const saved = localStorage.getItem('sidebarOpen');
    if (saved !== null) {
      setIsSidebarOpen(JSON.parse(saved));
    } else {
      localStorage.setItem('sidebarOpen', 'true');
    }
  }, []);

  // Save state changes to localStorage
  useEffect(() => {
    localStorage.setItem('sidebarOpen', JSON.stringify(isSidebarOpen));
  }, [isSidebarOpen]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <Sidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} />
      <div className={`my-4 transition-all duration-300 mr-6 ${isSidebarOpen ? 'md:ml-[17rem]' : 'md:ml-28'}`}>
        {children}
      </div>
    </div>
  );
};

export default BackofficeLayout;
