'use client';

import { IAboutMe, IFolder, IProject, ISetting, IShutDown } from "./types";
import {
  Computer3,
  Settings,
  Wordpad,
  Mail,
  FolderFile,
  FolderOpen,
  Winmine1,
  Computer4,
  Wangimg128
} from "@react95/icons";
import { TFunction } from 'i18next';
import Image from "next/image";
import github from "@/assets/github.svg";
import linkedin from "@/assets/linkedin.svg";
import gmail from "@/assets/gmail.svg";
import PastSettings from "@/components/1998/folders/settings/PastSettings";
import PastShutDown from "@/components/1998/folders/shutDown/PastShutDown";
import PastProjectsList from "@/components/1998/folders/projects/PastProjectsList";
import PastProject from "@/components/1998/folders/projects/PastProject";
import PastAboutMe from "@/components/1998/folders/aboutMe/PastAboutMe";
import PastContact from "@/components/1998/folders/contact/PastContact";
import Minesweeper from "../components/1998/folders/minesweeper/Minesweeper";
import PastImageViewer from "../components/1998/folders/imageViewer/PastImageViewer";

export const folders= (t: TFunction): IFolder[] => [
    {
      icon: <Wordpad className="w-[2rem] h-[2rem]"/>,
      name: t('about'),
      component: <PastAboutMe />,
      windowSize: 'w-[80vw] max-w-[1000px] h-[70vh]'
    },
    {
      icon: <Wangimg128 className="w-[2.5rem] h-[2.5rem]"/>,
      name: "Images",
      component: <PastImageViewer />,
      windowSize: 'w-[80vw] max-w-[1000px] h-[70vh]'
    },
    {
      icon: <FolderFile className="w-[2.5rem] h-[2.5rem]"/>,
      name: t('projects'),
      component: <PastProjectsList />,
      list: [
        {
          icon: <FolderOpen className="w-[2rem] h-[2rem]"/>,
          name: 'OPX',
          component: <PastProject projectName="OPX" />,
          windowSize: 'w-[80vw] max-w-[1000px] h-[70vh]'
        },
        {
          icon: <FolderOpen className="w-[2rem] h-[2rem]"/>,
          name: 'Drapo Solution',
          component: <PastProject projectName="Drapo Solution" />,
          windowSize: 'w-[80vw] max-w-[1000px] h-[70vh]'
        },
        {
          icon: <FolderOpen className="w-[2rem] h-[2rem]"/>,
          name: 'Villa Calm',
          component: <PastProject projectName="Villa Calm" />,
          windowSize: 'w-[80vw] max-w-[1000px] h-[70vh]'
        },
        {
          icon: <FolderOpen className="w-[2rem] h-[2rem]"/>,
          name: 'Tikok Production',
          component: <PastProject projectName="Tikok Production" />,
          windowSize: 'w-[80vw] max-w-[1000px] h-[70vh]'
        },
        {
          icon: <FolderOpen className="w-[2rem] h-[2rem]"/>,
          name: 'Ma plus belle toile',
          component: <PastProject projectName="Ma plus belle toile" />,
          windowSize: 'w-[80vw] max-w-[1000px] h-[70vh]'
        },
        {
          icon: <FolderOpen className="w-[2rem] h-[2rem]"/>,
          name: 'Memories',
          component: <PastProject projectName="Memories" />,
          windowSize: 'w-[80vw] max-w-[1000px] h-[70vh]'
        },
        {
          icon: <FolderOpen className="w-[2rem] h-[2rem]"/>,
          name: 'Le Comptoir des Arcs',
          component: <PastProject projectName="Le Comptoir des Arcs" />,
          windowSize: 'w-[80vw] max-w-[1000px] h-[70vh]'
        },
      ]
    },
    {
      icon: <Mail className="w-[2rem] h-[2rem]"/>,
      name: t('contact'),
      component: <PastContact />,
      windowSize: 'w-[40vw] h-[40vh] xl:w-[30vw] xl:h-[30vh]',
      list: [
        {
          icon: <Image src={github} alt="GitHub" className="w-[2rem] h-[2rem] group-hover:invert"/>,
          name: 'GitHub',
          href: "https://github.com/charlie-boudou"
        },
        {
          icon: <Image src={linkedin} alt="LinkedIn" className="w-[2rem] h-[2rem] group-hover:invert"/>,
          name: 'LinkedIn',
          href:"https://www.linkedin.com/in/charlie-boudou-7a8a051b7"
        },
        {
          icon: <Image src={gmail} alt="GMail" className="w-[2rem] h-[2rem] group-hover:invert"/>,
          name: 'GMail',
          href: 'mailto:charlie.lcb3@gmail.com'
        },
      ]
    },
    {
      icon: <Winmine1 className="w-[2rem] h-[2rem]"/>,
      name: t('minesweeper'),
      component: <Minesweeper />,
      windowSize: 'min-w-fit m-h-fit'
    },
    {
      icon: <Settings className="w-[2.5rem] h-[2.5rem]"/>,
      name: t('settings'),
      component: <PastSettings />,
      windowSize: 'w-[40vw] min-w-fit m-h-fit h-[50vh]'
    },
    {
      icon: <Computer3 className="w-[2.5rem] h-[2.5rem]"/>,
      name: t('shut'),
      component: <PastShutDown />,
      windowSize: 'w-full md:w-[30vw] h-[30vh]'
    }
];

