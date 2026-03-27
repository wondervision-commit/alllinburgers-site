import { Star, Beef, Crown } from 'lucide-react';

export function IntroStatsSection() {
  const stats = [
    {
      icon: <Star className="text-[#F9A825]" size={40} />,
      stat: '5.0 ★ Rated',
    },
    {
      icon: <Beef className="text-[#C62828]" size={40} />,
      stat: '100% Irish Beef',
    },
    {
      icon: <Crown className="text-[#C62828]" size={40} />,
      stat: "Tramore's #1 Food Truck",
    },
  ];

  return (
    <section className="bg-[#FFF9F0] py-12 md:py-16">
      <div className="max-w-[var(--max-width)] mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {stats.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center py-8 border-b-2 border-[#F9A825]"
            >
              <div className="mb-4">{item.icon}</div>
              <div
                className="text-[#212121]"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '18px',
                  fontWeight: '600',
                }}
              >
                {item.stat}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}