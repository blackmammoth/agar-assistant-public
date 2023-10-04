// We enumerate all dictionaries here for better linting and typescript support
// We also get the default import for cleaner types
const dictionaries = {
  
    en: () => import('./dictionaries/en.json').then((module) => module.default),
    am: () => import('./dictionaries/am.json').then((module) => module.default),
    om: () => import('./dictionaries/om.json').then((module) => module.default),
  }
  
  export const getDictionary = async (locale) =>
    dictionaries[locale]?.()