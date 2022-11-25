import * as React from 'react';
import PropTypes from 'prop-types'; // ES6
import { styled, useTheme } from '@mui/material/styles';
import { Box, Toolbar, List, CssBaseline, Typography, Divider, IconButton, Collapse, ListItem, ListItemButton, ListItemIcon, ListItemText, Grid } from '@mui/material/';
import MuiDrawer from '@mui/material/Drawer';
import { BsFolderX } from "react-icons/bs";
import { BsFolder2Open } from "react-icons/bs";
import { SlHome } from "react-icons/sl";
import { HiOutlineUser } from "react-icons/hi2";
import { HiOutlineUsers } from "react-icons/hi2";
import { CiSquareChevLeft } from "react-icons/ci";
import { CiSquareChevRight } from "react-icons/ci";
import Link from 'next/link';

const drawerWidth = 270;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
    backgroundColor: '#00A09D',
    color: '#fff'
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    backgroundColor: '#00A09D',
    color: '#fff',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

MiniDrawer.propTypes = {
    open: PropTypes.bool,
    toggleDrawer: PropTypes.func,
}

export default function MiniDrawer({ open, toggleDrawer }) {
    const theme = useTheme();
    const ListButton = styled(ListItemButton)({
        marginLeft: '5%',
        width: '90%',
        borderRadius: '10px',
        '&:hover': {
            backgroundColor: '#578AA8',
            color: '#fff',
            transform: 'scale(1.02)'
        },
    });

    return (
        <Box sx={{ display: 'flex' }}>
            <Drawer variant="permanent" open={open} sx={{ position: 'static' }} >
                <DrawerHeader sx={{ position: 'static' }}>
                    <IconButton
                        sx={{
                            color: '#fff',
                            '&:hover': {
                                backgroundColor: '#578AA8',
                                color: '#fff',
                                transform: 'scale(1.02)'
                            },
                        }}
                    >
                        {theme.direction === 'rtl' ? <CiSquareChevLeft size={30} /> : <CiSquareChevLeft size={30} />}
                    </IconButton>
                </DrawerHeader>
                <Divider variant='middle' sx={{ backgroundColor: '#fff' }} />
                <List sx={{ position: 'static' }}>
                    <ListItem disablePadding sx={{ display: 'block' }}>
                        <ListButton
                            sx={{
                                minHeight: 40,
                                justifyContent: open ? 'initial' : 'center',
                                px: 2.5,
                                my: 2
                            }}
                            onClick={toggleDrawer}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                    color: '#fff'
                                }}
                            >
                                <CiSquareChevRight size={30} />
                            </ListItemIcon>
                        </ListButton>
                    </ListItem>
                    <Divider />
                    <Link href="/">
                        <ListItem disablePadding sx={{ display: 'block' }}>
                            <ListButton
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                    my: 2
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : 'auto',
                                        justifyContent: 'center',
                                        color: '#fff'
                                    }}
                                >
                                    <SlHome size={25} />
                                </ListItemIcon>
                                <ListItemText primary={"หน้าหลัก"} sx={{ opacity: open ? 1 : 0 }} />
                            </ListButton>
                        </ListItem>
                    </Link>
                    <ListItem disablePadding sx={{ display: 'block' }}>
                        <ListButton
                            sx={{
                                minHeight: 48,
                                justifyContent: open ? 'initial' : 'center',
                                px: 2.5,
                                my: 2
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                    color: '#fff'
                                }}
                            >
                                <BsFolder2Open size={25} />
                            </ListItemIcon>
                            <ListItemText primary={'นำเข้าและจัดการข้อมูล'} sx={{ opacity: open ? 1 : 0 }} />
                        </ListButton>
                    </ListItem>
                    <ListItem disablePadding sx={{ display: 'block' }}>
                        <ListButton
                            sx={{
                                minHeight: 48,
                                justifyContent: open ? 'initial' : 'center',
                                px: 2.5,
                                my: 2
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                    color: '#fff'
                                }}
                            >
                                <BsFolderX size={25} />
                            </ListItemIcon>
                            <ListItemText primary={'เทียบเคียงแปลงที่ดิน'} sx={{ opacity: open ? 1 : 0 }} />
                        </ListButton>
                    </ListItem>
                    <ListItem disablePadding sx={{ display: 'block' }}>
                        <ListButton
                            sx={{
                                minHeight: 48,
                                justifyContent: open ? 'initial' : 'center',
                                px: 2.5,
                                my: 2
                            }}

                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                    color: '#fff'
                                }}
                            >
                                <HiOutlineUser size={25} />
                            </ListItemIcon>
                            <ListItemText primary={'รายงานบัญชีประเมินราคา'} sx={{ opacity: open ? 1 : 0 }} />
                        </ListButton>
                    </ListItem>
                    <ListItem disablePadding sx={{ display: 'block' }}>
                        <ListButton
                            sx={{
                                minHeight: 48,
                                justifyContent: open ? 'initial' : 'center',
                                px: 2.5,
                                my: 2
                            }}

                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                    color: '#fff'
                                }}
                            >
                                <HiOutlineUsers size={25} />
                            </ListItemIcon>
                            <ListItemText primary={'รายงานสรุปผลดำเนินงาน'} sx={{ opacity: open ? 1 : 0 }} />
                        </ListButton>
                    </ListItem>
                </List>
            </Drawer>
        </Box>
    );
}