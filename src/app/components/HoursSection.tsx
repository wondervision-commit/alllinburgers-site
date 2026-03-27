import { Instagram, Facebook } from 'lucide-react';

export function HoursSection() {
  const hours = [
    { day: 'Monday', time: 'Closed', isClosed: true },
    { day: 'Tuesday', time: 'Closed', isClosed: true },
    { day: 'Wednesday', time: 'Closed', isClosed: true },
    { day: 'Thursday', time: '4:00 PM – 9:00 PM', isClosed: false },
    { day: 'Friday', time: '4:00 PM – 9:00 PM', isClosed: false },
    { day: 'Saturday', time: '1:00 PM – 9:00 PM', isClosed: false },
    { day: 'Sunday', time: 'Closed', isClosed: true },
  ];

  return (
    <section id="hours" className="bg-[#1B1B1B] py-16 md:py-24">
      <div className="max-w-[var(--max-width)] mx-auto px-4">
        {/* Section Title */}
        <h2
          className="text-[#FAFAFA] uppercase text-center mb-12"
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(36px, 5vw, 56px)',
            letterSpacing: '-0.01em',
          }}
        >
          WHEN WE'RE ROLLING
        </h2>

        {/* Hours Table */}
        <div className="max-w-2xl mx-auto bg-[#2A2A2A] overflow-hidden" style={{ borderRadius: 'var(--radius-md)' }}>
          <table className="w-full">
            <tbody>
              {hours.map((item, index) => (
                <tr
                  key={index}
                  className={index !== hours.length - 1 ? 'border-b border-[#3A3A3A]' : ''}
                >
                  <td
                    className="py-5 px-6 md:px-8 text-[#FAFAFA]"
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '16px',
                      fontWeight: '600',
                    }}
                  >
                    {item.day}
                  </td>
                  <td
                    className={`py-5 px-6 md:px-8 text-right ${item.isClosed ? 'text-gray-500' : 'text-[#F9A825]'}`}
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '16px',
                    }}
                  >
                    {item.time}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Note */}
        <div className="text-center mt-8">
          <p
            className="text-gray-400 mb-4"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '14px',
            }}
          >
            Hours may change in bad weather — check our socials for live updates!
          </p>

          {/* Social Icons */}
          <div className="flex items-center justify-center gap-4">
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
        </div>
      </div>
    </section>
  );
}
