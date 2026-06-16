import { CollectionConfig } from 'payload';

import { colorPickerField } from '@innovixx/payload-color-picker-field';

import { BaseEntry } from '@/shared';

import { revalidatePage, RevalidatePageProps } from '@/libs/utils';
import { getCollectionUrl } from '@/libs/factory';

export const Colors: CollectionConfig = {
    slug: 'colors',
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
        typeHandle: 'sectionTaxonomiesColors',
        url: { enabled: false },
        tabs: [
            {
                label: 'Content',
                fields: [
                    colorPickerField({
                        name: 'color',
                    }),
                ],
            },
        ],
    }),
};
