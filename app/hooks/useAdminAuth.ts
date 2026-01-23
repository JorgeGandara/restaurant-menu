"use client";

import { useEffect, useState } from "react";

const ADMIN_KEY_PREFIX = "admin_auth_";

export function useAdminAuth(restaurantSlug: string) {
    const [isAdmin, setIsAdmin] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Check if password is stored in localStorage
        const storedPassword = localStorage.getItem(`${ADMIN_KEY_PREFIX}${restaurantSlug}`);

        if (storedPassword) {
            // Verify with server that this password is still valid
            fetch("/api/verify-admin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    restaurantSlug,
                    password: storedPassword,
                }),
            })
                .then((res) => res.json())
                .then((data) => {
                    setIsAdmin(data.isValid || false);
                    setIsLoading(false);
                })
                .catch(() => {
                    setIsAdmin(false);
                    setIsLoading(false);
                });
        } else {
            setIsAdmin(false);
            setIsLoading(false);
        }
    }, [restaurantSlug]);

    const savePassword = (password: string) => {
        localStorage.setItem(`${ADMIN_KEY_PREFIX}${restaurantSlug}`, password);
        setIsAdmin(true);
    };

    const logout = () => {
        localStorage.removeItem(`${ADMIN_KEY_PREFIX}${restaurantSlug}`);
        setIsAdmin(false);
    };

    return { isAdmin, isLoading, savePassword, logout };
}
