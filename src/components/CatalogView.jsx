import { useState } from 'react';
import ProductCard from './ProductCard.jsx';

export default function CatalogView({ allProducts }) {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'Вся продукция' },
    { id: 'blocks', name: 'Андезитные блоки' },
    { id: 'paving', name: 'Кварцевая брусчатка' },
    { id: 'curbs', name: 'Бордюрный камень' }
  ];

  // Фильтруем товары на клиенте
  const filteredProducts = selectedCategory === 'all'
    ? allProducts
    : allProducts.filter(product => product.data.category === selectedCategory);

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Левый сайдбар с фильтрами */}
      <aside className="w-full lg:w-64 shrink-0">
        <div className="sticky top-28 rounded-xl border border-border-dark bg-bg-card p-6">
          <h2 className="text-lg font-bold text-white mb-4">Категории</h2>
          <nav className="space-y-1" aria-label="Категории товаров">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              const count = cat.id === 'all'
                ? allProducts.length
                : allProducts.filter(p => p.data.category === cat.id).length;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`w-full text-left group flex items-center justify-between rounded-md px-3 py-2.5 text-sm font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-accent text-white shadow-sm'
                      : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                  }`}
                >
                  <span>{cat.name}</span>
                  <span className={`ml-2 text-xs font-bold rounded-full px-2 py-0.5 transition-colors ${
                    isActive ? 'bg-white/20 text-white' : 'bg-slate-900 text-slate-400 group-hover:bg-slate-700'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </nav>

          <div className="mt-8 border-t border-slate-800 pt-6 text-xs text-slate-400">
            <h3 className="font-bold text-white mb-3 uppercase tracking-wider text-[10px]">Условия отгрузки</h3>
            <ul className="space-y-3 leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="text-accent">✓</span>
                <span>Собственные тягачи 14-20 куб. м/рейс</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent">✓</span>
                <span>Кран-манипулятор до 8 куб. м (12 т)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent">✓</span>
                <span>Отгрузка в день обращения</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent">✓</span>
                <span>Бесплатное хранение при заказе от 100 поддонов</span>
              </li>
            </ul>
          </div>
        </div>
      </aside>

      {/* Правая сетка с карточками */}
      <section className="flex-grow">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 rounded-xl border border-border-dark bg-bg-card">
            <span className="text-4xl mb-4 block">📦</span>
            <h3 className="text-lg font-bold text-white mb-1">Товары не найдены</h3>
            <p className="text-slate-400 text-sm">В данной категории нет товаров.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                title={product.data.title}
                dimensions={product.data.dimensions}
                strength={product.data.strength}
                price={product.data.price}
                image={product.data.image}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
