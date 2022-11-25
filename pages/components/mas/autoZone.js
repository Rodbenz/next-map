import { Autocomplete, TextField } from "@mui/material";
import React from "react";

const dataZone = [
    { VALUE: '47', KEY: '1', TYPE: 1 }, 
    { VALUE: '48', KEY: '2', TYPE: 1 },
]

export default function AutoZone(props) {
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
            options={dataZone}
            value={value}
            getOptionLabel={(option) => (option.VALUE)}
            onChange={handleChange}
            renderInput={(params) => (
                <TextField
                    {...params}
                    error={props.error}
                    required={props.required}
                    fullWidth
                    label="โซน"
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