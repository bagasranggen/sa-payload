import type { CollectionConfig } from 'payload';

import { BaseAssets } from '@/shared';

export const Media: CollectionConfig = BaseAssets({
    slug: 'media',
    imageSizes: [
        {
            name: 'assets800x800',
            width: 800,
            height: 800,
        },
    ],
});
