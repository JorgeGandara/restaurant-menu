import LoginForm from "./LoginForm";

export default async function LoginPage({
    params,
}: {
    params: Promise<{ restaurant: string }>;
}) {
    const { restaurant } = await params;
    return <LoginForm restaurant={restaurant} />;
}
