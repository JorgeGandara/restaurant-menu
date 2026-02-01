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
            type: "reference",
            to: [{ type: "category" }],
            options: {
                filter: ({ document }: any) => {
                    if (!document?.restaurant) {
                        return {
                            filter: '!defined(restaurant)',
                        }
                    }
                    return {
                        filter: 'restaurant._ref == $restaurantId',
                        params: {
                            restaurantId: document.restaurant._ref
                        }
                    }
                }
            }
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
