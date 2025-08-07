import { CmToMetersPipe } from './cm-to-meters';

describe('CmToMetersPipe', () => {
  const pipe = new CmToMetersPipe();

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should convert centimeters to meters as string with "m"', () => {
    expect(pipe.transform(150)).toBe('1.5 m');
    expect(pipe.transform(0)).toBe('0 m');
    expect(pipe.transform(250)).toBe('2.5 m');
  });

  it('should return empty string for null or undefined', () => {
    expect(pipe.transform(null)).toBe('');
    expect(pipe.transform(undefined)).toBe('');
  });

  it('should handle zero correctly', () => {
    expect(pipe.transform(0)).toBe('0 m');
  });
});
