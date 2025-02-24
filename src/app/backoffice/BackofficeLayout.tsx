import dynamic from 'next/dynamic';

const Sidebar = dynamic(() => import('@/backoffice/components/sidebar'), {
  ssr: true,
});

const Navbar = dynamic(() => import('@/backoffice/components/navbar'), {
  ssr: true,
});

const BackofficeLayout = async ({ children }: { children: React.ReactNode }) => {
  const sidebarOpen = true;

  return (
    <>
      <div className="">
        <Navbar />  
        <Sidebar />
        <div className={`mt-6 transition-all duration-300 ${sidebarOpen ? 'md:ml-72' : 'md:ml-28'}`}>
          {children}
        </div>
      </div>
    </>
  )
};

export default BackofficeLayout;