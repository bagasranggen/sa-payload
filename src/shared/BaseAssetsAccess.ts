import { AccessArgs, CollectionConfig } from 'payload';

export const BaseAssetsAccess = (): CollectionConfig['access'] => {
    const baseAccess = ({ req: { headers } }: AccessArgs<any>) => {
        const hostnames = [process.env.CMS_HOSTNAME].filter((item) => Boolean(item));
        const forwardedHostname = headers?.get('x-forwarded-host')?.split(':').shift();

        return hostnames.includes(forwardedHostname);
    };

    return {
        read: (args) => baseAccess(args),
        create: (args) => baseAccess(args),
        update: (args) => baseAccess(args),
        delete: (args) => baseAccess(args),
    };
};
