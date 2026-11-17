import React, { useState } from 'react';
import { ArrowRight, MapPin, ShieldCheck, Sun, Trees } from 'lucide-react';
import {
  HOST_STORIES,
  VILLAGE_COORDINATOR,
  VILLAGE_PACKAGES,
  formatIdr,
} from '../data/villageData';
import { PackageCategory, ScreenId, VillagePackage } from '../types/village';
import { VillageArt, WhatsAppIcon } from './VillageArt';

interface ExploreScreenProps {
  onSelectPackage: (pkg: VillagePackage) => void;
  onNavigate: (screen: ScreenId) => void;
  onOpenWhatsApp: (subject: string, message: string) => void;
}

const CATEGORY_FILTERS: { id: PackageCategory; label: string }[] = [
  { id: 'all', label: 'Semua Aktivitas' },
  { id: 'agro', label: 'Agro & Panen' },
  { id: 'treks', label: 'Jalur Puncak' },
  { id: 'family', label: 'Ramah Keluarga' },
  { id: 'craft', label: 'Kriya Budaya' },
];

export const ExploreScreen: React.FC<ExploreScreenProps> = ({
  onSelectPackage,
  onNavigate,
  onOpenWhatsApp,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<PackageCategory>('all');

  const filteredPackages =
    selectedCategory === 'all'
      ? VILLAGE_PACKAGES
      : VILLAGE_PACKAGES.filter((item) => item.category === selectedCategory);

  return (
    <div className="space-y-12 md:space-y-16 pb-10">
      {/* Bagian Hero: Tata Letak Editorial 2 Kolom */}
      <section className="pt-4 md:pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          <div className="lg:col-span-6 flex flex-col justify-between py-2">
            <div className="space-y-5">
              <p className="text-sm font-semibold text-[#2E6F40] flex items-center gap-2">
                <MapPin className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>Desa Wisata Lereng Asri · {VILLAGE_COORDINATOR.elevation}</span>
              </p>

              <h1 className="text-[32px] leading-[40px] md:text-[42px] md:leading-[50px] font-extrabold text-[#121E17] [text-wrap:balance] max-w-xl">
                Menapak tanah pegunungan berkabut dan nikmati hangatnya suasana desa.
              </h1>

              <p className="text-base md:text-lg text-[#414944] leading-relaxed max-w-xl">
                Susuri kebun kopi Arabika yang teduh bersama petani lokal, bermalam di pondok bambu
                berair hangat alami, dan jelajahi jalur desa yang nyaman bagi keluarga, lansia,
                maupun pendaki mandiri.
              </p>
            </div>

            <div className="pt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                type="button"
                onClick={() => onNavigate('homestays')}
                className="min-h-[48px] px-6 py-3 rounded-lg bg-[#1E4B38] hover:bg-[#023423] text-white text-base font-semibold flex items-center justify-center gap-2 whitespace-nowrap shrink-0 tactile-press cursor-pointer"
              >
                <span>Lihat Homestay Desa</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={() =>
                  onOpenWhatsApp(
                    'Tanya Paket Wisata Desa',
                    'Halo Pak Hendra, saya ingin bertanya tentang paket wisata dan ketersediaan homestay di Lereng Asri.'
                  )
                }
                className="min-h-[48px] px-6 py-3 rounded-full bg-[#25D366] hover:bg-[#1DA851] text-white text-base font-semibold flex items-center justify-center gap-2 whitespace-nowrap shrink-0 tactile-press cursor-pointer"
              >
                <WhatsAppIcon className="w-5 h-5" />
                <span>Chat Pemandu Desa</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="highland-card overflow-hidden h-full min-h-[260px] lg:min-h-[380px] flex flex-col">
              <div className="relative flex-1 min-h-[240px]">
                <VillageArt
                  variant="hero-terraces"
                  className="w-full h-full object-cover"
                  label="Kabut pagi menyelimuti terasering sawah dan perkampungan bambu Lereng Asri"
                />
                <div className="absolute inset-x-0 bottom-0 p-4 md:p-5 bg-gradient-to-t from-[#121E17]/80 via-[#121E17]/40 to-transparent text-white">
                  <p className="text-sm font-semibold">
                    Kabut pagi di Klaster Terasering Bawah · 06:15 WIB
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Strip Informasi Kondisi Desa 4 Kolom */}
        <div className="mt-6 highland-card p-4 md:p-5 grid grid-cols-2 lg:grid-cols-4 gap-4 divide-y-0 lg:divide-x divide-[#1E4B38]/10">
          <div className="flex items-start gap-3 pr-2">
            <div className="w-8 h-8 rounded-full bg-[#4E9F3D]/12 flex items-center justify-center shrink-0 mt-0.5">
              <Sun className="w-4 h-4 text-[#2E6F40]" aria-hidden="true" />
            </div>
            <div>
              <p className="text-xs font-semibold text-[#414944]">Cuaca Pagi</p>
              <p className="text-base font-bold text-[#121E17] tabular-nums">18°C Berkabut</p>
            </div>
          </div>

          <div className="flex items-start gap-3 lg:pl-4 pr-2">
            <div className="w-8 h-8 rounded-full bg-[#4E9F3D]/12 flex items-center justify-center shrink-0 mt-0.5">
              <Trees className="w-4 h-4 text-[#2E6F40]" aria-hidden="true" />
            </div>
            <div>
              <p className="text-xs font-semibold text-[#414944]">Musim Panen</p>
              <p className="text-base font-bold text-[#D97736]">Puncak Kopi Arabika</p>
            </div>
          </div>

          <div className="flex items-start gap-3 lg:pl-4 pr-2">
            <div className="w-8 h-8 rounded-full bg-[#4E9F3D]/12 flex items-center justify-center shrink-0 mt-0.5">
              <ShieldCheck className="w-4 h-4 text-[#2E6F40]" aria-hidden="true" />
            </div>
            <div>
              <p className="text-xs font-semibold text-[#414944]">Kondisi Jalur Bukit</p>
              <p className="text-base font-bold text-[#121E17]">Cerah &amp; Kering</p>
            </div>
          </div>

          <div className="flex items-start gap-3 lg:pl-4">
            <div className="w-8 h-8 rounded-full bg-[#4E9F3D]/12 flex items-center justify-center shrink-0 mt-0.5">
              <MapPin className="w-4 h-4 text-[#2E6F40]" aria-hidden="true" />
            </div>
            <div>
              <p className="text-xs font-semibold text-[#414944]">Pasar Tani Berikutnya</p>
              <p className="text-base font-bold text-[#121E17] tabular-nums">Sabtu 06:00 WIB</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pilihan Paket Wisata & Filter */}
      <section aria-labelledby="experiences-heading" className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-1.5">
            <h2
              id="experiences-heading"
              className="text-2xl md:text-[32px] md:leading-[40px] font-bold text-[#121E17]"
            >
              Pengalaman Wisata Terpandu
            </h2>
            <p className="text-base text-[#414944] max-w-2xl">
              Dipandu langsung oleh petani koperasi, pemandu jalur puncak, dan perajin bambu desa.
              Pilih satu kegiatan atau susun jadwal seharian penuh.
            </p>
          </div>

          <button
            type="button"
            onClick={() => onNavigate('experiences')}
            className="min-h-[44px] px-4 py-2 rounded-lg border-[1.5px] border-[#1E4B38] text-[#1E4B38] hover:bg-[#E9F7EA] text-sm font-semibold whitespace-nowrap shrink-0 self-start md:self-auto tactile-press cursor-pointer"
          >
            Susun Jadwal Seharian
          </button>
        </div>

        {/* Filter Kategori */}
        <div
          role="group"
          aria-label="Filter pengalaman desa berdasarkan kategori"
          className="flex flex-wrap items-center gap-2.5"
        >
          {CATEGORY_FILTERS.map((cat) => {
            const active = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                aria-pressed={active}
                className={`min-h-[44px] px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap shrink-0 tactile-press cursor-pointer border ${
                  active
                    ? 'bg-[#1E4B38] text-white border-[#1E4B38]'
                    : 'bg-[#F9F8F3] text-[#1E4B38] border-[#1E4B38]/40 hover:border-[#1E4B38] hover:bg-[#E9F7EA]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Grid Kartu Paket */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredPackages.map((pkg) => (
            <article
              key={pkg.id}
              className="highland-card-interactive overflow-hidden flex flex-col"
            >
              <div className="relative h-52 sm:h-56 overflow-hidden">
                <VillageArt
                  variant={pkg.art}
                  className="w-full h-full object-cover"
                  label={pkg.title}
                />
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between gap-4">
                <div className="space-y-2.5">
                  <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-[#414944]">
                    <span className="text-[#2E6F40]">{pkg.categoryLabel}</span>
                    <span aria-hidden="true">·</span>
                    <span className="tabular-nums">{pkg.duration}</span>
                    <span aria-hidden="true">·</span>
                    <span>{pkg.difficulty}</span>
                  </div>

                  <h3 className="text-xl font-bold text-[#121E17] leading-snug">{pkg.title}</h3>
                  <p className="text-[15px] text-[#414944] leading-relaxed">{pkg.summary}</p>
                </div>

                <div className="pt-4 border-t border-[#1E4B38]/8 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-lg font-extrabold text-[#D97736] tabular-nums">
                      {formatIdr(pkg.priceIdr)}{' '}
                      <span className="text-xs font-semibold text-[#414944]">
                        / {pkg.unitLabel}
                      </span>
                    </p>
                    <p className="text-xs font-semibold text-[#2E6F40] tabular-nums">
                      Sisa {pkg.slotsLeft} slot · Pemandu: {pkg.guideName}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => onSelectPackage(pkg)}
                    className="min-h-[48px] px-5 py-2.5 rounded-lg bg-[#1E4B38] hover:bg-[#023423] text-white text-sm font-semibold whitespace-nowrap shrink-0 tactile-press cursor-pointer"
                  >
                    Lihat &amp; Pesan
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Cerita Pengunjung */}
      <section aria-labelledby="voices-heading" className="space-y-6">
        <div className="space-y-1.5">
          <h2 id="voices-heading" className="text-2xl font-bold text-[#121E17]">
            Kesan Pengunjung Desa
          </h2>
          <p className="text-base text-[#414944]">
            Cerita nyata dari keluarga dan wisatawan yang baru saja menikmati jalur terasering kami.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {HOST_STORIES.map((story) => (
            <blockquote key={story.id} className="highland-card p-6 flex flex-col justify-between gap-4">
              <p className="text-base text-[#1C2820] leading-relaxed">“{story.quote}”</p>
              <footer className="pt-3 border-t border-[#1E4B38]/8 flex flex-wrap items-center justify-between gap-2 text-sm">
                <div>
                  <span className="font-bold text-[#121E17]">{story.author}</span>
                  <span className="text-[#414944]"> · {story.role}</span>
                </div>
                <span className="text-xs font-semibold text-[#2E6F40]">{story.context}</span>
              </footer>
            </blockquote>
          ))}
        </div>
      </section>
    </div>
  );
};
