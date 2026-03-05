import { Field, Tab } from 'payload';

import { BaseEntrySidebar, BaseEntrySidebarProps } from '@/shared/BaseEntrySidebar';
import { BaseEntryGeneral, BaseEntryGeneralProps } from '@/shared/BaseEntryGeneral';

export type BaseEntryProps = {
    tabs?: Tab[];
    url?: BaseEntryGeneralProps;
} & Pick<BaseEntrySidebarProps, 'typeHandle'>;

export const BaseEntry = ({ typeHandle, tabs: tabsProps, url = {} }: BaseEntryProps): Field[] => {
    const tabs: Tab[] = [];
    tabs.push(BaseEntryGeneral(url));
    if (tabsProps && tabsProps.length > 0) tabs.push(...tabsProps);

    return [
        BaseEntrySidebar({ typeHandle }),
        {
            type: 'tabs',
            tabs,
        },
    ];
};
