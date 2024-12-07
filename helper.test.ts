var helper = require('./helper')
var fs = require('fs')

jest.mock('fs');

describe('readData', () => {
    it('should return parsed JSON data when the file is read successfully', () => {
      const mockData = '{"name": "John", "age": 30}';
      fs.readFileSync.mockReturnValue(mockData);
  
      const result = helper.readData('mock/path');
      expect(result).toEqual({ name: 'John', age: 30 });
    });
  
    it('should throw an error when reading the file fails', () => {
      fs.readFileSync.mockImplementation(() => {
        throw new Error('File not found');
      });
  
      expect(() => helper.readData('mock/path')).toThrow('File not found');
    });
  });

describe('formatCurrency', () => {
    it('should format the value correctly as currency', () => {
      expect(helper.formatCurrency(1234567)).toBe('$1,234,567');
      expect(helper.formatCurrency(9876)).toBe('$9,876');
    });
  });

describe('formatPercentage', () => {
    it('should format the value correctly as percentage', () => {
      expect(helper.formatPercentage(0.12345)).toBe('12.3%');
      expect(helper.formatPercentage(0.01)).toBe('1.0%');
      expect(helper.formatPercentage(0)).toBe('0.0%');
    });
  });