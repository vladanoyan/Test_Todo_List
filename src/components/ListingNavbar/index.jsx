import React from 'react';
import { NavLink } from 'react-router-dom';
import TiIconPack from 'react-icons/lib/fa/align-justify';
import {
  Collapse,
  Navbar,
  Nav,
  NavItem,
} from 'reactstrap';
import cs from './component.pcss';


class NavbarMenu extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }
  render() {
    return (
      <div>
        <Navbar light toggleable className={cs.Navbar}>
          <TiIconPack className={cs.icon} onClick={this.toggle} />
          <NavItem>
            <NavLink to="/" className={cs.brend}>
              Todo<span>List</span></NavLink>
          </NavItem>
          <Collapse className={cs.collapse} isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar />
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
export default NavbarMenu;
