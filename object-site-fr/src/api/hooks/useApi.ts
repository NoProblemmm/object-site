import { BASE_URL } from "@api/Api.service";
import axios from "axios";

class ApiRequest {
  error: String | null = null;

  api = axios.create({
    baseURL: `${BASE_URL}`,
    headers: {
      "Content-Type": "application/json",
    },
  });

  constructor() {
    this.api = axios.create({
      baseURL: `${BASE_URL}`,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  request = async (
    method: string,
    endpoint: string,
    body: any = null,
    config: any = {}
  ) => {
    this.error = null;
    try {
      const response = await this.api.request({
        method,
        url: endpoint,
        data: body,
        ...config,
      });
      return response.data;
    } catch (error: any) {
      this.error = error.message || error.toString();
      throw error;
    }
  };

  GET = (endpoint: string, config: any = {}) =>
    this.request("get", endpoint, null, config);
  POST = (endpoint: string, body: any, { ...conf }) =>
    this.request("post", endpoint, body, { ...conf });
  PUT = (endpoint: string, body: any) => this.request("put", endpoint, body);
  DELETE = (endpoint: string, body: any, { ...conf }) =>
    this.request("delete", endpoint, body, { ...conf });
}

export const useApi = new ApiRequest();
