import type { HealthStatus } from './common.js';
import type { ShortVault } from './vault.js';
import type { ShortClient } from './client.js';
import type { ShortBrcJob, ShortReplibitJob } from './job.js';
import type { MachineAutoverifyDetails } from './autoverify.js';

export type DeviceType = 'SERVER' | 'WORKSTATION';

export interface DeviceOs {
  os_type?: 'WINDOWS' | 'LINUX' | 'OTHER';
  bits?: number;
  os_name?: string;
  device_type?: string;
}

export interface LocalCacheDetails {
  enabled?: boolean;
  last_successful_verification_timestamp?: string | null;
  last_verification_timestamp?: string | null;
  path?: string;
  verification_status?: string | null;
}

export interface ShortDevice {
  id: number;
  appliance_id?: number;
  client?: ShortClient;
  name: string;
  ip_address?: string;
  type?: DeviceType;
  os?: string;
  local_usage?: number;
  vault_usage?: number;
  bytes_replicated?: number;
  latest_vault_rp?: string;
}

export interface ShortApplianceDevice extends ShortDevice {}

export interface Device {
  id: number;
  name: string;
  client_id?: number;
  type?: DeviceType;
  os?: DeviceOs;
  service_id?: string;
  product?: 'BRC' | 'X360RECOVER';
  local_ps_id?: string;
  vaults?: ShortVault[];
  ip_address?: string;
  current_health_status?: HealthStatus;
  previous_health_status?: HealthStatus | null;
  thresholds?: import('./threshold.js').DeviceThresholds;
  local_usage?: number;
  local_total?: number;
  cloud_usage?: number;
  vault_usage?: number;
  jobs?: Array<ShortBrcJob | ShortReplibitJob>;
  latest_cloud_rp?: string;
  latest_local_rp?: string;
  latest_vault_rp?: string;
  d2c?: boolean;
  asio_endpoint_id?: string;
  agent_version?: string;
  volumes?: string[];
  excluded_volumes?: string[];
  device_details_page_url?: string;
  local_cache_details?: LocalCacheDetails;
  latest_autoverify_details?: MachineAutoverifyDetails;
}
