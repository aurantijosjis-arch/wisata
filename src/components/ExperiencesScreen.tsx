import React, { useMemo, useState } from 'react';
import { Calendar, Check, Clock, Footprints, Minus, Plus, Sparkles } from 'lucide-react';
import { ITINERARY_ACTIVITIES, formatIdr } from '../data/villageData';
import { BookingRecord } from '../types/village';
import { WhatsAppIcon } from './VillageArt';

interface ExperiencesScreenProps {
  onAddBooking: (booking: Omit<BookingRecord, 'id' | 'createdAt'>) => void;
  onOpenWhatsApp: (subject: string, message: string) => void;
}

export const ExperiencesScreen: React.FC<ExperiencesScreenProps> = ({
  onAddBooking,
  onOpenWhatsApp,
}) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([
    'act-coffee',
    'act-lunch',
    'act-bamboo',
  ]);
  const [guests, setGuests] = useState(2);
  const [visitDate, setVisitDate] = useState('2026-11-21');
  const [savedFeedback, setSavedFeedback] = useState(false);

  const toggleActivity = (id: string) => {
    setSavedFeedback(false);
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const applyPreset = (preset: 'family-gentle' | 'full-day') => {
    setSavedFeedback(false);
    if (preset === 'family-gentle') {
      setSelectedIds(['act-coffee', 'act-lunch', 'act-spring']);
    } else {
      setSelectedIds(ITINERARY_ACTIVITIES.map((a) => a.id));
    }
  };

  const selectedActivities = useMemo(
    () => ITINERARY_ACTIVITIES.filter((a) => selectedIds.includes(a.id)),
    [selectedIds]
  );

  const summary = useMemo(() => {
    const perGuest = selectedActivities.reduce((acc, a) => acc + a.pricePerPersonIdr, 0);
    const totalDistance = selectedActivities.reduce((acc, a) => acc + a.distanceKm, 0);
    const hasModerate = selectedActivities.some((a) => a.effort === 'Sedang');
    return {
      perGuest,
      totalIdr: perGuest * guests,
      totalDistance: totalDistance.toFixed(1).replace('.', ','),
      paceLabel: hasModerate ? 'Aktif · Termasuk Tangga Bukit' : 'Santai · Ramah Lansia & Keluarga',
    };
  }, [selectedActivities, guests]);

  const handleSaveItinerary = () => {
    if (selectedActivities.length === 0) return;
    onAddBooking({
      type: 'itinerary',
      title: `Jadwal Kunjungan Harian (${selectedActivities.length} aktivitas)`,
      date: visitDate,
      guests,
      totalIdr: summary.totalIdr,
      guestName: 'Pengunjung Desa',
      phone: '',
      notes: selectedActivities.map((a) => `${a.time} ${a.title}`).join(', '),
    });
    setSavedFeedback(true);
  };

  const buildWhatsAppSummary = () => {
    const listText = selectedActivities
      .map((a) => `- ${a.time}: ${a.title} (${formatIdr(a.pricePerPersonIdr)}/org)`)
      .join('\n');
    return `Halo Pak Hendra, saya ingin memesan rencana perjalanan Lereng Asri untuk tanggal ${visitDate} (${guests} orang):\n${listText}\nEstimasi total: ${formatIdr(
      summary.totalIdr
    )}. Apakah jadwal tersedia?`;
  };

  return (
    <div className="space-y-8 pb-10 pt-4 md:pt-8">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
        <div className="space-y-2 max-w-2xl">
          <p className="text-sm font-semibold text-[#2E6F40]">Jadwal Harian &amp; Perencana Rute</p>
          <h1 className="text-[28px] leading-[36px] md:text-[36px] md:leading-[44px] font-extrabold text-[#121E17] [text-wrap:balance]">
            Susun jadwal wisata harian Anda di Lereng Asri.
          </h1>
          <p className="text-base text-[#414944]">
            Centang sesi pagi hingga sore yang sesuai dengan energi rombongan Anda. Seluruh kegiatan
            berjalan santai bersama pemandu lokal.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={() => applyPreset('family-gentle')}
            className="min-h-[44px] px-4 py-2 rounded-full border border-[#1E4B38]/40 bg-[#F9F8F3] hover:bg-[#E9F7EA] text-[#1E4B38] text-sm font-semibold whitespace-nowrap tactile-press cursor-pointer"
          >
            Paket: Keluarga &amp; Lansia
          </button>
          <button
            type="button"
            onClick={() => applyPreset('full-day')}
            className="min-h-[44px] px-4 py-2 rounded-full border border-[#1E4B38]/40 bg-[#F9F8F3] hover:bg-[#E9F7EA] text-[#1E4B38] text-sm font-semibold whitespace-nowrap tactile-press cursor-pointer"
          >
            Paket: Fajar hingga Sore
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        <div className="lg:col-span-7 space-y-4">
          {ITINERARY_ACTIVITIES.map((activity) => {
            const checked = selectedIds.includes(activity.id);
            return (
              <div
                key={activity.id}
                onClick={() => toggleActivity(activity.id)}
                role="checkbox"
                aria-checked={checked}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === ' ' || e.key === 'Enter') {
                    e.preventDefault();
                    toggleActivity(activity.id);
                  }
                }}
                className={`highland-card p-5 cursor-pointer transition-colors ${
                  checked
                    ? 'border-[#1E4B38]/45 bg-[#FFFFFF]'
                    : 'border-[#1E4B38]/8 bg-[#FFFFFF]/80 hover:bg-[#FFFFFF]'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div
                    aria-hidden="true"
                    className={`mt-1 w-6 h-6 rounded-[6px] border-2 flex items-center justify-center shrink-0 transition-colors ${
                      checked
                        ? 'bg-[#1E4B38] border-[#1E4B38] text-white'
                        : 'bg-white border-[#1E4B38]'
                    }`}
                  >
                    {checked && <Check className="w-4 h-4 stroke-[3]" />}
                  </div>

                  <div className="flex-1 space-y-2">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="text-sm font-bold text-[#2E6F40] tabular-nums">
                        {activity.time} · {activity.duration}
                      </span>
                      <span className="text-base font-extrabold text-[#D97736] tabular-nums">
                        {formatIdr(activity.pricePerPersonIdr)} / tamu
                      </span>
                    </div>

                    <h2 className="text-lg font-bold text-[#121E17]">{activity.title}</h2>
                    <p className="text-[15px] text-[#414944] leading-relaxed">
                      {activity.description}
                    </p>

                    <div className="pt-2 border-t border-[#1E4B38]/6 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-semibold text-[#414944]">
                      <span>{activity.location}</span>
                      <span aria-hidden="true">·</span>
                      <span className="tabular-nums">
                        Jalan {activity.distanceKm.toString().replace('.', ',')} km
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className={activity.elderFriendly ? 'text-[#2E6F40]' : 'text-[#753400]'}>
                        {activity.elderFriendly
                          ? 'Ramah Lansia & Keluarga'
                          : 'Tangga Bukit Bertahap'}
                      </span>
                    </div>

                    <p className="text-xs text-[#414944]">
                      <span className="font-semibold text-[#1C2820]">Saran pemandu:</span>{' '}
                      {activity.guideTip}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <aside className="lg:col-span-5 lg:sticky lg:top-24">
          <div className="highland-card p-6 space-y-5">
            <div className="space-y-1">
              <p className="text-xs font-semibold text-[#2E6F40]">Kalkulator Jadwal Langsung</p>
              <h2 className="text-xl font-bold text-[#121E17]">Rencana Harian Lereng Asri</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="itin-date"
                  className="block text-sm font-semibold text-[#1C2820] mb-1.5"
                >
                  Tanggal Kunjungan
                </label>
                <div className="relative">
                  <Calendar
                    className="w-4 h-4 text-[#1E4B38] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                    aria-hidden="true"
                  />
                  <input
                    id="itin-date"
                    type="date"
                    value={visitDate}
                    onChange={(e) => setVisitDate(e.target.value)}
                    className="highland-input w-full pl-9 pr-3 text-sm font-semibold tabular-nums"
                  />
                </div>
              </div>

              <div>
                <span className="block text-sm font-semibold text-[#1C2820] mb-1.5">
                  Jumlah Peserta
                </span>
                <div className="flex items-center justify-between highland-input px-2">
                  <button
                    type="button"
                    onClick={() => setGuests((g) => Math.max(1, g - 1))}
                    aria-label="Kurangi peserta"
                    className="min-h-[40px] min-w-[40px] flex items-center justify-center text-[#1E4B38] cursor-pointer"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="text-sm font-bold text-[#121E17] tabular-nums">
                    {guests} orang
                  </span>
                  <button
                    type="button"
                    onClick={() => setGuests((g) => Math.min(16, g + 1))}
                    aria-label="Tambah peserta"
                    className="min-h-[40px] min-w-[40px] flex items-center justify-center text-[#1E4B38] cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            <div className="border-t border-b border-[#1E4B38]/8 py-4 space-y-2.5">
              {selectedActivities.length === 0 ? (
                <p className="text-sm text-[#414944]">
                  Pilih minimal satu kegiatan di sebelah kiri untuk menghitung estimasi kunjungan.
                </p>
              ) : (
                selectedActivities.map((act) => (
                  <div
                    key={act.id}
                    className="flex items-center justify-between gap-3 text-sm"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="text-xs font-bold text-[#2E6F40] tabular-nums shrink-0">
                        {act.time.replace(' WIB', '')}
                      </span>
                      <span className="font-semibold text-[#1C2820] truncate">{act.title}</span>
                    </div>
                    <span className="font-bold text-[#121E17] tabular-nums shrink-0">
                      {formatIdr(act.pricePerPersonIdr * guests)}
                    </span>
                  </div>
                ))
              )}
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between text-[#414944]">
                <span className="inline-flex items-center gap-1.5">
                  <Footprints className="w-4 h-4 text-[#2E6F40]" aria-hidden="true" />
                  Total jarak tempuh jalan
                </span>
                <span className="font-bold text-[#121E17] tabular-nums">
                  {summary.totalDistance} km
                </span>
              </div>
              <div className="flex items-center justify-between text-[#414944]">
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-[#2E6F40]" aria-hidden="true" />
                  Ritme perjalanan
                </span>
                <span className="font-semibold text-[#121E17]">{summary.paceLabel}</span>
              </div>
            </div>

            <div className="pt-2 flex items-baseline justify-between">
              <span className="text-sm font-semibold text-[#414944]">
                Estimasi Total Rombongan
              </span>
              <span className="text-2xl font-extrabold text-[#D97736] tabular-nums">
                {formatIdr(summary.totalIdr)}
              </span>
            </div>

            {savedFeedback && (
              <div
                role="status"
                className="p-3 rounded-lg bg-[#E9F7EA] border border-[#2E6F40]/25 text-sm font-semibold text-[#1E4B38] flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>Tersimpan di Rencana Saya! Buka kapan saja untuk meninjau.</span>
              </div>
            )}

            <div className="space-y-3 pt-1">
              <button
                type="button"
                disabled={selectedActivities.length === 0}
                onClick={handleSaveItinerary}
                className="w-full min-h-[48px] px-5 py-3 rounded-lg bg-[#1E4B38] hover:bg-[#023423] disabled:opacity-45 text-white text-sm font-semibold tactile-press cursor-pointer"
              >
                Simpan ke Rencana Saya
              </button>

              <button
                type="button"
                disabled={selectedActivities.length === 0}
                onClick={() =>
                  onOpenWhatsApp('Pemesanan Jadwal Harian Desa', buildWhatsAppSummary())
                }
                className="w-full min-h-[48px] px-5 py-3 rounded-full bg-[#25D366] hover:bg-[#1DA851] disabled:opacity-45 text-white text-sm font-semibold flex items-center justify-center gap-2 tactile-press cursor-pointer"
              >
                <WhatsAppIcon className="w-5 h-5" />
                <span>Kirim Jadwal via WhatsApp</span>
              </button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};
