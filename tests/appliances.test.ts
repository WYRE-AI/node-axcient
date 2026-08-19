import { describe, expect, it } from 'vitest';
import { AxcientClient } from '../src/index.js';
import { appliances, appliance } from './fixtures/index.js';

const axcient = new AxcientClient({ apiKey: 'test-key' });

describe('appliances', () => {
  it('lists appliances', async () => {
    const result = await axcient.appliances.list();
    expect(result).toEqual(appliances);
  });

  it('lists appliances by client', async () => {
    const result = await axcient.appliances.listByClient(26);
    expect(result).toEqual(appliances);
  });

  it('gets an appliance by id', async () => {
    const result = await axcient.appliances.get(1);
    expect(result).toEqual(appliance);
  });
});
