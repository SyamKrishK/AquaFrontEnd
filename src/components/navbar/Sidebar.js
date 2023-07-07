import { ProSidebar, Menu, MenuItem, SubMenu ,SidebarContent,SidebarFooter,SidebarHeader} from 'react-pro-sidebar';
import React,{useState} from 'react';
import 'react-pro-sidebar/dist/css/styles.css';
import AccessibilityNewIcon from '@material-ui/icons/AccessibilityNew';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import "./style.css"
export const Sidebar = (props) =>{ 

    return (
        <ProSidebar className="sidebar-bg-color">
            <Menu iconShape="square">
                <MenuItem icon={<AccessibilityNewIcon />}>Dashboard</MenuItem>
                <SubMenu title="Components" icon={<AccountBoxIcon />}>
                    <MenuItem>Component 1</MenuItem>
                    <MenuItem>Component 2</MenuItem>
                </SubMenu>
            </Menu>
      </ProSidebar>
    );

}