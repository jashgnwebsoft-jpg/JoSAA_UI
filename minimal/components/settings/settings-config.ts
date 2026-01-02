import type { SettingsState } from './types';

import { CONFIG } from '@/global-config';
import { themeConfig } from '@minimal/theme/theme-config';

// ----------------------------------------------------------------------

export const SETTINGS_STORAGE_KEY: string = 'app-settings';

export const defaultSettings: SettingsState = {
  mode: themeConfig.defaultMode,
  direction: themeConfig.direction,
  contrast: 'high',
  navLayout: 'horizontal',
  primaryColor: 'default',
  navColor: 'apparent',
  compactLayout: true,
  fontSize: 16,
  fontFamily: themeConfig.fontFamily.primary,
  version: CONFIG.appVersion,
};
