import { IMedia } from "./Media.tsx";
export interface IMovie extends IMedia {
  original_title: string;
  release_date: string;
  title: string;
  video: boolean;
}
