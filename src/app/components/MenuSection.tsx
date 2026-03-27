import { Flame } from 'lucide-react';

interface MenuItem {
  name: string;
  description: string;
  price: string;
}

const menuItems: MenuItem[] = [
  { 
    name: 'ALLL IN Burger', 
    description: 'Double Beef Smash Patty, Bacon, Cheese, Onion, Lettuce, Tomato, Ketchup, Mustard & Mayo', 
    price: '€11' 
  },
  { 
    name: 'T-ALLL IN Burger', 
    description: 'Triple Beef Smash Patty, Bacon, Cheese, Onion, Lettuce, Tomato, Ketchup, Mustard & Mayo', 
    price: '€14' 
  },
  { 
    name: 'Mini Burger', 
    description: 'Single Beef Smash Patty, Bacon, Cheese, Onion, Lettuce, Tomato, Ketchup, Mustard & Mayo', 
    price: '€8' 
  },
  { 
    name: 'Breakfast Burger', 
    description: 'Sausages, Bacon, Egg, Cheese, Ketchup & Mustard', 
    price: '€7' 
  },
  { 
    name: 'Chips', 
    description: 'Twice-fried and golden brown', 
    price: '€4' 
  },
  { 
    name: 'Drinks', 
    description: 'Coca Cola, Coke Zero, San Pellegrino Lemon, San Pellegrino Orange, Water', 
    price: '€2' 
  },
];

export function MenuSection() {
  return (
    <section id="menu" className="bg-[#FFF9F0] py-16 md:py-24">
      <div className="max-w-[var(--max-width)] mx-auto px-4">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2
            className="text-[#212121] uppercase mb-3"
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(36px, 5vw, 56px)',
              letterSpacing: '-0.01em',
            }}
          >
            THE MENU
          </h2>
          <Flame className="mx-auto text-[#C62828]" size={32} />
        </div>

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item, index) => (
            <div
              key={index}
              className="bg-white p-6 relative hover:shadow-lg transition-all"
              style={{
                borderRadius: 'var(--radius-md)',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              }}
            >
              {/* Item Name */}
              <h3
                className="text-[#212121] mb-2"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '20px',
                  fontWeight: '700',
                }}
              >
                {item.name}
              </h3>

              {/* Description */}
              <p
                className="text-gray-600 mb-4"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '14px',
                  lineHeight: '1.5',
                }}
              >
                {item.description}
              </p>

              {/* Price */}
              <div
                className="text-[#C62828] text-right"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '18px',
                  fontWeight: '700',
                }}
              >
                {item.price}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}