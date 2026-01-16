import { getPlates } from "../sanity/sanity-utils";

export default async function Home() {
    const plates = await getPlates();
  return (
    <div>
        {plates.map((plate) => (
            <div key={plate._id}>
                <h2>{plate.name}</h2>
            </div>
        ))}
    </div>
    );
}
