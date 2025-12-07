// src/components/FilterBar.jsx
import React from 'react';

export default function FilterBar({ cities, categories, selectedCity, setCity, selectedCategory, setCategory, q, setQ }) {
  return (
    <div className="mb-6">
      {/* City chips */}
      <div className="flex flex-wrap gap-2 mb-3">
        <button onClick={() => setCity('All')} className={`px-3 py-1 rounded-full ${selectedCity==='All' ? 'bg-indigo-600 text-white' : 'bg-white border'}`}>All Cities</button>
        {cities.map(c => (
          <button key={c} onClick={() => setCity(c)} className={`px-3 py-1 rounded-full ${selectedCity===c ? 'bg-indigo-600 text-white' : 'bg-white border'}`}>{c}</button>
        ))}
      </div>

      {/* Category chips & search */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex gap-2 flex-wrap">
          <button onClick={() => setCategory('All')} className={`px-3 py-1 rounded-full ${selectedCategory==='All' ? 'bg-amber-500 text-white' : 'bg-white border'}`}>All</button>
          {categories.map(cat => (
            <button key={cat} onClick={() => setCategory(cat)} className={`px-3 py-1 rounded-full ${selectedCategory===cat ? 'bg-amber-500 text-white' : 'bg-white border'}`}>{cat}</button>
          ))}
        </div>

        <div className="ml-auto flex items-center gap-2">
          <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search events, location..." className="border rounded px-3 py-2" />
        </div>
      </div>
    </div>
  );
}
