import { CollectionConfig } from 'payload';

import { BaseEntry } from '@/shared';

import { revalidatePage, RevalidatePageProps } from '@/libs/utils';

export const Labels: CollectionConfig = {
    slug: 'labels',

    admin: {
        group: 'Taxonomies',
        useAsTitle: 'title',
    },
    hooks: {
        afterChange: [
            async ({ doc, req: { payload } }) => {
                const revalidatePaths: RevalidatePageProps['items'] = [];

                try {
                    const products = await payload.find({
                        collection: 'products',
                    });

                    if (products && products?.docs && products.docs.length > 0) {
                        products.docs.forEach((item) => {
                            const labelIds: number[] = [];

                            if (item?.summaries?.[0]?.details && item.summaries[0].details?.length > 0) {
                                item.summaries[0].details?.forEach((itm) => {
                                    const label = itm?.label;

                                    if (label && typeof label !== 'number' && label?.id) labelIds.push(label.id);
                                });
                            }

                            if (labelIds.includes(doc?.id) && item?.uri) revalidatePaths.push({ path: `/${item.uri}` });
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
        typeHandle: 'sectionTaxonomiesLabels',
        url: { enabled: false },
        tabs: [],
    }),
};
