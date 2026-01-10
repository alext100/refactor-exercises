import { Post } from "./types/post";

export const posts: Post[] = [
  {
    id: "1",
    author: "Alice",
    timestamp: new Date(),
    contentType: "text",
    content: "Hello world!",
  },
  {
    id: "2",
    author: "Bob",
    timestamp: new Date(),
    contentType: "image",
    content: "https://example.com/image.jpg",
  },
  {
    id: "3",
    author: "Charlie",
    timestamp: new Date(),
    contentType: "video",
    content: "https://example.com/video.mp4",
  },
];
