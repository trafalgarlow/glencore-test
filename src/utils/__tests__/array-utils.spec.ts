import { containsSameName, findNextId } from '../array-utils';
import { StringUtils } from '..';

jest.mock('../string-utils');

describe('ArrayUtils', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('containsSameName', () => {
    it('should call the StringUtils method areEquals', () => {
      containsSameName(['hello', 'world'], '');
      expect(StringUtils.areEquals).toHaveBeenCalledTimes(2);
      expect(StringUtils.areEquals).toHaveBeenNthCalledWith(1, 'hello', '');
      expect(StringUtils.areEquals).toHaveBeenNthCalledWith(2, 'world', '');
    });

    it('should return true if the given array contains the same name', () => {
      jest.spyOn(StringUtils, 'areEquals').mockReturnValue(true);
      expect(containsSameName(['hello', 'world'], 'hello')).toBeTruthy();
    });

    it('should return true if the given array contains the same name', () => {
      jest.spyOn(StringUtils, 'areEquals').mockReturnValue(false);
      expect(containsSameName(['hello', 'world'], 'bye')).toBeFalsy();
    });

    it('should return false if the given array is empty', () => {
      expect(containsSameName([], 'bye')).toBeFalsy();
    });

    it('should not call the StringUtils areEquals method if the given array is empty', () => {
      containsSameName([], 'bye');
      expect(StringUtils.areEquals).not.toHaveBeenCalled();
    });
  });

  describe('findNextId', () => {
    it('should return 1 if the given array is empty', () => {
      expect(findNextId([])).toBe(1);
    });

    it('should return 5', () => {
      expect(findNextId([{ id: 4 }])).toBe(5);
    });

    it('should return 10', () => {
      expect(findNextId([{ id: 3 }, { id: 9 }])).toBe(10);
    });
  });

  describe('findNextId', () => {
    it('should return 1 if the given array is empty', () => {
      expect(findNextId([])).toBe(1);
    });

    it('should return 5', () => {
      expect(findNextId([{ id: 4 }])).toBe(5);
    });

    it('should return 10', () => {
      expect(findNextId([{ id: 3 }, { id: 9 }])).toBe(10);
    });
  });
});
