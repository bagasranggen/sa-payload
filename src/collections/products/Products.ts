import { CollectionConfig } from 'payload';
import { BaseEntry } from '@/collections/shared';

export const Products: CollectionConfig = {
    slug: 'products',
    admin: {
        group: 'Products',
        useAsTitle: 'title',
    },
    fields: BaseEntry({
        typeHandle: 'sectionProducts',
        url: {
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
                label: 'Media',
                fields: [],
            },
            {
                label: 'Content',
                fields: [
                    {
                        type: 'row',
                        fields: [
                            {
                                type: 'relationship',
                                name: 'category',
                                relationTo: 'categories',
                                admin: {
                                    width: '50%',
                                },
                            },
                            {
                                type: 'relationship',
                                name: 'sizes',
                                relationTo: 'sizes',
                                hasMany: true,
                                admin: {
                                    width: '50%',
                                },
                            },
                        ],
                    },
                ],
            },
        ],
    }),
};
