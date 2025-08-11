import { z } from 'zod';
import { createTRPCRouter } from '../init';
import { text } from 'stream/consumers';
// import { authRouter } from './auth-router';
export const appRouter = createTRPCRouter({
    // auth: authRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;