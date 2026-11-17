import React, { useState } from 'react';
import {
  Accessibility,
  ArrowLeft,
  CheckCircle2,
  Coffee,
  Compass,
  Droplets,
  Flame,
  Minus,
  Mountain,
  Plus,
  Utensils,
  Wifi,
} from 'lucide-react';
import { formatIdr } from '../data/villageData';
import { AmenityItem, BookingRecord, Homestay, VillagePackage } from '../types/village';
import { VillageArt, WhatsAppIcon } from './VillageArt';

export type DetailTarget =
  | { kind: 'homestay'; data: Homestay }
  | { kind: 'package'; data: VillagePackage };

interface DetailViewProps {
  target: DetailTarget;
  onBack: () => void;
  onAddBooking: (booking: Omit<BookingRecord, 'id' | 'createdAt'>) => void;
  onOpenWhatsApp: (subject: string, message: string) => void;
}

const AmenityIcon: React.FC<{ icon: AmenityItem['icon'] }> = ({ icon }) => {
  const cls = 'w-4 h-4 text-[#2E6F40]';
  switch (icon) {
    case 'coffee':
      return <Coffee className={cls} aria-hidden="true" />;
    case 'mountain':
      return <Mountain className={cls} aria-hidden="true" />;
    case 'flame':
      return <Flame className={cls} aria-hidden="true" />;
    case 'wifi':
      return <Wifi className={cls} aria-hidden="true" />;
    case 'accessibility':
      return <Accessibility className={cls} aria-hidden="true" />;
    case 'utensils':
      return <Utensils className={cls} aria-hidden="true" />;
    case 'droplets':
      return <Droplets className={cls} aria-hidden="true" />;
    case 'compass':
    default:
      return <Compass className={cls} aria-hidden="true" />;
  }
};

