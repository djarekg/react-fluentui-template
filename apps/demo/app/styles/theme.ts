import {
  type BrandVariants,
  type Theme,
  createDarkTheme,
  createLightTheme,
} from '@fluentui/react-components';

const nightsky: BrandVariants = {
  10: '#040206',
  20: '#1D1226',
  30: '#301A45',
  40: '#40215F',
  50: '#51287A',
  60: '#622E96',
  70: '#7435B4',
  80: '#853ECC',
  90: '#9251D2',
  100: '#9F63D7',
  110: '#AB75DC',
  120: '#B787E1',
  130: '#C299E6',
  140: '#CEAAEB',
  150: '#D9BCEF',
  160: '#E4CFF4',
};

const lightTheme: Theme = {
  ...createLightTheme(nightsky),
};

const darkTheme: Theme = {
  ...createDarkTheme(nightsky),
};

darkTheme.colorBrandForeground1 = nightsky[110];
darkTheme.colorBrandForeground2 = nightsky[120];

export { darkTheme, lightTheme };
