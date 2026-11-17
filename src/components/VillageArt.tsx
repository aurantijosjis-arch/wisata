import React, { useState } from 'react';
import { Mountain } from 'lucide-react';
import { ArtVariant } from '../types/village';

interface VillageArtProps {
  variant: ArtVariant;
  className?: string;
  label?: string;
}

const IMAGE_MAP: Record<ArtVariant, { src: string; defaultAlt: string }> = {
  'hero-terraces': {
    src: '/src/assets/images/lereng_asri_hero_1794897347145.jpg',
    defaultAlt: 'Terasering sawah dan perkampungan bambu Lereng Asri di bawah sinar matahari pagi yang berkabut',
  },
  'bamboo-lodge': {
    src: '/src/assets/images/homestay_rumah_bambu_1794897349927.jpg',
    defaultAlt: 'Homestay anyaman bambu dan kayu jati dengan beranda menghadap perbukitan berkabut',
  },
  'coffee-harvest': {
    src: '/src/assets/images/arabica_coffee_harvest_1794897347148.jpg',
    defaultAlt: 'Petani koperasi memetik buah kopi Arabika merah di lereng pegunungan Lereng Asri',
  },
  'sunrise-ridge': {
    src: '/src/assets/images/bukit_kabut_sunrise_1794897347933.jpg',
    defaultAlt: 'Pemandangan matahari terbit di atas lautan awan dari anjungan kayu Bukit Kabut',
  },
  'family-rice': {
    src: '/src/assets/images/family_terrace_walk_1794897348504.jpg',
    defaultAlt: 'Keluarga berjalan santai di jalur batu datar tepi saluran irigasi persawahan',
  },
  'bamboo-craft': {
    src: '/src/assets/images/bamboo_weaving_craft_1794897349013.jpg',
    defaultAlt: 'Pengrajin desa menganyam bilah bambu menjadi nampan teh di pendopo terbuka',
  },
  'herbal-spring': {
    src: '/src/assets/images/sendang_herbal_spring_1794897349135.jpg',
    defaultAlt: 'Kolam pemandian air hangat alami Sendang Air yang dikelilingi pakis pegunungan',
  },
};

export const WhatsAppIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    className={className}
  >
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91C21.95 6.45 17.5 2 12.04 2zm5.79 14.01c-.24.68-1.41 1.3-1.95 1.38-.51.08-1.16.11-1.87-.12-.43-.14-.99-.32-1.71-.63-3.01-1.3-4.97-4.33-5.12-4.53-.15-.2-1.22-1.62-1.22-3.09 0-1.47.77-2.19 1.04-2.49.27-.3.6-.37.8-.37.2 0 .4 0 .57.01.18.01.43-.07.67.51.25.6.85 2.07.92 2.22.07.15.12.32.02.52-.1.2-.15.32-.3.5-.15.17-.31.39-.45.52-.15.15-.31.31-.13.61.18.3.79 1.3 1.7 2.11 1.17 1.04 2.16 1.37 2.46 1.52.3.15.47.12.65-.08.18-.2.75-.87.95-1.17.2-.3.4-.25.67-.15.27.1 1.74.82 2.04.97.3.15.5.22.57.35.08.12.08.72-.16 1.4z" />
  </svg>
);

export const VillageArt: React.FC<VillageArtProps> = ({
  variant,
  className = 'w-full h-full object-cover',
  label,
}) => {
  const [failed, setFailed] = useState(false);
  const asset = IMAGE_MAP[variant] || IMAGE_MAP['hero-terraces'];
  const altText = label || asset.defaultAlt;

  if (failed) {
    return (
      <div
        role="img"
        aria-label={altText}
        className={`bg-gradient-to-br from-[#E3F2E5] via-[#DCEEE0] to-[#C8E2CE] flex flex-col items-center justify-center p-6 text-center ${className}`}
      >
        <Mountain className="w-8 h-8 text-[#1E4B38] mb-2" aria-hidden="true" />
        <p className="text-sm font-semibold text-[#1E4B38] max-w-xs">{altText}</p>
      </div>
    );
  }

  return (
    <img
      src={asset.src}
      alt={altText}
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className={className}
      loading="lazy"
    />
  );
};
