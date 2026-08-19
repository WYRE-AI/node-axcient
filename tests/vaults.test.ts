import { describe, expect, it } from 'vitest';
import { AxcientClient } from '../src/index.js';
import { vaults, vault, vaultThreshold } from './fixtures/index.js';

const axcient = new AxcientClient({ apiKey: 'test-key' });

describe('vaults', () => {
  it('lists vaults', async () => {
    const result = await axcient.vaults.list({ vaultType: 'Cloud' });
    expect(result).toEqual(vaults);
  });

  it('gets a vault by id', async () => {
    const result = await axcient.vaults.get(234);
    expect(result).toEqual(vault);
  });

  it('gets the connectivity threshold', async () => {
    const result = await axcient.vaults.getThreshold(234);
    expect(result).toEqual(vaultThreshold);
  });

  it('sets the connectivity threshold', async () => {
    const result = await axcient.vaults.setThreshold(234, 240);
    expect(result).toEqual(vaultThreshold);
  });
});
