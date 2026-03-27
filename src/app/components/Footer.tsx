import { Instagram, Facebook } from 'lucide-react';

interface FooterProps {
  openOrderModal: () => void;
}

export function Footer({ openOrderModal }: FooterProps) {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const top = element.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#1B1B1B] text-[#FAFAFA] pt-16 pb-8">
      <div className="max-w-[var(--max-width)] mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Left - Logo & Tagline */}
          <div>
            <div className="flex flex-col leading-none mb-4">
              <span
                className="text-[#FAFAFA] uppercase tracking-tight"
                style={{ fontFamily: 'var(--font-heading)', fontSize: '28px' }}
              >
                ALLL IN
              </span>
              <span
                className="text-[#FAFAFA] uppercase tracking-tight"
                style={{ fontFamily: 'var(--font-heading)', fontSize: '22px' }}
              >
                BURGERS
              </span>
            </div>
            <p
              className="text-gray-400"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '14px',
              }}
            >
              Made with love in Tramore
            </p>
            <p
              className="text-gray-400"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '14px',
              }}
            >
              Est. 2023
            </p>
          </div>

          {/* Center - Quick Links */}
          <div>
            <h3
              className="mb-4 text-[#F9A825]"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '16px',
                fontWeight: '600',
              }}
            >
              Quick Links
            </h3>
            <div className="flex flex-col gap-3">
              <button
                onClick={() => scrollToSection('menu')}
                className="text-gray-400 hover:text-[#F9A825] transition-colors text-left"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '14px',
                }}
              >
                Menu
              </button>
              <button
                onClick={() => scrollToSection('hours')}
                className="text-gray-400 hover:text-[#F9A825] transition-colors text-left"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '14px',
                }}
              >
                Hours
              </button>
              <button
                onClick={() => scrollToSection('find-us')}
                className="text-gray-400 hover:text-[#F9A825] transition-colors text-left"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '14px',
                }}
              >
                Find Us
              </button>
              <button
                onClick={openOrderModal}
                className="text-gray-400 hover:text-[#F9A825] transition-colors text-left"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '14px',
                }}
              >
                Order
              </button>
            </div>
          </div>

          {/* Right - Social & Contact */}
          <div>
            <h3
              className="mb-4 text-[#F9A825]"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '16px',
                fontWeight: '600',
              }}
            >
              Connect With Us
            </h3>
            <div className="flex items-center gap-4 mb-4">
              <a
                href="https://www.instagram.com/alllineats/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#F9A825] transition-colors"
              >
                <Instagram size={24} />
              </a>
              <a
                href="https://www.facebook.com/alllineats/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#F9A825] transition-colors"
              >
                <Facebook size={24} />
              </a>
            </div>
            <button
              onClick={openOrderModal}
              className="text-gray-400 hover:text-[#F9A825] transition-colors"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '14px',
              }}
            >
              +353 (85) 717 1531
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className="pt-8 border-t border-gray-700 text-center text-gray-500"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '14px',
          }}
        >
          <p>Copyright 2026 ALLL IN Burgers. All rights reserved.</p>
          <p className="mt-2">Website by Sunny Bharaj</p>
        </div>
      </div>
    </footer>
  );
}
