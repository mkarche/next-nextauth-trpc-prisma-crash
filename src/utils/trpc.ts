import { createReactQueryHooks } from "@trpc/react";
import type { AppRouter } from "../../src/server/routers/_app";

//Creating React Query Hooks
export const trpc = createReactQueryHooks<AppRouter>();
