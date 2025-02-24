export interface SubLink {
  label: string;
  link: string;
  permission?: string;
}

export interface SidebarItem {
  icon: string;
  title: string;
  path?: string;
  links?: SubLink[];
}

export interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export interface SidebarViewProps extends SidebarProps {
  items: SidebarItem[];
  activeMenu: string;
  expandedSubmenu: string | null;
  handleSubmenuClick: (title: string) => void;
}
