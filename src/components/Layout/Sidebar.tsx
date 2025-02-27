import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Utensils, 
  Pill, 
  User, 
  ChevronLeft, 
  ChevronRight,
  Heart,
  ChevronDown,
  Calendar,
  LineChart,
  History,
  Settings,
  UserCircle,
  Key,
  Activity,
  Apple,
  Salad,
  Coffee,
  PlusCircle,
  Package,
  Leaf,
  Pin,
  PinOff,
  Clock,
  CalendarDays,
  CalendarClock,
  Globe,
  Shield,
  Zap,
  Camera,
  FileText,
  List,
  ClipboardList
} from 'lucide-react';
import { cn } from '../../utils/cn';

type TabType = 'dashboard' | 'food' | 'medication' | 'otc' | 'supplement' | 'history' | 'profile' | 'settings';
type SubTabType = string;

interface SidebarProps {
  activeTab: TabType;
  activeSubTab?: SubTabType;
  onSelect: (tab: TabType, subTab?: string) => void;
  collapsed: boolean;
  onToggle: () => void;
}

export function Sidebar({ activeTab, activeSubTab, onSelect, collapsed, onToggle }: SidebarProps) {
  const [expandedMenu, setExpandedMenu] = useState<TabType | null>(null);
  const [isPinned, setIsPinned] = useState(true); // Default to pinned
  const [isMobile, setIsMobile] = useState(false);

  // Check if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      const isMobileView = window.innerWidth < 768;
      setIsMobile(isMobileView);
      
      // Only auto-unpin on mobile
      if (isMobileView) {
        setIsPinned(false);
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Define menu items with submenus
  const menuItems = [
    { 
      id: 'dashboard' as const, 
      label: 'Dashboard', 
      icon: LayoutDashboard,
      hasSubmenu: true,
      submenu: [
        { id: 'today', label: 'Today', icon: Clock },
        { id: 'week', label: 'Week', icon: Calendar },
        { id: 'month', label: 'Month', icon: CalendarDays },
        { id: 'year', label: 'Year', icon: CalendarClock }
      ]
    },
    { 
      id: 'history' as const, 
      label: 'History', 
      icon: History,
      hasSubmenu: true,
      submenu: [
        { id: 'history', label: 'History', icon: History }
      ]
    },
    { 
      id: 'food' as const, 
      label: 'Food', 
      icon: Utensils,
      hasSubmenu: true,
      submenu: [
        { id: 'upload', label: 'Add Food', icon: PlusCircle },
        { id: 'snacks', label: 'Snacks', icon: Apple },
        { id: 'drinks', label: 'Beverages', icon: Coffee },
        { id: 'meals', label: 'Recent Meals', icon: Salad }
      ]
    },
    { 
      id: 'medication' as const, 
      label: 'Prescriptions', 
      icon: Pill,
      hasSubmenu: true,
      submenu: [
        { id: 'myprescriptions', label: 'My Prescriptions', icon: ClipboardList },
        { id: 'addnew', label: 'Add New', icon: PlusCircle },
        { id: 'select', label: 'Select Med', icon: List },
        { id: 'photo', label: 'Take Photo', icon: Camera },
        { id: 'label', label: 'Upload Label', icon: FileText }
      ]
    },
    { 
      id: 'otc' as const, 
      label: 'OTC', 
      icon: Package,
      hasSubmenu: true,
      submenu: [
        { id: 'myotc', label: 'My OTC Meds', icon: ClipboardList },
        { id: 'addnew', label: 'Add New', icon: PlusCircle },
        { id: 'select', label: 'Select OTC', icon: List },
        { id: 'photo', label: 'Take Photo', icon: Camera },
        { id: 'label', label: 'Upload Label', icon: FileText }
      ]
    },
    { 
      id: 'supplement' as const, 
      label: 'Supplements', 
      icon: Leaf,
      hasSubmenu: true,
      submenu: [
        { id: 'mysupplements', label: 'My Supplements', icon: ClipboardList },
        { id: 'addnew', label: 'Add New', icon: PlusCircle },
        { id: 'select', label: 'Select Supplement', icon: List },
        { id: 'photo', label: 'Take Photo', icon: Camera },
        { id: 'label', label: 'Upload Label', icon: FileText }
      ]
    },
    { 
      id: 'profile' as const, 
      label: 'Profile', 
      icon: User,
      hasSubmenu: true,
      submenu: [
        { id: 'account', label: 'Account Details', icon: UserCircle },
        { id: 'personal', label: 'Personal Info', icon: User },
        { id: 'health', label: 'Health Metrics', icon: Activity },
        { id: 'heart', label: 'Heart Health', icon: Heart }
      ]
    },
    { 
      id: 'settings' as const, 
      label: 'Settings', 
      icon: Settings,
      hasSubmenu: true,
      submenu: [
        { id: 'api', label: 'API', icon: Key },
        { id: 'localization', label: 'Localization', icon: Globe },
        { id: 'license', label: 'License Details', icon: Shield },
        { id: 'upgrade', label: 'Upgrade Options', icon: Zap }
      ]
    },
  ];

  const toggleSubmenu = (id: TabType) => {
    if (collapsed) {
      // If sidebar is collapsed, expand it first
      onToggle();
      setExpandedMenu(id);
    } else {
      setExpandedMenu(expandedMenu === id ? null : id);
    }
  };

  const handleMenuClick = (id: TabType) => {
    const menuItem = menuItems.find(item => item.id === id);
    if (menuItem?.hasSubmenu) {
      toggleSubmenu(id);
      if (expandedMenu !== id) {
        // Set default submenu when expanding
        const defaultSubmenu = menuItem.submenu[0].id;
        onSelect(id, defaultSubmenu);
      }
    } else {
      onSelect(id);
      if (!isPinned && !isMobile) {
        // Collapse the entire sidebar when clicking a menu without submenu
        onToggle();
      }
    }
  };

  const handleSubmenuClick = (parentId: TabType, subId: string) => {
    onSelect(parentId, subId);
    
    // Auto-collapse the entire sidebar after selection if not pinned and on mobile
    if (isMobile && !isPinned) {
      if (!collapsed) {
        onToggle(); // Collapse the entire sidebar
      }
    }
  };

  const togglePin = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPinned(!isPinned);
  };

  return (
    <aside 
      className={cn(
        "bg-white border-r border-gray-200 transition-all duration-300 flex flex-col",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <Heart className="h-6 w-6 text-blue-600" />
            <span className="font-bold text-lg text-gray-800">Lipid Zone</span>
          </div>
        )}
        {collapsed && <Heart className="h-6 w-6 text-blue-600 mx-auto" />}
        <div className="flex items-center gap-2">
          {!collapsed && !isMobile && (
            <span
              onClick={togglePin}
              className={cn(
                "p-1 rounded-full hover:bg-gray-100 cursor-pointer",
                isPinned ? "text-blue-500" : "text-gray-400"
              )}
              title={isPinned ? "Unpin menu" : "Pin menu"}
            >
              {isPinned ? <Pin size={16} /> : <PinOff size={16} />}
            </span>
          )}
          <button 
            onClick={onToggle}
            className="p-1 rounded-md hover:bg-gray-100 text-gray-500"
          >
            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>
      </div>
      
      <nav className="flex-1 py-4 overflow-y-auto">
        <ul className="space-y-1 px-2">
          {menuItems.map(item => (
            <li key={item.id}>
              <div>
                <button
                  onClick={() => handleMenuClick(item.id)}
                  className={cn(
                    "flex items-center w-full px-3 py-2 rounded-md transition-colors",
                    activeTab === item.id 
                      ? "bg-blue-50 text-blue-600" 
                      : "text-gray-600 hover:bg-gray-50"
                  )}
                >
                  <item.icon className={cn(
                    "h-5 w-5 flex-shrink-0",
                    collapsed ? "mx-auto" : "mr-3"
                  )} />
                  
                  {!collapsed && (
                    <>
                      <span className="flex-1 text-left">{item.label}</span>
                      {item.hasSubmenu && (
                        <ChevronDown 
                          className={cn(
                            "h-4 w-4 transition-transform",
                            expandedMenu === item.id ? "transform rotate-180" : ""
                          )} 
                        />
                      )}
                    </>
                  )}
                </button>
                
                {/* Submenu for desktop expanded view */}
                {!collapsed && item.hasSubmenu && (
                  <div className={cn(
                    "overflow-hidden transition-all duration-200",
                    expandedMenu === item.id ? "max-h-64" : "max-h-0"
                  )}>
                    <ul className="pl-10 py-1 space-y-1">
                      {item.submenu?.map(subItem => (
                        <li key={subItem.id}>
                          <button
                            onClick={() => handleSubmenuClick(item.id, subItem.id)}
                            className={cn(
                              "flex items-center text-sm py-1 w-full rounded-md px-2",
                              activeTab === item.id && activeSubTab === subItem.id
                                ? "bg-blue-50 text-blue-600"
                                : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                            )}
                          >
                            <subItem.icon className="h-4 w-4 mr-2" />
                            <span>{subItem.label}</span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {/* Flyout submenu for collapsed view */}
                {collapsed && item.hasSubmenu && (
                  <div className="relative group">
                    <div className="absolute left-full top-0 ml-2 hidden group-hover:block bg-white shadow-lg rounded-md p-2 z-10 w-48">
                      <div className="font-medium px-3 py-2 text-gray-700">{item.label}</div>
                      <ul className="space-y-1">
                        {item.submenu?.map(subItem => (
                          <li key={subItem.id}>
                            <button
                              onClick={() => handleSubmenuClick(item.id, subItem.id)}
                              className={cn(
                                "flex items-center px-3 py-2 hover:bg-gray-100 text-gray-700 text-sm rounded-md w-full",
                                activeTab === item.id && activeSubTab === subItem.id
                                  ? "bg-blue-50 text-blue-600"
                                  : ""
                              )}
                            >
                              <subItem.icon className="h-4 w-4 mr-2" />
                              <span>{subItem.label}</span>
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-gray-200">
        <div className={cn(
          "flex items-center",
          collapsed ? "justify-center" : "justify-start"
        )}>
          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
            U
          </div>
          {!collapsed && <span className="ml-2 text-sm font-medium">User</span>}
        </div>
      </div>
    </aside>
  );
}