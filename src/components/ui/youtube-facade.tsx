import { useState } from 'react';
import { Play } from 'lucide-react';

interface YouTubeFacadeProps {
  videoId: string;
  title: string;
  startTime?: number;
}

export function YouTubeFacade({ videoId, title, startTime = 0 }: YouTubeFacadeProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  const thumbnailUrl = `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`;
  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1${startTime ? `&start=${startTime}` : ''}`;

  if (isLoaded) {
    return (
      <iframe
        src={embedUrl}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="w-full h-full"
      />
    );
  }

  return (
    <div 
      className="relative w-full h-full cursor-pointer group"
      onClick={() => setIsLoaded(true)}
    >
      <img
        src={thumbnailUrl}
        alt={title}
        loading="lazy"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors">
        <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
          <Play className="w-10 h-10 text-white ml-1" fill="white" />
        </div>
      </div>
    </div>
  );
}
