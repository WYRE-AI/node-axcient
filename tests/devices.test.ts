import { describe, expect, it } from 'vitest';
import { AxcientClient } from '../src/index.js';
import { devices, device, machineAutoverifyDetails, machineRestorePoints } from './fixtures/index.js';

const axcient = new AxcientClient({ apiKey: 'test-key' });

describe('devices', () => {
  it('lists devices', async () => {
    const result = await axcient.devices.list({ limit: 100, offset: 0 });
    expect(result).toEqual(devices);
  });

  it('lists devices by client', async () => {
    const result = await axcient.devices.listByClient(26, { d2cOnly: false });
    expect(result).toEqual(devices);
  });

  it('gets a device by id', async () => {
    const result = await axcient.devices.get(6);
    expect(result).toEqual(device);
  });

  it('gets autoverify results', async () => {
    const result = await axcient.devices.getAutoVerify(6);
    expect(result).toEqual(machineAutoverifyDetails);
  });

  it('gets restore points', async () => {
    const result = await axcient.devices.getRestorePoints(6);
    expect(result).toEqual(machineRestorePoints);
  });
});
