import { describe, expect, it } from 'vitest';
import { AxcientClient } from '../src/index.js';
import { jobs, brcJob, jobHistory } from './fixtures/index.js';

const axcient = new AxcientClient({ apiKey: 'test-key' });

describe('jobs', () => {
  it('lists jobs for a device', async () => {
    const result = await axcient.jobs.listByDevice(26, 6);
    expect(result).toEqual(jobs);
  });

  it('gets a job by id', async () => {
    const result = await axcient.jobs.get(26, 6, 65345);
    expect(result).toEqual(brcJob);
  });

  it('gets job history', async () => {
    const result = await axcient.jobs.getHistory(26, 6, 65345, { limit: 1500, offset: 0 });
    expect(result).toEqual(jobHistory);
  });
});
