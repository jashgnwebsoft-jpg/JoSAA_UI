// import i18next from 'i18next';
// import { getStorage } from 'minimal-shared/utils';
// import resourcesToBackend from 'i18next-resources-to-backend';
// import LanguageDetector from 'i18next-browser-languagedetector';
// import { initReactI18next, I18nextProvider as Provider } from 'react-i18next';

// import { i18nOptions, fallbackLng } from './locales-config';
// // ----------------------------------------------------------------------
// /**
//  * [1] localStorage
//  * Auto detection:
//  * const lng = getStorage('i18nextLng')
//  */
// const lng = getStorage('i18nextLng', fallbackLng) as string;
// i18next
//   .use(LanguageDetector)
//   .use(initReactI18next)
//   .use(resourcesToBackend((lang: string, ns: string) => import(`./langs/${lang}/${ns}.json`)))
//   .init({ ...i18nOptions(lng), detection: { caches: ['localStorage'] } });
// // ----------------------------------------------------------------------
// type Props = {
//   children: React.ReactNode;
// };
// export function I18nProvider({ children }: Props) {
//   return <Provider i18n={i18next}>{children}</Provider>;
// }

// ---------------------------------------------------------

import type { PropsWithChildren } from 'react';

import i18next from 'i18next';
import HttpBackend from 'i18next-http-backend';
import { I18nextProvider, initReactI18next } from 'react-i18next';

import { Config } from '@core/config';
import { JWT_STORAGE_KEY } from '../../auth/context/jwt';

const apiBase = `${Config.apiBaseUrl}`;
export const fallbackLng = 'en';
export const languages = ['en', 'fr', 'vi', 'cn', 'ar'];
export const defaultNS = 'common';
const lng = 'en';
const accessToken = localStorage.getItem(JWT_STORAGE_KEY);

i18next
  .use(HttpBackend)
  .use(initReactI18next) // optional: only if using with React
  .init({
    lng: lng,
    fallbackLng: 'en',
    ns: ['common'],
    defaultNS: 'common',

    backend: {
      loadPath: `${apiBase}/api/Master/Locale/${lng}/{{ns}}.json`, // ASP.NET Core API
      requestOptions: {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      },
    },

    interpolation: {
      escapeValue: false, // React already protects from XSS
    },
  });

type Props = {} & PropsWithChildren;

export function Provider({ children }: Props) {
  return <I18nextProvider i18n={i18next}>{children}</I18nextProvider>;
}

export function i18nOptions(lang = fallbackLng, ns = defaultNS) {
  return {
    debug: true,
    lang,
    fallbackLng,
    ns,
    defaultNS,
    fallbackNS: defaultNS,
    supportedLngs: languages,
  };
}
