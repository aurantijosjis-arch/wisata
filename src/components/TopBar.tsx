import React from 'react';
import { CalendarCheck, Compass, Home, Map, Sparkles } from 'lucide-react';
import { ScreenId } from '../types/village';

interface TopBarProps {
  activeScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
  bookingCount: number;
  onOpenTrip: () => void;
}

const NAV_ITEMS: { id: ScreenId; label: string; mobileLabel: string }[] = [
  { id: 'explore', label: 'Beranda', mobileLabel: 'Beranda' },
  { id: 'homestays', label: 'Homestay', mobileLabel: 'Homestay' },
  { id: 'experiences', label: 'Aktivitas', mobileLabel: 'Rencana' },
  { id: 'guide', label: 'Peta Desa', mobileLabel: 'Peta' },
];

export const TopBar: React.FC<TopBarProps> = ({
  activeScreen,
  onNavigate,
  bookingCount,
  onOpenTrip,
}) => {
  const renderMobileIcon = (id: ScreenId, active: boolean) => {
    const cls = `w-5 h-5 ${active ? 'text-[#1E4B38]' : 'text-[#414944]'}`;
    switch (id) {
      case 'explore':
        return <Compass className={cls} strokeWidth={active ? 2.4 : 1.8} />;
      case 'homestays':
        return <Home className={cls} strokeWidth={active ? 2.4 : 1.8} />;
      case 'experiences':
        return <Sparkles className={cls} strokeWidth={active ? 2.4 : 1.8} />;
      case 'guide':
        return <Map className={cls} strokeWidth={active ? 2.4 : 1.8} />;
    }
  };

  return (
    <>
      {/* Desktop & Tablet 3-Zone Top Bar */}
      <header className="sticky top-0 z-30 bg-[#F9F8F3]/95 backdrop-blur-md border-b border-[#1E4B38]/10">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8 lg:px-16 h-[64px] hidden md:flex items-center justify-between gap-8">
          <button
            type="button"
            onClick={() => onNavigate('explore')}
            className="text-xl font-extrabold tracking-tight text-[#1E4B38] whitespace-nowrap shrink-0 hover:text-[#023423] transition-colors cursor-pointer"
          >
            Lereng Asri
          </button>

          <nav aria-label="Navigasi utama" className="flex items-center gap-7">
            {NAV_ITEMS.map((item) => {
              const isActive = activeScreen === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onNavigate(item.id)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`relative py-2 text-[15px] font-semibold whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                    isActive ? 'text-[#023423]' : 'text-[#414944] hover:text-[#1E4B38]'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span
                      aria-hidden="true"
                      className="absolute left-0 right-0 bottom-0 h-[2px] rounded-full bg-[#1E4B38]"
                    />
                  )}
                </button>
              );
            })}
          </nav>

          <div className="flex items-center shrink-0">
            <button
              type="button"
              onClick={onOpenTrip}
              className="min-h-[44px] px-5 py-2.5 rounded-lg bg-[#1E4B38] hover:bg-[#023423] text-white text-sm font-semibold whitespace-nowrap shrink-0 tactile-press flex items-center gap-2 cursor-pointer"
            >
              <CalendarCheck className="w-4 h-4" aria-hidden="true" />
              <span className="tabular-nums">
                {bookingCount > 0 ? `Kunjungan (${bookingCount})` : 'Rencana Saya'}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Compact App Bar (52px) */}
        <div className="md:hidden px-4 h-[52px] flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => onNavigate('explore')}
            className="text-lg font-extrabold tracking-tight text-[#1E4B38] whitespace-nowrap shrink-0 cursor-pointer"
          >
            Lereng Asri
          </button>
          <button
            type="button"
            onClick={onOpenTrip}
            className="min-h-[40px] px-3.5 py-1.5 rounded-lg bg-[#1E4B38] text-white text-xs font-semibold whitespace-nowrap shrink-0 tactile-press flex items-center gap-1.5 cursor-pointer"
          >
            <CalendarCheck className="w-3.5 h-3.5" aria-hidden="true" />
            <span className="tabular-nums">
              {bookingCount > 0 ? `Kunjungan (${bookingCount})` : 'Rencana'}
            </span>
          </button>
        </div>
      </header>

      {/* Mobile Bottom Tab Bar (56px) */}
      <nav
        aria-label="Navigasi menu bawah"
        className="md:hidden fixed bottom-0 left-0 right-0 z-30 h-[56px] bg-white/95 backdrop-blur-md border-t border-[#1E4B38]/12 grid grid-cols-4 items-center px-1"
      >
        {NAV_ITEMS.map((item) => {
          const isActive = activeScreen === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onNavigate(item.id)}
              aria-current={isActive ? 'page' : undefined}
              className="min-h-[44px] flex flex-col items-center justify-center gap-0.5 cursor-pointer tactile-press"
            >
              {renderMobileIcon(item.id, isActive)}
              <span
                className={`text-[11px] font-semibold tracking-tight whitespace-nowrap ${
                  isActive ? 'text-[#1E4B38]' : 'text-[#414944]'
                }`}
              >
                {item.mobileLabel}
              </span>
            </button>
          );
        })}
      </nav>
    </>
  );
};
