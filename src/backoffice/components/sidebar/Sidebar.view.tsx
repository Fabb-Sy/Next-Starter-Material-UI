'use client'

import { Box, Drawer, IconButton, List, ListItemButton, ListItemIcon, ListItemText, Collapse, useTheme, Divider, Tooltip, Popover } from '@mui/material';
import { ChevronLeft, ChevronRight, ExpandMore, ExpandLess } from '@mui/icons-material';
import { SidebarViewProps, SidebarItem } from './sidebar.type';
import Link from 'next/link';
import { useState, useRef } from 'react';
import Image from 'next/image';

const SidebarView = ({
  items,
  isOpen,
  onToggle,
  activeMenu,
  expandedSubmenu,
  handleSubmenuClick,
}: SidebarViewProps) => {
  const theme = useTheme();
  const [popoverAnchor, setPopoverAnchor] = useState<HTMLElement | null>(null);
  const [activeSubmenu, setActiveSubmenu] = useState<SidebarItem | null>(null);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>, item: SidebarItem) => {
    if (!isOpen && item.links?.length) {
      setPopoverAnchor(event.currentTarget);
      setActiveSubmenu(item);
    }
  };

  const handlePopoverClose = () => {
    setPopoverAnchor(null);
    setActiveSubmenu(null);
  };

  const renderMenuItem = (item: SidebarItem, index: number) => {
    const isActive = item.path === activeMenu || (item.links?.some(link => link.link === activeMenu));
    const hasSubMenu = item.links && item.links.length > 0;
    const isExpanded = expandedSubmenu === item.title;

    const menuItemContent = (
      <ListItemButton
        onClick={() => hasSubMenu && isOpen ? handleSubmenuClick(item.title) : null}
        onMouseEnter={(e) => handlePopoverOpen(e, item)}
        sx={{
          minHeight: 48,
          maxHeight: 48,
          justifyContent: isOpen ? 'initial' : 'center',
          px: 2,
          borderRadius: '8px',
          mb: 1,
          backgroundColor: isActive ? '#f2f2f2' : 'transparent',
        }}
      >
        <ListItemIcon
          sx={{
            minWidth: 0,
            mr: isOpen ? 2 : 'auto',
            justifyContent: 'center',
          }}
        >
          <Image
            src={item.icon}
            alt={item.title}
            width={24}
            height={24}
            priority
            className={`transition-all duration-200 ${isActive ? 'filter-primary' : ''}`}
            style={{
              filter: isActive ? 'brightness(0) saturate(100%) invert(49%) sepia(85%) saturate(433%) hue-rotate(144deg) brightness(91%) contrast(88%)' : 'none'
            }}
          />
        </ListItemIcon>
        <ListItemText
          primary={item.title}
          sx={{
            opacity: isOpen ? 1 : 0,
            transition: theme.transitions.create('opacity'),
          }}
        />
        {hasSubMenu && isOpen && (
          <Box component="span" sx={{ ml: 1 }}>
            {isExpanded ? <ExpandLess /> : <ExpandMore />}
          </Box>
        )}
      </ListItemButton>
    );

    const menuItem = item.path ? (
      <Link key={`${item.title}-${index}`} href={item.path} style={{ textDecoration: 'none' }}>
        {menuItemContent}
      </Link>
    ) : menuItemContent;

    return (
      <Box key={item.title}>
        {isOpen ? menuItem : (
          <Tooltip title={hasSubMenu ? '' : item.title} placement="right">
            {menuItem}
          </Tooltip>
        )}

        {hasSubMenu && (
          <>
            <Collapse in={isExpanded && isOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {item.links?.map((subItem, subIndex) => (
                  <Link
                    key={`${item.title}-${subIndex}`}
                    href={subItem.link}
                    style={{ textDecoration: 'none' }}
                  >
                    <ListItemButton
                      sx={{
                        height: 40,
                        pl: 4,
                        ml: 2,
                        borderRadius: '8px',
                        backgroundColor: subItem.link === activeMenu ? theme.palette.primary.light : 'transparent',
                        color: subItem.link === activeMenu ? theme.palette.primary.main : theme.palette.text.primary,
                        '&:hover': {
                          backgroundColor: theme.palette.action.hover,
                        },
                      }}
                    >
                      <ListItemText
                        primary={subItem.label}
                        primaryTypographyProps={{
                          fontSize: '0.875rem',
                          fontWeight: subItem.link === activeMenu ? 600 : 400,
                        }}
                      />
                    </ListItemButton>
                  </Link>
                ))}
              </List>
            </Collapse>

            <Popover
              open={!isOpen && popoverAnchor !== null && activeSubmenu?.title === item.title}
              anchorEl={popoverAnchor}
              onClose={handlePopoverClose}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              PaperProps={{
                sx: {
                  width: 200,
                  mt: 0,
                  ml: 1,
                  overflow: 'hidden',
                  boxShadow: theme.shadows[4],
                },
              }}
            >
              <List component="div">
                {item.links?.map((subItem, subIndex) => (
                  <Link
                    key={`${item.title}-${subIndex}`}
                    href={subItem.link}
                    style={{ textDecoration: 'none' }}
                    onClick={handlePopoverClose}
                  >
                    <ListItemButton
                      sx={{
                        px: 2,
                        py: 1,
                        backgroundColor: subItem.link === activeMenu ? theme.palette.primary.light : 'transparent',
                        color: subItem.link === activeMenu ? theme.palette.primary.main : theme.palette.text.primary,
                        '&:hover': {
                          backgroundColor: theme.palette.action.hover,
                        },
                      }}
                    >
                      <ListItemText
                        primary={subItem.label}
                        primaryTypographyProps={{
                          fontSize: '0.875rem',
                          fontWeight: subItem.link === activeMenu ? 600 : 400,
                        }}
                      />
                    </ListItemButton>
                  </Link>
                ))}
              </List>
            </Popover>
          </>
        )}
      </Box>
    );
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: isOpen ? 250 : 90,
        transition: theme.transitions.create('width'),
        '& .MuiDrawer-paper': {
          width: isOpen ? 250 : 90,
          transition: theme.transitions.create('width'),
          overflowX: 'hidden',
          borderRight: `1px solid ${theme.palette.divider}`,
          backgroundColor: theme.palette.background.paper,
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.05)',
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          p: 1,
          minHeight: 64,
          maxHeight: 64,
        }}
      >
        <IconButton onClick={onToggle}>
          {isOpen ? <ChevronLeft /> : <ChevronRight />}
        </IconButton>
      </Box>
      <Divider />
      <List sx={{ p: 2 }}>
        {items.map(renderMenuItem)}
      </List>
    </Drawer>
  );
};

export default SidebarView;
