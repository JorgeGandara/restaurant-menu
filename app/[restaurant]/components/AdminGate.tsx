"use client";

import { useAdminAuth } from "@/app/hooks/useAdminAuth";

type AdminGateProps = {
    restaurant: string;
    children: React.ReactNode;
};

export default function AdminGate({
    restaurant,
    children,
}: AdminGateProps) {
    const { isAdmin, isLoading } = useAdminAuth(restaurant);

    if (isLoading) return null;
    if (!isAdmin) return null;

    return <>{children}</>;
}
