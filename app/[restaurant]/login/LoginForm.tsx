"use client";

import { useActionState, useEffect, useRef } from "react";
import { login } from "@/app/actions/auth";
import { useRouter } from "next/navigation";

type LoginFormProps = {
    restaurant: string;
};

const initialState = {
    error: undefined,
    success: false,
};

export default function LoginForm({ restaurant }: LoginFormProps) {
    const [state, formAction, isPending] = useActionState(login, initialState);
    const passwordRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    // ✅ REDIRECCIÓN ÚNICA Y CORRECTA
    useEffect(() => {
        if (state?.success) {
            router.replace(`/${restaurant}/admin`);
        }
    }, [state, restaurant, router]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-gray-900">
                        Acceso Administrativo
                    </h1>
                    <p className="text-gray-500 mt-2">
                        Ingresa la clave para continuar
                    </p>
                </div>

                <form action={formAction} className="space-y-6">
                    <input
                        type="hidden"
                        name="restaurantSlug"
                        value={restaurant}
                    />

                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            Contraseña
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            ref={passwordRef}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500"
                            placeholder="••••••••"
                        />
                    </div>

                    {state?.error && (
                        <div className="p-3 bg-red-50 text-red-700 text-sm rounded-lg">
                            {state.error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isPending}
                        className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 rounded-lg disabled:opacity-50"
                    >
                        {isPending ? "Validando..." : "Ingresar"}
                    </button>
                </form>
            </div>
        </div>
    );
}
