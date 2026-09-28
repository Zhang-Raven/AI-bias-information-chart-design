
import { AppConfig } from './s1-types';

export const CONFIG: AppConfig = {
  userCount: 0, // Not used directly now, inferred from data
  radius: 320,
  baseSize: 50,
  hoverSize: 100,
  animSpeed: 0.06,
  autoRotateSpeed: 0.5,
  uniqueImageCount: 30
};

// Minimum distance between node centers to prevent visual overlap
export const MIN_NODE_SPACING = CONFIG.baseSize * 2.0;

export const NAME_PREFIXES = [];
export const NAME_SUFFIXES = [];
