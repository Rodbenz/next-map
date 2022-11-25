import {
    Autocomplete,
    Badge,
    Button,
    Checkbox,
    Collapse,
    FormControlLabel,
    FormGroup,
    Grid,
    IconButton,
    Pagination,
    Paper,
    Popover,
    Switch,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableFooter,
    TableHead,
    TablePagination,
    TableRow,
    TableSortLabel,
    TextField,
    Tooltip,
    Typography,
    ButtonGroup,
} from "@mui/material";
import React from "react";
import ViewColumnIcon from "@mui/icons-material/ViewColumn";
import AddIcon from "@mui/icons-material/Add";
import { utils, write, writeFile } from "xlsx";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import dayjs from "dayjs";
import styles from '../../../styles/Home.module.css'



export default function DataTable(props) {
    // console.log(props, "DataTable")
    const [sortDirection, setSortdirection] = React.useState("desc");
    const [sortColum, setsortColum] = React.useState(null);
    const [data, setData] = React.useState(null);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [anchorColumEl, setAnchorColumEl] = React.useState(null);
    const [filterColum, setFilterColum] = React.useState(null);
    const [filterColumName, setFilterColumName] = React.useState(null);
    const [filterData, setFilterData] = React.useState(new Object());
    const [rowPerPage, setRowPerPage] = React.useState(10);
    const [curPage, setCurPage] = React.useState(1);
    const [excludeColum, setExcludeColum] = React.useState([]);
    const [colum, setColum] = React.useState(props.colum);
    const [itemsChecked, setItemsChecked] = React.useState(false);
    const [checkedList, setCheckedList] = React.useState([]);
    const [selectedData, setSelectedData] = React.useState(
        props.selectedData ? props.selectedData : []
    );
    const [singleSelectData, setSingleSelectData] = React.useState(
        props.singleSelectData ? props.singleSelectData : null
    );
    const [selectedCollaspe, setSelectedCollaspe] = React.useState(null);
    const [exportable, setExportable] = React.useState(
        props.export == undefined ? true : props.export
    );
    React.useEffect(() => {
        setColum(props.colum);
    }, [props.colum]);
    React.useEffect(() => {
        if (props.data) {
            _onFilterChange();
        }
    }, [props]);

    React.useEffect(() => {
        console.log("props.data")
        setCurPage(curPage)
    }, [props.data])

    React.useEffect(() => {
        // console.log("props.selectedData",props.selectedData)
        if (props.selectedData) {
            setSelectedData([]);
            setSelectedData(props.selectedData);
        }
    }, [props.selectedData]);

    const downloadExcel = () => {
        let datasheet = data;
        // console.log(datasheet,"row");
        let newDataSheet = datasheet.map((row) => {
            row.CREATE_DTM = dateFormat(dbdateformat(row.CREATE_DTM));
            row.LAST_UPD_DTM != null
                ? (row.LAST_UPD_DTM = dateFormat(dbdateformat(row.LAST_UPD_DTM)))
                : null;
            delete row.STATUS;
            delete row.action;
            return row;
        });
        console.log(newDataSheet);
        let today = dayjs(new Date()).format("YYYYMMDD_HHmmss");
        console.log(today);
        const workSheet = utils.json_to_sheet(newDataSheet);
        const workBook = utils.book_new();
        utils.book_append_sheet(workBook, workSheet, "New Sheet");
        let buffer = write(workBook, { bookType: "xlsx", type: "buffer" });
        //binary string
        write(workBook, { bookType: "xlsx", type: "binary" });
        writeFile(workBook, "ExportData" + today + ".xlsx");
    };

    const _onFilterChange = () => {
        setCurPage(1)
        let newData = [];
        // console.log(filterData, "filterData");
        if (Object.keys(filterData).length === 0) {
            newData = props.data;
        } else {
            for (var i in props.data) {
                let add = 0;
                let keys = Object.keys(filterData);
                for (var j in keys) {
                    console.log(props.data[i][keys[j]], "dataFilter");
                    if (typeof props.data[i][keys[j]] === 'object') {
                        if (props.data[i][keys[j]]['$$typeof'] != undefined) {
                            if (filterData[keys[j]].includes(props.data[i][keys[j]]["props"]["label"])) {
                                add = add + 1;
                            }
                        } else {
                            if (filterData[keys[j]].includes(props.data[i][keys[j]])) {
                                add = add + 1;
                            }
                        }
                    } else {
                        if (filterData[keys[j]].includes(props.data[i][keys[j]])) {
                            add = add + 1;
                        }
                    }
                }
                if (add == Object.keys(filterData).length) {
                    //console.log(add)
                    newData.push(props.data[i]);
                }
            }
            // for (var i in props.colum) {
            //     if (filterData?.hasOwnProperty(props.colum[i].listname)) {
            //         for (var j in props.data) {
            //             if (filterData[props.colum[i].listname].includes(props.data[j][props.colum[i].listname])) {
            //                 //console.log(props.data[j], "data")
            //                 newData.push(props.data[j])
            //             }
            //         }
            //     }
            // }
        }
        setData([]);
        setData(newData);
    };

    const _setSortColum = async (listname) => {
        //console.log(listname)
        await setsortColum(listname);
        if (sortDirection == null) {
            await setSortdirection("asc");
        } else {
            if (sortDirection == "asc") {
                await setSortdirection("desc");
                _sortOrder(listname, "desc");
            } else {
                await setSortdirection("asc");
                _sortOrder(listname, "asc");
            }
        }
    };
    const _sortOrder = (colname, direction) => {
        if (direction == "asc") {
            data.sort((a, b) => (a[colname] > b[colname] ? 1 : -1));
        }
        if (direction == "desc") {
            data.sort((a, b) => (a[colname] < b[colname] ? 1 : -1));
        }
    };
    const _handleChangePage = (event, value) => {
        //console.log(value);
        setCurPage(value);
    };

    const _onClickSingle = async (el) => {
        if (props.onSingleSelect) {
            props.onSingleSelect(el);
        }
        await setSingleSelectData(el);
    };


    const _handleChageColumVisible = async (value) => {
        //console.log(value)
        await setExcludeColum([]);
        await setExcludeColum(value);
        _onFilterChange();
        await setColum([]);
        await setColum(props.colum);
        props.colum;
    };
    const _handleCollapse = (el) => {
        if (Object.is(selectedCollaspe, el)) {
            setSelectedCollaspe(null);
        } else {
            setSelectedCollaspe(el);
        }
    };

    const Kanitstyles = {
        fontSize: "15px",
        fontFamily: "Kanit",
        fontWeight: "600",
    }

    const KanitTable = {
        fontSize: "15px",
        fontFamily: "Kanit",
        fontWeight: "600",
        color: '#AFAFAF',
    }

    const selectItem = async (e) => {
        const { checked } = e.target;
        const collection = [];

        if (checked) {
            for (const category of props.data) {
                collection.push(category);
            }
        }
        await setSelectedData(collection);
        await setItemsChecked(checked)
        if (props.onSelect) {
            props.onSelect(collection);
        }
    };

    const _onClick = async (el) => {
        console.log(el);
        let newData = selectedData;
        for (var i in newData) {
            if (Object.is(el, newData[i])) {
                // console.log(true, i)
                newData.splice(i, 1);
                await setSelectedData([]);
                await setSelectedData(newData);
                return;
            }
        }
        newData.push(el);
        // console.log(newData)
        await setSelectedData([]);
        await setSelectedData(newData);
        if (props.onSelect) {
            props.onSelect(newData);
        }
    };
    const _isSelected = (el) => {
        let newData = selectedData;
        for (var i in newData) {
            if (Object.is(el, newData[i])) {
                // console.log(true, i)
                return true;
            }
        }
        return false;
    };


    return (
        <div>
            <Paper sx={{ borderRadius: '10px' }}>
                {anchorEl && (
                    <FilterPopOver
                        onChange={_onFilterChange}
                        data={props.data}
                        filterColum={filterColum}
                        filterColumName={filterColumName}
                        filterData={filterData}
                        open={anchorEl !== null}
                        anchorEl={anchorEl}
                        onClose={() => setAnchorEl(null)}

                    />
                )}
                {
                    <ColumPopOver
                        excludeColum={excludeColum}
                        colum={props.colum}
                        open={anchorColumEl !== null}
                        anchorEl={anchorColumEl}
                        onChange={_handleChageColumVisible}
                        onClose={() => setAnchorColumEl(null)}
                    />
                }
                <Grid container px={2} py={1}>
                    <Grid item>
                        <Typography variant="h6">
                            <strong>{props.tableName}</strong>
                        </Typography>
                    </Grid>
                    <Grid item xs>
                        <Grid container justifyContent={"flex-end"} alignItems={"center"}>
                            <Grid item>
                                {props.add && (
                                    <Button
                                        onClick={props.add}
                                        size={"small"}
                                        variant="contained"
                                        color={"success"}
                                        startIcon={<AddIcon />}
                                    >
                                        {props.addname ? props.addname : "เพิ่มข้อมูล"}
                                    </Button>
                                )}
                            </Grid>

                            {props.export && (
                                <Grid item>
                                    <Tooltip title={"ส่งออกข้อมูล"}>
                                        <Button
                                            size="small"
                                            onClick={() => {
                                                downloadExcel();
                                            }}
                                        >
                                            <FileDownloadIcon /> Export
                                        </Button>
                                    </Tooltip>
                                </Grid>
                            )}
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container>
                    <TableContainer>
                        <Table sx={{ minWidth: "1100px", height: "auto" }}>
                            <TableHead>
                                <TableRow sx={{ backgroundColor: "#4267b2" }}>
                                    {data && data[0]?.hasOwnProperty("collapse") && (
                                        <TableCell width={"2%"}></TableCell>
                                    )}
                                    {props.onSelect && (
                                        <TableCell width={"5%"}>
                                            <Checkbox size="small" checked={itemsChecked} onClick={selectItem.bind(this)} />
                                        </TableCell>
                                    )}
                                    {colum?.map(
                                        (el, index) =>
                                            !excludeColum.includes(el.listname) && (
                                                <TableCell

                                                    key={index}

                                                    sortDirection={sortDirection}
                                                >
                                                    <Grid container>
                                                        <Grid item sx={{ width: "100%", display: 'flex' }}>
                                                            <Typography variant="text" sx={Kanitstyles} color="#FFFFFF">{el.name}</Typography>
                                                        </Grid>
                                                    </Grid>
                                                </TableCell>

                                            )
                                    )}


                                    <TableCell style={{ width: 400 }} align="center"></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data?.map(
                                    (el, index) =>
                                        index >= (curPage - 1) * rowPerPage &&
                                        index < curPage * rowPerPage && (
                                            <React.Fragment>
                                                <TableRow
                                                    key={index}
                                                    onClick={
                                                        props.onSingleSelect
                                                            ? () => _onClickSingle(el)
                                                            : null
                                                    }
                                                    sx={
                                                        props.onSingleSelect
                                                            ? singleSelectData == el
                                                                ? {
                                                                    cursor: "pointer",
                                                                    backgroundColor: "#eff6ff",
                                                                }
                                                                : {
                                                                    cursor: "pointer",
                                                                    "&:hover": { backgroundColor: "#eff6ff" },
                                                                }
                                                            : null
                                                    }
                                                >

                                                    {el.collapse && (
                                                        <TableCell>
                                                            <IconButton
                                                                size={"small"}
                                                                onClick={() => _handleCollapse(el)}
                                                            >
                                                                {el == selectedCollaspe ? (
                                                                    <KeyboardArrowUpIcon />
                                                                ) : (
                                                                    <KeyboardArrowDownIcon />
                                                                )}
                                                            </IconButton>
                                                        </TableCell>
                                                    )}

                                                    {props.onSelect && (
                                                        <TableCell>
                                                            <Checkbox
                                                                size="medium"
                                                                // checked={_isSelected(el)}
                                                                checked={selectedData.includes(el)}
                                                                onChange={() => _onClick(el)}
                                                                sx={{ ml: 1 }}
                                                            />
                                                        </TableCell>
                                                    )}

                                                    {colum.map(
                                                        (colum, indexx) =>
                                                            !excludeColum.includes(colum.listname) && (
                                                                <TableCell
                                                                    key={indexx}
                                                                    sx={Kanitstyles}
                                                                >
                                                                    {el[colum.listname]}
                                                                </TableCell>

                                                            )
                                                    )}

                                                    {data[0]?.hasOwnProperty("action") && (
                                                        <TableCell>{el["action"]}</TableCell>
                                                    )}

                                                </TableRow>
                                                {el.collapse && (
                                                    <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
                                                        {
                                                            <TableCell
                                                                colSpan={colum.length + 2}
                                                                style={{ paddingBottom: 0, paddingTop: 0 }}
                                                            >
                                                                <Collapse in={Object.is(el, selectedCollaspe)}>
                                                                    {Object.is(el, selectedCollaspe) &&
                                                                        el.collapse}
                                                                </Collapse>
                                                            </TableCell>
                                                        }
                                                    </TableRow>
                                                )}
                                            </React.Fragment>
                                        )
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
                <Grid container>
                    <Grid item xs={12} py={1}>
                        <Grid
                            container
                            justifyContent={"flex-end"}
                            alignItems={"center"}
                            px={2}
                        >
                            <Grid item xs={3}>
                                <Typography fontSize={14} sx={KanitTable}>
                                    {data?.length > 0 &&
                                        "จำนวนรายการทั้งหมด " + data.length + " รายการ"}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Pagination
                                    page={curPage}
                                    onChange={_handleChangePage}
                                    color="primary"
                                    count={isNaN(Math.ceil(data?.length / rowPerPage)) ? 0 : Math.ceil(data?.length / rowPerPage)}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    );
}

function ColumPopOver(props) {
    const _handleChange = (e, listname) => {
        let excludeColum = props.excludeColum;
        let newdata = [];
        if (!excludeColum.includes(listname)) {
            excludeColum.push(listname);
        } else {
            var index = excludeColum.indexOf(listname);
            if (index !== -1) {
                excludeColum.splice(index, 1);
            }
        }
        newdata = excludeColum;
        if (props.onChange) {
            props.onChange(newdata);
        }
    };
    const hideall = () => {
        let newdata = [];
        for (var i in props.colum) {
            newdata.push(props.colum[i].listname);
        }
        if (props.onChange) {
            props.onChange(newdata);
        }
    };
    const showall = () => {
        if (props.onChange) {
            props.onChange([]);
        }
    };
    return (
        <Popover
            open={props.open}
            anchorEl={props.anchorEl}
            onClose={props.onClose}
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
            }}
            transformOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
        >
            <Grid container sx={{ width: "300px" }} p={1}>
                <Grid item xs={12}>
                    <Typography fontWeight={600}> แสดงผลคอลลัมน์ </Typography>
                </Grid>
                {props.colum?.map((el, index) => (
                    <Grid item xs={12} key={index}>
                        <FormGroup>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={!props.excludeColum?.includes(el.listname)}
                                        onChange={(e) => _handleChange(e, el.listname)}
                                    />
                                }
                                label={el.name}
                            />
                        </FormGroup>
                    </Grid>
                ))}
                <Grid item xs={12}>
                    <Grid container justifyContent={"flex-end"}>
                        <Button size="small" onClick={hideall}>
                            ซ่อนทั้งหมด
                        </Button>
                        <Button size="small" onClick={showall}>
                            แสดงทั้งหมด
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Popover>
    );
}

