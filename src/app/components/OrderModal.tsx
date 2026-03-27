import { useState, useEffect } from 'react';
import { X, Plus, Minus } from 'lucide-react';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

// Business hours configuration (24-hour format)
const BUSINESS_HOURS = [
  { day: 0, open: null, close: null }, // Sunday: Closed
  { day: 1, open: null, close: null }, // Monday: Closed
  { day: 2, open: null, close: null }, // Tuesday: Closed
  { day: 3, open: null, close: null }, // Wednesday: Closed
  { day: 4, open: 16, close: 21 }, // Thursday: 4:00 PM - 9:00 PM
  { day: 5, open: 16, close: 21 }, // Friday: 4:00 PM - 9:00 PM
  { day: 6, open: 13, close: 21 }, // Saturday: 1:00 PM - 9:00 PM
];

const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export function OrderModal({ isOpen, onClose }: OrderModalProps) {
  const [name, setName] = useState('');
  const [pickupTime, setPickupTime] = useState('ASAP');
  const [notes, setNotes] = useState('');
  const [nameError, setNameError] = useState(false);
  const [itemsError, setItemsError] = useState(false);

  // Food items with prices
  const [foodItems, setFoodItems] = useState<OrderItem[]>([
    { name: 'ALLL IN Burger', quantity: 0, price: 11 },
    { name: 'T-ALLL IN Burger', quantity: 0, price: 14 },
    { name: 'Mini Burger', quantity: 0, price: 8 },
    { name: 'Breakfast Burger', quantity: 0, price: 7 },
    { name: 'Chips', quantity: 0, price: 4 },
  ]);

  // Drink items with prices
  const [drinkItems, setDrinkItems] = useState<OrderItem[]>([
    { name: 'Coca Cola', quantity: 0, price: 2 },
    { name: 'Coke Zero', quantity: 0, price: 2 },
    { name: 'San Pellegrino Lemon', quantity: 0, price: 2 },
    { name: 'San Pellegrino Orange', quantity: 0, price: 2 },
    { name: 'Water', quantity: 0, price: 2 },
  ]);

  // Calculate total
  const calculateTotal = (): number => {
    const foodTotal = foodItems.reduce((sum, item) => sum + (item.quantity * item.price), 0);
    const drinkTotal = drinkItems.reduce((sum, item) => sum + (item.quantity * item.price), 0);
    return foodTotal + drinkTotal;
  };

  // Generate pickup time options
  const generatePickupTimes = (): string[] => {
    const times: string[] = ['ASAP'];
    const now = new Date();
    const currentDay = now.getDay();
    const currentMinutes = (now.getHours() * 60) + now.getMinutes();
    const todayHours = BUSINESS_HOURS[currentDay];

    const findNextOpenDay = (startOffset: number) => {
      for (let offset = startOffset; offset <= 7; offset++) {
        const candidateDate = new Date(now);
        candidateDate.setDate(candidateDate.getDate() + offset);

        const candidateHours = BUSINESS_HOURS[candidateDate.getDay()];
        if (candidateHours.open !== null && candidateHours.close !== null) {
          return {
            date: candidateDate,
            hours: candidateHours,
            daysAhead: offset,
          };
        }
      }

      return null;
    };

    // Helper function to convert 24hr to 12hr format
    const formatTime = (hour: number, minute: number): string => {
      const period = hour >= 12 ? 'PM' : 'AM';
      const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
      const displayMinute = minute.toString().padStart(2, '0');
      return `${displayHour}:${displayMinute} ${period}`;
    };

    const formatPickupLabel = (time: string, daysAhead: number, dayIndex: number): string => {
      if (daysAhead === 1) return `${time} (Tomorrow)`;
      if (daysAhead > 1) return `${time} (${DAY_NAMES[dayIndex]})`;
      return time;
    };

    let targetDay = findNextOpenDay(0);
    let startMinutes = targetDay?.hours.open !== null ? targetDay.hours.open * 60 : 0;

    if (todayHours.open !== null && todayHours.close !== null) {
      const openMinutes = todayHours.open * 60;
      const closeMinutes = todayHours.close * 60;
      const earliestTodayMinutes = Math.max(
        Math.ceil((currentMinutes + 15) / 10) * 10,
        openMinutes
      );

      if (currentMinutes < closeMinutes && earliestTodayMinutes < closeMinutes) {
        targetDay = {
          date: now,
          hours: todayHours,
          daysAhead: 0,
        };
        startMinutes = earliestTodayMinutes;
      } else if (currentMinutes >= closeMinutes || earliestTodayMinutes >= closeMinutes) {
        targetDay = findNextOpenDay(1);
        startMinutes = targetDay?.hours.open !== null ? targetDay.hours.open * 60 : 0;
      }
    } else {
      targetDay = findNextOpenDay(1);
      startMinutes = targetDay?.hours.open !== null ? targetDay.hours.open * 60 : 0;
    }

    if (!targetDay || targetDay.hours.open === null || targetDay.hours.close === null) {
      return times;
    }

    // Generate time slots
    const closingMinutes = targetDay.hours.close * 60;
    for (let minutes = startMinutes; minutes < closingMinutes; minutes += 10) {
      const hour = Math.floor(minutes / 60);
      const minute = minutes % 60;
      const timeStr = formatTime(hour, minute);
      times.push(formatPickupLabel(timeStr, targetDay.daysAhead, targetDay.date.getDay()));
    }

    return times;
  };

  const pickupTimes = generatePickupTimes();

  // Update quantity
  const updateQuantity = (
    items: OrderItem[],
    setItems: React.Dispatch<React.SetStateAction<OrderItem[]>>,
    index: number,
    delta: number
  ) => {
    const newItems = [...items];
    newItems[index].quantity = Math.max(0, newItems[index].quantity + delta);
    setItems(newItems);
  };

  // Build WhatsApp message
  const buildWhatsAppMessage = (): string => {
    let message = '🍔 ALLL IN Burger Order\n\n';
    message += `Name: ${name}\n\n`;
    message += `Pickup: ${pickupTime}\n\n`;

    // Food items
    const selectedFood = foodItems.filter(item => item.quantity > 0);
    if (selectedFood.length > 0) {
      message += 'Food\n';
      selectedFood.forEach(item => {
        message += `${item.quantity} x ${item.name}\n`;
      });
      message += '\n';
    }

    // Drinks
    const selectedDrinks = drinkItems.filter(item => item.quantity > 0);
    if (selectedDrinks.length > 0) {
      message += 'Drinks\n';
      selectedDrinks.forEach(item => {
        message += `${item.quantity} x ${item.name}\n`;
      });
      message += '\n';
    }

    // Notes
    if (notes.trim()) {
      message += 'Notes\n';
      message += notes.trim();
    }

    return message;
  };

  // Handle submit
  const handleSubmit = () => {
    // Reset errors
    setNameError(false);
    setItemsError(false);

    // Validate name
    if (!name.trim()) {
      setNameError(true);
      return;
    }

    // Validate at least one item
    const totalItems = [...foodItems, ...drinkItems].reduce((sum, item) => sum + item.quantity, 0);
    if (totalItems === 0) {
      setItemsError(true);
      return;
    }

    const message = buildWhatsAppMessage();
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/353857171531?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
    onClose();
  };

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setName('');
      setPickupTime('ASAP');
      setNotes('');
      setNameError(false);
      setItemsError(false);
      setFoodItems(items => items.map(item => ({ ...item, quantity: 0 })));
      setDrinkItems(items => items.map(item => ({ ...item, quantity: 0 })));
    }
  }, [isOpen]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className="relative bg-[#FFF9F0] w-full md:max-w-2xl md:max-h-[90vh] max-h-[95vh] flex flex-col"
        style={{
          borderRadius: 'var(--radius-md)',
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
        }}
      >
        {/* Header */}
        <div className="sticky top-0 bg-[#C62828] text-white px-6 py-5 flex items-center justify-between z-10">
          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '24px',
              letterSpacing: '-0.01em',
            }}
          >
            ORDER NOW
          </h2>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 transition-colors"
            aria-label="Close"
          >
            <X size={28} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          {/* Name Input */}
          <div className="mb-6">
            <label
              htmlFor="name"
              className="block text-[#212121] mb-2"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '16px',
                fontWeight: '600',
              }}
            >
              Your Name *
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className={`w-full px-4 py-3 bg-white border-2 ${nameError ? 'border-[#C62828]' : 'border-gray-300'} focus:border-[#C62828] focus:outline-none transition-colors`}
              style={{
                borderRadius: 'var(--radius-sm)',
                fontFamily: 'var(--font-body)',
                fontSize: '16px',
              }}
            />
            {nameError && (
              <p 
                className="text-[#C62828] mt-2"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '14px',
                  fontWeight: '600',
                }}
              >
                Please enter your name
              </p>
            )}
          </div>

          {/* Pickup Time */}
          <div className="mb-6">
            <label
              htmlFor="pickup"
              className="block text-[#212121] mb-2"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '16px',
                fontWeight: '600',
              }}
            >
              Pickup Time *
            </label>
            <select
              id="pickup"
              value={pickupTime}
              onChange={(e) => setPickupTime(e.target.value)}
              className="w-full px-4 py-3 bg-white border-2 border-gray-300 focus:border-[#C62828] focus:outline-none transition-colors"
              style={{
                borderRadius: 'var(--radius-sm)',
                fontFamily: 'var(--font-body)',
                fontSize: '16px',
              }}
            >
              {pickupTimes.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>

          {/* Food Section */}
          <div className="mb-6">
            <h3
              className="text-[#212121] mb-4 pb-2 border-b-2 border-[#F9A825]"
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '20px',
                letterSpacing: '-0.01em',
              }}
            >
              FOOD
            </h3>
            <div className="space-y-3">
              {foodItems.map((item, index) => (
                <div
                  key={item.name}
                  className="flex items-center justify-between bg-white p-4"
                  style={{ borderRadius: 'var(--radius-sm)' }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '16px',
                      fontWeight: '500',
                    }}
                  >
                    {item.name}
                  </span>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => updateQuantity(foodItems, setFoodItems, index, -1)}
                      className="w-10 h-10 flex items-center justify-center bg-gray-200 hover:bg-gray-300 transition-colors"
                      style={{ borderRadius: 'var(--radius-sm)' }}
                      aria-label="Decrease quantity"
                    >
                      <Minus size={20} />
                    </button>
                    <span
                      className="w-8 text-center"
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '18px',
                        fontWeight: '600',
                      }}
                    >
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(foodItems, setFoodItems, index, 1)}
                      className="w-10 h-10 flex items-center justify-center bg-[#C62828] hover:bg-[#8B1C1C] text-white transition-colors"
                      style={{ borderRadius: 'var(--radius-sm)' }}
                      aria-label="Increase quantity"
                    >
                      <Plus size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Drinks Section */}
          <div className="mb-6">
            <h3
              className="text-[#212121] mb-4 pb-2 border-b-2 border-[#F9A825]"
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '20px',
                letterSpacing: '-0.01em',
              }}
            >
              DRINKS
            </h3>
            <div className="space-y-3">
              {drinkItems.map((item, index) => (
                <div
                  key={item.name}
                  className="flex items-center justify-between bg-white p-4"
                  style={{ borderRadius: 'var(--radius-sm)' }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '16px',
                      fontWeight: '500',
                    }}
                  >
                    {item.name}
                  </span>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => updateQuantity(drinkItems, setDrinkItems, index, -1)}
                      className="w-10 h-10 flex items-center justify-center bg-gray-200 hover:bg-gray-300 transition-colors"
                      style={{ borderRadius: 'var(--radius-sm)' }}
                      aria-label="Decrease quantity"
                    >
                      <Minus size={20} />
                    </button>
                    <span
                      className="w-8 text-center"
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '18px',
                        fontWeight: '600',
                      }}
                    >
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(drinkItems, setDrinkItems, index, 1)}
                      className="w-10 h-10 flex items-center justify-center bg-[#C62828] hover:bg-[#8B1C1C] text-white transition-colors"
                      style={{ borderRadius: 'var(--radius-sm)' }}
                      aria-label="Increase quantity"
                    >
                      <Plus size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div className="mb-6">
            <label
              htmlFor="notes"
              className="block text-[#212121] mb-2"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '16px',
                fontWeight: '600',
              }}
            >
              Notes for your order
            </label>
            <textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="No onions please"
              rows={3}
              className="w-full px-4 py-3 bg-white border-2 border-gray-300 focus:border-[#C62828] focus:outline-none transition-colors resize-none"
              style={{
                borderRadius: 'var(--radius-sm)',
                fontFamily: 'var(--font-body)',
                fontSize: '16px',
              }}
            />
          </div>
        </div>

        {/* Sticky Footer with Total and Submit Button */}
        <div className="sticky bottom-0 bg-[#FFF9F0] px-6 py-4 border-t-2 border-gray-200">
          {/* Running Total */}
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-300">
            <span
              className="text-[#212121]"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '18px',
                fontWeight: '600',
              }}
            >
              Total
            </span>
            <span
              className="text-[#C62828]"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '24px',
                fontWeight: '700',
              }}
            >
              €{calculateTotal().toFixed(2)}
            </span>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            className="w-full bg-[#25D366] hover:bg-[#1FAD55] text-white py-4 flex items-center justify-center gap-3 transition-all hover:scale-[1.02]"
            style={{
              borderRadius: 'var(--radius-sm)',
              fontFamily: 'var(--font-body)',
              fontSize: '18px',
              fontWeight: '600',
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
            Order Now
          </button>
          {(nameError || itemsError) && (
            <div className="mt-3 space-y-1">
              {nameError && (
                <p 
                  className="text-[#C62828] text-center"
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '14px',
                    fontWeight: '600',
                  }}
                >
                  Please enter your name
                </p>
              )}
              {itemsError && (
                <p 
                  className="text-[#C62828] text-center"
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '14px',
                    fontWeight: '600',
                  }}
                >
                  Please add at least one item to your order
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
