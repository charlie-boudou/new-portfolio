import { JSX } from "react";

export type IList = {
    icon: JSX.Element;
    name: string;
    component?: JSX.Element;
    href?: string;
    link?: string;
    windowSize?: string
}

export type ILanguage = {
    language: string;
    layout: string;
    icon: string;
}

export type IInfos = {
    title: string;
    subtitles?: Array<string>;
    content: Array<string> | Array<ILanguage>;
}

export type IFolder = {
    name: string;
    icon: JSX.Element;
    component: JSX.Element;
    list?: Array<IList>;
    windowSize?: string;
};

export type ISetting = {
    name: string;
    icon?: JSX.Element;
    infos:Array<IInfos>;
}

export type IShutDown = {
    icon: JSX.Element;
    title: string;
    actions:Array<string>;
}

export type IDescription = {
    title: string;
    content: Array<string>;
}

export type ISkills = {
    title: string;
    list: Array<IDescription>;
}

export type IAboutMe = {
    icon: string;
    title: string;
    description: Array<IDescription>;
    skills: Array<ISkills>;
    photo: string;
}

export type IProject = {
    icon: JSX.Element;
    description: string;
    name: string;
    title: string;
    pictures: Array<string>;
    stacks: Array<string>;
    link: string;
}

export type ICell = {
  isMine: boolean;
  isRevealed: boolean;
  isFlagged: boolean;
  neighborCount: number;
  isQuestion?: boolean;
};