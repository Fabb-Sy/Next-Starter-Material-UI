import { NavbarProps } from './navbar.type';
import NavbarView from './Navbar.view';

const Navbar = ({ userName = 'Admin', userImage = '/img/admin.jpg' }: NavbarProps) => {
  return <NavbarView userName={userName} userImage={userImage} />;
};

export default Navbar;
