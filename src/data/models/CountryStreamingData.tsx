import { IStreamingProvider } from "./StreamingProvider.tsx";
export interface CountryStreamingData {
  link: string;
  buy?: IStreamingProvider[];
  rent?: IStreamingProvider[];
  flatrate?: IStreamingProvider[];
}
