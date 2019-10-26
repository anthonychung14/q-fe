// @flow
import { List, Map, OrderedMap, Set } from 'immutable';

export const stringOf = (a: any, defaultValue?: string = ''): string =>
  typeof a === 'string' ? a : defaultValue;

export const objectOf = (a: any, defaultValue?: Object = {}): Object =>
  typeof a === 'object' && a !== null ? a : defaultValue;

export const arrayOf = (a: any, defaultValue?: Array<*> = []): Array<*> =>
  Array.isArray(a) ? a : defaultValue;

export const listOf = (a: any, defaultValue?: List<*> = List()): List<*> =>
  a instanceof List ? a : defaultValue;

export const mapOf = (a: any, defaultValue?: Map<*, *> = Map()): Map<*, *> =>
  a instanceof Map ? a : defaultValue;

export const orderedMapOf = (
  a: any,
  defaultValue?: OrderedMap<*, *> = OrderedMap(),
): OrderedMap<*, *> => (a instanceof OrderedMap ? a : defaultValue);

export const setOf = (a: any, defaultValue?: Set<*> = Set()): Set<*> =>
  a instanceof Set ? a : defaultValue;

export const numberOf = (a: any, defaultValue: number): number =>
  typeof a === 'number' ? a : defaultValue;

export const maybeNumberOf = (a: any): ?number =>
  typeof a === 'number' ? a : null;
