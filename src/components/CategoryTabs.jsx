export default function CategoryTabs({ categories, active, onChange }) {
  return (
    <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-10 md:mb-14">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className={`px-5 py-2.5 text-overline transition-all duration-500 border ${
            active === cat
              ? 'bg-obsidian text-white border-obsidian'
              : 'bg-transparent text-taupe border-gold/20 hover:border-gold hover:text-obsidian'
          }`}
          style={{ fontSize: '10px' }}
        >
          {cat === 'all' ? 'All Pieces' : cat}
        </button>
      ))}
    </div>
  );
}
