export const formatCurrency = jest.fn().mockImplementation((value, currencty) => `formatted ${value} - ${currencty}`);
export const getCurrencyValueFromText = jest.fn().mockImplementation((value) => +value);
export const isValidId = jest.fn().mockReturnValue(true);
