import { ArrayStringTypes } from '@/libs/types';
import { joinArrayString } from '@/libs/utils/joinArrayString';

export type RevalidatePageItemProps = {
    path: string;
    layout?: 'page' | 'layout';
    hasDynamicSegment?: boolean;
};

export type RevalidatePageProps = {
    items: RevalidatePageItemProps[];
};

export const revalidatePage = async ({ items }: RevalidatePageProps) => {
    if (!process.env.BASE_URI) return;
    if (!process.env.REVALIDATION_SECRET_TOKEN) return;

    let baseUrl: ArrayStringTypes = [process.env.BASE_URI];
    baseUrl.push('api');
    baseUrl.push('revalidate');
    baseUrl = joinArrayString(baseUrl, '/');

    if (items && items.length > 0) {
        for (const item of items) {
            let params: ArrayStringTypes = [`secret=${process.env.REVALIDATION_SECRET_TOKEN}`];
            params.push(`path=${item.path}`);
            if (item?.hasDynamicSegment || item?.layout === 'layout') params.push(`type=${item.layout}`);
            params = joinArrayString(params, '&');

            const url = joinArrayString([baseUrl, params], '?');

            try {
                await fetch(url);
                console.log({ message: 'run', url });
            } catch (e) {
                console.error(e);
            }
        }
    }
};
