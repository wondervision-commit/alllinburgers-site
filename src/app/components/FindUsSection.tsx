import { ExternalLink, MapPin } from 'lucide-react';

export function FindUsSection() {
  const locations = [
    {
      name: "Tommy Farrell's Garage",
      address: "Tramore, Co. Waterford",
      eircode: "X91 XH59",
      mapQuery: "Tommy+Farrell's+Garage+Tramore+X91+XH59",
      embedSrc: "https://maps.google.com/maps?q=Tommy+Farrell%27s+Garage+Tramore+X91+XH59&output=embed&z=15",
    },
  ];

  return (
    <section id="find-us" className="bg-[#FFF9F0] py-16 md:py-24">
      <div className="max-w-[var(--max-width)] mx-auto px-4">
        {/* Section Title */}
        <h2
          className="text-[#212121] uppercase text-center mb-12"
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(36px, 5vw, 56px)',
            letterSpacing: '-0.01em',
          }}
        >
          FIND THE TRUCK
        </h2>

        {/* Map showing location */}
        <div className="mb-12 max-w-4xl mx-auto">
          {locations.map((location, index) => (
            <div
              key={index}
              className="w-full h-[400px] lg:h-[480px] bg-gray-200 overflow-hidden"
              style={{ borderRadius: 'var(--radius-md)' }}
            >
              <iframe
                src={location.embedSrc}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`${location.name} Location`}
              />
            </div>
          ))}
        </div>

        {/* Location Card */}
        <div className="max-w-2xl mx-auto">
          {locations.map((location, index) => (
            <div
              key={index}
              className="bg-white p-8"
              style={{
                borderRadius: 'var(--radius-md)',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              }}
            >
              <div className="flex items-start gap-3 mb-4">
                <MapPin className="text-[#C62828] flex-shrink-0 mt-1" size={24} />
                <div>
                  <h3
                    className="text-[#212121] mb-2"
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '20px',
                      fontWeight: '700',
                    }}
                  >
                    {location.name}
                  </h3>
                  <p
                    className="text-gray-600 mb-1"
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '16px',
                    }}
                  >
                    {location.address}
                  </p>
                  <p
                    className="text-gray-600 mb-4"
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '16px',
                    }}
                  >
                    {location.eircode}
                  </p>
                  <a
                    href={`https://maps.google.com/?q=${location.mapQuery}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[#C62828] hover:text-[#8B1C1C] transition-colors"
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '16px',
                      fontWeight: '600',
                    }}
                  >
                    Get Directions
                    <ExternalLink size={18} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom tagline */}
        <p
          className="text-center text-[#212121] mt-8"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '18px',
          }}
        >
          Follow the smell. You can't miss us.
        </p>
      </div>
    </section>
  );
}
