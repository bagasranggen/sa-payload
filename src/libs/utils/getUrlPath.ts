import slugify from 'slugify';

import { ArrayStringTypes } from '@/libs/types';
import { joinArrayString } from './joinArrayString';

import { AdditionalPathArg, BaseEntryGeneralProps } from '@/collections/shared';

export type GetUrlPatProps = {
    withBaseUri?: boolean;
} & (AdditionalPathArg & Pick<BaseEntryGeneralProps, 'additionalPath'>);

export const getUrlPath = async ({
    siblingData,
    req,
    additionalPath,
    withBaseUri = false,
}: GetUrlPatProps): Promise<string | undefined> => {
    let data = undefined;

    let path = undefined;
    if (additionalPath) path = await additionalPath({ siblingData, req });

    let slug = undefined;
    if (siblingData?.title) slug = siblingData.title;
    if (siblingData?.slug) slug = siblingData.slug;
    if (slug) slug = slugify(slug, { lower: true });

    let url: ArrayStringTypes = [];
    if (process.env.BASE_URI && withBaseUri) url.push(process.env.BASE_URI);
    if (path) url.push(...path);
    if (slug) url.push(slug);
    url = joinArrayString(url, '/');

    if (url) data = url;

    return data;
};
