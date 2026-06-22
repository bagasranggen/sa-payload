import { CollectionConfig } from 'payload';

import { BaseAssets } from '@/shared';

export const MediaProducts: CollectionConfig = BaseAssets({
    slug: 'mediaProducts',
    imageSizes: [
        {
            name: 'assets1000xauto',
            width: 1000,
            withoutEnlargement: false,
        },
        {
            name: 'assets1000x1400',
            width: 1000,
            height: 1400,
            withoutEnlargement: false,
        },
        {
            name: 'assets600x800',
            width: 600,
            height: 800,
        },
        {
            name: 'assets800x800',
            width: 800,
            height: 800,
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
