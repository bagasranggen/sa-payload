import { CollectionConfig } from 'payload';

import { BaseEntry } from '@/shared';

import { revalidatePage, RevalidatePageProps } from '@/libs/utils';

export const Tags: CollectionConfig = {
    slug: 'tags',

    admin: {
        group: 'Taxonomies',
        useAsTitle: 'title',
    },
    hooks: {
        afterChange: [
            async ({ doc, req: { payload } }) => {
                const revalidatePaths: RevalidatePageProps['items'] = [{ path: '/' }];

                try {
                    const homepage = await payload.findGlobal({
                        slug: 'homepage',
                    });

                    if (homepage && homepage?.highlights && homepage.highlights.length > 0) {
                        homepage.highlights.forEach((item) => {
                            if (typeof item === 'number') return;

                            const tag = item?.tag;

                            if (tag && typeof tag !== 'number' && tag?.id === doc?.id) {
                                revalidatePaths.push({ path: '/' });
                            }
                        });
                    }

                    const products = await payload.find({
                        collection: 'products',
                    });

                    const categoryIds: number[] = [];

                    if (products && products?.docs && products.docs.length > 0) {
                        products.docs.forEach((item) => {
                            const tag = item?.tag;
                            const category = item?.category;

                            const isRelated = tag && typeof tag !== 'number' && tag?.id === doc?.id;

                            if (isRelated) {
                                revalidatePaths.push({ path: '/collection' });
                                revalidatePaths.push({ path: '/' });
                            }

                            if (isRelated && category && category.length > 0) {
                                category.forEach((item) => {
                                    if (typeof item === 'number') return;

                                    categoryIds.push(item.id);
                                });
                            }
                        });
                    }

                    const pages = await payload.find({
                        collection: 'pages',
                        where: {
                            typeHandle: {
                                equals: 'sectionProductsCategories',
                            },
                            'productCategory.id': {
                                in: categoryIds,
                            },
                        },
                    });

                    if (pages && pages?.docs && pages.docs.length > 0) {
                        pages.docs.forEach((item) => {
                            if (item?.uri) revalidatePaths.push({ path: `/${item.uri}` });
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
        typeHandle: 'sectionTaxonomiesTags',
        url: { enabled: false },
        tabs: [],
    }),
};
