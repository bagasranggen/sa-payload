import { CollectionConfig } from 'payload';

import { BaseEntry } from '@/shared';

export const ProductsCategories: CollectionConfig = {
    slug: 'productsCategories',
    labels: {
        singular: 'Category',
        plural: 'Categories',
    },
    admin: {
        group: 'Pages',
        useAsTitle: 'title',
    },
    fields: BaseEntry({
        typeHandle: 'sectionProductsCategories',
        url: {
            withSlug: false,
            additionalPath: async ({ siblingData, req: { payload } }) => {
                const path: string[] = ['collection'];

                if (siblingData?.category) {
                    try {
                        const category = await payload.findByID({
                            collection: 'categories',
                            id: siblingData.category,
                        });

                        if (category && category?.slug) path.push(category.slug);
                    } catch (err) {
                        // console.log(err);
                    }
                }

                return path;
            },
        },
        tabs: [
            {
                label: 'Content',
                fields: [
                    {
                        type: 'relationship',
                        name: 'category',
                        relationTo: 'categories',
                        required: true,
                    },
                ],
            },
        ],
    }),
};
