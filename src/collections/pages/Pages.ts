import { CollectionConfig } from 'payload';

import { BaseEntry, ContentBlocks } from '@/shared';

import { PAGES_TYPE_HANDLES, PAGES_TYPE_OPTIONS_HANDLES } from '@/libs/constants';
import { revalidatePage, RevalidatePageProps } from '@/libs/utils';

export const Pages: CollectionConfig = {
    slug: 'pages',
    admin: {
        group: 'Pages',
        useAsTitle: 'title',
        groupBy: true,
    },
    hooks: {
        afterChange: [
            async ({ doc, req: { payload } }) => {
                const typeHandle = doc.typeHandle;
                const revalidatePaths: RevalidatePageProps['items'] = [];

                if (doc?.uri) revalidatePaths.push({ path: `/${doc?.uri}` });

                try {
                    if (typeHandle === PAGES_TYPE_OPTIONS_HANDLES[PAGES_TYPE_HANDLES.PRODUCTS_CATEGORIES]) {
                        const homepage = await payload.findGlobal({
                            slug: 'homepage',
                        });

                        const collectionIDs: number[] = [];
                        if (homepage && homepage?.collections && homepage?.collections.length > 0) {
                            homepage.collections.forEach((item) => {
                                const category = item && typeof item !== 'number' ? item?.productCategory : undefined;

                                if (
                                    typeof item !== 'number' &&
                                    category &&
                                    typeof category !== 'number' &&
                                    category?.id &&
                                    item?.id
                                ) {
                                    collectionIDs.push(category.id);
                                }
                            });
                        }

                        if (collectionIDs.includes(doc?.productCategory)) revalidatePaths.push({ path: '/' });
                    }
                } catch (e) {
                    console.log(e);
                }

                await revalidatePage({ items: revalidatePaths });
            },
        ],
    },

    fields: BaseEntry({
        typeHandle: [
            PAGES_TYPE_OPTIONS_HANDLES[PAGES_TYPE_HANDLES.ORDERS],
            PAGES_TYPE_OPTIONS_HANDLES[PAGES_TYPE_HANDLES.STATIC_PAGES],
            PAGES_TYPE_OPTIONS_HANDLES[PAGES_TYPE_HANDLES.PRODUCTS_LISTING],
            PAGES_TYPE_OPTIONS_HANDLES[PAGES_TYPE_HANDLES.PRODUCTS_CATEGORIES],
        ],
        url: {
            withSlug: (siblingData) => {
                const typeHandle = siblingData?.typeHandle;

                if (typeHandle === PAGES_TYPE_HANDLES.PRODUCTS_CATEGORIES) return false;

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
        fields: [
            {
                type: 'upload',
                name: 'image',
                relationTo: 'media',
            },
        ],
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
                        type: 'upload',
                        name: 'productMedia',
                        relationTo: 'media',
                        required: true,
                        admin: {
                            condition: (data, siblingData) => {
                                return siblingData?.typeHandle === PAGES_TYPE_HANDLES.PRODUCTS_CATEGORIES;
                            },
                        },
                    },
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
