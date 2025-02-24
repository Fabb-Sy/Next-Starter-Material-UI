import { SidebarItem } from './sidebar.type';

export const sidebarItems: SidebarItem[] = [
  {
    icon: '/icons/sidebar/dashboard.svg',
    title: 'Dashboard',
    path: '/backoffice/dashboard',
  },
  {
    icon: '/icons/sidebar/user.svg',
    title: 'Manage User',
    path: '#',
  },
  {
    icon: '/icons/sidebar/setting.svg',
    title: 'Master Data',
    links: [
      { 
        label: 'Academic Level', 
        link: '#', 
      },
      { 
        label: 'School Level', 
        link: '#', 
      },
      { 
        label: 'Subject Category', 
        link: '#', 
      }
    ],
  },
];
