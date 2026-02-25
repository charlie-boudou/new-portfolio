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
import PastImageViewer from "@/components/1998/folders/imageViewer/PastImageViewer";
import world from "@/assets/world.svg";
import chip from "@/assets/chip.svg";
import contact from "@/assets/contact.svg";
import file from "@/assets/file.svg";
import turnOff from "@/assets/turnOff.svg";
import image from "@/assets/image.svg";
import game from "@/assets/game.svg";
import avatar from "@/assets/avatar.svg";
import FutureProject from "@/components/2077/projects/FutureProject";
import FutureShutDown from "@/components/2077/settings/FutureShutDown";
import FutureSystemCore from "@/components/2077/settings/FutureSystemCore";
import FutureContact from "@/components/2077/settings/FutureContact";
import FutureImageViewer from "@/components/2077/media/FutureImageViewer";
import FutureLanguage from "@/components/2077/settings/futureLanguage/FutureLanguage";
import FutureAboutMe from "@/components/2077/aboutMe/FutureAboutMe";
import BreachProtocol from "../components/2077/media/BreachProtocol";

export const folders= (t: TFunction): IFolder[] => [
    {
      icon: {
        past: <Wordpad className="w-[2rem] h-[2rem]"/>,
        future: <Image src={avatar} alt={t('about')} width={80} height={64} className="w-[2.5rem] h-[2.5rem]" />,
      },
      name: t('about'),
      component: {
        past: <PastAboutMe />,
        future: <FutureAboutMe />
      },
      windowSize: 'w-[80%] max-w-[1000px] h-[70%]'
    },
    {
      icon: <FolderFile className="w-[2.5rem] h-[2.5rem]"/>,
      name: t('projects'),
      component: <PastProjectsList />,
      list: [
        {
          icon: {
            past: <FolderOpen className="w-[2rem] h-[2rem]"/>,
            future: <Image src={file} alt="file" className="w-[1.5rem] h-[1.5rem] mb-[.2rem]" />,
          },
          name: 'OPX',
          component: {
            past: <PastProject projectName="OPX" />,
            future: <FutureProject projectName="OPX" />
          },
          windowSize: 'w-[80%] max-w-[1000px] h-[70%]'
        },
        {
          icon: {
            past: <FolderOpen className="w-[2rem] h-[2rem]"/>,
            future: <Image src={file} alt="file" className="w-[1.5rem] h-[1.5rem] mb-[.2rem]" />,
          },
          name: 'Drapo Solution',
          component: {
            past: <PastProject projectName="Drapo Solution" />,
            future: <FutureProject projectName="Drapo Solution" />
          },
          windowSize: 'w-[80%] max-w-[1000px] h-[70%]'
        },
        {
          icon: {
            past: <FolderOpen className="w-[2rem] h-[2rem]"/>,
            future: <Image src={file} alt="file" className="w-[1.5rem] h-[1.5rem] mb-[.2rem]" />,
          },
          name: 'Villa Calm',
          component: {
            past: <PastProject projectName="Villa Calm" />,
            future: <FutureProject projectName="Villa Calm" />
          },
          windowSize: 'w-[80%] max-w-[1000px] h-[70%]'
        },
        {
          icon: {
            past: <FolderOpen className="w-[2rem] h-[2rem]"/>,
            future: <Image src={file} alt="file" className="w-[1.5rem] h-[1.5rem] mb-[.2rem]" />,
          },
          name: 'Tikok Production',
          component: {
            past: <PastProject projectName="Tikok Production" />,
            future: <FutureProject projectName="Tikok Production" />
          },
          windowSize: 'w-[80%] max-w-[1000px] h-[70%]'
        },
        {
          icon: {
            past: <FolderOpen className="w-[2rem] h-[2rem]"/>,
            future: <Image src={file} alt="file" className="w-[1.5rem] h-[1.5rem] mb-[.2rem]" />,
          },
          name: 'Ma plus belle toile',
          component: {
            past: <PastProject projectName="Ma plus belle toile" />,
            future: <FutureProject projectName="Ma plus belle toile" />
          },
          windowSize: 'w-[80%] max-w-[1000px] h-[70%]'
        },
        {
          icon: {
            past: <FolderOpen className="w-[2rem] h-[2rem]"/>,
            future: <Image src={file} alt="file" className="w-[1.5rem] h-[1.5rem] mb-[.2rem]" />,
          },
          name: 'Memories',
          component: {
            past: <PastProject projectName="Memories" />,
            future: <FutureProject projectName="Memories" />
          },
          windowSize: 'w-[80%] max-w-[1000px] h-[70%]'
        },
        {
          icon: {
            past: <FolderOpen className="w-[2rem] h-[2rem]"/>,
            future: <Image src={file} alt="file" className="w-[1.5rem] h-[1.5rem] mb-[.2rem]" />,
          },
          name: 'Le Comptoir des Arcs',
          component: {
            past: <PastProject projectName="Le Comptoir des Arcs" />,
            future: <FutureProject projectName="Le Comptoir des Arcs" />
          },
          windowSize: 'w-[80%] max-w-[1000px] h-[70%]'
        },
      ]
    },
    {
      icon: {
        past: <Mail className="w-[2rem] h-[2rem]"/>,
        future: <Image src={contact} alt="contact" width={80} height={64} className="w-[2.5rem] h-[2.5rem]" />,
      },
      name: { past: t('contact'), future: t('contactFuture')},
      component: {
        past: <PastContact />,
        future: <FutureContact />
      },
      windowSize: 'w-[40%] h-[40%] xl:w-[30%] xl:h-[30%]',
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
      icon: {
        past: <Wangimg128 className="w-[2.5rem] h-[2.5rem]"/>,
        future: <Image src={image} alt="images" width={80} height={64} className="w-[2rem] h-[2rem]" />
      },
      name: "Images",
      component: {
        past: <PastImageViewer />,
        future: <FutureImageViewer />
      },
      windowSize: 'w-[80%] max-w-[1000px] h-[70%]'
    },
    {
      icon: {
        past: <Winmine1 className="w-[2rem] h-[2rem]"/>,
        future: <Image src={game} alt="images" width={80} height={64} className="w-[2rem] h-[2rem]" />
      },
      name: {
        past: t('minesweeper'),
        future: "Breach Protocol"
      },
      component: {
        past: <Minesweeper />,
        future: <BreachProtocol />
      },
      windowSize: 'min-w-fit m-h-fit'
    },
    {
      icon: {
        past: <Settings className="w-[2.5rem] h-[2.5rem]"/>,
        future: <Image src={chip} alt="system core" width={80} height={64} className="w-[2.5rem] h-[2.5rem]" />
      }, 
      name: t('settings'),
      component: {
        past: <PastSettings />,
        future: <FutureSystemCore />
      },
      windowSize: 'w-full md:w-[40%] h-[50%]'
    },
    {
      icon: {
        past: <Computer3 className="w-[2.5rem] h-[2.5rem]"/>,
        future: <Image src={turnOff} alt="turn off" width={80} height={64} className="w-[2.5rem] h-[2.5rem]" />,
      },
      name: {
        past: t('shut'),
        future: t('shutFuture')
      },
      component: {
        past: <PastShutDown />,
        future: <FutureShutDown />
      },
      windowSize: 'w-full md:w-[30%] h-[30%]'
    }
];

