# Refactorización usando SOLID

Código que rompe alguno/s de los principios SOLID. El objetivo es refactorizar el código para que cumpla con dichos principios.

1. Describir el algoritmo de la operación/es principal del negocio
2. Analizar el código de la funcionalidad pensando en quien me pide cada uno de sus bloques y cómo evolucionaría
3. Indicar si se rompe algún principio SOLID
4. Refactorizar la funcionalidad para que cumpla con SOLID.

Construir feed de red social.

Estás trabajando en una red social que muestra un feed de publicaciones. Cada publicación puede contener diferentes tipos de contenido: texto, imágenes o videos. El sistema actual funciona, pero cada vez que se añade un nuevo tipo de contenido, hay que modificar múltiples partes del código.

```typescript
type Post = {
  id: string;
  author: string;
  timestamp: Date;
  contentType: "text" | "image" | "video";
  content: string;
};

function buildFeedItem(post: Post): string {
  let html = `<div class="post">`;
  html += `<div class="author">${post.author}</div>`;
  html += `<div class="timestamp">${post.timestamp.toISOString()}</div>`;

  if (post.contentType === "text") {
    html += `<div class="text-content">${post.content}</div>`;
    html += `<div class="actions">
                 <button>Like</button>
                 <button>Comment</button>
                 <button>Share</button>
               </div>`;
  } else if (post.contentType === "image") {
    html += `<img src="${post.content}" alt="Post image" />`;
    html += `<div class="actions">
                 <button>Like</button>
                 <button>Comment</button>
                 <button>Share</button>
                 <button>Download</button>
               </div>`;
  } else if (post.contentType === "video") {
    html += `<video src="${post.content}" controls></video>`;
    html += `<div class="video-info">Duration: auto</div>`;
    html += `<div class="actions">
                 <button>Like</button>
                 <button>Comment</button>
                 <button>Share</button>
                 <button>Download</button>
                 <button>Watch Later</button>
               </div>`;
  }

  html += `</div>`;
  return html;
}

function buildFeed(posts: Post[]): string {
  return posts.map((post) => buildFeedItem(post)).join("");
}

// Uso
const posts: Post[] = [
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

const feedHtml = buildFeed(posts);
console.log(feedHtml);
```
