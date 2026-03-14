import { CollectionConfig, UploadConfig } from 'payload';

export type BaseAssetsProps = {} & Pick<CollectionConfig, 'slug'> & Pick<UploadConfig, 'imageSizes'>;

export const BaseAssets = ({ slug, imageSizes }: BaseAssetsProps): CollectionConfig => {
    return {
        slug,
        admin: {
            group: 'Assets',
        },
        access: {
            read: (arg) => {
                // const {
                //     req: { headers },
                // } = arg;
                //
                // const hostnames = [process.env.CMS_HOSTNAME].filter((item) => Boolean(item));
                // const forwardedHostname = headers?.get('x-forwarded-host')?.split(':').shift();
                //
                // return hostnames.includes(forwardedHostname);

                return true;
            },
        },
        fields: [
            {
                name: 'alt',
                type: 'text',
                required: true,
            },
        ],
        upload: {
            // staticDir: 'media',
            // skipSafeFetch: [{ hostname: process.env.CMS_HOSTNAME || '' }],
            disableLocalStorage: true,
            imageSizes,
        },
    };
};
