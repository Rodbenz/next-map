import React, { useState } from "react";
import {TextField, Typography} from '@mui/material';

const FileUploader = () => {
    const [selectedFiles, setSelectedFiles] = useState(null);

    const handleFileFieldChange = event => {
        setSelectedFiles(event.target.files[0]);
        console.log(event.target.files[0],'event.target.files[0]');
    };

    return (
        <div>
            <div className="file-upload-container">
                <TextField
                    focused
                    type={"file"}
                    onChange={handleFileFieldChange}
                    // helperText={errorF ? <text className={styles.kanit}>กรุณากรอกข้อมูลให้ครบ</text> : ""}
                    // sx={{ width: '45%', ml: '3%', mt: '2%' }}
                    label={
                        <Typography variant="text" > เลือกไฟล์ </Typography>
                    }
                    fullWidth
                    size={'small'}
                />
            </div>
        </div>
    );
};

export default FileUploader;
