import { useState, useEffect } from 'react';
import { Menu, X, Instagram, Facebook } from 'lucide-react';
import logo from '../../assets/28940afe3337abd79c7c6808d426845eb79f7a52.png';

interface NavigationProps {
  openOrderModal: () => void;
}

export function Navigation({ openOrderModal }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const top = element.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-[#1B1B1B]/95 backdrop-blur-md shadow-lg' : 'bg-[#1B1B1B]'
      }`}
      style={{ height: 'var(--nav-height)' }}
    >
      <div className="max-w-[var(--max-width)] mx-auto px-4 h-full flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center cursor-pointer"
        >
          <img 
            src={logo} 
            alt="ALLL IN BURGERS" 
            className="h-12 w-auto"
          />
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <button
            onClick={() => scrollToSection('menu')}
            className="text-[#FAFAFA] hover:text-[#F9A825] transition-colors"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            Menu
          </button>
          <button
            onClick={() => scrollToSection('hours')}
            className="text-[#FAFAFA] hover:text-[#F9A825] transition-colors"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            Hours
          </button>
          <button
            onClick={() => scrollToSection('find-us')}
            className="text-[#FAFAFA] hover:text-[#F9A825] transition-colors"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            Find Us
          </button>
        </div>

        {/* Right Side - Social + WhatsApp */}
        <div className="flex items-center gap-4">
          {/* Desktop Social Icons */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="https://www.instagram.com/alllineats/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#FAFAFA] hover:text-[#F9A825] transition-colors"
            >
              <Instagram size={20} />
            </a>
            <a
              href="https://www.facebook.com/alllineats/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#FAFAFA] hover:text-[#F9A825] transition-colors"
            >
              <Facebook size={20} />
            </a>
          </div>

          {/* WhatsApp Button */}
          <button
            onClick={openOrderModal}
            className="bg-[#25D366] hover:bg-[#1FAD55] text-white px-4 py-2 flex items-center gap-2 transition-all"
            style={{
              borderRadius: 'var(--radius-lg)',
              fontFamily: 'var(--font-body)',
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
            <span className="hidden lg:inline">Order Now</span>
            <span className="lg:hidden">Order Now</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-[#FAFAFA]"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#1B1B1B] border-t border-[#F9A825]/20">
          <div className="px-4 py-6 flex flex-col gap-4">
            <button
              onClick={() => scrollToSection('menu')}
              className="text-[#FAFAFA] hover:text-[#F9A825] text-left py-2 transition-colors"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              Menu
            </button>
            <button
              onClick={() => scrollToSection('hours')}
              className="text-[#FAFAFA] hover:text-[#F9A825] text-left py-2 transition-colors"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              Hours
            </button>
            <button
              onClick={() => scrollToSection('find-us')}
              className="text-[#FAFAFA] hover:text-[#F9A825] text-left py-2 transition-colors"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              Find Us
            </button>

            <div className="flex items-center gap-4 pt-4 border-t border-[#F9A825]/20">
              <a
                href="https://www.instagram.com/alllineats/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#FAFAFA] hover:text-[#F9A825] transition-colors"
              >
                <Instagram size={24} />
              </a>
              <a
                href="https://www.facebook.com/alllineats/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#FAFAFA] hover:text-[#F9A825] transition-colors"
              >
                <Facebook size={24} />
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
