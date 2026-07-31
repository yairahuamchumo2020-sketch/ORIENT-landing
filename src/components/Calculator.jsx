import { useState, useEffect } from 'react';

export default function Calculator() {
  const [blockType, setBlockType] = useState('wall');
  const [length, setLength] = useState(10);
  const [height, setHeight] = useState(3);
  const [openings, setOpenings] = useState(0);

  const [results, setResults] = useState({
    area: 0,
    volume: 0,
    quantity: 0,
    pallets: 0
  });

  const blockDetails = {
    wall: {
      name: 'Стеновой блок КСР-39 (390х190х188 мм)',
      thickness: 0.19,
      pcsPerCub: 72,
    },
    narrow: {
      name: 'Перегородочный узкий КПР-39 (390х90х188 мм)',
      thickness: 0.09,
      pcsPerCub: 152,
    },
    wide: {
      name: 'Перегородочный широкий КПР-39 (390х120х188 мм)',
      thickness: 0.12,
      pcsPerCub: 113,
    }
  };

  useEffect(() => {
    const rawArea = length * height;
    const netArea = Math.max(0, rawArea - openings);
    
    // Площадь одного блока в кладке с учетом шва (примерно 0.39 * 0.188 = 0.07332 кв. м)
    const blockFaceArea = 0.07332;
    const quantity = Math.ceil(netArea / blockFaceArea);
    
    const details = blockDetails[blockType];
    const volume = Number((quantity / details.pcsPerCub).toFixed(2));
    const pallets = Math.ceil(volume); // 1 поддон = 1 куб. м

    setResults({
      area: Number(netArea.toFixed(2)),
      volume,
      quantity,
      pallets
    });
  }, [blockType, length, height, openings]);

  const handleSendRequest = () => {
    const details = blockDetails[blockType];
    const messageText = `Здравствуйте! Я рассчитал объем блоков на калькуляторе.\nМне требуется: ${details.name} в количестве ${results.quantity} шт. (объем: ${results.volume} куб. м, поддонов: ${results.pallets} шт.).\nПараметры стен: длина ${length} м, высота ${height} м, площадь проемов ${openings} кв. м.`;
    
    // Перенаправление на страницу контактов с параметром сообщения
    const encodedMessage = encodeURIComponent(messageText);
    window.location.href = `/contacts?message=${encodedMessage}#callback-form`;
  };

  return (
    <div className="mx-auto max-w-4xl bg-bg-card border border-border-dark rounded-2xl p-6 sm:p-10 shadow-2xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">
        {/* Левая колонка: Ввод параметров */}
        <div className="space-y-6">
          <h3 className="text-xl font-extrabold text-white pb-3 border-b border-slate-800">Параметры расчета</h3>
          
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wider">Тип строительного блока</label>
            <select
              value={blockType}
              onChange={(e) => setBlockType(e.target.value)}
              className="w-full rounded-md border border-border-dark bg-slate-900 px-3 py-2.5 text-sm text-white focus:border-accent focus:outline-none transition-colors"
            >
              <option value="wall">Стеновой блок (390×190×188 мм)</option>
              <option value="narrow">Перегородочный узкий (390×90×188 мм)</option>
              <option value="wide">Перегородочный широкий (390×120×188 мм)</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wider">Общая длина стен (м)</label>
              <input
                type="number"
                min="1"
                value={length}
                onChange={(e) => setLength(Math.max(1, parseFloat(e.target.value) || 0))}
                className="w-full rounded-md border border-border-dark bg-slate-900 px-3 py-2 text-sm text-white focus:border-accent focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wider">Высота стен (м)</label>
              <input
                type="number"
                min="1"
                value={height}
                onChange={(e) => setHeight(Math.max(1, parseFloat(e.target.value) || 0))}
                className="w-full rounded-md border border-border-dark bg-slate-900 px-3 py-2 text-sm text-white focus:border-accent focus:outline-none transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wider">Площадь окон и дверей (кв. м) — вычитается</label>
            <input
              type="number"
              min="0"
              value={openings}
              onChange={(e) => setOpenings(Math.max(0, parseFloat(e.target.value) || 0))}
              className="w-full rounded-md border border-border-dark bg-slate-900 px-3 py-2 text-sm text-white focus:border-accent focus:outline-none transition-colors"
            />
          </div>
        </div>

        {/* Правая колонка: Результаты расчета */}
        <div className="flex flex-col justify-between bg-slate-950/40 border border-slate-800/80 rounded-xl p-6 sm:p-8">
          <div>
            <h3 className="text-xl font-extrabold text-white pb-3 border-b border-slate-800 mb-6">Результаты расчета</h3>
            
            <div className="space-y-4">
              <div className="flex justify-between items-baseline border-b border-slate-900 pb-3">
                <span className="text-sm text-slate-400">Площадь кладки:</span>
                <span className="text-lg font-bold text-white">{results.area} м²</span>
              </div>
              <div className="flex justify-between items-baseline border-b border-slate-900 pb-3">
                <span className="text-sm text-slate-400">Необходимый объем:</span>
                <span className="text-lg font-bold text-accent">{results.volume} м³</span>
              </div>
              <div className="flex justify-between items-baseline border-b border-slate-900 pb-3">
                <span className="text-sm text-slate-400">Количество блоков:</span>
                <span className="text-lg font-bold text-white">{results.quantity} шт.</span>
              </div>
              <div className="flex justify-between items-baseline pb-3">
                <span className="text-sm text-slate-400">Количество поддонов:</span>
                <span className="text-lg font-bold text-slate-200">{results.pallets} подд.</span>
              </div>
            </div>

            <div className="mt-6 text-[10px] text-slate-500 leading-relaxed bg-slate-900/40 border border-slate-900 rounded p-3">
              💡 Расчет является ориентировочным. Точное количество блоков с учетом подрезки, боя и условий доставки поможет рассчитать технолог завода.
            </div>
          </div>

          <button
            type="button"
            onClick={handleSendRequest}
            className="w-full mt-8 inline-flex items-center justify-center rounded-md bg-accent px-4 py-3 text-sm font-bold text-white shadow-sm hover:bg-accent-hover active:scale-[0.98] transition-all cursor-pointer"
          >
            Получить точный расчет с доставкой
          </button>
        </div>
      </div>
    </div>
  );
}
