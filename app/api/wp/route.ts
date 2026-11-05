import { wpRestUrl } from "@/lib/wp";

export const runtime = "nodejs";

async function proxyToWordPress(request: Request): Promise<Response> {
  const incoming = new URL(request.url);
  const restRoute = incoming.searchParams.get("rest_route");

  if (!restRoute) {
    return Response.json({ message: "Missing rest_route query parameter." }, { status: 400 });
  }

  let target: string;
  try {
    target = wpRestUrl(restRoute);
  } catch (error) {
    const message = error instanceof Error ? error.message : "WordPress URL not configured.";
    return Response.json({ message }, { status: 500 });
  }

  const headers = new Headers();
  const accept = request.headers.get("accept");
  if (accept) headers.set("Accept", accept);

  const contentType = request.headers.get("content-type");
  const init: RequestInit = { method: request.method, headers };

  if (request.method !== "GET" && request.method !== "HEAD") {
    const body = await request.arrayBuffer();
    if (body.byteLength > 0) {
      init.body = body;
      if (contentType) headers.set("Content-Type", contentType);
    }
  }

  const upstream = await fetch(target, init);
  const responseHeaders = new Headers();
  const upstreamType = upstream.headers.get("content-type");
  if (upstreamType) responseHeaders.set("Content-Type", upstreamType);

  return new Response(upstream.body, {
    status: upstream.status,
    headers: responseHeaders,
  });
}

export async function GET(request: Request) {
  return proxyToWordPress(request);
}

export async function POST(request: Request) {
  return proxyToWordPress(request);
}

export async function PUT(request: Request) {
  return proxyToWordPress(request);
}

export async function PATCH(request: Request) {
  return proxyToWordPress(request);
}

export async function DELETE(request: Request) {
  return proxyToWordPress(request);
}
