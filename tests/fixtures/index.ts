export const organization = {
  id: 26,
  name: 'Acme MSP',
  active: true,
  brand_id: 'brand-1',
  salesforce_id: 'sf-1',
};

export const clients = [
  {
    id: 26,
    name: 'Acme Client',
    client_code: 'acme',
    active: true,
    health_status: 'NORMAL',
    devices_counters: {
      appliance_based: [{ type: 'SERVER', count: 1 }],
      d2c: [{ type: 'WORKSTATION', count: 2 }],
      cloud_archive: [{ type: 'SERVER', count: 1 }],
    },
  },
];

export const client = clients[0];

export const d2cAgentToken = { token_id: '460c08d77a0c4963bc9a79ea45f6ecbb' };

export const devices = [
  {
    id: 6,
    name: 'RMC_device',
    client_id: 26,
    type: 'SERVER',
    os: { os_type: 'LINUX', bits: 64, os_name: 'Ubuntu 22.04' },
    service_id: 'abcd',
    product: 'X360RECOVER',
    local_ps_id: 'fff494ee9e7e48f1816306eb',
    vaults: [{ id: 234, type: 'Cloud', latest_vault_rp: '2024-01-23T04:56:07.000Z', device_usage: 1254635435 }],
    ip_address: '10.2.2.33',
    current_health_status: { status: 'NORMAL', reason: null, timestamp: '2024-01-03T11:33:07.000Z' },
    local_usage: 132153611,
    vault_usage: 132152007,
    jobs: [{ id: 65345, name: 'BackupJob1', latest_rp: '2024-01-23T04:56:07.000Z', health_status: 'NORMAL' }],
  },
];

export const device = devices[0];

export const machineAutoverifyDetails = [
  {
    vault_id: 234,
    appliance_id: 1,
    autoverify_details: [
      {
        id: '64f972bfbfec2620b7043e21',
        timestamp: '2022-12-13T19:40:22.000Z',
        start_timestamp: '2022-12-13T19:40:22.000Z',
        end_timestamp: '2022-12-13T19:45:45.000Z',
        rp: '2022-12-13T19:00:01.000Z',
        status: 'success',
        screenshot_url: 'https://localhost/image/last_autoverify_screenshot/abc',
        screenshot_thumbnail_url: 'https://localhost/image/last_autoverify_thumbnail/abc',
        is_healthy: true,
      },
    ],
  },
];

export const machineRestorePoints = [
  {
    vault_id: 234,
    status: 'OK',
    error_msg: '',
    restore_points: [
      { timestamp: '2024-07-01T10:08:00', in_use: true, usage_initiator: 'vault-10.2.182.140.slc.efscloud.net/iscsi' },
    ],
  },
];

export const brcJob = {
  id: 65345,
  name: 'BackupJob1',
  offsite: true,
  enabled: true,
  job_type: 'FILE',
  latest_local_rp: '2024-01-23T04:56:07.000Z',
  latest_cloud_rp: '2024-01-23T04:56:07.000Z',
  health_status: 'NORMAL',
  thresholds: {
    vault_rp_threshold: { value: 320, enabled: true, overridden: false },
    cloud_rp_threshold: { value: 240, enabled: true, overridden: false },
    local_rp_threshold: { value: 480, enabled: true, overridden: false },
    protection_threshold: { value: 60, enabled: true, overridden: false },
  },
};

export const jobs = [brcJob];

export const jobHistory = {
  status: 'Completed',
  start_time: '2024-01-23T04:00:00.000Z',
  end_time: '2024-01-23T04:56:07.000Z',
  rp: '2024-01-23T04:56:07.000Z',
};

export const vaults = [
  {
    id: 234,
    service_id: 'abcd',
    name: 'RMC_Vault',
    ip_address: '10.2.2.1',
    server_id: 'server-1',
    active: true,
    type: 'Cloud',
    service_type: 'HARDWARE',
    tunnel_status: 'UP',
    storage_details: { used_size: 40900613898, drive_size: 58581416960 },
    vault_thresholds: { vault_id: 234, connectivity_threshold: 240 },
    health_status: 'NORMAL',
  },
];

export const vault = vaults[0];

export const vaultThreshold = { vault_id: 234, connectivity_threshold: 240 };

export const appliances = [
  {
    id: 1,
    service_id: 'abcd',
    alias: 'TestAppliance',
    ip_address: '10.2.22.1',
    server_id: '7099d6d7-67cd-4809-b6bc-81dc91c5d082',
    active: true,
    product: 'X360RECOVER',
    client_id: 26,
    model: { id: 392, name: 'BYOD' },
    package: { id: 10, name: 'Axcient Replibit' },
    service_type: 'HARDWARE',
    tunnel_status: 'UP',
    storage_details: { used_size: 40900613898, drive_size: 58581416960 },
    software_version: { id: 15, version: '10.1.0' },
    health_status: 'NORMAL',
  },
];

export const appliance = appliances[0];
