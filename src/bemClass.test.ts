import {describe, expect, test} from '@jest/globals';
import { bemClass } from './bemClass';

describe('bemClass', () => {

  describe('for blocks', () => {

    test('simple block class', () => {
      const cn = bemClass('car');
      expect(cn()).toEqual('car');
    });

    test('with value modifier', () => {
      const cn = bemClass('car');
      expect(cn({ color: 'green' })).toEqual('car car--color-green');
    });

    test('with boolean modifier', () => {
      const cn = bemClass('car');
      expect(cn({ electric: true })).toEqual('car car--electric');
    });

    test('with multiple modifiers', () => {
      const cn = bemClass('car');
      expect(cn({
        truck: true,
        color: 'blue',
        hybrid: false,
        electric: true,
      })).toEqual('car car--truck car--color-blue car--electric');
    });

    test('with mix', () => {
      const cn = bemClass('airplane');
      expect(cn(['vehicle'])).toEqual('airplane vehicle');
    });

    test('with multiple mix', () => {
      const cn = bemClass('airplane');
      expect(cn(['vehicle', 'landing', 'subject'])).toEqual('airplane vehicle landing subject');
    });

    test('with modifiers and mixes', () => {
      const cn = bemClass('car');
      expect(cn({ electric: true, color: 'red' }, ['transport', 'vehicle'])).toEqual('car car--electric car--color-red transport vehicle');
    });

  });

  describe('for elements', () => {
    test('simple element class', () => {
      const cn = bemClass('car');
      expect(cn('seat')).toEqual('car__seat');
    });

    test('with value modifier', () => {
      const cn = bemClass('car');
      expect(cn('seat', { fabric: 'leather' })).toEqual('car__seat car__seat--fabric-leather');
    });

    test('with boolean modifier', () => {
      const cn = bemClass('car');
      expect(cn('trunk', { small: true })).toEqual('car__trunk car__trunk--small');
    });

    test('with multiple modifiers', () => {
      const cn = bemClass('car');
      expect(cn('motor', {
        electric: true,
        speed: 'fast',
        broken: false,
        supersonic: true,
      })).toEqual('car__motor car__motor--electric car__motor--speed-fast car__motor--supersonic');
    });

    test('with mix', () => {
      const cn = bemClass('airplane');
      expect(cn('seat', ['furniture'])).toEqual('airplane__seat furniture');
    });

    test('with multiple mix', () => {
      const cn = bemClass('airplane');
      expect(cn('wing', ['component', 'fueltank', 'metal', 'thing'])).toEqual('airplane__wing component fueltank metal thing');
    });

    test('with modifiers and mixes', () => {
      const cn = bemClass('car');
      expect(cn('wheel', { circular: true, color: 'black' }, ['part', 'rubber'])).toEqual('car__wheel car__wheel--circular car__wheel--color-black part rubber');
    });
  });

  describe('alternative separators', () => {
    test('element separator', () => {
      const cn = bemClass('car', '~~~');
      expect(cn('seat')).toEqual('car~~~seat');
    });

    test('modifier separator', () => {
      const cn = bemClass('car', undefined, '_');
      expect(cn('seat', {color: 'blue'})).toEqual('car__seat car__seat_color-blue');
    });

    test('modifier value separator', () => {
      const cn = bemClass('car', undefined, undefined, '~');
      expect(cn('seat', { color: 'red' })).toEqual('car__seat car__seat--color~red');
    });

    test('all separators', () => {
      const cn = bemClass('car', '+++', '*', '...');
      expect(cn('seat', { color: 'green', adjustable: true })).toEqual('car+++seat car+++seat*color...green car+++seat*adjustable');
    });
  })
});
