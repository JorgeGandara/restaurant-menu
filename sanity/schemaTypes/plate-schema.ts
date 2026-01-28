const plateSchema = {
    name: "plate",
    title: "Plate",
    type: "document",
    fields: [
        {
            name: "restaurant",
            title: "Restaurante",
            type: "reference",
            to: [{ type: "restaurant" }],
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: "name",
            title: "Name",
            type: "string",
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: "description",
            title: "Description",
            type: "text",
        },
        {
            name: "recipe",
            title: "Receta (Solo Admin)",
            type: "text",
        },
        {
            name: "category",
            title: "Category",
            type: "string",
            options: {
                list: [
                    { title: "Entradas", value: "entradas" },
                    { title: "Platos Fuertes", value: "platos-fuertes" },
                    { title: "Postres", value: "postres" },
                    { title: "Bebidas", value: "bebidas" },
                ],
                layout: "dropdown",
            },
        },
        {
            name: "image",
            title: "Image",
            type: "image",
        },
        {
            name: "price",
            title: "Price",
            type: "number",
            validation: (Rule: any) => Rule.min(0),
        },
    ],
};

export default plateSchema;
