export interface ProtectedSystemCounter {
  type: string;
  count: number;
}

export interface ClientProtectedSystemsCounters {
  appliance_based?: ProtectedSystemCounter[];
  d2c?: ProtectedSystemCounter[];
  cloud_archive?: ProtectedSystemCounter[];
}

export interface ShortClient {
  id: number;
  name: string;
}

export interface Client {
  id: number;
  name: string;
  client_code?: string;
  active: boolean;
  health_status?: string;
  devices_counters?: ClientProtectedSystemsCounters;
}

export interface D2CAgentToken {
  token_id: string;
}
