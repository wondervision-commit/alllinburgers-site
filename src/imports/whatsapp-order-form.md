I want to add a feature for a WhatsApp ordering form.

The website already has WhatsApp order buttons. When the user clicks any of these buttons, instead of opening WhatsApp immediately, a modal order form should appear.

The form collects structured order data and then builds a WhatsApp message which opens WhatsApp with the order pre-populated.

This must be designed mobile-first but work well on desktop.

--------------------------------

ORDER FLOW

1. User clicks "Order on WhatsApp" (any of the available WhatsApp buttons)

2. A modal or page opens with the order form.

3. User fills in:

Required fields:
- Name (text input)
- Pickup Time (required)

Pickup time logic:
- Always include an "ASAP" option
- Pickup times must be in 10 minute increments
- Must respect business opening hours
- Times earlier than the current time must be removed
- When the business is closed, pickup times for tomorrow should become selectable
- Tomorrow pickup times should only become available after close of business

Example opening hours:
16:00 – 21:00

Example pickup list:
ASAP
17:10
17:20
17:30
etc

--------------------------------

MENU SECTION

Section title: Food

Items with quantity selectors:

ALLL IN Burger
T-ALLL IN Burger
Mini Burger
Breakfast Burger
Chips

Each item should have:

Item name
+ / - quantity selector
quantity display

--------------------------------

DRINKS SECTION

Separate section titled "Drinks"

Items with quantity selectors:

Coca Cola
Coke Zero
San Pellegrino Lemon
San Pellegrino Orange
Water

--------------------------------

NOTES SECTION

Textarea input

Label:
Notes for your order

Placeholder example:
"No onions please"

--------------------------------

SUBMIT BUTTON

Button text:

"Order via WhatsApp"

--------------------------------

MESSAGE GENERATION

When the user presses the button:

Build a structured WhatsApp message like this:

🍔 All In Burger Order

Name: {name}

Pickup: {pickup time}

Food
{qty} x ALLL IN Burger
{qty} x T-ALLL IN Burger
{qty} x Mini Burger
{qty} x Breakfast Burger
{qty} x Chips

Drinks
{qty} x Coke
{qty} x Coke Zero
{qty} x San Pellegrino Lemon
{qty} x San Pellegrino Orange
{qty} x Water

Notes
{notes}

Only include items where quantity > 0.

Then open WhatsApp with a message ready to send to the business owner

--------------------------------

UX REQUIREMENTS

Mobile friendly
Large tap targets
Fast ordering
Sticky order button
Clean sections
Minimal scrolling
Clear quantity selectors

--------------------------------

DELIVERABLE

Provide:

UI layout
component structure
interaction flow
JavaScript logic for:

pickup time generation
order building
WhatsApp link generation