/* ==> Color palette 1998 <== */

export const WIN98_COLORS = {
  background: '#BCBEBC',
  titleBar: '#030171',
  white: 'white',
  black: 'black',
  gray: {
    light: '#DCDEDC',
    medium: '#808080',
    mediumDark: '#7C7A7C',
    dark: '#424242',
    lightest: 'gray-300',
  },
  red: '#FF0000',
} as const;

export const BORDER_STYLES = {
  outset: 'border-2 border-t-white border-l-white border-r-[#808080] border-b-[#808080]',
  inset: 'border-2 border-b-white border-r-white border-t-[#808080] border-l-[#808080]',
  window: 'border-2 border-gray-300 border-b-[#424242] border-r-[#424242]',
  shadow: 'shadow-[1px_1px_0_0_black,-1px_-1px_0_0_white]',
} as const;

export const BUTTON_BASE = `
  bg-[${WIN98_COLORS.background}] 
  text-black 
  flex 
  items-center 
  justify-center
  px-[1.5rem] 
  py-[.2rem] 
  outline-none
  border-t-[1.5px] border-t-white
  border-l-[1.5px] border-l-white
`.trim();

export const BUTTON_VARIANTS = {
  main: `
    border-r-[1.5px] border-r-black 
    border-b-[1.5px] border-b-black
    shadow-[1px_1px_1px_1px_black,inset_-1px_-1px_0_0_#BCBEBC]
  `.trim(),
  secondary: `
    border-r-[1.5px] border-r-[#7C7A7C] 
    border-b-[1.5px] border-b-[#7C7A7C]
    shadow-[1px_1px_0_0_black,inset_-1px_-1px_0_0_#BCBEBC]
  `.trim(),
} as const;

export const MINESWEEPER_COLORS = [
  '',
  'text-blue-700',
  'text-green-700',
  'text-red-700',
  'text-blue-900',
  'text-red-900',
  'text-teal-700',
  'text-black',
  'text-gray-500',
] as const;

export const LAYOUT = {
  taskbarHeight: 50,
  snapDistance: 15,
  defaultWindowSize: {
    minWidth: 400,
    minHeight: 300,
  },
} as const;
