import type { HttpClient } from '../http.js';
import type { Appliance } from '../types/index.js';

export interface ListAppliancesParams {
  serviceId?: string;
  includeDevices?: boolean;
}

export interface GetApplianceParams {
  includeDevices?: boolean;
}

export class AppliancesResource {
  constructor(private readonly http: HttpClient) {}

  async list(params: ListAppliancesParams = {}): Promise<Appliance[]> {
    return this.http.request<Appliance[]>('/appliance', {
      params: { service_id: params.serviceId, include_devices: params.includeDevices },
    });
  }

  async listByClient(clientId: number, params: GetApplianceParams = {}): Promise<Appliance[]> {
    return this.http.request<Appliance[]>(`/client/${clientId}/appliance`, {
      params: { include_devices: params.includeDevices },
    });
  }

  async get(applianceId: number, params: GetApplianceParams = {}): Promise<Appliance> {
    return this.http.request<Appliance>(`/appliance/${applianceId}`, {
      params: { include_devices: params.includeDevices },
    });
  }
}
