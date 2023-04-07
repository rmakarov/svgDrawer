import React, {Component} from 'react';
import {Box, Button, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText} from '@mui/material';

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
                   <Box sx={{width: 250}} role="presentation"
                        onClick={this.toggleDrawer}
                        onKeyDown={this.toggleDrawer}>
                       <List>
                           <ListItem>
                               <ListItemButton>
                                   line1
                               </ListItemButton>
                           </ListItem>
                           <ListItem>
                               <ListItemButton>
                                   line2
                               </ListItemButton>
                           </ListItem>
                           <ListItem>
                               <ListItemButton>
                                   line3
                               </ListItemButton>
                           </ListItem>
                           <ListItem>
                               <ListItemButton>
                                   <ListItemIcon></ListItemIcon>
                                   <ListItemText>Figure 1</ListItemText>
                               </ListItemButton>
                           </ListItem>
                           <ListItem>
                               <ListItemButton>
                                   <ListItemIcon></ListItemIcon>
                                   <ListItemText>Figure 2</ListItemText>
                               </ListItemButton>
                           </ListItem>
                           <ListItem>
                               <ListItemButton>
                                   <ListItemIcon></ListItemIcon>
                                   <ListItemText>Figure 1</ListItemText>
                               </ListItemButton>
                           </ListItem>
                           <ListItem>
                               <ListItemButton>
                                   <ListItemIcon></ListItemIcon>
                                   <ListItemText>Figure 2</ListItemText>
                               </ListItemButton>
                           </ListItem>
                       </List>
                   </Box>
                </Drawer>
            </>

        )
    }
}
export default ToolBar;