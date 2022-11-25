import * as React from 'react';
import {Box, ButtonBase, Grid, Avatar, Menu, MenuItem, ListItemIcon, Divider, Typography, Tooltip, Popper, Grow, Paper, ClickAwayListener, MenuList, Stack } from '@mui/material';
import FaceRoundedIcon from '@mui/icons-material/FaceRounded';
import { GoShield, GoGear, GoFlame } from "react-icons/go";
import { styled } from '@mui/material/styles';
import { FcBusinessman } from "react-icons/fc";
import Fab from '@mui/material/Fab';
import Link from 'next/link';

import styles from '../../../styles/Home.module.css';

export default function AvatarUser() {
  
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

    const Username = styled(Grid)({
        padding: '0.1%', 
        borderRadius: '50px', 
        width: '200px', 
        background: '#fff',  
        marginTop: '1%', 
        height: '45px', 
        justifyContent: 'flex-start',
        left: '-10px',
        border: '1px solid #ECECEC',
        zIndex: '300',
        fontFamily: [
            'kanit',
          ].join(','),
          '&:hover': {
            backgroundColor: '#eeeeee',
            transform: 'scale(1.02)'
          },
      });

  return (
    <div>
        <React.Fragment>
      <Box  
      ref={anchorRef}
      id="composition-button"
      aria-controls={open ? 'composition-menu' : undefined}
      aria-expanded={open ? 'true' : undefined}
      aria-haspopup="true"
      onClick={handleToggle}
      >
      
      <Grid >
           <Tooltip>
            <Username >
                 <Grid container sx= {{alignItems: 'center', justifyContent: 'space-between', width: '80%'}}>
                    <Avatar sx= {{bgcolor: '#031E51'}}>
                      <FcBusinessman size={40}/>
                    </Avatar>
                    <Grid >
                        <Typography variant= "body2" className= {styles.kanit} sx= {{color: '#031E51', fontWeight: 'bold'}}>
                        สมชาย ใจดี
                        </Typography>
                        <Typography variant= "caption" className= {styles.kanit} sx= {{color: '#031E51'}}>
                        เจ้าหน้าที่กรมที่ดิน
                        </Typography>
                    </Grid>
                </Grid>
            </Username>
           </Tooltip>
      </Grid>
    </Box>
    <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          placement="bottom-end"
          transition
          disablePortal
          sx={{ zIndex: 300}}
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === 'bottom-start' ? 'left top' : 'left bottom',
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    autoFocusItem={open}
                    id="composition-menu"
                    aria-labelledby="composition-button"
                    onKeyDown={handleListKeyDown}
                  >
                    <MenuItem onClick={handleClose}>
                      <Stack spacing={1} direction="row" className={styles.kanit}>
                        <GoShield/>
                        <text>โปรไฟล์</text>
                      </Stack>
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                      <Stack spacing={1} direction="row" className={styles.kanit}>
                        <GoGear/>
                        <text>จัดการบัญชี</text>
                      </Stack>
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                      <a href=''>
                      <Stack spacing={1} direction="row" className={styles.kanit}>
                        <GoFlame/>
                        <text>ออกจากระบบ</text>
                      </Stack>
                      </a>
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
    </React.Fragment>
    </div>
  )
}