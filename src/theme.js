import 'typeface-ibm-plex-sans';
const blues = {
    blue1: '#232535',
};

const yellows = {
    yellow1: '#FED138',
    yellow2: '#FED95A',
};

const red = '#ff0f0f';

const blacks = {
    black1: '#000000',
    black2: '#465064',
    black3: '#1A1A1A',
};

const greys = {
    grey1: '#F5F5F5',
    grey2: '#c4c4c4',
};

const white = '#FFFFFF';

const breakpoints = {
    xs: 0,
    sm: 350,
    md: 740,
    lg: 1040,
    xl: 1920,
};

const bolds = {
    bold36: '700 36px IBM Plex Sans',
    bold24: '700 24px IBM Plex Sans',
    bold14: '700 14px IBM Plex Sans',
    bold18: '700 18px IBM Plex Sans',
};

const mediums = {
    medium12: '500 12px IBM Plex Sans',
    medium14: '500 14px IBM Plex Sans',
    medium18: '500 18px IBM Plex Sans',
    medium24: '500 24px IBM Plex Sans',
};

const shadows = {
    shadow1: '0 4px 4px 0px rgba(0, 0, 0, 0.25)',
};

const borders = {
    solidGrey1: '1px solid #c4c4c4',
    solidGrey2: '0.75px solid rgba(214, 220, 227, 0.5)',
};

export default {
    colours: {
        blues,
        yellows,
        red,
        blacks,
        white,
        greys,
    },
    breakpoints,
    fonts: {
        ...bolds,
        ...mediums,
    },
    shadows,
    borders,
    pageMargin: '64px 82px 64px 82px',
    mobilePageMargin: '15px 30px 15px 30px',
};
