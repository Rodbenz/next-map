import * as React from 'react';
import PropTypes from 'prop-types'; // ES6
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { CiSquareChevLeft } from "react-icons/ci";
import { IconButton } from '@mui/material';

TemporaryDrawer.propTypes = {
    ondrawer: PropTypes.bool,
    toggleDrawerClose: PropTypes.func
}
export default function TemporaryDrawer({ ondrawer, toggleDrawerClose }) {
    const list = (anchor) => (
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250, paddingTop: 10 }}
            role="presentation"
        >
            <List>
                <ListItem disablePadding>
                    <IconButton onClick={toggleDrawerClose}>
                        <CiSquareChevLeft size={40} />
                    </IconButton>
                </ListItem>
                {['หน้าหลัก', 'นำเข้า', 'เทียบเคียง', 'รายงาน', 'ออกจากระบบ'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    const classes = styles
    return (
        <div>
            <React.Fragment>
                <Drawer
                    PaperProps={{
                        sx: {
                          backgroundColor: "#aae8e6"
                        }
                      }}
                    anchor={'left'}
                    open={ondrawer}
                    onClose={toggleDrawerClose}
                >
                    {list('left')}
                </Drawer>
            </React.Fragment>
        </div>
    );
}

const styles = {
    paper: {
        background: "blue"
    }
}