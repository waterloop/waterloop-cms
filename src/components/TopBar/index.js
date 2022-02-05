import React from 'react';
import styled from 'styled-components';
import useProfilePicture from '../../hooks/profile-picture';
import { Link } from 'react-router-dom';
import MUIAppBar from '@material-ui/core/AppBar';
import MUIToolbar from '@material-ui/core/Toolbar';
import MUIIconButton from '@material-ui/core/IconButton';
import NavIconSVG from './assets/nav-icon.svg';
import WaterloopLogoSVG from './assets/topbar-logo.svg';
import UnstyledDesktopMenu from './DesktopMenu';
import UnstyledProfileDropdown from './ProfileDropdown';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

const AppBar = styled(MUIAppBar)`
  background-color: ${({ theme }) => theme.colours.blues.blue1};
`;

const Toolbar = styled(MUIToolbar)`
  display: flex;
  justify-content: space-between;
`;
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

const ProfileDropdown = styled(UnstyledProfileDropdown)`
  position: absolute;
  top: 60px;
  right: 50px;
  z-index: 1800;
`;

const ProfilePicture = styled.img`
  height: 40px;
  width: 40px;
  border-radius: 20px;
  cursor: pointer;
`;

const TopBar = () => {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const { profilePicture } = useProfilePicture();

  return (
    <div>
      <AppBar position="relative">
        <Toolbar>
          <div>
            <IconButton edge="start" aria-label="menu" component={Link} to='/'>
              <WaterloopLogo />
            </IconButton>
            <IconButton edge="start" aria-label="menu" onClick={() => setMenuOpen(!menuOpen)}>
              <NavIcon />
            </IconButton>
          </div>
          <IconButton edge="end" aria-label="menu" onClick={() => setDropdownOpen(!dropdownOpen)}>
              <ProfilePicture src={profilePicture} alt="profile"/>
              <ArrowDropDownIcon style={{fill: "white"}}/>
          </IconButton>
        </Toolbar>
      </AppBar>
      {menuOpen && (
        <DesktopMenu onClose={() => setMenuOpen(false)} />
      )}
      {dropdownOpen && (
        <ProfileDropdown onClose={() => setDropdownOpen(false)} />
      )}
    </div>
  );
};

export default TopBar;
