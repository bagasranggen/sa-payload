import { CollectionConfig } from 'payload';

import { BaseEntry } from '@/shared';

import { revalidatePage, RevalidatePageProps } from '@/libs/utils';
import { getCollectionUrl } from '@/libs/factory';

export const Sizes: CollectionConfig = {
    slug: 'sizes',
    admin: {
        group: 'Taxonomies',
        useAsTitle: 'title',
    },
    hooks: {
        afterChange: [
            async ({ req: { payload } }) => {
                const revalidatePaths: RevalidatePageProps['items'] = [{ path: '/collection' }];

                const paths = await getCollectionUrl({ payload });
                if (paths) revalidatePaths.push(...paths);

                await revalidatePage({ items: revalidatePaths });
            },
        ],
    },
    fields: BaseEntry({
        typeHandle: 'sectionTaxonomiesSizes',
        url: { enabled: false },
        tabs: [],
    }),
};
