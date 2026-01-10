import {
  ImagePostRenderer,
  PostRenderer,
  TextPostRenderer,
  VideoPostRenderer,
} from "./post-renderers";
import { posts } from "./posts";
import { ContentType } from "./types/content-type";
import { Post } from "./types/post";

export class PostRendererRegistry {
  private readonly renderers: Record<ContentType, PostRenderer>;

  constructor(renderers: Record<ContentType, PostRenderer>) {
    this.renderers = renderers;
  }

  getRenderer(type: ContentType): PostRenderer {
    return this.renderers[type];
  }
}

export class FeedBuilder {
  constructor(private readonly registry: PostRendererRegistry) {}

  buildFeedItem(post: Post & { contentType: ContentType }): string {
    const renderer = this.registry.getRenderer(post.contentType);

    return `
      <div class="post">
        <div class="author">${post.author}</div>
        <div class="timestamp">${post.timestamp.toISOString()}</div>
        ${renderer.renderContent(post)}
        <div class="actions">
          ${renderer.renderActions()}
        </div>
      </div>
    `;
  }

  buildFeed(posts: Post[]): string {
    return posts.map((post) => this.buildFeedItem(post)).join("");
  }
}

// Usage example
const registry = new PostRendererRegistry({
  text: new TextPostRenderer(),
  image: new ImagePostRenderer(),
  video: new VideoPostRenderer(),
});

const feedBuilder = new FeedBuilder(registry);

const feedHtml = feedBuilder.buildFeed(posts);
console.log(feedHtml);
