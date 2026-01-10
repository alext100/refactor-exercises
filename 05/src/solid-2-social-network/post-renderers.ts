import { Post } from "./types/post";

export interface PostRenderer {
  renderContent(post: Post): string;
  renderActions(): string;
}

/* Text Post */
export class TextPostRenderer implements PostRenderer {
  renderContent(post: Post): string {
    return `<div class="text-content">${post.content}</div>`;
  }

  renderActions(): string {
    return `
      <button>Like</button>
      <button>Comment</button>
      <button>Share</button>
    `;
  }
}

/* Image Post */
export class ImagePostRenderer implements PostRenderer {
  renderContent(post: Post): string {
    return `<img src="${post.content}" alt="Post image" />`;
  }

  renderActions(): string {
    return `
      <button>Like</button>
      <button>Comment</button>
      <button>Share</button>
      <button>Download</button>
    `;
  }
}

/* Video Post */
export class VideoPostRenderer implements PostRenderer {
  renderContent(post: Post): string {
    return `
      <video src="${post.content}" controls></video>
      <div class="video-info">Duration: auto</div>
    `;
  }

  renderActions(): string {
    return `
      <button>Like</button>
      <button>Comment</button>
      <button>Share</button>
      <button>Download</button>
      <button>Watch Later</button>
    `;
  }
}
