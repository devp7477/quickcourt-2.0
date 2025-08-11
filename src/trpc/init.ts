import { initTRPC, TRPCError } from '@trpc/server';
import { cache } from 'react';
import superjson from 'superjson';

import { headers } from 'next/headers';
import { PrismaClient } from '@/generated/prisma';
import { auth } from '@clerk/nextjs/server';

const prisma = new PrismaClient();

export const createTRPCContext = cache(async () => {
    try {
        // Get auth from Clerk - auth() returns a promise with auth data
        const { userId: clerkUserId } = await auth();

        // If user is authenticated with Clerk, get their DB user record
        let dbUser = null;
        let dbUserId = null;

        if (clerkUserId) {
            // Find the user in our database using the Clerk ID
            const userRecord = await prisma.user.findFirst({
                where: {
                    clerkUserId: clerkUserId
                }
            });

            if (userRecord) {
                dbUser = userRecord;
                dbUserId = userRecord.id;
            }
        }

        return {
            clerkUserId,
            userId: dbUserId,
            user: dbUser,
            prisma,
        };
    } catch (error) {
        console.error('Failed to get auth:', error);
        return {
            clerkUserId: null,
            userId: null,
            user: null,
            prisma,
        };
    }
});

export type Context = Awaited<ReturnType<typeof createTRPCContext>>;

// Initialize tRPC with context
const t = initTRPC.context<Context>().create({
    /**
     * @see https://trpc.io/docs/server/data-transformers
     */
    transformer: superjson,
});
// Base router and procedure helpers
export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(({ ctx, next }) => {
    if (!ctx.clerkUserId || !ctx.userId) {
        throw new TRPCError({
            code: 'UNAUTHORIZED',
            message: 'You must be logged in to access this resource',
        });
    }
    return next({
        ctx: {
            ...ctx,
            clerkUserId: ctx.clerkUserId,
            userId: ctx.userId,
            user: ctx.user,
        },
    });
});

export const adminProcedure = protectedProcedure.use(async ({ ctx, next }) => {
    if (!ctx.userId) {
        throw new TRPCError({
            code: 'UNAUTHORIZED',
            message: 'You must be logged in to access this resource',
        });
    }

    const user = await ctx.prisma.user.findUnique({
        where: { id: ctx.userId },
        select: { role: true },
    });

    if (user?.role !== 'ADMIN') {
        throw new TRPCError({
            code: 'FORBIDDEN',
            message: 'Admin access required',
        });
    }

    return next({ ctx });
});

// Facility owner procedure (can be owner or admin)
export const facilityOwnerProcedure = protectedProcedure.use(async ({ ctx, next }) => {
    if (!ctx.userId) {
        throw new TRPCError({
            code: 'UNAUTHORIZED',
            message: 'You must be logged in to access this resource',
        });
    }

    const user = await ctx.prisma.user.findUnique({
        where: { id: ctx.userId },
        select: { role: true },
    });

    if (user?.role !== 'FACILITY_OWNER' && user?.role !== 'ADMIN') {
        throw new TRPCError({
            code: 'FORBIDDEN',
            message: 'Facility owner access required',
        });
    }

    return next({ ctx });
});