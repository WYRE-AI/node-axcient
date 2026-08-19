import { describe, expect, it } from 'vitest';
import { AxcientClient } from '../src/index.js';
import { organization } from './fixtures/index.js';

const client = new AxcientClient({ apiKey: 'test-key' });

describe('organization.get', () => {
  it('returns the organization for the authenticating API key', async () => {
    const result = await client.organization.get();
    expect(result).toEqual(organization);
  });
});
