import { useState } from 'react';
import ProductCard from './ProductCard.jsx';

export default function CatalogView({ allProducts }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  // Раскрытие группы "Андезитные блоки"
  const [blocksExpanded, setBlocksExpanded] = useState(false);

  // Категории блоков (подразделы)
  const BLOCK_CATEGORIES = ['wall', 'partition', 'ventilation'];

  // Проверяем, активна ли одна из подкатегорий блоков
  const isBlockSubActive = BLOCK_CATEGORIES.includes(selectedCategory);

  // Фильтрация товаров
  const filteredProducts = (() => {
    if (selectedCategory === 'all') return allProducts;
    if (selectedCategory === 'blocks') {
      return allProducts.filter(p => BLOCK_CATEGORIES.includes(p.data.category));
    }
    return allProducts.filter(p => p.data.category === selectedCategory);
  })();

  // Подсчёт количества товаров по категории
  const countFor = (cat) => {
    if (cat === 'all') return allProducts.length;
    if (cat === 'blocks') return allProducts.filter(p => BLOCK_CATEGORIES.includes(p.data.category)).length;
    return allProducts.filter(p => p.data.category === cat).length;
  };

  // Общий класс для кнопки фильтра
  const btnClass = (id) =>
    `w-full text-left group flex items-center justify-between rounded-md px-3 py-2.5 text-sm font-semibold transition-all cursor-pointer ${
      selectedCategory === id
        ? 'bg-accent text-white shadow-sm'
        : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
    }`;

  // Класс бейджа счётчика
  const badgeClass = (id) =>
    `ml-2 text-xs font-bold rounded-full px-2 py-0.5 transition-colors ${
      selectedCategory === id ? 'bg-white/20 text-white' : 'bg-slate-900 text-slate-400 group-hover:bg-slate-700'
    }`;

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Левый сайдбар с фильтрами — ширина увеличена до w-72 для подразделов */}
      <aside className="w-full lg:w-72 shrink-0">
        <div className="sticky top-28 rounded-xl border border-border-dark bg-bg-card p-6">
          <h2 className="text-lg font-bold text-white mb-4">Категории</h2>
          <nav className="space-y-1" aria-label="Категории товаров">

            {/* Вся продукция */}
            <button
              type="button"
              onClick={() => { setSelectedCategory('all'); setBlocksExpanded(false); }}
              className={btnClass('all')}
            >
              <span>Вся продукция</span>
              <span className={badgeClass('all')}>{countFor('all')}</span>
            </button>

            {/* Группа: Андезитные блоки (раскрывающаяся) */}
            <div>
              <button
                type="button"
                onClick={() => {
                  setBlocksExpanded(prev => !prev);
                  // При клике на родителя — фильтруем все блоки
                  setSelectedCategory('blocks');
                }}
                className={`w-full text-left group flex items-center justify-between rounded-md px-3 py-2.5 text-sm font-semibold transition-all cursor-pointer ${
                  selectedCategory === 'blocks' || isBlockSubActive
                    ? 'bg-accent text-white shadow-sm'
                    : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                }`}
              >
                <span>Андезитные блоки</span>
                <div className="flex items-center gap-1.5">
                  <span className={`text-xs font-bold rounded-full px-2 py-0.5 transition-colors ${
                    selectedCategory === 'blocks' || isBlockSubActive ? 'bg-white/20 text-white' : 'bg-slate-900 text-slate-400 group-hover:bg-slate-700'
                  }`}>
                    {countFor('blocks')}
                  </span>
                  {/* Стрелка разворота */}
                  <span className={`text-xs transition-transform duration-200 ${blocksExpanded || isBlockSubActive ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
                </div>
              </button>

              {/* Подразделы блоков — показываются при expanded или активном подразделе */}
              {(blocksExpanded || isBlockSubActive) && (
                <div className="mt-1 ml-3 space-y-0.5 border-l border-slate-700 pl-3">
                  <button
                    type="button"
                    onClick={() => setSelectedCategory('wall')}
                    className={`w-full text-left rounded-md px-3 py-2 text-sm font-medium transition-all cursor-pointer whitespace-nowrap ${
                      selectedCategory === 'wall'
                        ? 'bg-accent/80 text-white'
                        : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'
                    }`}
                  >
                    Стеновой блок
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedCategory('partition')}
                    className={`w-full text-left rounded-md px-3 py-2 text-sm font-medium transition-all cursor-pointer whitespace-nowrap ${
                      selectedCategory === 'partition'
                        ? 'bg-accent/80 text-white'
                        : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'
                    }`}
                  >
                    Перегородочный блок
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedCategory('ventilation')}
                    className={`w-full text-left rounded-md px-3 py-2 text-sm font-medium transition-all cursor-pointer whitespace-nowrap ${
                      selectedCategory === 'ventilation'
                        ? 'bg-accent/80 text-white'
                        : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'
                    }`}
                  >
                    Вентиляционный блок
                  </button>
                </div>
              )}
            </div>

            {/* Кварцевая брусчатка */}
            <button
              type="button"
              onClick={() => { setSelectedCategory('paving'); setBlocksExpanded(false); }}
              className={btnClass('paving')}
            >
              <span>Кварцевая брусчатка</span>
              <span className={badgeClass('paving')}>{countFor('paving')}</span>
            </button>

            {/* Бордюрный камень */}
            <button
              type="button"
              onClick={() => { setSelectedCategory('curb'); setBlocksExpanded(false); }}
              className={btnClass('curb')}
            >
              <span>Бордюрный камень</span>
              <span className={badgeClass('curb')}>{countFor('curb')}</span>
            </button>

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
