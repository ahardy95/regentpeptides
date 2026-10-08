import { createFileRoute, redirect } from "@tanstack/react-router";

/**
 * Legacy route kept for inbound links; its content now lives at /quality.
 */
export const Route = createFileRoute("/standards")({
  beforeLoad: () => {
    throw redirect({ to: "/quality", statusCode: 301 });
  },
});
