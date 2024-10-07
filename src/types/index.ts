export interface backgroundInterface {
    used: boolean;
    path: string;
}

export interface backgroundSettingsInterface {
    randomBackground: boolean;
    backgroundList: backgroundInterface[];
    currentBackgroundPath: string;
    defaultBackgroundPath: string;
}

export interface BookmarkInterface {
    id: string;
    name: string;
    url: string;
    backgroundIcon: string;
    backgroundColor: string;
    backgroundText: string;
}

export interface bookmarkSettingsInterface {
    openInNewTab: boolean,
    bookmarkList: BookmarkInterface[]
}

export interface SearchEngineInterface {
    id: string;
    used: boolean;
    name?: string;
    icon: string;
    searchStatement: string;
}

export interface searchEngineSettingsInterface {
    openInNewTab: boolean
    gridColumnCount: number
    searchEngineName: string
    searchEngineList: SearchEngineInterface[]
}