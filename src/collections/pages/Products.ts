import { CollectionConfig } from 'payload';

import { BaseEntry } from '@/shared';

import { PAGES_TYPE_HANDLES, PAGES_TYPE_OPTIONS_HANDLES } from '@/libs/constants';
import { revalidatePage, RevalidatePageProps } from '@/libs/utils';

export const Products: CollectionConfig = {
    slug: 'products',
    admin: {
        group: 'Pages',
        useAsTitle: 'title',
    },
    hooks: {
        afterChange: [
            async ({ doc, req: { payload } }) => {
                const revalidatePaths: RevalidatePageProps['items'] = [{ path: '/collection' }];
                if (doc?.uri) revalidatePaths.push({ path: `/${doc.uri}` });

                try {
                    const homepage = await payload.findGlobal({
                        slug: 'homepage',
                    });

                    // Check highlight
                    const highlightIDs: number[] = [];
                    if (homepage && homepage?.highlights && homepage?.highlights.length > 0) {
                        homepage.highlights.forEach((itm) => {
                            if (typeof itm !== 'number' && itm?.id) highlightIDs.push(itm.id);
                        });
                    }

                    if (highlightIDs.includes(doc?.id)) revalidatePaths.push({ path: '/' });

                    const pages = await payload.find({
                        collection: 'pages',
                        where: {
                            typeHandle: {
                                equals: 'sectionProductsCategories',
                            },
                        },
                    });

                    // Check collection pages to update
                    if (pages && pages?.docs && pages.docs.length > 0) {
                        pages.docs.forEach((item) => {
                            const category = item?.productCategory;

                            if (category && typeof category !== 'number' && category?.id === doc?.category) {
                                revalidatePaths.push({ path: `/${item?.uri}` });
                            }
                        });
                    }
                } catch (e) {
                    console.log(e);
                }

                await revalidatePage({ items: revalidatePaths });
            },
        ],
    },
    fields: BaseEntry({
        typeHandle: [PAGES_TYPE_OPTIONS_HANDLES[PAGES_TYPE_HANDLES.PRODUCTS]],
        seo: { mediaRelation: 'mediaProducts' },
        url: {
            additionalPath: async ({ siblingData, req: { payload } }) => {
                const path: string[] = ['collection'];

                // if (siblingData?.category) {
                //     try {
                //         const category = await payload.findByID({
                //             collection: 'categories',
                //             id: siblingData.category,
                //         });
                //
                //         if (category && category?.slug) path.push(category.slug);
                //     } catch (err) {
                //         // console.log(err);
                //     }
                // }

                return path;
            },
        },
        tabs: [
            {
                label: 'Media',
                fields: [
                    {
                        type: 'upload',
                        name: 'media',
                        relationTo: 'mediaProducts',
                        hasMany: true,
                        required: true,
                    },
                    {
                        type: 'upload',
                        name: 'mediaSizeGuides',
                        label: 'Size Guides',
                        relationTo: 'mediaProducts',
                        hasMany: true,
                    },
                ],
            },
            {
                label: 'Summaries',
                fields: [
                    {
                        type: 'richText',
                        name: 'shortDescription',
                    },
                    {
                        type: 'array',
                        name: 'summaries',
                        interfaceName: 'Summaries',
                        label: false,
                        labels: {
                            plural: 'Summaries',
                            singular: 'Summary',
                        },
                        fields: [
                            {
                                type: 'relationship',
                                relationTo: 'labels',
                                name: 'title',
                            },
                            {
                                type: 'array',
                                name: 'details',
                                fields: [
                                    {
                                        type: 'row',
                                        fields: [
                                            {
                                                type: 'relationship',
                                                relationTo: 'labels',
                                                name: 'label',
                                                admin: {
                                                    width: '50%',
                                                },
                                            },
                                            {
                                                type: 'text',
                                                name: 'value',
                                                admin: {
                                                    width: '50%',
                                                },
                                            },
                                        ],
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
            {
                label: 'Booked Dates',
                fields: [
                    {
                        type: 'array',
                        name: 'bookedDates',
                        label: false,
                        labels: {
                            plural: 'Booked Date',
                            singular: 'Booked Date',
                        },
                        fields: [
                            {
                                type: 'row',
                                fields: [
                                    {
                                        type: 'date',
                                        name: 'from',
                                    },
                                    {
                                        type: 'date',
                                        name: 'to',
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
            {
                label: 'Content',
                fields: [
                    {
                        type: 'group',
                        fields: [
                            {
                                type: 'array',
                                name: 'prices',
                                interfaceName: 'Prices',
                                fields: [
                                    {
                                        type: 'row',
                                        fields: [
                                            {
                                                type: 'number',
                                                name: 'price',
                                                required: true,
                                                admin: {
                                                    width: '44%',
                                                },
                                            },
                                            {
                                                type: 'number',
                                                name: 'salePrice',
                                                admin: {
                                                    width: '44%',
                                                },
                                            },
                                            {
                                                type: 'number',
                                                name: 'days',
                                                defaultValue: 3,
                                                required: true,
                                                admin: {
                                                    width: '12%',
                                                },
                                            },
                                        ],
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        type: 'row',
                        fields: [
                            {
                                type: 'relationship',
                                name: 'category',
                                relationTo: 'categories',
                                hasMany: true,
                                admin: {
                                    width: '50%',
                                },
                            },
                            {
                                type: 'relationship',
                                name: 'colors',
                                relationTo: 'colors',
                                hasMany: true,
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
                            {
                                type: 'relationship',
                                name: 'tag',
                                relationTo: 'tags',
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
