import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

import { buildConfig } from 'payload';
import { postgresAdapter } from '@payloadcms/db-postgres';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { s3Storage } from '@payloadcms/storage-s3';

import { Media } from './collections/assets';
import { Categories, Colors, Labels, Sizes, Tags } from './collections/taxonomies';
import { Products } from '@/collections/products';
import { Tokens, Users } from './collections/users';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
    admin: {
        user: Users.slug,
        importMap: {
            baseDir: path.resolve(dirname),
        },
    },
    collections: [Media, Categories, Colors, Labels, Sizes, Tags, Products, Tokens, Users],
    editor: lexicalEditor(),
    secret: process.env.PAYLOAD_SECRET || '',
    typescript: {
        outputFile: path.resolve(dirname, 'payload-types.ts'),
    },
    db: postgresAdapter({
        pool: {
            connectionString: process.env.DATABASE_URL || '',
        },
    }),
    sharp,
    plugins: [
        s3Storage({
            collections: {
                media: {
                    prefix: 'media',
                },
            },
            bucket: process.env.S3_BUCKET || '',
            config: {
                forcePathStyle: true,
                credentials: {
                    accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
                    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
                },
                region: process.env.S3_REGION,
                endpoint: process.env.S3_ENDPOINT,
            },
        }),
    ],
});
