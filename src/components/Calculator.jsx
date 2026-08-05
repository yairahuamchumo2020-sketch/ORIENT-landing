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
    window.location.href = `/contacts?message=${encodedMessage}`;
  };

  return (
    <div className="mx-auto max-w-4xl bg-[#1A1D21] border border-[#2F3540] rounded-2xl p-6 sm:p-10 shadow-2xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">
        {/* Левая колонка: Ввод параметров */}
        <div className="space-y-6">
          <h3 className="text-xl font-extrabold text-[#F2EFE9] pb-3 border-b border-[#2F3540]">Параметры расчета</h3>
          
          <div>
            <label htmlFor="block-type-select" className="block text-xs font-bold text-[#A8A29B] mb-2 uppercase tracking-wider">Тип строительного блока</label>
            <select
              id="block-type-select"
              name="blockType"
              value={blockType}
              onChange={(e) => setBlockType(e.target.value)}
              className="w-full rounded-md border border-[#2F3540] bg-[#23272E] px-3 py-2.5 text-sm text-[#F2EFE9] focus:border-accent focus-visible:ring-2 focus-visible:ring-accent focus:outline-none transition-colors shadow-sm"
            >
              <option value="wall">Стеновой блок (390×190×188 мм)</option>
              <option value="narrow">Перегородочный узкий (390×90×188 мм)</option>
              <option value="wide">Перегородочный широкий (390×120×188 мм)</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="wall-length-input" className="block text-xs font-bold text-[#A8A29B] mb-2 uppercase tracking-wider">Длина стен (м)</label>
              <input
                id="wall-length-input"
                name="length"
                type="number"
                min="1"
                autocomplete="off"
                value={length}
                onChange={(e) => setLength(Math.max(1, parseFloat(e.target.value) || 0))}
                className="w-full rounded-md border border-[#2F3540] bg-[#23272E] px-3 py-2 text-sm text-[#F2EFE9] focus:border-accent focus-visible:ring-2 focus-visible:ring-accent focus:outline-none transition-colors shadow-sm"
              />
            </div>
            <div>
              <label htmlFor="wall-height-input" className="block text-xs font-bold text-[#A8A29B] mb-2 uppercase tracking-wider">Высота стен (м)</label>
              <input
                id="wall-height-input"
                name="height"
                type="number"
                min="1"
                autocomplete="off"
                value={height}
                onChange={(e) => setHeight(Math.max(1, parseFloat(e.target.value) || 0))}
                className="w-full rounded-md border border-[#2F3540] bg-[#23272E] px-3 py-2 text-sm text-[#F2EFE9] focus:border-accent focus-visible:ring-2 focus-visible:ring-accent focus:outline-none transition-colors shadow-sm"
              />
            </div>
          </div>

          <div>
            <label htmlFor="wall-openings-input" className="block text-xs font-bold text-[#A8A29B] mb-2 uppercase tracking-wider">Площадь проемов (кв. м) — вычитается</label>
            <input
              id="wall-openings-input"
              name="openings"
              type="number"
              min="0"
              autocomplete="off"
              value={openings}
              onChange={(e) => setOpenings(Math.max(0, parseFloat(e.target.value) || 0))}
              className="w-full rounded-md border border-[#2F3540] bg-[#23272E] px-3 py-2 text-sm text-[#F2EFE9] focus:border-accent focus-visible:ring-2 focus-visible:ring-accent focus:outline-none transition-colors shadow-sm"
            />
          </div>
        </div>

        {/* Правая колонка: Результаты расчета */}
        <div className="flex flex-col justify-between bg-[#23272E] border border-[#2F3540] rounded-xl p-6 sm:p-8 shadow-sm">
          <div>
            <h3 className="text-xl font-extrabold text-[#F2EFE9] pb-3 border-b border-[#2F3540] mb-6">Результаты расчета</h3>
            
            <div className="space-y-4 font-semibold">
              <div className="flex justify-between items-baseline border-b border-[#2F3540] pb-3">
                <span className="text-sm text-[#A8A29B]">Площадь кладки:</span>
                <span className="text-lg font-bold text-[#F2EFE9]">{results.area} м²</span>
              </div>
              <div className="flex justify-between items-baseline border-b border-[#2F3540] pb-3">
                <span className="text-sm text-[#A8A29B]">Необходимый объем:</span>
                <span className="text-lg font-bold text-accent">{results.volume} м³</span>
              </div>
              <div className="flex justify-between items-baseline border-b border-[#2F3540] pb-3">
                <span className="text-sm text-[#A8A29B]">Количество блоков:</span>
                <span className="text-lg font-bold text-[#F2EFE9]">{results.quantity} шт.</span>
              </div>
              <div className="flex justify-between items-baseline pb-3">
                <span className="text-sm text-[#A8A29B]">Количество поддонов:</span>
                <span className="text-lg font-bold text-[#F2EFE9]">{results.pallets} подд.</span>
              </div>
            </div>

            <div className="mt-6 text-[10px] text-[#A8A29B]/80 leading-relaxed bg-[#1A1D21] border border-[#2F3540] rounded p-3 font-medium">
              💡 Расчет является ориентировочным. Точное количество блоков с учетом подрезки, боя и условий доставки поможет рассчитать технолог завода.
            </div>
          </div>

          <button
            type="button"
            onClick={handleSendRequest}
            className="w-full mt-8 inline-flex items-center justify-center rounded-md bg-accent px-4 py-3 text-sm font-bold text-white shadow-sm hover:bg-accent-hover active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-[#F2EFE9] focus-visible:outline-none transition-all cursor-pointer"
          >
            Получить точный расчет с доставкой
          </button>
        </div>
      </div>
    </div>
  );
}
