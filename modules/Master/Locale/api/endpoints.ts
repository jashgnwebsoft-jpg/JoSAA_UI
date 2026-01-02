import { CONFIG } from 'src/global-config';

const apiBase = `${CONFIG.apiBaseUrl}`;

export const endpoints = {
  create: `${apiBase}/api/Master/Locale`,
  list: `${apiBase}/api/Master/Locale/list`,
  update: `${apiBase}/api/Master/Locale`,
  localeJson: `${apiBase}/api/Master/Locale/{{lng}}/{{ns}}.json`,
  TLanguageOptions: (tLanguage: string) =>
    `${apiBase}/api/MST_HardcodeCombo/selectByComboName/${tLanguage}`,
};
