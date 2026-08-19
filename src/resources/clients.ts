import type { HttpClient } from '../http.js';
import type { Client, D2CAgentToken } from '../types/index.js';

export interface ListClientsParams {
  includeAppliances?: boolean;
}

export class ClientsResource {
  constructor(private readonly http: HttpClient) {}

  /** Lists all clients for the organization associated with the API key. */
  async list(params: ListClientsParams = {}): Promise<Client[]> {
    return this.http.request<Client[]>('/client', {
      params: { include_appliances: params.includeAppliances },
    });
  }

  async get(clientId: number, params: ListClientsParams = {}): Promise<Client> {
    return this.http.request<Client>(`/client/${clientId}`, {
      params: { include_appliances: params.includeAppliances },
    });
  }

  /** Mints a D2C (direct-to-cloud) agent enrollment token for a client/vault pair. */
  async getD2CAgentToken(clientId: number, vaultId: number): Promise<D2CAgentToken> {
    return this.http.request<D2CAgentToken>(`/client/${clientId}/vault/${vaultId}/d2c_agent`, {
      method: 'POST',
    });
  }
}
