import { describe, expect, test } from "vitest";
import { Post } from "./types/post";
import { FeedBuilder, PostRendererRegistry } from "./social-network";
import {
  ImagePostRenderer,
  TextPostRenderer,
  VideoPostRenderer,
} from "./post-renderers";

const textPost: Post = {
  id: "1",
  author: "Alice",
  timestamp: new Date("2026-01-10T10:00:00Z"),
  contentType: "text",
  content: "Hello world",
};

const imagePost: Post = {
  id: "2",
  author: "Bob",
  timestamp: new Date("2026-01-10T11:00:00Z"),
  contentType: "image",
  content: "https://example.com/image.jpg",
};

const videoPost: Post = {
  id: "3",
  author: "Charlie",
  timestamp: new Date("2026-01-10T12:00:00Z"),
  contentType: "video",
  content: "https://example.com/video.mp4",
};

describe("Given FeedBuilder", () => {
  const registry = new PostRendererRegistry({
    text: new TextPostRenderer(),
    image: new ImagePostRenderer(),
    video: new VideoPostRenderer(),
  });

  const feedBuilder = new FeedBuilder(registry);

  describe("When building a text post", () => {
    test("Then it should render author, timestamp, text content and actions", () => {
      const html = feedBuilder.buildFeedItem(textPost);

      expect(html).toContain(textPost.author);
      expect(html).toContain(textPost.timestamp.toISOString());
      expect(html).toContain(textPost.content);
      expect(html).toContain("Like");
      expect(html).toContain("Comment");
      expect(html).toContain("Share");
    });
  });

  describe("When building an image post", () => {
    test("Then it should render img tag and appropriate actions", () => {
      const html = feedBuilder.buildFeedItem(imagePost);

      expect(html).toContain('<img src="https://example.com/image.jpg"');
      expect(html).toContain("Like");
      expect(html).toContain("Comment");
      expect(html).toContain("Share");
      expect(html).toContain("Download");
    });
  });

  describe("When building a video post", () => {
    test("Then it should render video tag, video info and all actions", () => {
      const html = feedBuilder.buildFeedItem(videoPost);

      expect(html).toContain(
        '<video src="https://example.com/video.mp4" controls>'
      );
      expect(html).toContain("Duration: auto");
      expect(html).toContain("Like");
      expect(html).toContain("Comment");
      expect(html).toContain("Share");
      expect(html).toContain("Download");
      expect(html).toContain("Watch Later");
    });
  });

  describe("When building the full feed", () => {
    test("Then it should include all posts", () => {
      const html = feedBuilder.buildFeed([textPost, imagePost, videoPost]);

      expect(html).toContain(textPost.content);
      expect(html).toContain('<img src="https://example.com/image.jpg"');
      expect(html).toContain(
        '<video src="https://example.com/video.mp4" controls>'
      );
    });
  });
});
