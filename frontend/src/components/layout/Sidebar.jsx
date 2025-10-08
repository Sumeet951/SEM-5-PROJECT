import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home,
  CreditCard,
  BarChart3,
  Calendar,
  Settings,
  Bell,
  LogOut,
  X,
  ChevronRight,
  ChevronDown,
  Sparkles,
  TrendingUp,
  Folder,
  FileText,
  HelpCircle,
  Shield,
  Zap,
  Tag,
  Loader2 // ✅ Added for loading state
} from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../Redux/Slices/AuthSlice';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const [expandedMenus, setExpandedMenus] = useState({});
  const [isLoggingOut, setIsLoggingOut] = useState(false); // ✅ Loading state
  const currentPath = window.location.pathname;
  const { data } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Navigation items
  const navigationItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: Home,
      path: '/dashboard',
      badge: null
    },
    {
      id: 'subscriptions',
      label: 'Subscriptions',
      icon: CreditCard,
      path: '/subscriptions',
      badge: '12',
      subItems: [
        { label: 'All Subscriptions', path: '/subscriptions/all', icon: Folder },
        { label: 'Active', path: '/subscriptions/active', icon: Zap },
        { label: 'Paused', path: '/subscriptions/paused' },
        { label: 'Canceled', path: '/subscriptions/canceled' }
      ]
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: BarChart3,
      path: '/analytics',
      subItems: [
        { label: 'Overview', path: '/analytics' },
        { label: 'Spending', path: '/analytics' },
        { label: 'Insights', path: '/analytics', icon: Sparkles }
      ]
    },
    {
      id: 'calendar',
      label: 'Calendar',
      icon: Calendar,
      path: '/calendar',
      badge: '3'
    },
    {
      id: 'categories',
      label: 'Categories',
      icon: Tag,
      path: '/categories'
    },
    {
      id: 'reports',
      label: 'Reports',
      icon: FileText,
      path: '/reports'
    }
  ];

  const bottomItems = [
    {
      id: 'support',
      label: 'Help & Support',
      icon: HelpCircle,
      path: '/support'
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings,
      path: '/settings'
    }
  ];

  const toggleSubmenu = (itemId) => {
    setExpandedMenus(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  };

  const isActive = (path) => currentPath === path;
  const isParentActive = (item) => {
    if (isActive(item.path)) return true;
    if (item.subItems) {
      return item.subItems.some(sub => isActive(sub.path));
    }
    return false;
  };

  // ✅ FIXED LOGOUT HANDLER
  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      
      // Dispatch logout action (call as function)
      const res = await dispatch(logout());
      
      // Check if logout was successful
      if (res?.payload?.success) {
        // Clear any local storage if needed
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        
        // Navigate to home/login page
        navigate('/');
      } else {
        // Handle error
        console.error('Logout failed:', res?.payload?.message || 'Unknown error');
        alert('Logout failed. Please try again.');
      }
    } catch (error) {
      console.error('Logout error:', error);
      alert('An error occurred during logout. Please try again.');
    } finally {
      setIsLoggingOut(false);
    }
  };

  // Animation variants
  const sidebarVariants = {
    open: {
      x: 0,
      transition: { type: "spring", stiffness: 300, damping: 30 }
    },
    closed: {
      x: "-100%",
      transition: { type: "spring", stiffness: 300, damping: 30 }
    }
  };

  const overlayVariants = {
    open: { opacity: 1, display: "block" },
    closed: { 
      opacity: 0,
      transitionEnd: { display: "none" }
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={overlayVariants}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={isOpen ? "open" : "closed"}
        variants={sidebarVariants}
        className={`
          fixed lg:relative inset-y-0 left-0 z-50
          bg-white border-r border-gray-200
          flex flex-col shadow-xl lg:shadow-none
          transition-all duration-300 ease-in-out
          ${isOpen ? 'w-72' : 'w-72 lg:w-20'}
        `}
      >
        {/* Header */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-gray-200 bg-gradient-to-r from-purple-600 to-indigo-600 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg">
              <Sparkles className="w-6 h-6 text-purple-600" />
            </div>
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <h2 className="text-xl font-bold text-white">SubTracker</h2>
                  <p className="text-xs text-purple-100">Pro Plan</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 hover:bg-white/20 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* User Profile Card */}
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="m-4 p-4 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl border border-purple-100 flex-shrink-0"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center text-white font-semibold text-lg shadow-lg">
                  {/* ✅ Display user initials */}
                  {data?.fullName ? data.fullName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : 'JD'}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 truncate">
                    {data?.fullName || 'John Doe'}
                  </h3>
                  <p className="text-sm text-gray-600 truncate">
                    {data?.email || 'john@example.com'}
                  </p>
                </div>
              </div>
              
              <div className="mt-4 flex items-center justify-between text-sm">
                <span className="text-gray-600">Monthly Spending</span>
                <span className="font-bold text-purple-600">$234.50</span>
              </div>
              
              <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "47%" }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="h-full bg-gradient-to-r from-purple-600 to-indigo-600"
                />
              </div>
              
              <p className="mt-2 text-xs text-gray-600">47% of $500 budget</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 custom-scrollbar">
          <div className="space-y-1">
            {navigationItems.map((item, index) => (
              <NavItem
                key={item.id}
                item={item}
                isOpen={isOpen}
                isActive={isParentActive(item)}
                isExpanded={expandedMenus[item.id]}
                onToggle={() => toggleSubmenu(item.id)}
                delay={index * 0.05}
              />
            ))}
          </div>

          <div className="my-4 border-t border-gray-200" />

          {/* Quick Stats */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="mx-2 mb-4"
              >
                <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-3">
                  Quick Stats
                </h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors cursor-pointer">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        <TrendingUp className="w-4 h-4 text-blue-600" />
                      </div>
                      <span className="text-sm font-medium text-gray-700">Active</span>
                    </div>
                    <span className="text-lg font-bold text-blue-600">12</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-amber-50 rounded-xl hover:bg-amber-100 transition-colors cursor-pointer">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
                        <Bell className="w-4 h-4 text-amber-600" />
                      </div>
                      <span className="text-sm font-medium text-gray-700">Due Soon</span>
                    </div>
                    <span className="text-lg font-bold text-amber-600">3</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Bottom Items */}
          <div className="space-y-1">
            {bottomItems.map((item, index) => (
              <NavItem
                key={item.id}
                item={item}
                isOpen={isOpen}
                isActive={isActive(item.path)}
                delay={(navigationItems.length + index) * 0.05}
              />
            ))}
          </div>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 flex-shrink-0">
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="expanded"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {/* ✅ FIXED LOGOUT BUTTON */}
                <button 
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-all font-medium group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoggingOut ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <LogOut className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  )}
                  <span>{isLoggingOut ? 'Logging out...' : 'Logout'}</span>
                </button>
                
                <div className="mt-3 p-3 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <Shield className="w-4 h-4 text-green-600" />
                    <span>Secure & Encrypted</span>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.button
                key="collapsed"
                onClick={handleLogout}
                disabled={isLoggingOut}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="w-full p-3 text-red-600 hover:bg-red-50 rounded-xl transition-all flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                title="Logout"
              >
                {isLoggingOut ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <LogOut className="w-5 h-5" />
                )}
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        {/* Desktop Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="hidden lg:flex absolute -right-3 top-20 w-6 h-6 bg-white border-2 border-gray-200 rounded-full items-center justify-center hover:bg-gray-50 transition-colors shadow-md z-10"
        >
          <ChevronRight className={`w-4 h-4 text-gray-600 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
        </button>
      </motion.aside>
    </>
  );
};

// ============================================
// Navigation Item Component
// ============================================
const NavItem = ({ item, isOpen, isActive, isExpanded, onToggle, delay }) => {
  const Icon = item.icon;
  const hasSubItems = item.subItems && item.subItems.length > 0;
  const navigate = useNavigate();

  const handleClick = () => {
    if (hasSubItems && onToggle) {
      onToggle();
    } else if (item.path) {
      // ✅ Navigate to path
      navigate(item.path);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay }}
    >
      {/* Main Item */}
      <button
        onClick={handleClick}
        className={`
          w-full flex items-center justify-between px-4 py-3 rounded-xl
          transition-all duration-200 group relative
          ${isActive 
            ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-500/30' 
            : 'text-gray-700 hover:bg-gray-100'
          }
        `}
      >
        {/* Active Indicator */}
        {isActive && (
          <motion.div
            layoutId="activeIndicator"
            className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-r-full"
          />
        )}

        <div className="flex items-center gap-3">
          <Icon className={`w-5 h-5 transition-transform group-hover:scale-110 ${
            isActive ? 'text-white' : 'text-gray-600 group-hover:text-purple-600'
          }`} />
          
          <AnimatePresence>
            {isOpen && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="font-medium"
              >
                {item.label}
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-2"
            >
              {item.badge && (
                <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${
                  isActive ? 'bg-white/20 text-white' : 'bg-purple-100 text-purple-600'
                }`}>
                  {item.badge}
                </span>
              )}
              {hasSubItems && (
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${
                  isExpanded ? 'rotate-180' : ''
                }`} />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </button>

      {/* Sub Items */}
      <AnimatePresence>
        {hasSubItems && isExpanded && isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden ml-4 mt-1 space-y-1"
          >
            {item.subItems.map((subItem, index) => {
              const SubIcon = subItem.icon;
              return (
                <motion.button
                  key={index}
                  onClick={() => navigate(subItem.path)}
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-100 hover:text-purple-600 transition-all group"
                >
                  {SubIcon && <SubIcon className="w-4 h-4" />}
                  <span>{subItem.label}</span>
                </motion.button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Sidebar;