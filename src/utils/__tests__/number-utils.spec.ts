import { formatCurrency, getCurrencyValueFromText } from '../number-utils';

describe('ArrayUtils', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('formatCurrency', () => {
    it('should call the toLocaleString method', () => {
      const value = 5;
      jest.spyOn(Number.prototype, 'toLocaleString').mockImplementation();
      formatCurrency(value, 'CURRENCY');
      expect(value.toLocaleString).toHaveBeenCalledWith('en-EN', {
        style: 'currency',
        currency: 'CURRENCY',
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      });
    });
  });

  describe('getCurrencyValueFromText', () => {
    it('should return 0 if the string is empty', () => {
      expect(getCurrencyValueFromText('')).toBe(0);
    });

    it('should return 12', () => {
      expect(getCurrencyValueFromText('12')).toBe(12);
    });

    it('should return 12.11', () => {
      expect(getCurrencyValueFromText('12.11')).toBe(12.11);
    });

    it('should truncate more than 2 decimals', () => {
      expect(getCurrencyValueFromText('0.01010101010110101010')).toBe(0.01);
    });

    it('should keep only one decimal if only one is provided', () => {
      expect(getCurrencyValueFromText('0.1')).toBe(0.1);
    });

    it('should trail a 1 as first decimal if the string ends with a .', () => {
      expect(getCurrencyValueFromText('5.')).toBe(5.1);
    });

    it('should remove all the digits after dots which follow the first digit', () => {
      expect(getCurrencyValueFromText('1.123.456.789')).toBe(1.12);
    });

    it('should replce all the non numeric digits except the dot', () => {
      expect(getCurrencyValueFromText('12,jwqeq,313,32zxsa.ewqdsa1')).toBe(1231332.1);
    });
  });
});
