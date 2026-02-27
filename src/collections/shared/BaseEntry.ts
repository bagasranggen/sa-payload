import { Field, Tab } from 'payload';

import { BaseEntryStatus, BaseEntryStatusProps } from '@/collections/shared/BaseEntryStatus';
import { BaseEntryGeneral, BaseEntryGeneralProps } from '@/collections/shared/BaseEntryGeneral';

export type BaseEntryProps = {
    tabs?: Tab[];
    url?: BaseEntryGeneralProps;
} & Pick<BaseEntryStatusProps, 'typeHandle'>;

export const BaseEntry = ({ typeHandle, tabs: tabsProps, url = {} }: BaseEntryProps): Field[] => {
    const tabs: Tab[] = [];
    tabs.push(BaseEntryGeneral(url));
    if (tabsProps && tabsProps.length > 0) tabs.push(...tabsProps);

    return [
        BaseEntryStatus({ typeHandle }),
        {
            type: 'tabs',
            tabs,
        },
    ];
};
