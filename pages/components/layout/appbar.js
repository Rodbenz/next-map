import * as React from 'react';
import PropTypes from 'prop-types'; // ES6
import { styled, useTheme } from '@mui/material/styles';
import { Box, Toolbar, List, CssBaseline, Typography, Divider, IconButton, Collapse, ListItem, ListItemButton, ListItemIcon, ListItemText, Grid } from '@mui/material/';
import MuiAppBar from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import AvatarUser from './avatarUser';

const drawerWidth = 270;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),

    }),
}));

MiniAppBar.propTypes = {
    // hendleOpenDrawer: PropTypes.bool,
    hendleOpenDrawer: PropTypes.func,
}

export default function MiniAppBar({hendleOpenDrawer}) {
    const [open, setOpen] = React.useState(false);
    const [user, setUser] = React.useState(true);

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline/>
        <AppBar open={open}
                sx={{
                    boxShadow: '0px 0px 0px',
                    backgroundImage: 'url(/Navv.png)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'top',
                    position: 'fixed',
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        sx={{
                            marginRight: 5,
                            ...(open && { display: 'none' }),
                        }}
                        onClick={hendleOpenDrawer}
                    >
                       <MenuIcon />
                    </IconButton> 
                    <Grid container sx={{ alignItems: 'center', justifyContent: 'space-between', minwidth: '1440px' }}>
                        <img src="/Comu.png" alt="sdda" width={300} height={80} />
                        <Typography variant="h5" noWrap
                            sx={{
                                color: '#fff',
                                fontWeight: 'bold',
                                display: { xs: "none", lg: "block" }
                            }}
                            component="div"
                        >
                            ระบบการประเมินราคาที่ดินที่ไม่ปรากฎในบัญชีราคาประเมินที่ดิน
                        </Typography>
                        <Grid sx={{ display: { xs: "none", lg: "block" } }} >
                            {user?<AvatarUser/>:null}
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar> 
        </Box>
    );
}