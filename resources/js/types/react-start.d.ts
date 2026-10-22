declare module "@tanstack/react-start" {
  export function createStart(factory: () => { requestMiddleware?: unknown[] }): unknown;
  export function createMiddleware(): {
    server(
      handler: (args: { next: () => Promise<Response> | Response }) => Promise<Response> | Response,
    ): unknown;
  };
}

declare module "@tanstack/react-start/server-entry" {
  const serverEntry: {
    fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
  };

  export default serverEntry;
}
