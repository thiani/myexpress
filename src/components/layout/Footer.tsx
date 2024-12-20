import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram } from 'lucide-react';
import logo from '../../assets/images/logo/logo.png';

interface FooterLink {
  label: string;
  href: string;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

const footerSections: FooterSection[] = [
  {
    title: 'Shop',
    links: [
      { label: 'All Products', href: '/products' },
      { label: 'Popular Brands', href: '/brands' },
      { label: 'New Arrivals', href: '/new' },
      { label: 'Special Offers', href: '/offers' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Contact Us', href: '/contact' },
      { label: 'FAQs', href: '/faqs' },
      { label: 'Shipping Info', href: '/shipping' },
      { label: 'Returns', href: '/returns' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Careers', href: '/careers' },
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
    ],
  },
];

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info with Larger Logo */}
          <div className="space-y-6">
            <Link to="/" className="block">
              <img 
                src={logo} 
                alt="Zawabu Auto Logo"
                className="w-auto h-24 md:h-32 mb-4"
              />
            </Link>
            <p className="text-gray-600 text-sm">
              Your trusted source for quality auto parts and accessories.
            </p>
            <div className="space-y-4">
              <div className="flex items-start text-gray-600">
                <Phone size={16} className="mr-2 mt-1 flex-shrink-0" />
                <div className="text-sm">
                  <div>0791314880</div>
                  <div>0724115864</div>
                </div>
              </div>
              <div className="flex items-center text-gray-600">
                <Mail size={16} className="mr-2 flex-shrink-0" />
                <span className="text-sm">sales@zawabuauto.co.ke</span>
              </div>
              <div className="flex items-start text-gray-600">
                <MapPin size={16} className="mr-2 mt-1 flex-shrink-0" />
                <span className="text-sm">
                  Opposite Twiga Sales and Next to Kingdom Bank, Nairobi
                </span>
              </div>
            </div>
          </div>

          {/* Footer Sections */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold text-gray-900 mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="text-gray-600 hover:text-brand-blue-500 transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t bg-brand-blue-500">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-white">
              © {new Date().getFullYear()} Zawabu Auto. All rights reserved.
            </div>
            <div className="flex items-center space-x-4">
              <a 
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-brand-gray-200 transition-colors"
                aria-label="Follow us on Facebook"
              >
                <Facebook size={20} />
              </a>
              <a 
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-brand-gray-200 transition-colors"
                aria-label="Follow us on Twitter"
              >
                <Twitter size={20} />
              </a>
              <a 
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-brand-gray-200 transition-colors"
                aria-label="Follow us on Instagram"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;