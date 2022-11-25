import React, { useState } from 'react';
// import {useForm} from 'react-hook-form'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {
  Button, CssBaseline, TextField, FormControlLabel, Checkbox, Link, Paper, Box, Grid, Typography, FormControl,
  IconButton, OutlinedInput, InputLabel, InputAdornment
} from '@mui/material';
import styles from '../../styles/Home.module.css';
import { MdOutlineVisibility } from "react-icons/md";
import { MdOutlineVisibilityOff } from "react-icons/md";
import { styled } from '@mui/material/styles';

const theme = createTheme();

export default function SignInSide() {

    const [values, setValues] = React.useState({
      password: '',
      showPassword: false,
    });
  
    const handleChange = (prop) => (event) => {
      setValues({ ...values, [prop]: event.target.value });
    };
  
    const handleClickShowPassword = () => {
      setValues({
        ...values,
        showPassword: !values.showPassword,
      });
    };
  
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      console.log({
        email: data.get('email'),
        password: data.get('password'),
      });
  
    };
  
    const Signinbutton = styled(Button)({
      marginTop: '10%',
      height: '50px',
      borderRadius: '8px',
      backgroundColor: '#2F4266',
      fontWeight: 'bold',
      fontFamily: [
        'kanit',
      ].join(','),
      '&:hover': {
        backgroundColor: '#fff',
        color: '#2F4266',
        transform: 'scale(1.02)'
      },
    });
  
    const Signupbutton = styled(Button)({
      marginTop: '5%',
      height: '50px',
      borderRadius: '8px',
      backgroundColor: '#FFCF40',
      fontWeight: 'bold',
      fontFamily: [
        'kanit',
      ].join(','),
      '&:hover': {
        backgroundColor: '#fff',
        color: '#FFCF40',
        transform: 'scale(1.02)'
      },
    });
  
    const IdField = styled(TextField)({
      '& label.Mui-focused': {
        color: '#2F4266',
      },
      '& .MuiInput-underline:after': {
        borderBottomColor: '#2F4266',
      },
      "& .MuiInputBase-root": {
        backgroundColor: '#fff', fontFamily: 'kanit'
      },
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: '#2F4266',
        },
        '&:hover fieldset': {
          borderColor: 'gray',
        },
        '&.Mui-focused fieldset': {
          borderColor: '#2F4266',
        },
      },
    });
    const PasswordField = styled(FormControl)({
      '& label.Mui-focused': {
        color: '#2F4266',
      },
      '& .MuiInput-underline:after': {
        borderBottomColor: '#2F4266',
      },
      "& .MuiInputBase-root": {
        backgroundColor: '#fff', fontFamily: 'kanit'
      },
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: '#2F4266',
        },
        '&:hover fieldset': {
          borderColor: 'gray',
        },
        '&.Mui-focused fieldset': {
          borderColor: '#2F4266',
        },
      },
    });
  
    const Openicon = styled(MdOutlineVisibility)({
      color: '#C7C7C7',
    });
    const Officon = styled(MdOutlineVisibilityOff)({
      color: '#C7C7C7'
    });
  
    return (
      <ThemeProvider theme={theme}>
        <Box sx={{}}>
          <Grid container component="main" sx={{ height: '100vh' }}>
            <CssBaseline />
            <Grid container
              item
              xs={false}
              sm={false}
              md={false}
              lg={7.5}
              sx={{
                backgroundImage: 'url(/101.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'top',
                justifyContent: 'center',
              }}
            >
              <Grid container sx={{ alignItems: 'center', width: '100%', height: '25%', my: '1.5%', mx: '2%', display: { xs: "none", lg: "block" } }}>
                <Grid>
                  <img src="Comu.png" alt="Banner" width={`700px`} height={'182px'} />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={4.5} component={Paper} elevation={6} square>
              <Box
                sx={{
                  my: 8,
                  mx: 4,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
  
                }}
              >
                <Grid container sx={{ justifyContent: 'center' }}>
                  <Grid sx={{ display: { xs: "block", lg: "none" } }}>
                    {/* <Image src="/Cuma.png" alt="Banner" width={`192px`} height={'194px'} /> */}
                  </Grid>
                  <Grid>
                    <Typography component="h1" variant="h4" fontWeight="bold" className={styles.kanit1} sx={{ display: { xs: "none", lg: "block" }, mt: '3%' }}>
                      บูรณาการทะเบียนทรัพย์สิน
                    </Typography>
                  </Grid>
                  <Grid container sx={{ justifyContent: 'center' }}>
                    <Grid>
                      <Typography component="h1" variant="h4" fontWeight="bold" className={styles.kanit1} sx={{ display: { xs: "none", lg: "block" }, mb: '3%' }}>
                        (กรมธนารักษ์)
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Box component="form" Validation onSubmit={handleSubmit} sx={{ mt: 1, width: '90%' }}>
                  <Typography className={styles.kanit} >
                    ชื่อผู้ใช้
                  </Typography>
                  <IdField
                    margin="normal"
                    id="email"
                    label={<Typography className={styles.kanit}>Username</Typography>}
                    name="email"
                    autoComplete="email"
                    autoFocus
                    fullWidth
                  />
                  <Typography className={styles.kanit} sx={{ mt: '3%' }}>
                    รหัสผ่าน
                  </Typography>
                  <PasswordField
                    fullWidth
                    variant="outlined"
                    margin="normal"
                  >
                    <InputLabel htmlFor="outlined-adornment-password" >
                      {<Typography className={styles.kanit}>Password</Typography>}
                    </InputLabel>
                    <OutlinedInput
                      autoComplete="current-password"
                      name="password"
                      id="password"
                      type={values.showPassword ? 'text' : 'password'}
                      value={values.password}
                      onChange={handleChange('password')}
                      fullWidth
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {values.showPassword ? <Officon size={27} /> : <Openicon size={27} />}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Password"
                    />
                  </PasswordField>
  
                  <Grid container sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
                    <Grid item xs>
                      <FormControlLabel
                        control={<Checkbox value="remember" sx={{ color: '#2F4266', '&.Mui-checked': { color: '#2F4266' } }} />}
                        label={<Typography variant='body3' className={styles.kanit}>จำไว้ในระบบ</Typography>}
                      />
                    </Grid>
                    <Grid item>
                      <Link
                        href="#"
                        variant="body3"
                        className={styles.kanit}
                        underline="none"
                        color="#424242"
                        sx={{ '&:hover': { textDecoration: 'underline #424242' } }}
                      >
                        ลืมรหัสผ่าน ?
                      </Link>
                    </Grid>
                  </Grid>
  
                  <Signinbutton
                    type="submit"
                    variant="contained"
                    fullWidth
                    href={'../Besthome/Menu1'}
                  >
                    เข้าสู่ระบบ
                  </Signinbutton>
                  <Signupbutton
                    type="submit"
                    variant="contained"
                    fullWidth
                    href={'https://www.treasury.go.th/th/member/?a=register'}
                  >
                    ลงทะเบียน
                  </Signupbutton>
                </Box>
  
              </Box>
            </Grid>
          </Grid>
        </Box>
      </ThemeProvider>
    );
  }
  