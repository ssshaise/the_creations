'use client';

export default function Marquee() {
  const items = [
    'Ethically Sourced Reclaimed Hardwood',
    'Optical-Grade UV-Stable Crystal Epoxy',
    'Every Work a Certified 1-of-1 Original',
    'Complimentary Pan-India White-Glove Delivery',
    'Custom Commissions for Interior Architects',
    'Diamond-Lapped to 5000 Grit Mirror Finish',
  ];

  return (
    <div className="relative overflow-hidden bg-[#f4efe6] py-4 border-b border-[#e8e3d8]">
      <div className="flex w-max animate-marquee space-x-12 whitespace-nowrap">
        {[...items, ...items].map((text, i) => (
          <div key={i} className="flex items-center space-x-4">
            <span className="text-[#8c734b] text-xs">◆</span>
            <span className="text-xs uppercase tracking-[0.2em] font-medium text-[#4a4a50]">
              {text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
