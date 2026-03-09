import { CollectionConfig } from 'payload';

import { PAGES_TYPE_HANDLES, PAGES_TYPE_OPTIONS_HANDLES } from '@/libs/constants';

import { BaseEntry, ContentBlocks } from '@/shared';

export const Pages: CollectionConfig = {
    slug: 'pages',

    admin: {
        group: 'Pages',
        useAsTitle: 'title',
    },
    fields: BaseEntry({
        typeHandle: [
            PAGES_TYPE_OPTIONS_HANDLES[PAGES_TYPE_HANDLES.STATIC_PAGES],
            PAGES_TYPE_OPTIONS_HANDLES[PAGES_TYPE_HANDLES.PRODUCTS_LISTING],
            PAGES_TYPE_OPTIONS_HANDLES[PAGES_TYPE_HANDLES.PRODUCTS_CATEGORIES],
        ],

        url: {
            withSlug: (siblingData) => {
                const typeHandle = siblingData?.typeHandle;

                if (typeHandle === PAGES_TYPE_HANDLES.PRODUCTS_CATEGORIES) return false;
                // console.log({ from: 'slug', siblingData });

                return true;
            },
            additionalPath: async ({ siblingData, req: { payload } }) => {
                const path: string[] = [];

                const typeHandle = siblingData?.typeHandle;

                if (typeHandle === PAGES_TYPE_HANDLES.PRODUCTS_CATEGORIES) {
                    path.push('collection');

                    if (siblingData?.productCategory) {
                        try {
                            const category = await payload.findByID({
                                collection: 'categories',
                                id: siblingData.productCategory,
                            });

                            if (category && category?.slug) path.push(category.slug);
                        } catch {
                            // console.log(err);
                        }
                    }
                }

                // console.log({ props });

                return path;
            },
        },
        tabs: [
            {
                label: 'Content',
                admin: {
                    condition: (data, siblingData) => {
                        return siblingData?.typeHandle === PAGES_TYPE_HANDLES.PRODUCTS_CATEGORIES;
                    },
                },
                fields: [
                    {
                        type: 'relationship',
                        name: 'productCategory',
                        label: 'Category',
                        relationTo: 'categories',
                        required: true,
                        admin: {
                            condition: (data, siblingData) => {
                                return siblingData?.typeHandle === PAGES_TYPE_HANDLES.PRODUCTS_CATEGORIES;
                            },
                        },
                    },
                ],
            },
            {
                label: 'Content',
                admin: {
                    condition: (data, siblingData) => {
                        return siblingData?.typeHandle === PAGES_TYPE_HANDLES.STATIC_PAGES;
                    },
                },
                fields: [ContentBlocks()],
            },
        ],
    }),
};
