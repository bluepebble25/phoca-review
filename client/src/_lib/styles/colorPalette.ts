interface colorPaletteProps {
  [key: string]: string;
}

interface gradientProps {
  [key: string]: string;
}

const colorPalette: colorPaletteProps = {
  white: '#FFFFFF',
  black: '#000000',
  base: '#D9D9D9',
  red: '#E2574C',
  blue: '#59BACC',
  green: '#58AD69',
  yellow: '#FFD749',
};

const gradient: gradientProps = {
  aurora: 'linear-gradient(to left top, #CB5EEE, #4BE1EC)',
  unripeMango: 'linear-gradient(to left top, #33CC99, #FFCC33)',
  sunrise: 'linear-gradient(to left top, #12C2E9, #C471ED, #FF8235)',
  greenSea: 'linear-gradient(to left top, #2177BD, #ADD788)',
  lilac: 'linear-gradient(to left bottom, #6D76EF, #FFE1E0)',
};

export { colorPalette, gradient };
