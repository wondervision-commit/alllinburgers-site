interface WhatsAppCTAProps {
  openOrderModal: () => void;
}

export function WhatsAppCTA({ openOrderModal }: WhatsAppCTAProps) {
  return (
    <section className="bg-[#F9A825] py-16 md:py-20">
      <div className="max-w-[var(--max-width)] mx-auto px-4 text-center">
        {/* Headline */}
        <h2
          className="text-[#1B1B1B] uppercase mb-4"
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(32px, 5vw, 48px)',
            letterSpacing: '-0.01em',
          }}
        >
          HUNGRY? LET'S GO ALLL IN.
        </h2>

        {/* Subtext */}
        <p
          className="text-[#1B1B1B] mb-8 max-w-xl mx-auto"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '18px',
            lineHeight: '1.6',
          }}
        >
          Tap below to send us your order on WhatsApp. Fast, easy, delicious.
        </p>

        {/* WhatsApp Button */}
        <button
          onClick={openOrderModal}
          className="inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#1FAD55] text-white px-10 py-5 transition-all hover:scale-105"
          style={{
            borderRadius: 'var(--radius-sm)',
            fontFamily: 'var(--font-body)',
            fontSize: '18px',
            fontWeight: '700',
          }}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
          </svg>
          <span>ORDER NOW</span>
        </button>

        {/* Phone Number */}
        <div
          className="mt-6 text-[#1B1B1B]"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '16px',
          }}
        >
          +353 (85) 717 1531
        </div>
      </div>
    </section>
  );
}