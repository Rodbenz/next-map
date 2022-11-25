import { Autocomplete, TextField } from "@mui/material";
import React from "react";

const dataLicense = [
    { VALUE: 'โฉนด', KEY: '1', TYPE: 1 }, 
    { VALUE: 'น.ส. 3ก', KEY: '2', TYPE: 1 },
]

export default function DocumentLicense(props) {
    const [value, setValue] = React.useState(null);
    const [overview, setOverView] = React.useState([]);

    const handleChange = (event, value) => {
        setValue(value);
        if (props.onChange) {
            return props.onChange(event, value)
        }
    }

    return (
        <Autocomplete
            options={dataLicense}
            value={value}
            getOptionLabel={(option) => (option.VALUE)}
            onChange={handleChange}
            renderInput={(params) => (
                <TextField
                    {...params}
                    error={props.error}
                    required={props.required}
                    fullWidth
                    label="เอกสารสิทธิ์"
                    size="small"
                />
            )}
            renderOption={(props, option) => {
                return (
                    <li {...props} key={option.KEY} value={option}>
                        {option.VALUE}
                    </li>
                )
            }}
        />
    )
}