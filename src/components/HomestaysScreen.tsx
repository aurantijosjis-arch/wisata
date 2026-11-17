import React, { useMemo, useState } from 'react';
import { Accessibility, Coffee, Flame, Minus, Mountain, Plus, Users } from 'lucide-react';
import { HOMESTAYS, formatIdr } from '../data/villageData';
import { Homestay } from '../types/village';
import { VillageArt, WhatsAppIcon } from './VillageArt';

interface HomestaysScreenProps {
  onSelectHomestay: (stay: Homestay) => void;
  onOpenWhatsApp: (subject: string, message: string) => void;
}

type StayFilter = 'all' | 'step-free' | 'family' | 'view';
type SortMode = 'recommended' | 'price-asc' | 'capacity';

export const HomestaysScreen: React.FC<HomestaysScreenProps> = ({
  onSelectHomestay,
  onOpenWhatsApp,
}) => {
  const [guestCount, setGuestCount] = useState(2);
  const [activeFilter, setActiveFilter] = useState<StayFilter>('all');
  const [sortMode, setSortMode] = useState<SortMode>('recommended');

  const filteredStays = useMemo(() => {
    const base = HOMESTAYS.filter((stay) => {
      if (stay.maxGuests < guestCount) return false;
      if (activeFilter === 'step-free') return stay.stepFree;
      if (activeFilter === 'family') return stay.familyFriendly;
      if (activeFilter === 'view') return stay.mountainView;
      return true;
    });

    if (sortMode === 'price-asc') {
      return [...base].sort((a, b) => a.pricePerNightIdr - b.pricePerNightIdr);
    }
    if (sortMode === 'capacity') {
      return [...base].sort((a, b) => b.maxGuests - a.maxGuests);
    }
    return base;
  }, [guestCount, activeFilter, sortMode]);

  return (
    <div className="space-y-8 pb-10 pt-4 md:pt-8">
      <div className="space-y-2 max-w-2xl">
        <p className="text-sm font-semibold text-[#2E6F40]">
          Penginapan Bambu &amp; Kayu Dikelola Keluarga Desa
        </p>
        <h1 className="text-[28px] leading-[36px] md:text-[36px] md:leading-[44px] font-extrabold text-[#121E17] [text-wrap:balance]">
          Beristirahat di homestay desa hangat lengkap dengan sarapan kebun.
        </h1>
        <p className="text-base text-[#414944]">
          Setiap homestay dikelola langsung oleh warga Lereng Asri dan sudah termasuk pancuran air
          hangat, selimut wol tebal, serta sarapan masakan desa.
        </p>
      </div>

      {/* Kontrol Jumlah Tamu & Filter */}
      <div className="highland-card p-4 md:p-5 space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-center justify-between sm:justify-start gap-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#4E9F3D]/12 flex items-center justify-center">
                <Users className="w-4 h-4 text-[#2E6F40]" aria-hidden="true" />
              </div>
              <div>
                <p className="text-sm font-bold text-[#121E17]">Jumlah Tamu</p>
                <p className="text-xs text-[#414944]">Tampilkan unit sesuai kapasitas rombongan</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setGuestCount((g) => Math.max(1, g - 1))}
                aria-label="Kurangi jumlah tamu"
                className="min-h-[44px] min-w-[44px] rounded-lg border-[1.5px] border-[#1E4B38]/30 hover:border-[#1E4B38] flex items-center justify-center text-[#1E4B38] tactile-press cursor-pointer"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-16 text-center text-base font-bold text-[#121E17] tabular-nums">
                {guestCount} tamu
              </span>
              <button
                type="button"
                onClick={() => setGuestCount((g) => Math.min(6, g + 1))}
                aria-label="Tambah jumlah tamu"
                className="min-h-[44px] min-w-[44px] rounded-lg border-[1.5px] border-[#1E4B38]/30 hover:border-[#1E4B38] flex items-center justify-center text-[#1E4B38] tactile-press cursor-pointer"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <label htmlFor="stay-sort" className="text-sm font-semibold text-[#414944] shrink-0">
              Urutkan
            </label>
            <select
              id="stay-sort"
              value={sortMode}
              onChange={(e) => setSortMode(e.target.value as SortMode)}
              className="highland-input px-3.5 text-sm font-semibold cursor-pointer min-w-[200px]"
            >
              <option value="recommended">Rekomendasi Warga</option>
              <option value="price-asc">Tarif Terendah</option>
              <option value="capacity">Kapasitas Terbesar</option>
            </select>
          </div>
        </div>

        <div
          role="group"
          aria-label="Filter aksesibilitas dan fasilitas homestay"
          className="flex flex-wrap items-center gap-2.5 pt-2 border-t border-[#1E4B38]/8"
        >
          {(
            [
              { id: 'all', label: 'Semua Homestay' },
              { id: 'step-free', label: 'Tanpa Tangga (Ramah Lansia)' },
              { id: 'family', label: 'Lega untuk Keluarga' },
              { id: 'view', label: 'Pemandangan Terasering' },
            ] as { id: StayFilter; label: string }[]
          ).map((f) => {
            const active = activeFilter === f.id;
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => setActiveFilter(f.id)}
                aria-pressed={active}
                className={`min-h-[44px] px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap shrink-0 border tactile-press cursor-pointer ${
                  active
                    ? 'bg-[#1E4B38] text-white border-[#1E4B38]'
                    : 'bg-[#F9F8F3] text-[#1E4B38] border-[#1E4B38]/40 hover:border-[#1E4B38] hover:bg-[#E9F7EA]'
                }`}
              >
                {f.label}
              </button>
            );
          })}
        </div>
      </div>

      {filteredStays.length === 0 ? (
        <div className="highland-card p-8 text-center space-y-4">
          <p className="text-lg font-bold text-[#121E17]">
            Belum ada pondok tunggal untuk {guestCount} tamu dengan filter tersebut.
          </p>
          <p className="text-base text-[#414944] max-w-md mx-auto">
            Untuk rombongan 5–6 orang yang membutuhkan kamar lantai dasar tanpa tangga, Pak Hendra
            dapat menyiapkan dua pondok bersebelahan di Klaster Terasering Bawah.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => {
                setActiveFilter('all');
                setGuestCount(2);
              }}
              className="min-h-[48px] px-5 py-2.5 rounded-lg border-[1.5px] border-[#1E4B38] text-[#1E4B38] text-sm font-semibold cursor-pointer"
            >
              Atur Ulang Filter
            </button>
            <button
              type="button"
              onClick={() =>
                onOpenWhatsApp(
                  'Tanya Pondok Keluarga Bersebelahan',
                  `Halo Pak Hendra, kami rombongan ${guestCount} orang dan mencari kamar lantai dasar (tanpa tangga) yang berdekatan di Lereng Asri.`
                )
              }
              className="min-h-[48px] px-5 py-2.5 rounded-full bg-[#25D366] text-white text-sm font-semibold flex items-center gap-2 cursor-pointer"
            >
              <WhatsAppIcon className="w-5 h-5" />
              <span>Tanya Pak Hendra via WhatsApp</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredStays.map((stay) => (
            <article
              key={stay.id}
              className="highland-card-interactive overflow-hidden flex flex-col"
            >
              <div className="relative h-56 overflow-hidden">
                <VillageArt variant={stay.art} className="w-full h-full object-cover" label={stay.name} />
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between gap-4">
                <div className="space-y-2.5">
                  <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-[#414944]">
                    <span className="text-[#2E6F40]">{stay.cluster}</span>
                    <span aria-hidden="true">·</span>
                    <span className="tabular-nums">Maks. {stay.maxGuests} tamu</span>
                    <span aria-hidden="true">·</span>
                    <span className="tabular-nums">{stay.bedrooms} kamar</span>
                  </div>

                  <h2 className="text-xl font-bold text-[#121E17]">{stay.name}</h2>
                  <p className="text-[15px] text-[#414944] leading-relaxed">{stay.summary}</p>

                  <div className="pt-1 flex flex-wrap gap-x-4 gap-y-1.5 text-xs font-semibold text-[#1C2820]">
                    {stay.stepFree && (
                      <span className="inline-flex items-center gap-1.5 text-[#2E6F40]">
                        <Accessibility className="w-3.5 h-3.5" aria-hidden="true" />
                        Akses tanpa tangga
                      </span>
                    )}
                    {stay.breakfastIncluded && (
                      <span className="inline-flex items-center gap-1.5">
                        <Coffee className="w-3.5 h-3.5 text-[#2E6F40]" aria-hidden="true" />
                        Termasuk sarapan
                      </span>
                    )}
                    {stay.hotSpring && (
                      <span className="inline-flex items-center gap-1.5">
                        <Flame className="w-3.5 h-3.5 text-[#D97736]" aria-hidden="true" />
                        Air hangat alami
                      </span>
                    )}
                    {stay.mountainView && (
                      <span className="inline-flex items-center gap-1.5">
                        <Mountain className="w-3.5 h-3.5 text-[#2E6F40]" aria-hidden="true" />
                        Pemandangan terasering
                      </span>
                    )}
                  </div>
                </div>

                <div className="pt-4 border-t border-[#1E4B38]/8 flex items-center justify-between gap-3">
                  <div>
                    <p className="text-lg font-extrabold text-[#D97736] tabular-nums">
                      {formatIdr(stay.pricePerNightIdr)}{' '}
                      <span className="text-xs font-semibold text-[#414944]">/ malam</span>
                    </p>
                    <p className="text-xs font-semibold text-[#414944] tabular-nums">
                      Tuan rumah: {stay.hostName} · Sisa {stay.roomsLeft} unit
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => onSelectHomestay(stay)}
                    className="min-h-[48px] px-5 py-2.5 rounded-lg bg-[#1E4B38] hover:bg-[#023423] text-white text-sm font-semibold whitespace-nowrap shrink-0 tactile-press cursor-pointer"
                  >
                    Lihat &amp; Pesan
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};
