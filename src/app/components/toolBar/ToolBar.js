import React, {Component} from 'react';
import {Button, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText} from '@mui/material';

class ToolBar extends Component {
    constructor() {
        super();
        this.state = {
            isOpen: false
        }
        this.toggleDrawer = this.toggleDrawer.bind(this)
    }

    toggleDrawer(){
        this.setState({isOpen: !this.state.isOpen})
    }

    render(){
        const { isOpen } = this.state;
        return(
            <>
                <Button onClick={this.toggleDrawer}>Open menu</Button>
                <Drawer
                    anchor={'left'}
                    open={isOpen}
                    onClose={this.toggleDrawer}
                >
                   <List>
                       <ListItem>
                           <ListItemButton>
                               <ListItemIcon></ListItemIcon>
                               <ListItemText>Figurei</ListItemText>
                           </ListItemButton>

                       </ListItem>
                   </List>
                </Drawer>
            </>

        )
    }
}
export default ToolBar;