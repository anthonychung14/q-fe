const encodedColors = Object.freeze({
  accentGreen: '#37FF8B',
  buttonTypes: {
    // primary: '#48435C',
    primary: '#EDFFEC',
    secondary: '#83807c',
    outline: '#f0e7e6',
    cancel: '#ffa59c',
  },
  darkBlue: '#0918B1',
  lightBlue: '#C2E0FE',
  accentTeal: '#36C9C7',
  orangeAccent: '#F29705',
  primaryBlue: 'rgb(109, 188, 219)',
  primaryDark: '#48435C',
  primaryGreen: '#30694B',
  primaryLight: '#EDFFEC',
  primaryRed: '#c93638',
  lightWhite: 'rgb(242, 242, 242)',
  redAccent: '#B10918',
  secondaryDark: '#435C48',
  secondaryGreen: '#10281B',
  secondaryLight: '#83807c',
  secondaryWhite: '#f0f5f1',
  movetype: {
    ATK: 'red',
    DEF: 'blue',
    TRK: '#9669BF',
    MOV: 'green',
    POKE: 'green',
  },
  greenAccent: '#87C38F',
});

export default Object.freeze({
  ...encodedColors,
  modes: {
    consume: {
      primary: encodedColors.primaryGreen,
      secondary: encodedColors.secondaryGreen,
      types: {
        PRO: 'red',
        FAT: 'blue',
        CRB: 'green',
        CAL: 'black',
      },
    },
    acquire: {
      primary: encodedColors.primaryGreen,
      secondary: encodedColors.secondaryGreen,
      types: {
        PRO: 'red',
        FAT: 'blue',
        CRB: 'green',
        CAL: 'black',
      },
    },
    knowledge: {
      primary: encodedColors.primaryDark,
      secondary: encodedColors.greenAccent,
    },
    combat: {
      primary: encodedColors.primaryRed,
      secondary: encodedColors.accentTeal,
    },
    love: {
      primary: encodedColors.accentTeal,
      secondary: encodedColors.redAccent,
    },
    security: {
      secondary: encodedColors.darkBlue,
      primary: encodedColors.redAccent,
    },
  },
  pages: {},
});