export const settings= (t: TFunction): ISetting[] => [
  {
    icon: {
      past: <Image src="/images/generalSetting1.png" alt="general" width={80} height={64} className="w-[6rem] md:w-[10rem] h-[5.5rem] md:h-[9.5rem]" />,
      future: <Image src={chip} alt="system core" width={80} height={64} className="w-[2.5rem] h-[2.5rem]" />
    },
    name: {past: t('general'), future: t('systemcore')},
    component: <FutureSystemCore />,
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
    icon: <Image src={world} alt={t('language')} width={80} height={64} className="w-[2.5rem] h-[2.5rem]" />,
    name: t('language'),
    component: <FutureLanguage />,
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
  icon: <Image src="/images/AboutMe.png" alt={t('about')} width={200} height={200} className="w-[50vw] md:h-[20vh]" />,
  title: t('about'),
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
    icon: {
      past: <FolderOpen className="w-[2rem] h-[2rem]"/>,
      future: <Image src={file} alt="language" className="w-[1.5rem] h-[1.5rem] mb-[.2rem]" />,
    },
    name: 'OPX',
    description: t('opx'),
    title: "/images/OPXTitle.png",
    pictures: ['/images/opx.png', '/images/opx1.png', '/images/opx2.png', '/images/opx3.png', '/images/opx4.png'],
    stacks: [ 'REACT', 'TYPESCRIPT'],
    link: 'https://www.opx.co/'
  },
  {
    icon: {
      past: <FolderOpen className="w-[2rem] h-[2rem]"/>,
      future: <Image src={file} alt="language" className="w-[1.5rem] h-[1.5rem] mb-[.2rem]" />,
    },
    name: 'Drapo Solution',
    description: t('drapo'),
    title: "/images/drapoTitle.png",
    pictures: ['/images/drapo.png', '/images/drapo1.png', '/images/drapo2.png', '/images/drapo3.png'],
    stacks: [ 'REACT', 'TYPESCRIPT'],
    link: 'https://www.drapo.com/'
  },
  {
    icon: {
      past: <FolderOpen className="w-[2rem] h-[2rem]"/>,
      future: <Image src={file} alt="language" className="w-[1.5rem] h-[1.5rem] mb-[.2rem]" />,
    },
    name: 'Villa Calm',
    description: t('villacalm'),
    title: "/images/villacalmTitle.png",
    pictures: ['/images/villacalm.png', '/images/villacalm1.png', '/images/villacalm2.png', '/images/villacalm3.png', '/images/villacalm4.png'],
    stacks: [ 'REACT', 'TYPESCRIPT', 'NODE JS'],
    link: 'https://villa-calm.vercel.app/'
  },
  {
    icon: {
      past: <FolderOpen className="w-[2rem] h-[2rem]"/>,
      future: <Image src={file} alt="language" className="w-[1.5rem] h-[1.5rem] mb-[.2rem]" />,
    },
    name: 'Tikok Production',
    description: t('tikok'),
    title: "/images/tikokTitle.png",
    pictures: ['/images/tikok.png', '/images/tikok1.png', '/images/tikok2.png'],
    stacks: [ 'WORDPRESS'],
    link: 'https://tikokproduction.com'
  },
  {
    icon: {
      past: <FolderOpen className="w-[2rem] h-[2rem]"/>,
      future: <Image src={file} alt="language" className="w-[1.5rem] h-[1.5rem] mb-[.2rem]" />,
    },
    name: 'Ma plus belle toile',
    description: t('maplusbelletoile'),
    title: "/images/maplusbelletoileTitle.png",
    pictures: ['/images/maplusbelletoile.png', '/images/maplusbelletoile1.png', '/images/maplusbelletoile2.png', '/images/maplusbelletoile3.png', '/images/maplusbelletoile4.png'],
    stacks: [ 'WIX', 'E-COMMERCE'],
    link: 'https://www.maplusbelletoile.com'
  },
  {
    icon: {
      past: <FolderOpen className="w-[2rem] h-[2rem]"/>,
      future: <Image src={file} alt="language" className="w-[1.5rem] h-[1.5rem] mb-[.2rem]" />,
    },
    name: 'Memories',
    description: t('memories'),
    title: "/images/memoriesTitle.png",
    pictures: ['/images/memories.png', '/images/memories1.png', '/images/memories2.png', '/images/memories3.png', '/images/memories4.png'],
    stacks: [ 'REACT NATIVE', 'NODE.JS'],
    link: 'https://github.com/charlie-boudou/memories-frontend'
  },
  {
    icon: {
      past: <FolderOpen className="w-[2rem] h-[2rem]"/>,
      future: <Image src={file} alt="language" className="w-[1.5rem] h-[1.5rem] mb-[.2rem]" />,
    },
    name: 'Le Comptoir des Arcs',
    description: t('comptoirdesarcs'),
    title: "/images/lecomptoirdesarcsTitle.png",
    pictures: ['/images/comptoirdesarcs.png', '/images/comptoirdesarcs1.png', '/images/comptoirdesarcs2.png', '/images/comptoirdesarcs3.png'],
    stacks: [ 'REACT', 'NEXT.JS', 'TYPESCRIPT'],
    link: 'https://www.conciergerie-services-savoie.fr/'
  },
]);
