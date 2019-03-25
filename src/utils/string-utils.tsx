import { DEFAULT_LOCALE } from 'contants';

const isEmpty = (input: string = '', removeSpaces: boolean = true): boolean => (
  removeSpaces
    ? input.replace(/\s/g, '').length === 0
    : input.length === 0
);

const areEquals = (a: string, b: string, ignorePunctuation: boolean = true): boolean => a.localeCompare(b, DEFAULT_LOCALE, {
  sensitivity: 'base',
  ignorePunctuation,
}) === 0;

export { isEmpty, areEquals };
