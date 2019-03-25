import { isEmpty, areEquals } from '../string-utils';

describe('StringUtils', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('isEmpty', () => {
    it('should return true if the string is empty', () => {
      expect(isEmpty('')).toBeTruthy();
    });

    it('should return true if the string has only blank spaces and removeSpaces is true as by default', () => {
      expect(isEmpty('        ')).toBeTruthy();
    });

    it('should return false if the string has only blank spaces and removeSpaces is false', () => {
      expect(isEmpty('        ', false)).toBeFalsy();
    });

    it('should return false if the string is not empty', () => {
      expect(isEmpty('a')).toBeFalsy();
    });
  });

  describe('areEquals', () => {
    it('should call the localeCompare method', () => {
      jest.spyOn(String.prototype, 'localeCompare').mockReturnValue(0);
      const first = 'first';
      const second = 'second';
      areEquals(first, second, false);
      expect(first.localeCompare).toHaveBeenCalledWith(second, 'en-EN', {
        sensitivity: 'base',
        ignorePunctuation: false,
      });
    });
  });
});
