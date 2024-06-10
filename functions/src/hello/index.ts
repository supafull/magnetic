function handler(_req: Request): Response {
  return new Response(`"Hello from Edge Functions!"`, {
    headers: { "Content-Type": "application/json" },
  });
}

Deno.serve(handler);

// To invoke:
// curl 'http://localhost:<KONG_HTTP_PORT>/functions/v1/hello' \
//   --header 'Authorization: Bearer <anon/service_role API key>'
