import { IMedia } from "./Media.tsx";

export interface IShow extends IMedia {
  origin_country: string[];
  original_name: string;
  first_air_date: string;
  name: string;
  number_of_seasons: number;
}
