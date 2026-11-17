import React, { useEffect, useState } from 'react';
import { Accessibility, Check, Compass, MapPin, Navigation } from 'lucide-react';
import {
  PACKING_CHECKLIST,
  VILLAGE_COORDINATOR,
  VILLAGE_LANDMARKS,
} from '../data/villageData';
import { VillageLandmark } from '../types/village';
import { WhatsAppIcon } from './VillageArt';

interface VillageGuideScreenProps {
  onOpenWhatsApp: (subject: string, message: string) => void;
}

const STORAGE_KEY = 'lereng_asri_packing_v1';

export const VillageGuideScreen: React.FC<VillageGuideScreenProps> = ({ onOpenWhatsApp }) => {
  const [activeLandmark, setActiveLandmark] = useState<VillageLandmark>(VILLAGE_LANDMARKS[0]);
  const [checkedItems, setCheckedItems] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? (JSON.parse(saved) as string[]) : ['pack-jacket', 'pack-shoes'];
    } catch {
      return ['pack-jacket', 'pack-shoes'];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(checkedItems));
    } catch {
      // Abaikan error penyimpanan lokal
    }
  }, [checkedItems]);

  const togglePacking = (id: string) => {
    setCheckedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-10 pb-10 pt-4 md:pt-8">
      <div className="space-y-2 max-w-2xl">
        <p className="text-sm font-semibold text-[#2E6F40]">Peta Desa, Akses &amp; Etika Wisata</p>
        <h1 className="text-[28px] leading-[36px] md:text-[36px] md:leading-[44px] font-extrabold text-[#121E17] [text-wrap:balance]">
          Jelajahi jalur dan klaster dusun di Lereng Asri.
        </h1>
        <p className="text-base text-[#414944]">
          Ketuk titik lokasi pada peta untuk memeriksa ketinggian tempat, waktu tempuh jalan kaki
          dari gerbang kedatangan, serta catatan aksesibilitas bagi lansia.
        </p>
      </div>

      {/* Peta Topografi Interaktif + Detail Titik */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <div className="lg:col-span-7 highland-card p-4 md:p-5 flex flex-col justify-between gap-4">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-lg font-bold text-[#121E17]">Peta Jalur Pegunungan Desa</h2>
            <span className="text-xs font-semibold text-[#414944] tabular-nums">
              1.310 – 1.480 mdpl
            </span>
          </div>

          <div className="relative w-full aspect-[16/11] rounded-xl overflow-hidden border border-[#1E4B38]/12 bg-[#EAF5EB]">
            <svg
              viewBox="0 0 100 70"
              className="w-full h-full"
              role="img"
              aria-label="Peta topografi interaktif jalur wisata dan klaster Desa Lereng Asri"
            >
              <rect width="100" height="70" fill="#E9F7EA" />
              <path d="M0 55 Q35 42 65 48 T100 35 L100 70 L0 70 Z" fill="#D8ECDC" />
              <path d="M52 0 Q68 24 100 30 L100 0 Z" fill="#CBE3D0" />
              <path d="M64 0 Q78 16 100 20 L100 0 Z" fill="#B8D8C0" />

              <path
                d="M14 25 Q26 38 25 46 T16 70"
                stroke="#7BB8A2"
                strokeWidth="1.2"
                fill="none"
              />

              <path
                d="M20 74 L36 62 L50 72 L62 52 L78 22"
                transform="scale(1, 0.72)"
                stroke="#C68B4B"
                strokeWidth="1.1"
                strokeDasharray="2 1.5"
                fill="none"
              />
              <path
                d="M20 74 L25 44 L62 52"
                transform="scale(1, 0.72)"
                stroke="#2E6F40"
                strokeWidth="1"
                strokeDasharray="1.8 1.4"
                fill="none"
              />

              <g transform="translate(8, 10)">
                <circle cx="0" cy="0" r="4.5" fill="#FFFFFF" stroke="#1E4B38" strokeWidth="0.5" />
                <text
                  x="0"
                  y="1.2"
                  textAnchor="middle"
                  fontSize="3.2"
                  fontWeight="700"
                  fill="#1E4B38"
                >
                  U
                </text>
              </g>
            </svg>

            {VILLAGE_LANDMARKS.map((lm) => {
              const isSelected = activeLandmark.id === lm.id;
              return (
                <button
                  key={lm.id}
                  type="button"
                  onClick={() => setActiveLandmark(lm)}
                  style={{ left: `${lm.x}%`, top: `${lm.y}%` }}
                  aria-pressed={isSelected}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 min-h-[40px] px-2.5 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 whitespace-nowrap shadow-md transition-transform cursor-pointer ${
                    isSelected
                      ? 'bg-[#D97736] text-white scale-105 z-20 ring-2 ring-white'
                      : 'bg-[#1E4B38] text-white hover:bg-[#023423] z-10'
                  }`}
                >
                  <MapPin className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                  <span className="hidden sm:inline">{lm.name.split(' ')[0]}</span>
                </button>
              );
            })}
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-[#414944]">
            <span className="inline-flex items-center gap-1.5">
              <span className="w-3 h-0.5 bg-[#2E6F40] inline-block" aria-hidden="true" />
              Jalur batu datar tanpa tangga
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="w-3 h-0.5 bg-[#C68B4B] inline-block" aria-hidden="true" />
              Jalur terasering &amp; tangga bukit
            </span>
          </div>
        </div>

        {/* Kartu Detail Titik Lokasi */}
        <div className="lg:col-span-5 highland-card p-6 flex flex-col justify-between gap-5">
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-bold text-[#2E6F40]">{activeLandmark.category}</span>
              <span className="text-xs font-bold text-[#D97736] tabular-nums">
                {activeLandmark.elevation}
              </span>
            </div>

            <h2 className="text-2xl font-bold text-[#121E17]">{activeLandmark.name}</h2>
            <p className="text-base text-[#414944] leading-relaxed">{activeLandmark.summary}</p>

            <div className="divide-y divide-[#1E4B38]/8 border-t border-b border-[#1E4B38]/8">
              <div className="py-3 flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#4E9F3D]/12 flex items-center justify-center shrink-0">
                  <Compass className="w-4 h-4 text-[#2E6F40]" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#414944]">Jarak dari Gerbang Utama</p>
                  <p className="text-sm font-bold text-[#121E17]">{activeLandmark.walkFromBase}</p>
                </div>
              </div>

              <div className="py-3 flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#4E9F3D]/12 flex items-center justify-center shrink-0">
                  <Accessibility className="w-4 h-4 text-[#2E6F40]" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#414944]">Akses Jalur &amp; Mobilitas</p>
                  <p className="text-sm font-bold text-[#121E17]">
                    {activeLandmark.accessibility}
                  </p>
                </div>
              </div>
            </div>

            <p className="text-sm text-[#414944]">
              <span className="font-bold text-[#121E17]">Catatan pemandu:</span>{' '}
              {activeLandmark.guideTip}
            </p>
          </div>

          <button
            type="button"
            onClick={() =>
              onOpenWhatsApp(
                `Tanya Jalur: ${activeLandmark.name}`,
                `Halo Pak Hendra, saya ingin menanyakan kondisi jalur menuju ${activeLandmark.name} (${activeLandmark.elevation}) serta apakah layanan mobil listrik tersedia untuk lansia.`
              )
            }
            className="w-full min-h-[48px] px-5 py-3 rounded-full bg-[#25D366] hover:bg-[#1DA851] text-white text-sm font-semibold flex items-center justify-center gap-2 tactile-press cursor-pointer"
          >
            <WhatsAppIcon className="w-5 h-5" />
            <span>Tanya Pemandu Tentang Titik Ini</span>
          </button>
        </div>
      </section>

      {/* Daftar Perlengkapan + Arah Kedatangan & Koordinator */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-7 highland-card p-6 space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-[#121E17]">Daftar Bawaan ke Pegunungan</h2>
              <p className="text-sm text-[#414944]">
                Otomatis tersimpan di perangkat ini untuk persiapan kunjungan Anda.
              </p>
            </div>
            <span className="text-sm font-bold text-[#2E6F40] tabular-nums">
              {checkedItems.length} / {PACKING_CHECKLIST.length} siap
            </span>
          </div>

          <div className="divide-y divide-[#1E4B38]/8">
            {PACKING_CHECKLIST.map((item) => {
              const checked = checkedItems.includes(item.id);
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => togglePacking(item.id)}
                  role="checkbox"
                  aria-checked={checked}
                  className="w-full py-3.5 flex items-start gap-3.5 text-left cursor-pointer"
                >
                  <div
                    aria-hidden="true"
                    className={`mt-0.5 w-6 h-6 rounded-[6px] border-2 flex items-center justify-center shrink-0 transition-colors ${
                      checked
                        ? 'bg-[#1E4B38] border-[#1E4B38] text-white'
                        : 'bg-white border-[#1E4B38]'
                    }`}
                  >
                    {checked && <Check className="w-4 h-4 stroke-[3]" />}
                  </div>
                  <div>
                    <p
                      className={`text-base font-semibold ${
                        checked ? 'line-through text-[#414944]' : 'text-[#121E17]'
                      }`}
                    >
                      {item.label}
                    </p>
                    <p className="text-sm text-[#414944]">{item.note}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="lg:col-span-5 space-y-6">
          <div className="highland-card p-6 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#4E9F3D]/12 flex items-center justify-center shrink-0">
                <Navigation className="w-4 h-4 text-[#2E6F40]" aria-hidden="true" />
              </div>
              <h2 className="text-xl font-bold text-[#121E17]">Akses Menuju Lereng Asri</h2>
            </div>

            <div className="space-y-3 text-[15px] text-[#414944] leading-relaxed">
              <p>
                <strong className="text-[#121E17]">Mobil atau Shuttle (45 mnt dari kota):</strong>{' '}
                Ikuti jalan beraspal ke arah utara melewati Gerbang Pinus Km 12. Parkir berkanopi
                dan antar-jemput mobil listrik tersedia di Gerbang Selamat Datang.
              </p>
              <p>
                <strong className="text-[#121E17]">Etika Ramah Lingkungan Desa:</strong> Mohon
                menjaga ketenangan setelah pukul 21:30 WIB, gunakan botol isi ulang di stasiun mata
                air untuk mengurangi plastik sekali pakai, serta izin sebelum memotret warga.
              </p>
            </div>
          </div>

          <div className="highland-card p-6 space-y-4 bg-[#FFFFFF]">
            <div>
              <p className="text-xs font-bold text-[#2E6F40]">Meja Koordinasi Desa</p>
              <h3 className="text-lg font-bold text-[#121E17] mt-0.5">
                {VILLAGE_COORDINATOR.name}
              </h3>
              <p className="text-sm text-[#414944]">
                {VILLAGE_COORDINATOR.role} · {VILLAGE_COORDINATOR.responseWindow}
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                onOpenWhatsApp(
                  'Koordinasi Rute & Penjemputan Desa',
                  'Halo Pak Hendra, kami berencana berkunjung ke Desa Wisata Lereng Asri dan membutuhkan info rute parkir serta antar-jemput mobil listrik.'
                )
              }
              className="w-full min-h-[48px] px-5 py-3 rounded-full bg-[#25D366] hover:bg-[#1DA851] text-white text-sm font-semibold flex items-center justify-center gap-2 tactile-press cursor-pointer"
            >
              <WhatsAppIcon className="w-5 h-5" />
              <span>Koordinasi Kedatangan via WhatsApp</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
