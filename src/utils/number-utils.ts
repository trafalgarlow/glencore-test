import { DEFAULT_MIN_DECIMALS, DEFAULT_MAX_DECIMALS, DEFAULT_LOCALE } from 'contants';

const formatCurrency = (value: number, currency: string): string => value.toLocaleString(DEFAULT_LOCALE, {
  style: 'currency',
  currency,
  minimumFractionDigits: DEFAULT_MIN_DECIMALS,
  maximumFractionDigits: DEFAULT_MAX_DECIMALS,
});

const getCurrencyValueFromText = (input: string): number => {
  // remove all non numeric and non dots digits
  const numericDigitsVal: string = input.replace(/[^0-9.]/g, '');
  // if the string corresponds to an integer number
  if (numericDigitsVal.indexOf('.') === -1) {
    return +numericDigitsVal;
  }
  // otherwise get the integers and decimals
  const [integers, decimals]: string[] = numericDigitsVal.split('.');
  // truncate the decimals to 2 if present or add a trailing decimal
  const finalDecimals: string = decimals.length ? decimals.substr(DEFAULT_MIN_DECIMALS, DEFAULT_MAX_DECIMALS) : '1';
  // return the currency number value
  return +`${integers}.${finalDecimals}`;
};

const isValidId = (value: number): boolean => Number.isInteger(value) && value > 0;

export {
  formatCurrency,
  getCurrencyValueFromText,
  isValidId,
};