export const settings= (t: TFunction): ISetting[] => [
  {
    icon: <Image src="/images/generalSetting1.png" alt="general" width={80} height={64} className="w-[10rem] h-[9.5rem]" />,
    name: t('general'),
    infos: [
      {
        title: t('stacks'),
        content: [
          'ReactJS',
          'NextJs',
          'TypeScript'
        ]
      },
      {
        title: t('registered'),
        content: [
          '</> Charlie',
        ]
      }
    ]
  },
  {
    name: t('language'),
    infos: [
      {
        title: t('installed'),
        subtitles: [
          'Language',
          'Layout'
        ],
        content: [
          {
            language: 'English (United States)',
            layout: 'United State 101',
            icon: 'En'
          },
          {
            language: 'French (Standard)',
            layout: 'French',
            icon: 'Fr'
          }
        ]
      }
    ]
  },
];

export const shutDown: (t: TFunction) => IShutDown = (t) => ({
  icon: <Computer4 className="w-[2.5rem] h-[2.5rem]" />,
  title: t('shutTitle'),
  actions: [t('restart'), t('shut'), t('goFuture')],
});

export const aboutMe: (t: TFunction) => IAboutMe = (t) => ({
  icon: "/images/AboutMe.png",
  title: t('aboutMe'),
  description: [
    {
      title: t('about'),
      content: [
        t('aboutMe')
      ]
    },
    {
      title: t('myjourney'),
      content: [
        t('myHistory'),
        t('myHistory2')
      ]
    },
    {
      title: t('beyoundthecode'),
      content: [
        t('beyoundthecodedesc')
      ]
    },
  ],
  skills: [
    {
        title: t('technicalSkills'),
        list: [
            {
                title: t('progLang'),
                content: [
                    'JAVASCRIPT',
                    'TYPESCRIPT',
                ]
            },
            {
                title: "Frameworks",
                content: [
                    'REACTS JS',
                    'REACT NATIVE',
                    'NODE.JS',
                    'VUEJS',
                    'REDUX',
                ]
            },
            {
                title: t('tools'),
                content: [
                    'HTML5, CSS3 (Sass, CSS Modules)',
                    'BOOTSTRAP/TAILWIND',
                    'WEBPACK/BABEL',
                    'GIT/GITHUB',
                    'JEST/PLAYWRIGHT/CYPRESS',
                    'STORYBOOK',
                    'WORDPRESS',
                    'GATSBY',
                ]
            },
            {
                title: t('methodologies'),
                content: [
                    t('scrum'),
                    'RESPONSIVE DESIGN',
                    t('accessWeb'),
                ]
            },
        ],
    },
    {
      title: t('values'),
      list: [
        {
            title: t('qualPerf'),
            content: [t('qualPerfDesc')],
        },
        {
            title: t('accessibility'),
            content: [t('accessDesc')],
        },
        {
            title: t('collaboration'),
            content: [t('collabDesc')],
        },
        {
            title: t('innovation'),
            content: [t('innovDesc')],
        },
      ],
    },
  ],
  photo: "/images/me.png"
});

