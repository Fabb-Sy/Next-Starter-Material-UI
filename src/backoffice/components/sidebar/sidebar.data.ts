import { SidebarItem } from './sidebar.type';

export const sidebarItems: SidebarItem[] = [
  {
    icon: '/icons/sidebar/dashboard.svg',
    title: 'Dashboard',
    path: '/backoffice/dashboard',
  },
  {
    icon: '/icons/sidebar/user.svg',
    title: 'Example',
    path: '/backoffice/example',
  },
  {
    icon: '/icons/sidebar/setting.svg',
    title: 'Master Data',
    links: [
      { 
        label: 'Options 1', 
        link: '#', 
      },
      { 
        label: 'Options 2', 
        link: '#', 
      },
      { 
        label: 'Options 3', 
        link: '#', 
      }
    ],
  },
];
