import { Trophy, Award } from 'lucide-react';
import awardsWinner from '../../assets/45f5b052d91ac73c4b5bbef044af54221d1a277e.png';

export function AwardsSection() {
  const awards = [
    'Takeaway of the Year in Munster',
    'Burger of the Year in Munster',
    'Street Food of the Year in Munster',
  ];

  return (
    <section className="bg-[#1B1B1B] py-16 md:py-20 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 rotate-12">
          <Trophy size={120} className="text-[#F9A825]" />
        </div>
        <div className="absolute bottom-10 right-10 -rotate-12">
          <Trophy size={120} className="text-[#F9A825]" />
        </div>
      </div>

      <div className="max-w-[var(--max-width)] mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Trophy className="text-[#F9A825]" size={32} />
            <h2
              className="text-[#FAFAFA] uppercase"
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(32px, 5vw, 48px)',
                letterSpacing: '-0.02em',
              }}
            >
              AWARD WINNERS
            </h2>
            <Trophy className="text-[#F9A825]" size={32} />
          </div>
          <p
            className="text-[#F9A825] uppercase tracking-widest mb-4"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '14px',
              fontWeight: '600',
            }}
          >
            Irish Takeaway Awards 2026
          </p>
          {/* Awards Winner Badge */}
          <div className="flex justify-center">
            <img
              src={awardsWinner}
              alt="Irish Takeaway Awards 2026 Winner"
              className="h-48 md:h-56 w-auto"
            />
          </div>
        </div>

        {/* Awards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {awards.map((award, index) => (
            <div
              key={index}
              className="bg-[#FFF9F0] p-8 hover:scale-105 transition-transform duration-300"
              style={{
                borderRadius: 'var(--radius-md)',
                border: '3px solid #F9A825',
              }}
            >
              <div className="flex flex-col items-center text-center">
                {/* Award Icon */}
                <div
                  className="w-20 h-20 bg-[#C62828] flex items-center justify-center mb-6"
                  style={{ borderRadius: 'var(--radius-full)' }}
                >
                  <Award className="text-[#F9A825]" size={40} />
                </div>

                {/* Award Title */}
                <h3
                  className="text-[#1B1B1B] uppercase leading-tight"
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'clamp(20px, 3vw, 24px)',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {award}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Tagline */}
        <div className="text-center mt-12">
          <p
            className="text-gray-400"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '16px',
            }}
          >
            Proudly serving Tramore with award-winning flavour
          </p>
        </div>
      </div>
    </section>
  );
}
