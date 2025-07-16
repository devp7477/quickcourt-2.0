import { inngest } from "./client";

export const helloWorld = inngest.createFunction(
    { id: "hello-world" },
    { event: "test/hello.world" },
    async ({ event, step }) => {
        // Imagine this is as a downloading step
        await step.sleep("wait-a-moment", "30s");
        // This is where you would handle the event
        console.log("waiting for event:", event.data);
        await step.sleep("after-wait", "10s");
        console.log("after waiting for event:", event.data);
        return { message: `Hello ${event.data.email}!` };
    },
);
