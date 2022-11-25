import { Autocomplete, TextField } from "@mui/material";
import React from "react";

const dataProvince = [
    { VALUE: 'กทม', KEY: '1', TYPE: 1 }, 
    { VALUE: 'กำแพง', KEY: '2', TYPE: 1 },
]

export default function Province(props) {
    const [value, setValue] = React.useState(null);
    const [overview, setOverView] = React.useState([]);

    // const setOptions=()=>{
    //     let dataNew = []
    //     dataProvince.forEach((el)=>{
    //         // if(el.TYPE == props.optionType){
    //             dataNew.push(el)
    //         // }
    //     })
    //     setOverView(dataNew)
    //     setValue(dataNew[0])
    // }

    const handleChange = (event, value) => {
        setValue(value);
        if (props.onChange) {
            return props.onChange(event, value)
        }
    }

    return (
        <Autocomplete
            options={dataProvince}
            value={value}
            getOptionLabel={(option) => (option.VALUE)}
            onChange={handleChange}
            renderInput={(params) => (
                <TextField
                    {...params}
                    error={props.error}
                    required={props.required}
                    fullWidth
                    label="จังหวัด"
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