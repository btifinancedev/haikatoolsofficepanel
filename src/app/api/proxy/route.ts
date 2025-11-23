export async function GET(req: Request) {
  const url = new URL(req.url);
  const targetUrl = url.searchParams.get("url");

  if (!targetUrl) {
    return new Response("Missing target URL", { status: 400 });
  }

  console.log("PROXY GET:", targetUrl);

  // Fetch the target
  const upstream = await fetch(targetUrl);
  const contentType = upstream.headers.get("content-type") || "";

  // If HTML, rewrite internal paths so they go through this proxy
  if (contentType.includes("text/html")) {
    let html = await upstream.text();

    // Extract base origin for relative URLs
    const targetOrigin = new URL(targetUrl).origin;

    // Rewrite fetch("/...") to fetch("/api/proxy?url=<origin>/...")
    html = html.replace(/fetch\("\//g, `fetch("/api/proxy?url=${encodeURIComponent(targetOrigin)}/`);
    html = html.replace(/src="\//g, `src="/api/proxy?url=${encodeURIComponent(targetOrigin)}/`);
    html = html.replace(/href="\//g, `href="/api/proxy?url=${encodeURIComponent(targetOrigin)}/`);
    html = html.replace(/action="\//g, `action="/api/proxy?url=${encodeURIComponent(targetOrigin)}/`);

    return new Response(html, {
      headers: {
        "Content-Type": "text/html",
        "Cache-Control": "no-store",
      },
    });
  }

  // Non-HTML assets
  const buffer = await upstream.arrayBuffer();
  return new Response(buffer, {
    headers: { "Content-Type": contentType },
  });
}

export async function POST(req: Request) {
  const url = new URL(req.url);
  const targetUrl = url.searchParams.get("url");

  if (!targetUrl) {
    return new Response("Missing target URL", { status: 400 });
  }

  console.log("PROXY POST:", targetUrl);

  const body = await req.text();

  const upstream = await fetch(targetUrl, {
    method: "POST",
    headers: {
      "Content-Type": req.headers.get("Content-Type") || "application/json",
    },
    body,
  });

  const contentType = upstream.headers.get("content-type") || "application/json";
  const buffer = await upstream.arrayBuffer();

  return new Response(buffer, {
    headers: { "Content-Type": contentType },
  });
}
