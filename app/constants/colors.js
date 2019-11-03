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
  primaryGreen: '#61707D',
  primaryLight: '#EDFFEC',
  primaryRed: '#c93638',
  lightWhite: 'rgb(242, 242, 242)',
  redAccent: '#B10918',
  secondaryDark: '#435C48',
  secondaryGreen: 'rgba(42,126,210,1)',
  secondaryLight: '#83807c',
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
    nutrition: {
      primary: encodedColors.darkBlue,
      secondary: encodedColors.redAccent,
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
  },
});
