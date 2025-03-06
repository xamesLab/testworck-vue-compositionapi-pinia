type Label = {text: string};

type ProfileType = 'Локальная' | 'LDAP';

export interface ListItem {
    id: number;
    filled: boolean;
    labels: Label[];
    type: ProfileType;
    login: string;
    pass: string;
};

export type ProfilesList = ListItem[];