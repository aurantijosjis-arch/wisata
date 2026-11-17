import { useEffect, useState } from 'react';
import { DetailTarget, DetailView } from './components/DetailView';
import { ExperiencesScreen } from './components/ExperiencesScreen';
import { ExploreScreen } from './components/ExploreScreen';
import { HomestaysScreen } from './components/HomestaysScreen';
import { MyTripSheet } from './components/MyTripSheet';
import { TopBar } from './components/TopBar';
import { VillageGuideScreen } from './components/VillageGuideScreen';
import { WhatsAppSheet } from './components/WhatsAppSheet';
import { VILLAGE_COORDINATOR } from './data/villageData';
import { BookingRecord, ScreenId } from './types/village';

const BOOKINGS_STORAGE_KEY = 'lereng_asri_bookings_v1';

export default function App() {
  const [activeScreen, setActiveScreen] = useState<ScreenId>('explore');
  const [detailTarget, setDetailTarget] = useState<DetailTarget | null>(null);
  const [isTripOpen, setIsTripOpen] = useState(false);
  const [whatsAppState, setWhatsAppState] = useState<{
    open: boolean;
    subject: string;
    message: string;
  }>({
    open: false,
    subject: '',
    message: '',
  });

  const [bookings, setBookings] = useState<BookingRecord[]>(() => {
    try {
      const saved = localStorage.getItem(BOOKINGS_STORAGE_KEY);
      return saved ? (JSON.parse(saved) as BookingRecord[]) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(bookings));
    } catch {
      // Abaikan error kuota penyimpanan
    }
  }, [bookings]);

  const handleNavigate = (screen: ScreenId) => {
    setDetailTarget(null);
    setActiveScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddBooking = (booking: Omit<BookingRecord, 'id' | 'createdAt'>) => {
    const newRecord: BookingRecord = {
      ...booking,
      id: `bk-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      createdAt: new Date().toISOString(),
    };
    setBookings((prev) => [newRecord, ...prev]);
  };

  const handleRemoveBooking = (id: string) => {
    setBookings((prev) => prev.filter((item) => item.id !== id));
  };

  const openWhatsApp = (subject: string, message: string) => {
    setWhatsAppState({ open: true, subject, message });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F9F8F3] text-[#1C2820]">
      <TopBar
        activeScreen={activeScreen}
        onNavigate={handleNavigate}
        bookingCount={bookings.length}
        onOpenTrip={() => setIsTripOpen(true)}
      />

      <main className="flex-1 w-full max-w-[1200px] mx-auto px-4 md:px-8 lg:px-16 pb-20 md:pb-8">
        {detailTarget ? (
          <DetailView
            target={detailTarget}
            onBack={() => {
              setDetailTarget(null);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onAddBooking={handleAddBooking}
            onOpenWhatsApp={openWhatsApp}
          />
        ) : activeScreen === 'explore' ? (
          <ExploreScreen
            onSelectPackage={(pkg) => {
              setDetailTarget({ kind: 'package', data: pkg });
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNavigate={handleNavigate}
            onOpenWhatsApp={openWhatsApp}
          />
        ) : activeScreen === 'homestays' ? (
          <HomestaysScreen
            onSelectHomestay={(stay) => {
              setDetailTarget({ kind: 'homestay', data: stay });
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenWhatsApp={openWhatsApp}
          />
        ) : activeScreen === 'experiences' ? (
          <ExperiencesScreen
            onAddBooking={handleAddBooking}
            onOpenWhatsApp={openWhatsApp}
          />
        ) : (
          <VillageGuideScreen onOpenWhatsApp={openWhatsApp} />
        )}
      </main>

      {/* Footer Desa */}
      <footer className="border-t border-[#1E4B38]/10 bg-[#F9F8F3] pb-20 md:pb-8">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8 lg:px-16 py-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <p className="text-base font-extrabold text-[#1E4B38]">Desa Wisata Lereng Asri</p>
            <p className="text-sm text-[#414944]">
              Koperasi Ekowisata Pegunungan · {VILLAGE_COORDINATOR.elevation} · Buka Setiap Hari
              05:00–20:00 WIB
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-sm font-semibold text-[#414944]">
            <button
              type="button"
              onClick={() => handleNavigate('explore')}
              className="hover:text-[#1E4B38] cursor-pointer"
            >
              Beranda
            </button>
            <button
              type="button"
              onClick={() => handleNavigate('homestays')}
              className="hover:text-[#1E4B38] cursor-pointer"
            >
              Homestay
            </button>
            <button
              type="button"
              onClick={() => handleNavigate('experiences')}
              className="hover:text-[#1E4B38] cursor-pointer"
            >
              Aktivitas
            </button>
            <button
              type="button"
              onClick={() => handleNavigate('guide')}
              className="hover:text-[#1E4B38] cursor-pointer"
            >
              Peta Desa
            </button>
          </div>
        </div>
      </footer>

      <WhatsAppSheet
        isOpen={whatsAppState.open}
        subjectLabel={whatsAppState.subject}
        initialMessage={whatsAppState.message}
        onClose={() => setWhatsAppState((prev) => ({ ...prev, open: false }))}
      />

      <MyTripSheet
        isOpen={isTripOpen}
        bookings={bookings}
        onClose={() => setIsTripOpen(false)}
        onRemoveBooking={handleRemoveBooking}
        onNavigate={handleNavigate}
        onOpenWhatsApp={openWhatsApp}
      />
    </div>
  );
}
