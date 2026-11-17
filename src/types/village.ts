export type ScreenId = 'explore' | 'homestays' | 'experiences' | 'guide';

export type ArtVariant =
  | 'hero-terraces'
  | 'bamboo-lodge'
  | 'coffee-harvest'
  | 'sunrise-ridge'
  | 'bamboo-craft'
  | 'herbal-spring'
  | 'family-rice';

export type PackageCategory = 'all' | 'agro' | 'treks' | 'craft' | 'family';

export interface AmenityItem {
  label: string;
  detail: string;
  icon: 'coffee' | 'mountain' | 'flame' | 'wifi' | 'accessibility' | 'utensils' | 'droplets' | 'compass';
}

export interface VillagePackage {
  id: string;
  title: string;
  category: Exclude<PackageCategory, 'all'>;
  categoryLabel: string;
  seasonalTag?: string;
  summary: string;
  description: string;
  duration: string;
  distance: string;
  elevation: string;
  difficulty: 'Mudah · Semua Usia' | 'Sedang' | 'Jalan Santai';
  priceIdr: number;
  unitLabel: string;
  slotsLeft: number;
  guideName: string;
  guideRole: string;
  art: ArtVariant;
  highlights: AmenityItem[];
  included: string[];
}

export interface Homestay {
  id: string;
  name: string;
  hostName: string;
  hostYears: number;
  cluster: string;
  summary: string;
  description: string;
  pricePerNightIdr: number;
  maxGuests: number;
  bedrooms: number;
  roomsLeft: number;
  elevation: string;
  stepFree: boolean;
  hotSpring: boolean;
  mountainView: boolean;
  familyFriendly: boolean;
  breakfastIncluded: boolean;
  art: ArtVariant;
  amenities: AmenityItem[];
  houseNotes: string[];
}

export interface ItineraryActivity {
  id: string;
  time: string;
  title: string;
  location: string;
  duration: string;
  distanceKm: number;
  effort: 'Landai' | 'Sedang';
  elderFriendly: boolean;
  pricePerPersonIdr: number;
  description: string;
  guideTip: string;
  art: ArtVariant;
}

export interface VillageLandmark {
  id: string;
  name: string;
  elevation: string;
  walkFromBase: string;
  accessibility: string;
  category: 'Pos Awal' | 'Puncak Pandang' | 'Homestay' | 'Agrowisata' | 'Mata Air';
  x: number;
  y: number;
  summary: string;
  guideTip: string;
}

export interface HostStory {
  id: string;
  quote: string;
  author: string;
  role: string;
  context: string;
}

export interface ChecklistItem {
  id: string;
  label: string;
  note: string;
}

export interface BookingRecord {
  id: string;
  type: 'homestay' | 'package' | 'itinerary';
  title: string;
  date: string;
  guests: number;
  nights?: number;
  totalIdr: number;
  guestName: string;
  phone: string;
  notes: string;
  createdAt: string;
}
