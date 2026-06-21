import { Field, Tab } from 'payload';

import { BaseEntrySidebar, BaseEntrySidebarProps } from '@/shared/BaseEntrySidebar';
import { BaseEntryGeneral, BaseEntryGeneralProps } from '@/shared/BaseEntryGeneral';
import { BaseEntrySEO, BaseEntrySEOProps } from '@/shared/BaseEntrySEO';

export type BaseEntryProps = {
    tabs?: Tab[];
    url?: Omit<BaseEntryGeneralProps, 'fields'>;
    seo?: boolean | Pick<BaseEntrySEOProps, 'mediaRelation'>;
} & (Pick<BaseEntrySidebarProps, 'typeHandle'> & Pick<BaseEntryGeneralProps, 'fields'>);

export const BaseEntry = ({ typeHandle, tabs: tabsProps, url = {}, fields = [], seo }: BaseEntryProps): Field[] => {
    const tabs: Tab[] = [];
    tabs.push(BaseEntryGeneral({ ...url, fields }));
    if (tabsProps && tabsProps.length > 0) tabs.push(...tabsProps);
    if (seo) tabs.push(BaseEntrySEO(typeof seo === 'boolean' ? {} : seo));

    return [
        BaseEntrySidebar({ typeHandle }),
        {
            type: 'tabs',
            tabs,
        },
    ];
};