export const DetailView: React.FC<DetailViewProps> = ({
  target,
  onBack,
  onAddBooking,
  onOpenWhatsApp,
}) => {
  const isHomestay = target.kind === 'homestay';
  const maxGuests = isHomestay ? target.data.maxGuests : 12;

  const [date, setDate] = useState('2026-11-21');
  const [nights, setNights] = useState(2);
  const [guests, setGuests] = useState(isHomestay ? Math.min(2, maxGuests) : 2);
  const [guestName, setGuestName] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [confirmedId, setConfirmedId] = useState<string | null>(null);

  const unitPrice = isHomestay ? target.data.pricePerNightIdr : target.data.priceIdr;
  const totalIdr = isHomestay ? unitPrice * nights : unitPrice * guests;
  const title = isHomestay ? target.data.name : target.data.title;

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim()) {
      setErrorMsg('Mohon isi nama lengkap agar tuan rumah desa dapat menyambut Anda.');
      return;
    }
    if (!phone.trim() || phone.trim().length < 7) {
      setErrorMsg('Mohon masukkan nomor WhatsApp atau telepon yang aktif.');
      return;
    }
    setErrorMsg('');
    onAddBooking({
      type: isHomestay ? 'homestay' : 'package',
      title,
      date,
      guests,
      nights: isHomestay ? nights : undefined,
      totalIdr,
      guestName: guestName.trim(),
      phone: phone.trim(),
      notes: notes.trim(),
    });
    setConfirmedId(`LA-${Math.floor(1000 + Math.random() * 9000)}`);
  };

  const buildWhatsAppMessage = () => {
    const who = guestName.trim() || 'Tamu Lereng Asri';
    if (isHomestay) {
      return `Halo Pak Hendra, saya ${who} ingin memesan homestay "${title}" untuk tanggal ${date} selama ${nights} malam (${guests} tamu). Estimasi total ${formatIdr(
        totalIdr
      )}.${notes.trim() ? ` Catatan: ${notes.trim()}` : ''}`;
    }
    return `Halo Pak Hendra, saya ${who} ingin mendaftar pengalaman "${title}" untuk tanggal ${date} (${guests} peserta). Estimasi total ${formatIdr(
      totalIdr
    )}.${notes.trim() ? ` Catatan: ${notes.trim()}` : ''}`;
  };

  const amenitiesList = isHomestay ? target.data.amenities : target.data.highlights;
  const bulletNotes = isHomestay ? target.data.houseNotes : target.data.included;

  return (
    <div className="space-y-8 pb-12 pt-4 md:pt-6">
      <div>
        <button
          type="button"
          onClick={onBack}
          className="min-h-[44px] px-3 -ml-3 rounded-lg text-sm font-semibold text-[#1E4B38] hover:bg-[#E9F7EA] inline-flex items-center gap-2 tactile-press cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          <span>{isHomestay ? 'Kembali ke Daftar Homestay' : 'Kembali ke Beranda'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        <div className="lg:col-span-7 space-y-6">
          <div className="highland-card overflow-hidden">
            <div className="h-64 sm:h-80 overflow-hidden">
              <VillageArt
                variant={target.data.art}
                className="w-full h-full object-cover"
                label={title}
              />
            </div>

            <div className="p-6 space-y-4">
              <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-[#414944]">
                {isHomestay ? (
                  <>
                    <span className="text-[#2E6F40]">{target.data.cluster}</span>
                    <span aria-hidden="true">·</span>
                    <span className="tabular-nums">Maks. {target.data.maxGuests} tamu</span>
                    <span aria-hidden="true">·</span>
                    <span className="tabular-nums">
                      Dikelola {target.data.hostYears} thn oleh {target.data.hostName}
                    </span>
                  </>
                ) : (
                  <>
                    <span className="text-[#2E6F40]">{target.data.categoryLabel}</span>
                    <span aria-hidden="true">·</span>
                    <span className="tabular-nums">{target.data.duration}</span>
                    <span aria-hidden="true">·</span>
                    <span>{target.data.distance}</span>
                    <span aria-hidden="true">·</span>
                    <span>{target.data.difficulty}</span>
                  </>
                )}
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#121E17] [text-wrap:balance]">
                {title}
              </h1>

              <p className="text-base text-[#414944] leading-relaxed">{target.data.description}</p>
            </div>
          </div>

          <div className="highland-card p-6 space-y-4">
            <h2 className="text-lg font-bold text-[#121E17]">
              {isHomestay ? 'Kenyamanan & Akses Homestay' : 'Rangkaian Pengalaman Utama'}
            </h2>

            <ul className="divide-y divide-[#1E4B38]/6">
              {amenitiesList.map((item) => (
                <li key={item.label} className="py-3.5 first:pt-1 last:pb-1 flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-full bg-[#4E9F3D]/12 flex items-center justify-center shrink-0 mt-0.5">
                    <AmenityIcon icon={item.icon} />
                  </div>
                  <div>
                    <p className="text-base font-semibold text-[#121E17]">{item.label}</p>
                    <p className="text-sm text-[#414944]">{item.detail}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="highland-card p-6 space-y-3">
            <h2 className="text-lg font-bold text-[#121E17]">
              {isHomestay ? 'Catatan Tuan Rumah & Check-In' : 'Sudah Termasuk dalam Paket'}
            </h2>
            <ul className="space-y-2 text-[15px] text-[#414944]">
              {bulletNotes.map((line) => (
                <li key={line} className="flex items-start gap-2.5">
                  <span className="text-[#2E6F40] font-bold" aria-hidden="true">
                    •
                  </span>
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <aside className="lg:col-span-5 lg:sticky lg:top-24">
          <form onSubmit={handleConfirm} className="highland-card p-6 space-y-5" noValidate>
            <div className="flex items-baseline justify-between gap-2 pb-4 border-b border-[#1E4B38]/8">
              <div>
                <p className="text-2xl font-extrabold text-[#D97736] tabular-nums">
                  {formatIdr(unitPrice)}
                </p>
                <p className="text-xs font-semibold text-[#414944]">
                  {isHomestay ? 'per malam · termasuk sarapan' : `per ${target.data.unitLabel}`}
                </p>
              </div>
              <span className="text-xs font-bold text-[#2E6F40] tabular-nums">
                {isHomestay
                  ? `Sisa ${target.data.roomsLeft} unit`
                  : `Sisa ${target.data.slotsLeft} slot`}
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <label
                  htmlFor="booking-date"
                  className="block text-sm font-semibold text-[#1C2820] mb-1.5"
                >
                  {isHomestay ? 'Tanggal Check-In' : 'Tanggal Kunjungan'}
                </label>
                <input
                  id="booking-date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="highland-input w-full px-3.5 text-sm font-semibold tabular-nums"
                />
              </div>

              <div className={`grid ${isHomestay ? 'grid-cols-2' : 'grid-cols-1'} gap-3`}>
                {isHomestay && (
                  <div>
                    <span className="block text-sm font-semibold text-[#1C2820] mb-1.5">
                      Jumlah Malam
                    </span>
                    <div className="flex items-center justify-between highland-input px-2">
                      <button
                        type="button"
                        onClick={() => setNights((n) => Math.max(1, n - 1))}
                        aria-label="Kurangi malam"
                        className="min-h-[40px] min-w-[36px] flex items-center justify-center text-[#1E4B38] cursor-pointer"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="text-sm font-bold tabular-nums">{nights}</span>
                      <button
                        type="button"
                        onClick={() => setNights((n) => Math.min(14, n + 1))}
                        aria-label="Tambah malam"
                        className="min-h-[40px] min-w-[36px] flex items-center justify-center text-[#1E4B38] cursor-pointer"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                <div>
                  <span className="block text-sm font-semibold text-[#1C2820] mb-1.5">
                    Jumlah Tamu
                  </span>
                  <div className="flex items-center justify-between highland-input px-2">
                    <button
                      type="button"
                      onClick={() => setGuests((g) => Math.max(1, g - 1))}
                      aria-label="Kurangi jumlah tamu"
                      className="min-h-[40px] min-w-[36px] flex items-center justify-center text-[#1E4B38] cursor-pointer"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="text-sm font-bold tabular-nums">{guests}</span>
                    <button
                      type="button"
                      onClick={() => setGuests((g) => Math.min(maxGuests, g + 1))}
                      aria-label="Tambah jumlah tamu"
                      className="min-h-[40px] min-w-[36px] flex items-center justify-center text-[#1E4B38] cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <label
                  htmlFor="guest-name"
                  className="block text-sm font-semibold text-[#1C2820] mb-1.5"
                >
                  Nama Lengkap
                </label>
                <input
                  id="guest-name"
                  type="text"
                  placeholder="cth. Ibu Ratna / Budi Santoso"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  className="highland-input w-full px-3.5 text-sm"
                />
              </div>

              <div>
                <label
                  htmlFor="guest-phone"
                  className="block text-sm font-semibold text-[#1C2820] mb-1.5"
                >
                  Nomor WhatsApp
                </label>
                <input
                  id="guest-phone"
                  type="tel"
                  placeholder="cth. 0812 3456 7890"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="highland-input w-full px-3.5 text-sm tabular-nums"
                />
              </div>

              <div>
                <label
                  htmlFor="guest-notes"
                  className="block text-sm font-semibold text-[#1C2820] mb-1.5"
                >
                  Catatan Makanan atau Kebutuhan Lansia (Opsional)
                </label>
                <input
                  id="guest-notes"
                  type="text"
                  placeholder="cth. Minta kamar lantai dasar atau menu tidak pedas"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="highland-input w-full px-3.5 text-sm"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-[#1E4B38]/8 flex items-baseline justify-between">
              <span className="text-sm font-semibold text-[#414944]">
                Total ({isHomestay ? `${nights} malam` : `${guests} tamu`})
              </span>
              <span className="text-xl font-extrabold text-[#121E17] tabular-nums">
                {formatIdr(totalIdr)}
              </span>
            </div>

            {errorMsg && (
              <p role="alert" className="text-sm font-semibold text-[#BA1A1A]">
                {errorMsg}
              </p>
            )}

            {confirmedId && (
              <div
                role="status"
                className="p-3.5 rounded-lg bg-[#E9F7EA] border border-[#2E6F40]/30 text-sm text-[#1E4B38] space-y-1"
              >
                <p className="font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>Permintaan Reservasi Tersimpan ({confirmedId})</span>
                </p>
                <p className="text-xs text-[#1C2820]">
                  Sudah masuk ke Rencana Saya. Anda juga dapat mengirim langsung ke WhatsApp di
                  bawah untuk konfirmasi instan tuan rumah.
                </p>
              </div>
            )}

            <div className="space-y-3">
              <button
                type="submit"
                className="w-full min-h-[48px] px-5 py-3 rounded-lg bg-[#1E4B38] hover:bg-[#023423] text-white text-sm font-semibold tactile-press cursor-pointer"
              >
                Simpan Permintaan Reservasi
              </button>

              <button
                type="button"
                onClick={() => onOpenWhatsApp(`Reservasi: ${title}`, buildWhatsAppMessage())}
                className="w-full min-h-[48px] px-5 py-3 rounded-full bg-[#25D366] hover:bg-[#1DA851] text-white text-sm font-semibold flex items-center justify-center gap-2 tactile-press cursor-pointer"
              >
                <WhatsAppIcon className="w-5 h-5" />
                <span>Pesan via WhatsApp</span>
              </button>
            </div>
          </form>
        </aside>
      </div>
    </div>
  );
};
