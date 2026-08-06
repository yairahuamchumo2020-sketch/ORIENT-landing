const baseUrl = import.meta.env.BASE_URL;
const getUrl = (path) => {
  if (!path) return '';
  
  // Если путь уже является абсолютным внешним или уже содержит baseUrl, возвращаем как есть
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
    return path;
  }
  
  if (path.startsWith(baseUrl)) {
    return path;
  }
  
  const baseWithoutSlash = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
  if (baseWithoutSlash && path.startsWith(baseWithoutSlash)) {
    return path;
  }
  
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${baseUrl}${cleanPath}`;
};

export default function ProductCard({ id, title, dimensions, strength, price, image }) {
  const imageSrc = typeof image === 'object' ? image.src : getUrl(image);
  
  return (
    <article className="flex flex-col overflow-hidden rounded-xl border border-border-dark bg-bg-card hover:border-accent/50 transition-all duration-300 group shadow-sm hover:shadow-lg hover:-translate-y-0.5">
      <div className="aspect-square bg-slate-800/40 flex items-center justify-center text-slate-400 relative overflow-hidden">
        {/* Изображение товара с ленивой загрузкой */}
        <img 
          src={imageSrc} 
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
        <h3 className="text-base font-extrabold text-[#F2EFE9] group-hover:text-accent transition-colors mb-2 line-clamp-2">
          <a href={getUrl(`catalog/${id}`)}>{title}</a>
        </h3>
        <div className="space-y-1.5 text-xs text-[#A8A29B] mb-6 flex-grow">
          <div className="flex justify-between border-b border-[#2F3540] pb-1.5">
            <span>Размеры:</span> 
            <span className="font-bold text-[#F2EFE9]">{dimensions.length} × {dimensions.width} × {dimensions.height} мм</span>
          </div>
          <div className="flex justify-between">
            <span>Прочность:</span> 
            <span class="font-bold text-[#F2EFE9]">{strength}</span>
          </div>
        </div>
        <div className="flex items-center justify-between border-t border-[#2F3540] pt-4">
          <div>
            <span className="text-[10px] text-[#A8A29B]/60 block uppercase tracking-wider font-semibold">Цена</span>
            <span className="text-base font-black text-[#F2EFE9]">{price}</span>
          </div>
          <a 
            href={getUrl(`catalog/${id}`)} 
            className="inline-flex items-center justify-center rounded-md bg-[#1A1D21] border border-[#2F3540] px-3 py-1.5 text-xs font-bold text-[#F2EFE9] hover:bg-[#23272E] hover:border-accent transition-colors shadow-sm"
          >
            Подробнее
          </a>
        </div>
      </div>
    </article>
  );
}
