import { ContentType } from "./content-type";

export type Post = {
  id: string;
  author: string;
  timestamp: Date;
  contentType: ContentType;
  content: string;
};
