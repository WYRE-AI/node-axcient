import type { HttpClient } from '../http.js';
import type { Device, MachineAutoverifyDetails, MachineRestorePoints } from '../types/index.js';

export interface ListDevicesParams {
  limit?: number;
  offset?: number;
}

export interface ListDevicesByClientParams {
  serviceId?: string;
  d2cOnly?: boolean;
}

export class DevicesResource {
  constructor(private readonly http: HttpClient) {}

  /** Lists all devices in the organization. Supports limit/offset pagination. */
  async list(params: ListDevicesParams = {}): Promise<Device[]> {
    return this.http.request<Device[]>('/device', {
      params: { limit: params.limit, offset: params.offset },
    });
  }

  async listByClient(clientId: number, params: ListDevicesByClientParams = {}): Promise<Device[]> {
    return this.http.request<Device[]>(`/client/${clientId}/device`, {
      params: { service_id: params.serviceId, d2c_only: params.d2cOnly },
    });
  }

  async get(deviceId: number): Promise<Device> {
    return this.http.request<Device>(`/device/${deviceId}`);
  }

  /** AutoVerify (screenshot verification) results for the device, grouped by vault. */
  async getAutoVerify(deviceId: number): Promise<MachineAutoverifyDetails[]> {
    return this.http.request<MachineAutoverifyDetails[]>(`/device/${deviceId}/autoverify`);
  }

  /** Restore points available for the device, grouped by the cloud vault they replicate to. */
  async getRestorePoints(deviceId: number): Promise<MachineRestorePoints[]> {
    return this.http.request<MachineRestorePoints[]>(`/device/${deviceId}/restore_point`);
  }
}
