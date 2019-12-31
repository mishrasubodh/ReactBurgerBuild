import React from "react";
import classes from "./Toolbar.css";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigatinItems/NavigationItems";
import DraweToggle from '../SideDrawer/DrawerToggle/DrawerToggle'
const toolbar = props => (
     
  <header className={classes.Toolbar}>
    <DraweToggle clicked={props.drawerToggleClicked} />
    <div className={classes.Logo}>
      <Logo />
    </div>

    <nav className={classes.DesktopOnly}>
      <NavigationItems />
    </nav>
  </header>
);

export default toolbar;
