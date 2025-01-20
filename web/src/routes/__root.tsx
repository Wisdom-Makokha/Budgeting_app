import PageWrapper from "@components/PageWrapper";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import React from "react";

export const Route = createRootRoute({
    component: () => (
        <>
            <PageWrapper>
                <Outlet />
            </PageWrapper>
            <TanStackRouterDevtools />
        </>
    ),
});
