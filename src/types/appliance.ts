import type { StorageDetails, ServerModel, PackageInfo, VersionInfo } from './common.js';
import type { ShortApplianceDevice } from './device.js';

export interface ShortAppliance {
  id: number;
  service_id?: string;
  alias?: string;
  ip_address?: string;
  server_id?: string;
  active?: boolean;
  product?: 'BRC' | 'X360RECOVER';
  service_type?: 'HARDWARE' | 'VIRTUAL';
}

export interface Appliance extends ShortAppliance {
  client_id?: number;
  model?: ServerModel;
  package?: PackageInfo;
  last_tunnel_up?: string;
  tunnel_status?: 'UP' | 'DOWN';
  storage_details?: StorageDetails;
  devices?: ShortApplianceDevice[];
  software_version?: VersionInfo;
  health_status?: string;
  health_status_reason?: string;
}
