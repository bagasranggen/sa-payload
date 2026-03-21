import { Field, Tab } from 'payload';

import { BaseEntrySidebar, BaseEntrySidebarProps } from '@/shared/BaseEntrySidebar';
import { BaseEntryGeneral, BaseEntryGeneralProps } from '@/shared/BaseEntryGeneral';

export type BaseEntryProps = {
    tabs?: Tab[];
    url?: Omit<BaseEntryGeneralProps, 'fields'>;
} & (Pick<BaseEntrySidebarProps, 'typeHandle'> & Pick<BaseEntryGeneralProps, 'fields'>);

export const BaseEntry = ({ typeHandle, tabs: tabsProps, url = {}, fields = [] }: BaseEntryProps): Field[] => {
    const tabs: Tab[] = [];
    tabs.push(BaseEntryGeneral({ ...url, fields }));
    if (tabsProps && tabsProps.length > 0) tabs.push(...tabsProps);

    return [
        BaseEntrySidebar({ typeHandle }),
        {
            type: 'tabs',
            tabs,
        },
    ];
};
