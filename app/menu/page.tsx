import { getPlates } from "../../sanity/sanity-utils";
import { Plate } from "../../types/Plate";

export default async function Home() {
    const plates = await getPlates();
  return (
    <div>
        {plates.map((plate: Plate) => (
            <div key={plate._id}>
                <h2>{plate.name}</h2>

                <h2>{plate.price}</h2>
            </div>
        ))}
    </div>
    );
}
