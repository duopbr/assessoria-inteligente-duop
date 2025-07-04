
import { Percent, Clock, Zap } from "lucide-react";
import { useState, useEffect } from "react";

export function DiscountOffer() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // Set end time to 24 hours from now
    const endTime = new Date();
    endTime.setHours(endTime.getHours() + 24);

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = endTime.getTime() - now;

      if (distance > 0) {
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setTimeLeft({ hours, minutes, seconds });
      } else {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-gradient-to-r from-red-500 to-red-600 text-white py-4 px-4 sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-white/20 p-2 rounded-full">
            <Percent size={24} className="text-white" />
          </div>
          <div>
            <h3 className="font-bold text-lg">OFERTA LIMITADA - 60% OFF!</h3>
            <p className="text-sm opacity-90">
              De <span className="line-through">R$ 79,90</span> por apenas <span className="font-bold text-xl">R$ 31,96/mês</span>
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Clock size={20} />
            <span className="text-sm">Tempo restante:</span>
          </div>
          <div className="flex gap-2">
            <div className="bg-white/20 px-3 py-1 rounded text-center min-w-[50px]">
              <div className="font-bold text-lg">{String(timeLeft.hours).padStart(2, '0')}</div>
              <div className="text-xs opacity-80">Horas</div>
            </div>
            <div className="bg-white/20 px-3 py-1 rounded text-center min-w-[50px]">
              <div className="font-bold text-lg">{String(timeLeft.minutes).padStart(2, '0')}</div>
              <div className="text-xs opacity-80">Min</div>
            </div>
            <div className="bg-white/20 px-3 py-1 rounded text-center min-w-[50px]">
              <div className="font-bold text-lg">{String(timeLeft.seconds).padStart(2, '0')}</div>
              <div className="text-xs opacity-80">Seg</div>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Zap size={20} className="text-yellow-300" />
          <span className="font-semibold">Aproveite agora!</span>
        </div>
      </div>
    </div>
  );
}
