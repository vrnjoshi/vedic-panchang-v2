export interface DualName {
  hi: string;
  en: string;
}

export interface CelestialAngles {
  sunTropical: number;
  moonTropical: number;
  sunSidereal: number;
  moonSidereal: number;
  relative: number;
  ayanamsa: number;
  moonLatitude?: number;
}

export interface TithiInfo {
  index: number;
  name: string;
  nameEn: string;
  number: number;
  paksha: string;
  pakshaEn: string;
  progressPercent: number;
}

export interface NakshatraInfo {
  index: number;
  name: string;
  nameEn: string;
  lord: string;
  lordEn: string;
  pada: number;
  degrees: number;
}

export interface FestivalInfo {
  name: string;
  hindiName: string;
  maas: string;
  isShukla: boolean;
  tithiNumber: number;
  icon: string;
  description: string;
  colors: string;
}

export interface PanchangData {
  date: Date;
  angles: CelestialAngles;
  tithi: TithiInfo;
  paksha: string;
  pakshaEn: string;
  nakshatra: NakshatraInfo;
  maas: string;
  maasEn: string;
  vaar: string;
  vaarEn: string;
  samvatsar: string;
  samvatsarEn: string;
  moonRashi: string;
  moonRashiEn: string;
  sunRashi: string;
  sunRashiEn: string;
  yoga: string;
  yogaEn: string;
  karana: string;
  karanaEn: string;
  activeFestival: FestivalInfo | null;
}

export type CameraViewPreset = 'free' | 'top' | 'earth' | 'sun';

export type Language = 'hi' | 'en';
