import { getCountryVariant, Language } from 'utils/locales';

export interface DictionaryDataObject {
  source: Language;
  main: Language;
  categories: CategoryDataObject[];
  phrases: Record<string, PhraseDataObject>;
}

export interface CategoryDataObject {
  id: string;
  name: {
    // uk
    source: string;
    // cz, sk, pl
    main: string;
  };
  description: string;
  phrases: string[];
}

export interface PhraseDataObject {
  id: string;
  main: TranslationDataObject;
  source: TranslationDataObject;
  image_url: null | string;
}

export interface TranslationDataObject {
  sound_url: string;
  translation: string;
  transcription: string;
}

export interface Category2 {
  nameMain: string;
  nameUk: string;
  translations: Phrase2[];
}

export class Phrase2 {
  ukTranslation: string;
  ukTranscription: string;
  ukSoundUrl: string;
  otherTranslation: string;
  otherTranscription: string;
  otherSoundUrl: string;
  imageUrl: string | null;

  constructor(phraseObject: PhraseDataObject) {
    // To do later: generate transcription automatically here
    this.ukTranslation = phraseObject.source.translation;
    this.ukTranscription = phraseObject.source.transcription;
    this.ukSoundUrl = phraseObject.source.sound_url;
    this.otherTranslation = phraseObject.main.translation;
    this.otherTranscription = phraseObject.main.transcription;
    this.otherSoundUrl = phraseObject.main.sound_url;
    this.imageUrl = phraseObject.image_url;
  }

  getTranslation = (language: Language) => {
    if (language === 'uk') {
      return this.ukTranslation;
    } else {
      return this.otherTranslation;
    }
  };

  getTranscription = (language: Language) => {
    if (language === 'uk') {
      return this.ukTranscription;
    } else {
      return this.otherTranscription;
    }
  };

  getSoundUrl = (language: Language) => {
    if (language === 'uk') {
      return this.ukSoundUrl;
    } else {
      return this.otherSoundUrl;
    }
  };
}

const KIDS_CATEGORY_ID = 'recSHyEn6N0hAqUBp';

const parseCategory = (categoryObject: CategoryDataObject, dictionaryObject: DictionaryDataObject): Category2 => {
  return {
    nameMain: categoryObject.name.main,
    nameUk: categoryObject.name.source,
    translations: categoryObject.phrases
      .map((phraseId) => dictionaryObject.phrases[phraseId])
      // Some phrases might be missing for some language variants
      .filter(Boolean)
      .map((phrase) => new Phrase2(phrase)),
  };
};

export const getCategories = (dictionaryObject: DictionaryDataObject): Category2[] => {
  const categoriesToExclude = [KIDS_CATEGORY_ID];

  return dictionaryObject.categories
    .filter((category) => categoriesToExclude.includes(category.id) === false)
    .map((category) => parseCategory(category, dictionaryObject));
};

export const getAllPhrases = (dictionaryObject: DictionaryDataObject): Phrase2[] => {
  return [...Object.values(dictionaryObject.phrases)].map((phraseObject) => new Phrase2(phraseObject));
};

export const getKidsCategory = (dictionaryObject: DictionaryDataObject): Category2 | undefined => {
  const categoryObject = dictionaryObject.categories.find((category) => category.id === KIDS_CATEGORY_ID);
  if (!categoryObject) {
    return undefined;
  } else {
    return parseCategory(categoryObject, dictionaryObject);
  }
};

export const fetchDictionary = async () => {
  const result = await (await fetch(`https://data.movapp.eu/uk-${getCountryVariant()}-dictionary.json`)).json();
  return result as DictionaryDataObject;
};
