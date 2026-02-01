export default function Loading() {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
            <div className="relative">
                {/* Outer Ring */}
                <div className="h-24 w-24 rounded-full border-4 border-white/20 border-t-[var(--primary-color)] animate-spin shadow-xl"></div>

                {/* Inner Glow */}
                <div className="absolute inset-0 m-auto h-16 w-16 rounded-full bg-[var(--primary-color)] opacity-20 blur-xl animate-pulse"></div>

                {/* Logo/Icon Placeholder */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-2 w-2 rounded-full bg-white animate-ping"></div>
                </div>
            </div>

            {/* Loading Text */}
            <div className="absolute top-[calc(50%+4rem)] text-white font-medium tracking-widest uppercase text-sm animate-pulse">
                Cargando...
            </div>
        </div>
    );
}
