export type PlateImage = {
    _type?: "image";
    asset?: {
        _type?: "reference";
        _ref: string;
    };
};

export type Plate ={
    _id: string;
    name: string;
    description: string;
    recipe?: string;
    category: string;
    image?: PlateImage | string; // permite referencia de Sanity o string de fallback
    price: number;
    restaurantId: string; // ✅ agregado para MultiRestaurante
};
    
        