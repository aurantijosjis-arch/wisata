import React from 'react';
import { CalendarCheck, Trash2, X } from 'lucide-react';
import { formatIdr } from '../data/villageData';
import { BookingRecord, ScreenId } from '../types/village';
import { WhatsAppIcon } from './VillageArt';

interface MyTripSheetProps {
  isOpen: boolean;
  bookings: BookingRecord[];
  onClose: () => void;
  onRemoveBooking: (id: string) => void;
  onNavigate: (screen: ScreenId) => void;
  onOpenWhatsApp: (subject: string, message: string) => void;
}

export const MyTripSheet: React.FC<MyTripSheetProps> = ({
  isOpen,
  bookings,
  onClose,
  onRemoveBooking,
  onNavigate,
  onOpenWhatsApp,
}) => {
  if (!isOpen) return null;

  const grandTotal = bookings.reduce((sum, b) => sum + b.totalIdr, 0);

  const sendAllToWhatsApp = () => {
    const lines = bookings
      .map(
        (b, idx) =>
          `${idx + 1}. ${b.title} (${b.date}, ${b.guests} tamu${
            b.nights ? `, ${b.nights} malam` : ''
          }) — ${formatIdr(b.totalIdr)}`
      )
      .join('\n');
    onClose();
    onOpenWhatsApp(
      'Ringkasan Rencana Kunjungan Lereng Asri',
      `Halo Pak Hendra, berikut ringkasan rencana kunjungan saya di Lereng Asri:\n${lines}\nTotal estimasi: ${formatIdr(
        grandTotal
      )}. Mohon konfirmasi ketersediaannya.`
    );
  };

  const formatTypeLabel = (type: BookingRecord['type']) => {
    if (type === 'homestay') return 'Homestay';
    if (type === 'package') return 'Paket Wisata';
    return 'Jadwal Harian';
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-[#121E17]/45 backdrop-blur-[2px] p-0 md:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="my-trip-title"
    >
      <div className="w-full md:max-w-xl bg-[#FFFFFF] rounded-t-3xl md:rounded-2xl highland-floating border border-[#1E4B38]/10 overflow-hidden max-h-[88vh] flex flex-col">
        <div className="md:hidden w-10 h-1.5 bg-[#C0C8C2] rounded-full mx-auto mt-3 shrink-0" />

        <div className="px-5 pt-4 pb-3 border-b border-[#1E4B38]/8 flex items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#4E9F3D]/12 flex items-center justify-center">
              <CalendarCheck className="w-4 h-4 text-[#2E6F40]" aria-hidden="true" />
            </div>
            <div>
              <h2 id="my-trip-title" className="text-lg font-bold text-[#121E17]">
                Rencana Kunjungan Saya
              </h2>
              <p className="text-xs text-[#414944] tabular-nums">
                {bookings.length} item tersimpan
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup Rencana Kunjungan"
            className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg text-[#414944] hover:bg-[#E9F7EA] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 overflow-y-auto flex-1 space-y-4">
          {bookings.length === 0 ? (
            <div className="py-6 text-center space-y-4">
              <p className="text-base font-bold text-[#121E17]">
                Rencana perjalanan Anda masih kosong.
              </p>
              <p className="text-sm text-[#414944] max-w-sm mx-auto">
                Pilih homestay bambu keluarga atau susun jadwal panen kopi dan jalan pagi untuk
                menyimpan kunjungan Anda di sini.
              </p>
              <div className="flex flex-wrap justify-center gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onNavigate('homestays');
                  }}
                  className="min-h-[44px] px-4 py-2 rounded-lg bg-[#1E4B38] text-white text-sm font-semibold cursor-pointer"
                >
                  Lihat Homestay
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onNavigate('experiences');
                  }}
                  className="min-h-[44px] px-4 py-2 rounded-lg border-[1.5px] border-[#1E4B38] text-[#1E4B38] text-sm font-semibold cursor-pointer"
                >
                  Susun Jadwal Harian
                </button>
              </div>
            </div>
          ) : (
            <ul className="divide-y divide-[#1E4B38]/8">
              {bookings.map((item) => (
                <li
                  key={item.id}
                  className="py-3.5 first:pt-0 last:pb-0 flex items-start justify-between gap-3"
                >
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-[#2E6F40]">
                      {formatTypeLabel(item.type)}
                    </p>
                    <p className="text-base font-bold text-[#121E17]">{item.title}</p>
                    <p className="text-xs text-[#414944] tabular-nums">
                      Tanggal: {item.date} · {item.guests} tamu
                      {item.nights ? ` · ${item.nights} malam` : ''}
                    </p>
                    {item.notes && <p className="text-xs text-[#414944]">Catatan: {item.notes}</p>}
                  </div>

                  <div className="flex flex-col items-end gap-2 shrink-0">
                    <span className="text-sm font-extrabold text-[#D97736] tabular-nums">
                      {formatIdr(item.totalIdr)}
                    </span>
                    <button
                      type="button"
                      onClick={() => onRemoveBooking(item.id)}
                      aria-label={`Hapus ${item.title}`}
                      className="min-h-[36px] min-w-[36px] flex items-center justify-center rounded-lg text-[#414944] hover:text-[#BA1A1A] hover:bg-[#FFDAD6]/40 cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {bookings.length > 0 && (
          <div className="p-5 border-t border-[#1E4B38]/8 bg-[#F9F8F3] space-y-3 shrink-0">
            <div className="flex items-baseline justify-between">
              <span className="text-sm font-semibold text-[#414944]">
                Estimasi Total Kunjungan
              </span>
              <span className="text-xl font-extrabold text-[#121E17] tabular-nums">
                {formatIdr(grandTotal)}
              </span>
            </div>

            <button
              type="button"
              onClick={sendAllToWhatsApp}
              className="w-full min-h-[48px] px-5 py-3 rounded-full bg-[#25D366] hover:bg-[#1DA851] text-white text-sm font-semibold flex items-center justify-center gap-2 tactile-press cursor-pointer"
            >
              <WhatsAppIcon className="w-5 h-5" />
              <span>Kirim Semua Rencana via WhatsApp</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
