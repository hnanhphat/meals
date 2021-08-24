import i18n from "i18next";
import detector from "i18next-browser-languagedetector";
import { reactI18nextModule } from "react-i18next";

import translationEN from "./locales/translation.en.json";
import translationVN from "./locales/translation.vn.json";

// the translations
const resources = {
  en: {
    translation: translationEN,
  },
  vn: {
    translation: translationVN,
  },
};

i18n
  .use(detector)
  .use(reactI18nextModule)
  .init({
    resources,
    lng: "en",
    fallbackLng: "vn",

    keySeparator: false,

    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
