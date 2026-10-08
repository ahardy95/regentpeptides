import { createFileRoute, redirect } from "@tanstack/react-router";

/**
 * Legacy route kept for inbound links; its content now lives at /lab-reports.
 */
export const Route = createFileRoute("/lab-testing")({
  beforeLoad: () => {
    throw redirect({ to: "/lab-reports", statusCode: 301 });
  },
});
