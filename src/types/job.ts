import type { JobThresholds } from './threshold.js';
import type { ShortVault } from './vault.js';

export interface ShortJob {
  id: number;
  name: string;
  health_status?: string;
}

export interface ShortBrcJob extends ShortJob {
  latest_local_rp?: string;
  latest_cloud_rp?: string;
}

export interface ShortReplibitJob extends ShortJob {
  latest_rp?: string;
  vault_id?: number;
}

export interface JobBase {
  id: number;
  name: string;
  offsite?: boolean;
  enabled?: boolean;
  thresholds?: JobThresholds;
  health_status?: string;
}

export interface BrcJob extends JobBase {
  job_type?: 'FILE' | 'IMAGE';
  latest_local_rp?: string;
  latest_cloud_rp?: string;
}

export interface ReplibitJob extends JobBase {
  vault?: ShortVault;
  schedule?: string;
  latest_rp?: string;
}

export type Job = BrcJob | ReplibitJob;

export interface JobHistoryEntry {
  status?: 'Completed' | 'Failed';
  start_time?: string;
  end_time?: string;
  rp?: string;
  error_msg?: string;
}

export type JobHistory = JobHistoryEntry;
