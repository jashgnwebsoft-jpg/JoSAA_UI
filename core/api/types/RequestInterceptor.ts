import { RequestConfig } from './RequestConfig';

export type RequestInterceptor = (config: RequestConfig) => RequestConfig | Promise<RequestConfig>;
