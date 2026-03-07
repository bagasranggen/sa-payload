import { Option } from 'payload';

export const PAGES_TYPE_HANDLES = {
    HOMEPAGE: 'sectionHomepage',
    PRODUCTS: 'sectionProducts',
    PRODUCTS_LISTING: 'sectionProductsListing',
    PRODUCTS_CATEGORIES: 'sectionProductsCategories',
    STATIC_PAGES: 'sectionStaticPages',
};

export const PAGES_TYPE_OPTIONS_HANDLES: Record<string, Exclude<Option, string>> = {
    [PAGES_TYPE_HANDLES.HOMEPAGE]: {
        value: PAGES_TYPE_HANDLES.HOMEPAGE,
        label: 'Homepage Index',
    },
    [PAGES_TYPE_HANDLES.PRODUCTS]: {
        value: PAGES_TYPE_HANDLES.PRODUCTS,
        label: 'Products Index',
    },
    [PAGES_TYPE_HANDLES.PRODUCTS_LISTING]: {
        value: PAGES_TYPE_HANDLES.PRODUCTS_LISTING,
        label: 'Products Listing Index',
    },
    [PAGES_TYPE_HANDLES.PRODUCTS_CATEGORIES]: {
        value: PAGES_TYPE_HANDLES.PRODUCTS_CATEGORIES,
        label: 'Products Categories Index',
    },
    [PAGES_TYPE_HANDLES.STATIC_PAGES]: {
        value: PAGES_TYPE_HANDLES.STATIC_PAGES,
        label: 'Static Pages Index',
    },
} as const;