export const projects: (t: TFunction) => IProject[] = (t) => ([
  {
    icon: <FolderOpen className="w-[2rem] h-[2rem]"/>,
    name: 'OPX',
    description: t('opx'),
    title: "/images/OPXTitle.png",
    pictures: ['/images/opx.png', '/images/opx1.png', '/images/opx2.png', '/images/opx3.png', '/images/opx4.png'],
    stacks: [ 'REACT', 'TYPESCRIPT'],
    link: 'https://www.opx.co/'
  },
  {
    icon: <FolderOpen className="w-[2rem] h-[2rem]"/>,
    name: 'Drapo Solution',
    description: t('drapo'),
    title: "/images/drapoTitle.png",
    pictures: ['/images/drapo.png', '/images/drapo1.png', '/images/drapo2.png', '/images/drapo3.png'],
    stacks: [ 'REACT', 'TYPESCRIPT'],
    link: 'https://www.drapo.com/'
  },
  {
    icon: <FolderOpen className="w-[2rem] h-[2rem]"/>,
    name: 'Villa Calm',
    description: t('villacalm'),
    title: "/images/villacalmTitle.png",
    pictures: ['/images/villacalm.png', '/images/villacalm1.png', '/images/villacalm2.png', '/images/villacalm3.png', '/images/villacalm4.png'],
    stacks: [ 'REACT', 'TYPESCRIPT', 'NODE JS'],
    link: 'https://villa-calm.vercel.app/'
  },
  {
    icon: <FolderOpen className="w-[2rem] h-[2rem]"/>,
    name: 'Tikok Production',
    description: t('tikok'),
    title: "/images/tikokTitle.png",
    pictures: ['/images/tikok.png', '/images/tikok1.png', '/images/tikok2.png'],
    stacks: [ 'WORDPRESS'],
    link: 'https://tikokproduction.com'
  },
  {
    icon: <FolderOpen className="w-[2rem] h-[2rem]"/>,
    name: 'Ma plus belle toile',
    description: t('maplusbelletoile'),
    title: "/images/maplusbelletoileTitle.png",
    pictures: ['/images/maplusbelletoile.png', '/images/maplusbelletoile1.png', '/images/maplusbelletoile2.png', '/images/maplusbelletoile3.png', '/images/maplusbelletoile4.png'],
    stacks: [ 'WIX', 'E-COMMERCE'],
    link: 'https://www.maplusbelletoile.com'
  },
  {
    icon: <FolderOpen className="w-[2rem] h-[2rem]"/>,
    name: 'Memories',
    description: t('memories'),
    title: "/images/memoriesTitle.png",
    pictures: ['/images/memories.png', '/images/memories1.png', '/images/memories2.png', '/images/memories3.png', '/images/memories4.png'],
    stacks: [ 'REACT NATIVE', 'NODE.JS'],
    link: 'https://github.com/charlie-boudou/memories-frontend'
  },
  {
    icon: <FolderOpen className="w-[2rem] h-[2rem]"/>,
    name: 'Le Comptoir des Arcs',
    description: t('opx'),
    title: "/images/lecomptoirdesarcs.png",
    pictures: ['/images/memories.png', '/images/memories1.png', '/images/memories2.png', '/images/memories3.png', '/images/memories4.png'],
    stacks: [ 'REACT NATIVE', 'NODE.JS'],
    link: 'https://github.com/charlie-boudou/memories-frontend'
  },
]);
