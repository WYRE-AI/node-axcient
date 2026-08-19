import { HttpClient } from './http.js';
import type { AxcientClientConfig } from './config.js';
import { OrganizationResource } from './resources/organization.js';
import { ClientsResource } from './resources/clients.js';
import { DevicesResource } from './resources/devices.js';
import { JobsResource } from './resources/jobs.js';
import { VaultsResource } from './resources/vaults.js';
import { AppliancesResource } from './resources/appliances.js';

export class AxcientClient {
  readonly organization: OrganizationResource;
  readonly clients: ClientsResource;
  readonly devices: DevicesResource;
  readonly jobs: JobsResource;
  readonly vaults: VaultsResource;
  readonly appliances: AppliancesResource;

  constructor(config: AxcientClientConfig) {
    const http = new HttpClient(config);
    this.organization = new OrganizationResource(http);
    this.clients = new ClientsResource(http);
    this.devices = new DevicesResource(http);
    this.jobs = new JobsResource(http);
    this.vaults = new VaultsResource(http);
    this.appliances = new AppliancesResource(http);
  }
}
