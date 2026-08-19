import { describe, expect, it } from 'vitest';
import { AxcientClient } from '../src/index.js';

describe('AxcientClient', () => {
  it('throws when constructed without an apiKey', () => {
    // @ts-expect-error intentionally omitting required config
    expect(() => new AxcientClient({})).toThrow(/apiKey/);
  });

  it('exposes one resource per API domain', () => {
    const client = new AxcientClient({ apiKey: 'test-key' });
    expect(client.organization).toBeDefined();
    expect(client.clients).toBeDefined();
    expect(client.devices).toBeDefined();
    expect(client.jobs).toBeDefined();
    expect(client.vaults).toBeDefined();
    expect(client.appliances).toBeDefined();
  });
});
