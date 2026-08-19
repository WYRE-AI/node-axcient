export interface AutoverifyInfo {
  id?: string;
  timestamp?: string;
  start_timestamp?: string;
  end_timestamp?: string;
  rp?: string;
  status?: string;
  screenshot_url?: string;
  screenshot_thumbnail_url?: string;
  is_healthy?: boolean;
}

export interface MachineAutoverifyDetails {
  vault_id?: number;
  appliance_id?: number;
  autoverify_details?: AutoverifyInfo[];
}

export interface RestorePoint {
  timestamp?: string;
  in_use?: boolean;
  usage_initiator?: string;
}

export interface MachineRestorePoints {
  vault_id?: number;
  status?: string;
  error_msg?: string;
  restore_points?: RestorePoint[];
}
