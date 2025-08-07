import { GramsToKgPipe } from './grams-to-kg';

describe('GramsToKgPipe', () => {
  let pipe: GramsToKgPipe;

  beforeEach(() => {
    pipe = new GramsToKgPipe();
  });

  it('should create the pipe instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should correctly convert grams to kilograms', () => {
    expect(pipe.transform(1000)).toBe('1 kg');
    expect(pipe.transform(1500)).toBe('1.5 kg');
    expect(pipe.transform(0)).toBe('0 kg');
    expect(pipe.transform(1234)).toBe('1.234 kg');
  });

  it('should return an empty string for null or undefined', () => {
    expect(pipe.transform(null)).toBe('');
    expect(pipe.transform(undefined)).toBe('');
  });
});
