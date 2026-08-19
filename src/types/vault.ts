import type { StorageDetails, ServerModel, VersionInfo } from './common.js';
import type { VaultThresholds } from './threshold.js';
import type { ShortDevice } from './device.js';

export type VaultType = 'Cloud' | 'Private';

export interface ShortVault {
  id: number;
  type?: VaultType;
  device_usage?: number;
  latest_vault_rp?: string;
  service_id?: string;
  name?: string;
}

export interface Vault {
  id: number;
  service_id?: string;
  name: string;
  ip_address?: string;
  server_id?: string;
  active?: boolean;
  type?: VaultType;
  model?: ServerModel;
  service_type?: 'HARDWARE' | 'VIRTUAL';
  last_tunnel_up?: string;
  tunnel_status?: 'UP' | 'DOWN';
  storage_details?: StorageDetails;
  devices?: ShortDevice[];
  software_version?: VersionInfo;
  replication_data?: number;
  vault_thresholds?: VaultThresholds;
  health_status?: string;
  health_status_reason?: string;
  creation_timestamp?: string;
}
