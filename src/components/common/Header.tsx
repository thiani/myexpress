import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Phone, Mail, Menu, X, MapPin } from 'lucide-react';
import { useCart } from '../../hooks/useCart';
import Input from './Input';
import logo from '../../assets/images/logo/logo.png';

interface MenuItem {
  label: string;
  href: string;
}

const menuItems: MenuItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Catalog', href: '/catalog' },
  { label: 'Brands', href: '/brands' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { cart } = useCart();
  const location = useLocation();

  const cartItemsCount = cart.items.reduce((total, item) => total + item.quantity, 0);

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActiveLink = (href: string) => {
    if (href === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(href);
  };

  return (
    <>
      {/* Spacer div to prevent content jump when header becomes fixed */}
      <div className="h-[86px] sm:h-[94px] md:h-[102px]" />

      {/* Fixed Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 bg-white transform transition-all duration-200
        ${isScrolled ? 'shadow-md' : 'shadow-sm'}`}>
        {/* Top Bar - Hidden when scrolled on desktop */}
        <div className={`bg-brand-blue-500 transition-all duration-200 
          ${isScrolled ? 'h-0 overflow-hidden' : 'h-auto'}`}>
          <div className="container mx-auto px-4">
            <div className="hidden sm:flex items-center justify-between py-0.5 text-white text-xs">
              <div className="flex items-center divide-x divide-white/20">
                <div className="flex items-center space-x-4 pr-4">
                  <div className="flex items-center space-x-1">
                    <Phone size={12} />
                    <span>0791314880 / 0724115864</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Mail size={12} />
                    <span>sales@zawabuauto.co.ke</span>
                  </div>
                </div>
                <div className="flex items-center space-x-1 pl-4">
                  <MapPin size={12} />
                  <span>Opposite Twiga Sales and Next to Kingdom Bank, Nairobi</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Header */}
        <div className={`bg-white transition-all duration-200 
          ${isScrolled ? 'py-1.5' : 'py-2'}`}>
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between">
              {/* Logo - Smaller when scrolled */}
              <Link to="/" className="flex items-center">
                <img 
                  src={logo} 
                  alt="Zawabu Auto Logo"
                  className={`transition-all duration-200 
                    ${isScrolled 
                      ? 'h-7 sm:h-8 md:h-10' 
                      : 'h-8 sm:h-10 md:h-12'
                    } w-auto`}
                />
              </Link>

              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center space-x-4 lg:space-x-6">
                {menuItems.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={`text-sm text-gray-600 hover:text-brand-blue-500 transition-colors 
                      font-medium ${isActiveLink(item.href) ? 'text-brand-blue-500' : ''}`}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>

              {/* Search and Cart */}
              <div className="flex items-center space-x-3">
                <div className="hidden md:block w-48 lg:w-56">
                  <Input
                    type="search"
                    placeholder="Search parts..."
                    icon="search"
                    fullWidth
                    className="h-8 text-sm"
                  />
                </div>
                <Link 
                  to="/cart"
                  className={`flex items-center space-x-1 transition-colors relative
                    ${isActiveLink('/cart') ? 'text-brand-blue-500' : 'text-gray-600 hover:text-brand-blue-500'}`}
                >
                  <div className="relative">
                    <ShoppingCart size={20} />
                    {cartItemsCount > 0 && (
                      <span className="absolute -top-1.5 -right-1.5 bg-brand-red-500 text-white 
                        text-xs rounded-full h-3.5 w-3.5 flex items-center justify-center">
                        {cartItemsCount}
                      </span>
                    )}
                  </div>
                  <span className="hidden sm:inline text-xs font-medium">
                    {cartItemsCount > 0 ? `(${cartItemsCount})` : ''}
                  </span>
                </Link>

                <button
                  className="md:hidden p-1 hover:bg-gray-100 rounded-lg transition-colors"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  aria-label="Toggle menu"
                >
                  {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
              </div>
            </div>

            {/* Mobile Search */}
            <div className="md:hidden py-1">
              <Input
                type="search"
                placeholder="Search parts..."
                icon="search"
                fullWidth
                className="h-8 text-sm"
              />
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="container mx-auto px-4 py-2">
              <nav className="flex flex-col space-y-0.5">
                {menuItems.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={`py-1.5 transition-colors font-medium text-sm
                      ${isActiveLink(item.href) 
                        ? 'text-brand-blue-500' 
                        : 'text-gray-600 hover:text-brand-blue-500'}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
              
              <div className="mt-2 pt-2 border-t">
                <div className="text-xs text-gray-600 space-y-1.5">
                  <div className="flex items-center space-x-1.5">
                    <Phone size={12} className="text-brand-blue-500" />
                    <div>
                      <div>0791314880</div>
                      <div>0724115864</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <Mail size={12} className="text-brand-blue-500" />
                    <span>sales@zawabuauto.co.ke</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <MapPin size={12} className="text-brand-blue-500" />
                    <span className="text-xs">Opposite Twiga Sales and Next to Kingdom Bank, Nairobi</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;