import type { HttpClient } from '../http.js';
import type { Vault, VaultThresholds, VaultType } from '../types/index.js';

export interface ListVaultsParams {
  vaultType?: VaultType;
  active?: boolean;
  withUrl?: boolean;
  limit?: number;
  includeDevices?: boolean;
}

export class VaultsResource {
  constructor(private readonly http: HttpClient) {}

  async list(params: ListVaultsParams = {}): Promise<Vault[]> {
    return this.http.request<Vault[]>('/vault', {
      params: {
        vault_type: params.vaultType,
        active: params.active,
        with_url: params.withUrl,
        limit: params.limit,
        include_devices: params.includeDevices,
      },
    });
  }

  async get(vaultId: number): Promise<Vault> {
    return this.http.request<Vault>(`/vault/${vaultId}`);
  }

  async getThreshold(vaultId: number): Promise<VaultThresholds> {
    return this.http.request<VaultThresholds>(`/vault/${vaultId}/threshold/connectivity`);
  }

  /** Sets the connectivity threshold (minutes before the vault is marked WARNED for lost connectivity). */
  async setThreshold(vaultId: number, thresholdMinutes: number): Promise<VaultThresholds> {
    return this.http.request<VaultThresholds>(`/vault/${vaultId}/threshold/connectivity`, {
      method: 'POST',
      body: { threshold: thresholdMinutes },
    });
  }
}
