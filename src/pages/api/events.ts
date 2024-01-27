import type { APIRoute } from "astro";

interface Client {
  id: number;
  controller: ReadableStreamDefaultController;
}

let clients: Client[] = [];

export const GET: APIRoute = async ({ request }) => {
  const headers = {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
  };

  const stream = new ReadableStream({
    start(controller) {
      const clientId = Date.now();
      clients.push({ id: clientId, controller });

      const keepAliveInterval = setInterval(() => {
        controller.enqueue(":keepalive\n\n");
      }, 15000);

      request.signal.addEventListener("abort", () => {
        clearInterval(keepAliveInterval);
        clients = clients.filter((client) => client.id !== clientId);
        controller.close();
      });
    },
  });

  return new Response(stream, { headers });
};

export function broadcastMessage(message: string) {
  clients.forEach((client) => {
    client.controller.enqueue(`data: ${JSON.stringify(message)}\n\n`);
  });
}