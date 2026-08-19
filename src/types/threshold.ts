import type { ThresholdValue } from './common.js';

export interface VaultThresholds {
  vault_id: number;
  connectivity_threshold: number;
}

export interface DeviceThresholds {
  vault_rp_threshold?: ThresholdValue;
  cloud_rp_threshold?: ThresholdValue;
  local_rp_threshold?: ThresholdValue;
  protection_threshold?: ThresholdValue;
}

export type JobThresholds = DeviceThresholds;
