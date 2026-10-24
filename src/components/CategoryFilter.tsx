'use client';

import { categories } from '@/lib/data';

interface CategoryFilterProps {
  selected: string;
  onSelect: (category: string) => void;
}

export default function CategoryFilter({ selected, onSelect }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
      {/* All button */}
      <button
        onClick={() => onSelect('all')}
        className={`px-5 py-2 text-xs uppercase tracking-[0.1em] font-medium transition-all ${
          selected === 'all'
            ? 'bg-[#161618] text-[#ffffff] shadow-sm'
            : 'bg-[#ffffff] text-[#4a4a50] border border-[#e8e3d8] hover:text-[#161618] hover:border-[#161618]'
        }`}
      >
        Complete Catalogue
      </button>

      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onSelect(cat.id)}
          className={`px-5 py-2 text-xs uppercase tracking-[0.1em] font-medium transition-all ${
            selected === cat.id
              ? 'bg-[#161618] text-[#ffffff] shadow-sm'
              : 'bg-[#ffffff] text-[#4a4a50] border border-[#e8e3d8] hover:text-[#161618] hover:border-[#161618]'
          }`}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
}
