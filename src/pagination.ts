/**
 * Axcient paginates a few endpoints (`/device`, job `/history`) with `limit`/`offset`
 * query params rather than a cursor. This walks pages until a short page signals the end.
 */
export async function* paginateOffset<T>(
  fetchPage: (limit: number, offset: number) => Promise<T[]>,
  pageSize = 100
): AsyncGenerator<T, void, void> {
  let offset = 0;
  for (;;) {
    const page = await fetchPage(pageSize, offset);
    for (const item of page) yield item;
    if (page.length < pageSize) return;
    offset += pageSize;
  }
}
