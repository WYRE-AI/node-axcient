import { describe, expect, it } from 'vitest';
import { paginateOffset } from '../src/pagination.js';

describe('paginateOffset', () => {
  it('walks pages until a short page is returned', async () => {
    const pages = [
      [1, 2, 3],
      [4, 5, 6],
      [7],
    ];
    const fetchPage = async (limit: number, offset: number) => {
      const index = offset / limit;
      return pages[index] ?? [];
    };

    const items: number[] = [];
    for await (const item of paginateOffset(fetchPage, 3)) {
      items.push(item);
    }

    expect(items).toEqual([1, 2, 3, 4, 5, 6, 7]);
  });

  it('stops immediately on an empty first page', async () => {
    const items: number[] = [];
    for await (const item of paginateOffset(async () => [], 10)) {
      items.push(item);
    }
    expect(items).toEqual([]);
  });
});