function FilterPopOver(props) {
    const [value, setValue] = React.useState([]);
    const [valueAutoComplete, setValueAutoComplete] = React.useState(
        props.filterData[props.filterColum]
            ? props.filterData[props.filterColum]
            : []
    );

    React.useEffect(() => {
        console.log(props, "newObject_XXX")
        _setValue();
    }, [props]);

    const _setValue = async () => {
        let newData = [];
        try {
            for (var i in props.data) {
                if (props.data[i][props.filterColum]["$$typeof"] != undefined) {
                    newData.push(props.data[i][props.filterColum]["props"]["label"]);
                } else {
                    newData.push(props.data[i][props.filterColum]);
                }
            }
        } catch {
            newData.push(props.data[i][props.filterColum]);
        }
        newData = [...new Set(newData)];
        if (newData[0] == undefined) {
            await setValue([]);
        } else {
            await setValue(newData);
        }
    };

    const _CreateFilterObject = async (event, value) => {
        let newObject = props.filterData;
        console.log(newObject, "newObject_XXX");
        console.log(value, "newObject_XXX");
        //console.log("_CreateFilterObject", newObject, props.filterColum)
        //console.log("_CreateFilterObject", value)
        if (value.length == 0) {
            delete newObject[props.filterColum];
        } else {
            newObject[props.filterColum] = value;
        }
        // if (newObject == null) {
        //     newObject = new Object()
        // }
        await setValueAutoComplete(value);
        if (props.onChange) {
            console.log(newObject, "newObject_XXX2");
            props.onChange(newObject);
        }
    };

    return (
        <Popover
            open={props.open}
            anchorEl={props.anchorEl}
            onClose={props.onClose}
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
            }}
            transformOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
        >
            <Grid container py={1} px={1} sx={{ width: "300px" }}>
                <Grid item xs={12}>
                    <Typography>
                        {" "}
                        กรองข้อมูล <strong> {props.filterColumName}</strong>{" "}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Autocomplete
                        multiple
                        getOptionLabel={(option) => (option ? option : "")}
                        value={valueAutoComplete}
                        onChange={_CreateFilterObject}
                        size="small"
                        options={value}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </Grid>
            </Grid>
        </Popover>
    );
}