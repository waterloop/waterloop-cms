import React from 'react';
import styled from 'styled-components';
import MUIAppBar from '@material-ui/core/AppBar';
import MUIToolbar from '@material-ui/core/Toolbar';
import MUIIconButton from '@material-ui/core/IconButton';
import NavIconSVG from './assets/nav-icon.svg';
import WaterloopLogoSVG from './assets/topbar-logo.svg';
import UnstyledDesktopMenu from './DesktopMenu';

const AppBar = styled(MUIAppBar)`
  background-color: ${({ theme }) => theme.colours.blues.blue1};
`;

const Toolbar = styled(MUIToolbar)``;
const IconButton = styled(MUIIconButton)``;

const NavIcon = styled.img.attrs({
  src: NavIconSVG,
})``;

const WaterloopLogo = styled.img.attrs({
  src: WaterloopLogoSVG,
})`
  margin-right: 24px;
`;

const DesktopMenu = styled(UnstyledDesktopMenu)`
  position: absolute;
  top: 60px;
  left: 80px;
  z-index: 1800;
`;

const TopBar = ({ }) => {
  const [menuOpen, setMenuOpen] = React.useState(false);
  return (
    <>
      <AppBar>
        <Toolbar>
          <WaterloopLogo />
          <IconButton edge="start" aria-label="menu" onClick={() => setMenuOpen(!menuOpen)}>
            <NavIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      {menuOpen && (
        <DesktopMenu onClose={() => setMenuOpen(false)} />
      )}
    </>
  );
};

export default TopBar;
