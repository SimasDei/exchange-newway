import LRUCache from '../../../src/cache/lruCache';

describe('LRUCache', () => {
  it('should evict the least recently used item when max size is exceeded', () => {
    const cache = new LRUCache<string, number>(3);
    cache.set('a', 1);
    cache.set('b', 2);
    cache.set('c', 3);

    expect(cache.get('a')).toBe(1);

    cache.set('d', 4);
    expect(cache.get('b')).toBeUndefined();
    expect(cache.get('c')).toBe(3);
    expect(cache.get('a')).toBe(1);
    expect(cache.get('d')).toBe(4);
  });

  it('should update the usage of a stale item when accessed', () => {
    const cache = new LRUCache<string, number>(2);
    cache.set('x', 10);
    cache.set('y', 20);

    expect(cache.get('x')).toBe(10);

    cache.set('z', 30);
    expect(cache.get('y')).toBeUndefined();
    expect(cache.get('x')).toBe(10);
    expect(cache.get('z')).toBe(30);
  });

  it('should update the value of an existing key and move it to the most recently used position', () => {
    const cache = new LRUCache<string, number>(2);
    cache.set('m', 100);
    cache.set('n', 200);

    cache.set('m', 150);
    expect(cache.get('m')).toBe(150);

    cache.set('o', 300);
    expect(cache.get('n')).toBeUndefined();
    expect(cache.get('m')).toBe(150);
    expect(cache.get('o')).toBe(300);
  });
});
