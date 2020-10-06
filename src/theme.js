const blues = {
  blue1: '#232535',
};

const yellows = {
  yellow1: '#FED138'
};

const blacks = {
  black1: '#000000',
  black2: '#465064',
};

const white = '#FFFFFF';

const breakpoints = {
  xs: 0,
  sm: 350,
  md: 740,
  lg: 1040,
  xl: 1920,
}

const bolds = {
  bold36: '700 36px IBM Plex Sans',
}

const mediums = {
  medium18: '500 18px IBM Plex Sans',
  medium24: '500 24px IBM Plex Sans',
}

export default {
  colours: {
    blues,
    yellows,
    blacks,
    white,
  },
  breakpoints,
  fonts: {
    ...bolds,
    ...mediums,
  },
}
