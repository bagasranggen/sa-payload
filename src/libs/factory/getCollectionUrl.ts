import { RevalidatePageProps } from '@/libs/utils/revalidatePage';
import { BasePayload } from 'payload';

export type GetCollectionUrlProps = {
    payload?: BasePayload;
};

export const getCollectionUrl = async ({ payload }: GetCollectionUrlProps) => {
    const path: RevalidatePageProps['items'] = [];

    if (payload) {
        try {
            const pages = await payload.find({
                collection: 'pages',
                where: {
                    typeHandle: {
                        equals: 'sectionProductsCategories',
                    },
                },
            });

            if (pages && pages?.docs && pages.docs.length > 0) {
                pages.docs.forEach((item) => {
                    if (item?.uri) path.push({ path: `/${item?.uri}` });
                });
            }
        } catch (e) {
            console.log(e);
        }
    }

    return path;
};
