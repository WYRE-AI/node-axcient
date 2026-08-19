import type { HttpClient } from '../http.js';
import type { Job, JobHistory } from '../types/index.js';

export interface GetJobHistoryParams {
  limit?: number;
  offset?: number;
  /** Unix timestamp — only return history entries starting at/after this time. */
  startTimeBegin?: number;
}

export class JobsResource {
  constructor(private readonly http: HttpClient) {}

  async listByDevice(clientId: number, deviceId: number): Promise<Job[]> {
    return this.http.request<Job[]>(`/client/${clientId}/device/${deviceId}/job`);
  }

  async get(clientId: number, deviceId: number, jobId: number): Promise<Job> {
    return this.http.request<Job>(`/client/${clientId}/device/${deviceId}/job/${jobId}`);
  }

  async getHistory(
    clientId: number,
    deviceId: number,
    jobId: number,
    params: GetJobHistoryParams = {}
  ): Promise<JobHistory> {
    return this.http.request<JobHistory>(
      `/client/${clientId}/device/${deviceId}/job/${jobId}/history`,
      {
        params: {
          limit: params.limit,
          offset: params.offset,
          starttime_begin: params.startTimeBegin,
        },
      }
    );
  }
}
