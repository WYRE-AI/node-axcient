export interface StorageDetails {
  used_size?: number;
  drive_size?: number;
}

export interface ServerModel {
  id?: number;
  name?: string;
}

export interface PackageInfo {
  id?: number;
  name?: string;
}

export interface VersionInfo {
  id?: number;
  version?: string;
}

export interface HealthStatus {
  status?: string;
  reason?: string | null;
  timestamp?: string;
}

export interface ThresholdValue {
  value?: number;
  enabled?: boolean;
  overridden?: boolean;
}
