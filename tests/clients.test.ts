import { describe, expect, it } from 'vitest';
import { AxcientClient, NotFoundError } from '../src/index.js';
import { clients, client as clientFixture, d2cAgentToken } from './fixtures/index.js';

const axcient = new AxcientClient({ apiKey: 'test-key' });

describe('clients', () => {
  it('lists clients', async () => {
    const result = await axcient.clients.list();
    expect(result).toEqual(clients);
  });

  it('gets a client by id', async () => {
    const result = await axcient.clients.get(26);
    expect(result).toEqual(clientFixture);
  });

  it('throws NotFoundError for an unknown client id', async () => {
    await expect(axcient.clients.get(999999)).rejects.toBeInstanceOf(NotFoundError);
  });

  it('mints a D2C agent token', async () => {
    const result = await axcient.clients.getD2CAgentToken(26, 234);
    expect(result).toEqual(d2cAgentToken);
  });
});
