const plateSchema = {
    name: "plate",
    title: "Plate",
    type: "document",
    fields: [
        {
            name: "name",
            title: "Name",
            type: "string",
        },
        {
            name: "description",
            title: "Description",
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
                layout: 'dropdown'
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
        },
    ],
}

export default plateSchema