import type { HttpClient } from '../http.js';
import type { Organization } from '../types/index.js';

export class OrganizationResource {
  constructor(private readonly http: HttpClient) {}

  /** Returns the organization associated with the authenticating API key. */
  async get(): Promise<Organization> {
    return this.http.request<Organization>('/organization');
  }
}
