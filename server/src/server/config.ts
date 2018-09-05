export interface IConfig {
  useEnvPort: boolean;
  port: number;
  securePort: number;
  callThrotthle: boolean;
  urlRewrite: {
    from: string,
    to: string
  }
  wwwroot: string;
}