const getCssVariable = (variable: string) =>
  typeof window !== 'undefined'
    ? getComputedStyle(document.documentElement).getPropertyValue(variable).trim()
    : '';

const colors = {
  mainMint1: getCssVariable('--main-mint1'),
  mainMint2: getCssVariable('--main-mint2'),
  mainMint3: getCssVariable('--main-mint3'),
  mainMint4: getCssVariable('--main-mint4'),
  mainMint5: getCssVariable('--main-mint5'),
  mainMint6: getCssVariable('--main-mint6'),

  subGray1: getCssVariable('--sub-gray1'),
  subGray2: getCssVariable('--sub-gray2'),
  subGray3: getCssVariable('--sub-gray3'),
  subGray4: getCssVariable('--sub-gray4'),
  subGray5: getCssVariable('--sub-gray5'),
  subGray6: getCssVariable('--sub-gray6'),
  subGray7: getCssVariable('--sub-gray7'),
  subGray8: getCssVariable('--sub-gray8'),

  subBlack: getCssVariable('--sub-black'),
  subWhite: getCssVariable('--sub-white'),
};

export default colors;
