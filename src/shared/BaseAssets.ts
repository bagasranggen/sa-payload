import { CollectionConfig, UploadConfig } from 'payload';

import { BaseAssetsAccess } from '@/shared/BaseAssetsAccess';

export type BaseAssetsProps = {} & Pick<CollectionConfig, 'slug'> & Pick<UploadConfig, 'imageSizes'>;

export const BaseAssets = ({ slug, imageSizes }: BaseAssetsProps): CollectionConfig => {
    return {
        slug,
        admin: {
            group: 'Assets',
        },
        access: BaseAssetsAccess(),
        fields: [
            {
                name: 'alt',
                type: 'text',
                required: true,
            },
        ],
        upload: {
            skipSafeFetch: [{ hostname: process.env.CMS_HOSTNAME || '' }],
            disableLocalStorage: true,
            imageSizes,
        },
    };
};
