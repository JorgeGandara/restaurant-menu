"use client";

import { useRouter } from "next/navigation";
import { useRef } from "react";

type AdminActivatorProps = {
    restaurant: string;
    children: React.ReactNode;
};

export default function AdminActivator({
    restaurant,
    children,
}: AdminActivatorProps) {
    const router = useRouter();
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const startPress = () => {
        timerRef.current = setTimeout(() => {
            router.push(`/${restaurant}/admin`);
        }, 5000); // 5  segundos
    };

    const endPress = () => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
            timerRef.current = null;
        }
    };

    return (
        <div
            onMouseDown={startPress}
            onMouseUp={endPress}
            onMouseLeave={endPress}
            onTouchStart={startPress}
            onTouchEnd={endPress}
        >
            {children}
        </div>
    );
}
