declare let self: ServiceWorkerGlobalScope;

self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);
  console.log("fetch event");
  console.log(url);

  if (
    event.request.method === "POST" &&
    url.pathname === "/api/register_article"
  ) {
    console.log("redirecting to /");
    event.respondWith(Response.redirect("/"));
  }
});

export {};
