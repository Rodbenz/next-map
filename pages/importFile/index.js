import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import styles from '../../styles/Home.module.css';
import DataTable from '../../pages/components/dataTable'
import Province from '../../pages/components/mas/province'
import Branch from '../../pages/components/mas/branch'
import DocumentLicense from '../../pages/components/mas/documentLicense'
import FileUploader from '../../pages/components/mas/fileUpload'
import AutoZone from '../../pages/components/mas/autoZone'
import MapWrapper from '../components/myMap/MapWrapper'

const theme = createTheme();

export default function ImportFile() {
    let colum = [
        {
            name: "ลำดับ",
            listname: "",
        },
        {
            name: "โฉนดที่ดิน",
            listname: "",
        },
        {
            name: "หน้าสำรวจ",
            listname: "",
        },
        {
            name: "ระวาง",
            listname: "",
        },
        {
            name: "เลขที่ดิน",
            listname: "",
        },
        {
            name: "เนื่อที่ดิน ไร่-งาน-วา",
            listname: "",
        },
        {
            name: "สถานะนำเข้า",
            listname: "",
        },
        {
            name: "ไปแผนที่",
            listname: "",
        },
        {
            name: "หมายเหตู",
            listname: "",
        },
    ];
    return (
        <div>
            <ThemeProvider theme={theme}>
                <Grid container component="main" sx={{ minHeight: 800 }} spacing={1}>
                    <CssBaseline />
                    <Grid item xs={12} lg={7} md={12} component={Paper} elevation={6} square>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 1 }}>
                            <Typography variant="text" className={styles.kanitG}>
                                นำเข้าและจัดการชั้นข้อมูลรูปแปลงที่ดินที่ไม่ปรากฎในบัญชีราคาประเมินที่ดิน
                            </Typography>
                        </Box>
                        <Box sx={{ ml: 1, mr: 5, mt: 1 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={6} sm={6}>
                                    {/* จังหวัด */}
                                    <Province />
                                </Grid>
                                <Grid item xs={12} md={6} sm={6}>
                                    {/* สำนักงาน */}
                                    <Branch />
                                </Grid>
                                <Grid item xs={12} md={3} sm={6}>
                                    {/* เอกสารสิทธิ์ */}
                                    <DocumentLicense />
                                </Grid>
                                <Grid item xs={12} md={6} sm={6}>
                                    {/* ไฟล์อัปโหลด */}
                                    <FileUploader />
                                </Grid>
                                <Grid item xs={12} md={3} sm={6}>
                                    {/* โซน */}
                                    <AutoZone />
                                </Grid>
                            </Grid>
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 1 }}>
                                <Button variant="contained" className={styles.button}><span>นำเข้า</span></Button>
                            </Box>
                        </Box>
                        {/* ตาราง */}
                        <Grid item xs={{ overflow: 'auto' }}>
                            <Box sx={{ width: '100%', margin: '0 auto 16px' }}>
                                <DataTable data={[]} colum={colum} />
                            </Box>
                        </Grid>
                    </Grid>
                    <Grid item xs={false} lg={5} md={12} sx={{ width: '100%' }}>
                        <div style={{ textAlign: 'center', height: '100%', width: '100%', display: "flex" }}>
                            <div style={stylelable}>
                                <p>React Functional Components with OpenLayers Example</p>
                                <p>Click the map to reveal location coordinate via React State</p>
                            </div>
                            <MapWrapper features height={100} />

                        </div>
                    </Grid>
                </Grid>
            </ThemeProvider>
        </div>
    );
}

const stylelable = {
    width: '50%',
    overflow: 'auto',
    margin: 'auto',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 2,
    background: 'white',
    pointerEvents: 'none'
}