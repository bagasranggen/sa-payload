import { CollectionConfig } from 'payload';

import { BaseAssets } from '@/shared';

export const MediaProducts: CollectionConfig = BaseAssets({
    slug: 'mediaProducts',
    imageSizes: [
        {
            name: 'assets1000xauto',
            width: 1000,
        },
        {
            name: 'assets1000x1400',
            width: 1000,
            height: 1400,
        },
        {
            name: 'assets600x800',
            width: 600,
            height: 800,
        },
        {
            name: 'assets800x600',
            width: 800,
            height: 600,
        },
        {
            name: 'assets600x400',
            width: 600,
            height: 400,
        },
        {
            name: 'assets400x560',
            width: 400,
            height: 560,
        },
        {
            name: 'assets300x300',
            width: 300,
            height: 300,
        },
    ],
});
