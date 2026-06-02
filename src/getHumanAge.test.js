'use strict';

describe('getHumanAge', () => {
  const { getHumanAge } = require('./getHumanAge');

  test('should be declared', () => {
    expect(getHumanAge).toBeInstanceOf(Function);
  });

  test('should return an array', () => {
    expect(getHumanAge(0, 0)).toBeInstanceOf(Array);
  });

  test('should return an array of two numbers', () => {
    const result = getHumanAge(15, 15);

    expect(result).toHaveLength(2);
    expect(typeof result[0]).toBe('number');
    expect(typeof result[1]).toBe('number');
  });

  test('should return [0, 0] for zero ages', () => {
    expect(getHumanAge(0, 0)).toEqual([0, 0]);
  });

  test('should return [0, 0] just below the first tier (14, 14)', () => {
    expect(getHumanAge(14, 14)).toEqual([0, 0]);
  });

  test('should return [1, 1] at the first tier boundary (15, 15)', () => {
    expect(getHumanAge(15, 15)).toEqual([1, 1]);
  });

  test('should stay [1, 1] within the second tier (23, 23)', () => {
    expect(getHumanAge(23, 23)).toEqual([1, 1]);
  });

  test('should return [2, 2] at the second tier boundary (24, 24)', () => {
    expect(getHumanAge(24, 24)).toEqual([2, 2]);
  });

  test('should stay [2, 2] before the next block (27, 27)', () => {
    expect(getHumanAge(27, 27)).toEqual([2, 2]);
  });

  test('should diverge cat vs dog after 28 years (28, 28)', () => {
    expect(getHumanAge(28, 28)).toEqual([3, 2]);
  });

  test('should handle large equal ages (100, 100)', () => {
    expect(getHumanAge(100, 100)).toEqual([21, 17]);
  });

  test('should count a cat block as 4 years (32 -> 4 human years)', () => {
    const [catYears] = getHumanAge(32, 0);

    expect(catYears).toBe(4);
  });

  test('should count a dog block as 5 years (33 -> 3 human years)', () => {
    const [, dogYears] = getHumanAge(0, 33);

    expect(dogYears).toBe(3);
  });

  test('should discard the remainder within a cat block (31, 0)', () => {
    expect(getHumanAge(31, 0)).toEqual([3, 0]);
  });

  test('should discard the remainder within a dog block (0, 38)', () => {
    expect(getHumanAge(0, 38)).toEqual([0, 4]);
  });

  test('should handle different cat and dog ages independently', () => {
    expect(getHumanAge(28, 100)).toEqual([3, 17]);
  });
});
