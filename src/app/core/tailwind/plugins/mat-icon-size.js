const plugin = require('tailwindcss/plugin');

module.exports = plugin(
  ({ matchUtilities, theme }) => {
    matchUtilities(
      {
        'mat-icon-size': (value) => ({
          width: value,
          height: value,
          minWidth: value,
          minHeight: value,
          fontSize: value,
          lineHeight: value,
          [`img`]: {
            width: value,
            height: value,
          },
          [`svg`]: {
            width: value,
            height: value,
          },
        }),
      },
      {
        values: theme('iconSize'),
      },
    );
  },
  {
    theme: {
      iconSize: {
        1: '0.25rem',
        2: '0.5rem',
        3: '0.75rem',
        4: '1rem',
        5: '1.25rem',
        6: '1.5rem',
        7: '1.75rem',
        8: '2rem',
        10: '2.5rem',
        12: '3rem',
        14: '3.5rem',
        16: '4rem',
        18: '4.5rem',
        20: '5rem',
      },
    },
  },
);
