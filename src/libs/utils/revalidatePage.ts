import { ArrayStringTypes } from '@/libs/types';
import { joinArrayString } from './joinArrayString';

export type RevalidatePageType = {
    path: string;
    layout?: 'page' | 'layout';
    hasDynamicSegment?: boolean;
};

export const revalidatePage = async ({ path, layout = 'page', hasDynamicSegment }: RevalidatePageType) => {
    if (!process.env.BASE_URI) return;
    if (!process.env.REVALIDATION_SECRET_TOKEN) return;

    let baseUrl: ArrayStringTypes = [process.env.BASE_URI];
    baseUrl.push('api');
    baseUrl.push('revalidate');
    baseUrl = joinArrayString(baseUrl, '/');

    let params: ArrayStringTypes = [`secret=${process.env.REVALIDATION_SECRET_TOKEN}`];
    params.push(`path=${path}`);
    if (hasDynamicSegment || layout === 'layout') params.push(`type=${layout}`);
    params = joinArrayString(params, '&');

    const url = joinArrayString([baseUrl, params], '?');

    try {
        await fetch(url);
    } catch (e) {
        console.error(e);
    }
};
