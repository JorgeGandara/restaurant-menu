import { defineField, defineType } from 'sanity';

export const restaurantSettings = defineType({
    name: 'restaurantSettings',
    title: 'Configuración del Restaurante',
    type: 'document',
    fields: [
        defineField({
            name: 'restaurant',
            title: 'Restaurante',
            type: 'reference',
            to: [{ type: 'restaurant' }],
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: 'name',
            title: 'Nombre del Restaurante',
            type: 'string',
        }),
        defineField({
            name: 'description',
            title: 'Descripción Corta',
            type: 'text',
            rows: 3,
        }),
        defineField({
            name: 'address',
            title: 'Dirección',
            type: 'string',
        }),
        defineField({
            name: 'phone',
            title: 'Teléfono',
            type: 'string',
        }),
        defineField({
            name: 'email',
            title: 'Correo Electrónico',
            type: 'string',
        }),
        defineField({
            name: 'instagram',
            title: 'Instagram URL',
            type: 'url',
        }),
        defineField({
            name: 'facebook',
            title: 'Facebook URL',
            type: 'url',
        }),
        defineField({
            name: 'whatsapp',
            title: 'WhatsApp URL',
            type: 'url',
        }),
        defineField({
            name: 'primaryColor',
            title: 'Color de Énfasis',
            description: 'Color principal para botones y textos destacados (Hex code, ej: #EA580C)',
            type: 'string',
            validation: Rule => Rule.regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, {
                name: 'hex', // Error message is "Must be a valid hex color"
                invert: false, // Boolean to allow any value that does NOT match pattern
            }).error('Debe ser un código hexadecimal válido (ej: #EA580C)'),
            initialValue: '#EA580C',
        }),
        defineField({
            name: 'adminKey',
            title: 'Clave de Administrador',
            description: 'Clave para acceder al panel de administración',
            type: 'string',
            hidden: false,
        }),
        defineField({
            name: 'logo',
            title: 'Logo',
            type: 'image',
        }),
        defineField({
            name: 'imagen_del_restaurante',
            title: 'Imagen del Restaurante',
            type: 'image',
        }),
        defineField({
            name: 'backgroundImage',
            title: 'Imagen de Fondo',
            type: 'image',
            options: {
                hotspot: true,
            },
            description: 'Sube una imagen para usar como fondo de pantalla.',
        }),
        defineField({
            name: 'favicon',
            title: 'Favicon',
            type: 'image',
            description: 'Icono de la pestaña del navegador. Se recomienda formato .png o .svg (Sanity procesa mejor estos formatos que .ico).',
        }),
        defineField({
            name: 'googleMapsUrl',
            title: 'URL de Google Maps',
            type: 'url',
        }),
        defineField({
            name: 'videoHowToArrive',
            title: 'Video de Cómo Llegar',
            type: 'object',
            fields: [
                defineField({
                    name: 'source',
                    title: 'Fuente del video',
                    type: 'string',
                    options: {
                        list: [
                            { title: 'Subir archivo', value: 'file' },
                            { title: 'URL externa (YouTube / Vimeo)', value: 'url' },
                        ],
                        layout: 'radio',
                    },
                    initialValue: 'file',
                }),

                defineField({
                    name: 'videoFile',
                    title: 'Archivo de video',
                    type: 'file',
                    options: {
                        accept: 'video/*',
                    },
                    hidden: ({ parent }) => parent?.source !== 'file',
                }),

                defineField({
                    name: 'videoUrl',
                    title: 'URL del video',
                    type: 'url',
                    hidden: ({ parent }) => parent?.source !== 'url',
                }),
            ],
        }),
        defineField({
            name: 'typography',
            title: 'Tipografía del Menú',
            type: 'object',
            options: {
                collapsible: true,
                collapsed: false,
            },
            fields: [
                defineField({
                    name: "fontFamily",
                    title: "Fuente Principal",
                    type: "string",
                    description: "Fuente que se aplicará a todo el menú",
                    options: {
                        list: [
                            // Elegantes
                            { title: "Playfair Display (Elegante)", value: "var(--font-playfair)" },
                            { title: "Cormorant (Sofisticada)", value: "var(--font-cormorant)" },
                            { title: "Lora (Clásica)", value: "var(--font-lora)" },
                            { title: "Crimson Text (Editorial)", value: "var(--font-crimson)" },

                            // Modernas
                            { title: "Montserrat (Moderna)", value: "var(--font-montserrat)" },
                            { title: "Poppins (Amigable)", value: "var(--font-poppins)" },
                            { title: "Inter (Clean)", value: "var(--font-inter)" },
                            { title: "Nunito (Suave)", value: "var(--font-nunito)" },

                            // Impactantes
                            { title: "Bebas Neue (Bold)", value: "var(--font-bebas)" },
                            { title: "Oswald (Fuerte)", value: "var(--font-oswald)" },
                            { title: "Righteous (Casual Bold)", value: "var(--font-righteous)" },

                            // Artesanales
                            { title: "Dancing Script (Script)", value: "var(--font-dancing)" },
                        ],
                    },
                    initialValue: "var(--font-montserrat)",
                }),

                defineField({
                    name: 'fontSize',
                    title: 'Tamaño Base',
                    type: 'string',
                    description: 'Tamaño general del texto',
                    options: {
                        list: [
                            { title: 'Pequeño (14px)', value: '14px' },
                            { title: 'Normal (16px) - Recomendado ✅', value: '16px' },
                            { title: 'Grande (17px)', value: '17px' },
                            { title: 'Extra Grande (18px)', value: '18px' },
                        ],
                    },
                    initialValue: '16px',
                }),

                defineField({
                    name: 'fontWeight',
                    title: 'Peso de la Fuente',
                    type: 'number',
                    description: 'Grosor del texto',
                    options: {
                        list: [
                            { title: 'Light (300)', value: 300 },
                            { title: 'Regular (400) - Recomendado ✅', value: 400 },
                            { title: 'Medium (500)', value: 500 },
                            { title: 'SemiBold (600)', value: 600 },
                            { title: 'Bold (700)', value: 700 },
                        ],
                    },
                    initialValue: 400,
                }),
            ],
        }),
    ],
});
