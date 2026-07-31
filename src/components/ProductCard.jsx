export default function ProductCard({ id, title, dimensions, strength, price, image }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-xl border border-border-dark bg-bg-card hover:border-accent/50 transition-all duration-300 group shadow-sm hover:shadow-lg hover:-translate-y-0.5">
      <div className="aspect-square bg-slate-900 flex items-center justify-center text-slate-600 relative overflow-hidden">
        {/* Изображение товара с ленивой загрузкой */}
        <img 
          src={image} 
          alt={title} 
          loading="lazy" 
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.nextElementSibling.style.display = 'block';
          }}
        />
        <span className="text-4xl block group-hover:scale-110 transition-transform duration-500 select-none absolute hidden">🏗️</span>
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-white group-hover:text-accent transition-colors mb-2 line-clamp-2">
          <a href={`/catalog/${id}`}>{title}</a>
        </h3>
        <div className="space-y-1.5 text-xs text-slate-400 mb-6 flex-grow">
          <div className="flex justify-between border-b border-slate-800/40 pb-1.5">
            <span>Размеры:</span> 
            <span className="font-semibold text-slate-200">{dimensions.length} × {dimensions.width} × {dimensions.height} мм</span>
          </div>
          <div className="flex justify-between">
            <span>Прочность:</span> 
            <span className="font-semibold text-slate-200">{strength}</span>
          </div>
        </div>
        <div className="flex items-center justify-between border-t border-border-dark pt-4">
          <div>
            <span className="text-[10px] text-slate-500 block uppercase tracking-wider">Цена</span>
            <span className="text-base font-extrabold text-white">{price}</span>
          </div>
          <a 
            href={`/catalog/${id}`} 
            className="inline-flex items-center justify-center rounded-md bg-slate-900 border border-border-dark px-3 py-1.5 text-xs font-bold text-white hover:bg-slate-800 hover:border-accent transition-colors"
          >
            Подробнее
          </a>
        </div>
      </div>
    </article>
  );
}
