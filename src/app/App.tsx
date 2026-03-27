import { Navigation } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
import { AwardsSection } from './components/AwardsSection';
import { IntroStatsSection } from './components/IntroStatsSection';
import { MenuSection } from './components/MenuSection';
import { HoursSection } from './components/HoursSection';
import { WhatsAppCTA } from './components/WhatsAppCTA';
import { FindUsSection } from './components/FindUsSection';
import { Footer } from './components/Footer';
import { FloatingWhatsAppButton } from './components/FloatingWhatsAppButton';
import { OrderModal } from './components/OrderModal';
import { useState } from 'react';

export default function App() {
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  const openOrderModal = () => setIsOrderModalOpen(true);
  const closeOrderModal = () => setIsOrderModalOpen(false);

  return (
    <div
      className="min-h-screen"
      style={{
        fontFamily: 'var(--font-body)',
        backgroundColor: 'var(--surface-cream)',
      }}
    >
      {/* Navigation */}
      <Navigation openOrderModal={openOrderModal} />

      {/* Hero Section */}
      <HeroSection openOrderModal={openOrderModal} />

      {/* Awards Section */}
      <AwardsSection />

      {/* Introduction Stats */}
      <IntroStatsSection />

      {/* Menu Section */}
      <MenuSection />

      {/* Hours Section */}
      <HoursSection />

      {/* WhatsApp CTA Banner */}
      <div data-section="whatsapp-cta">
        <WhatsAppCTA openOrderModal={openOrderModal} />
      </div>

      {/* Find Us Section */}
      <FindUsSection />

      {/* Footer */}
      <Footer openOrderModal={openOrderModal} />

      {/* Floating WhatsApp Button */}
      <FloatingWhatsAppButton openOrderModal={openOrderModal} />

      {/* Order Modal */}
      <OrderModal isOpen={isOrderModalOpen} onClose={closeOrderModal} />
    </div>
  );
}