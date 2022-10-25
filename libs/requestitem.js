export const _createRequestitem = (registerid, registerseq, inputdata, customerdata, address, logindata, regDepData, depData) => {
    console.log("_createRequestitem", registerid, registerseq, inputdata, customerdata, address, logindata, regDepData, depData)
    if (registerid == 1) {
        let data = regis1item(registerid, registerseq, inputdata, customerdata, address, logindata, regDepData, depData)
        return data
    }
    if (registerid == 6 || registerid == 7) {
        let data = regis6item(registerid, registerseq, inputdata, customerdata, address, logindata, regDepData, depData)
        return data
    }
    if (registerid == 2 || registerid == 8) {
        let data = regis2item(registerid, registerseq, inputdata, customerdata, address, logindata, regDepData, depData)
        return data
    }
    if (registerid == 3 || registerid == 4 || registerid == 5 || registerid == 9 ) {
        let data = regis3item(registerid, registerseq, inputdata, customerdata, address, logindata, regDepData, depData)
        return data
    }
}

const _getDepartmentData = (data, seq) => {
    try {
        var item = data.find(item => item.DEPARTMENT_SEQ == seq);
        //   console.log(item,"item");
        return item;
    } catch (err) {
        console.log(err)
        return false;
    }
}

const _getListPermiss = (regDepData, depData, expressWaydata) => {
    for (var i in regDepData) {
        let item = _getDepartmentData(depData, regDepData[i].DEPARTMENT_SEQ)
        regDepData[i].SECTION_SEQ = item.SECTION_SEQ
    }
    let sectionSeq = false
    let departmentSeq = false
    if (regDepData.length == 1) {
        sectionSeq = regDepData[0].SECTION_SEQ
        departmentSeq = regDepData[0].DEPARTMENT_SEQ
        return {
            sectionSeq: sectionSeq,
            departmentSeq: departmentSeq
        }
    }
}

const regis1item = (registerid, registerseq, inputdata, customerdata, address, logindata, regDepData, depData) => {
    console.log(regDepData, "regDepData")
    console.log("regis1item", inputdata)
    let dataArray = []
    for (var i in inputdata.tollgateitem) {
        let data = inputdata.tollgateitem[i]
        var Obj = {
            "REQUEST_LIST_ORDER": "0",
            "REQUEST_SEQ": registerseq,
            "DIVISION_SEQ": 0,
            "SECTION_SEQ": 0,
            "EXPRESSWAY_SEQ": data.tollgate.EXPRESSWAY_SEQ,
            "TOLLGATE_SEQ": data.tollgate.TOLLGATE_SEQ,
            "DEPARTMENT_SEQ": 0,
            "OBJECTIVE_SEQ": 0,
            "OBJECTIVE_NAME_TH": null,
            "BILLBOARD_SEQ": 0,
            "REQUEST_LOCATION": null,
            "REQUEST_WIDTH": 0.00,
            "REQUEST_HEIGHT": 0.00,
            "REQUEST_GEOMETRY_0": "POINT (" + data.tollgate.LATITUDE + " " + data.tollgate.LONGITUDE + ")",
            "REQUEST_START_DTM": data.date,
            "REQUEST_ENTER_DTM": data.date,
            "REQUEST_END_DTM": data.date,
            "REGISTER_STATUS": "0",
            "REGISTER_START_DTM": data.date,
            "REQUEST_LIST_NOTE": null,
            "RECORD_STATUS": "N",
            "CREATE_USER": logindata.USER_PID
        }
        dataArray.push(Obj)
    }
    return dataArray
}

const regis6item = (registerid, registerseq, inputdata, customerdata, address, logindata, regDepData, depData) => {
    console.log("regis6item", inputdata)
    let dataArray = []
    for (var i in inputdata.objectiveItem) {
        let data = inputdata.objectiveItem[i]
        var Obj = {
            "REQUEST_LIST_ORDER": "0",
            "REQUEST_SEQ": registerseq,
            "DIVISION_SEQ": 0,
            "SECTION_SEQ": 0,
            "EXPRESSWAY_SEQ": inputdata.selectedExpressway.EXPRESSWAY_SEQ,
            "TOLLGATE_SEQ": null,
            "DEPARTMENT_SEQ": 0,
            "OBJECTIVE_SEQ": data.OBJECTIVE_SEQ,
            "OBJECTIVE_NAME_TH": data.OBJECTIVE_NAME_TH,
            "BILLBOARD_SEQ": 0,
            "REQUEST_LOCATION": null,
            "REQUEST_WIDTH": 0.00,
            "REQUEST_HEIGHT": 0.00,
            "REQUEST_GEOMETRY_0": inputdata.billboard_coor ? "POINT (" + inputdata.billboard_coor[1] + " " + inputdata.billboard_coor[0] + ")" : null ,
            "OFFER_PRICE_ALL": (inputdata.price_bid == "" || inputdata.price_bid == null) ? 0.00 : inputdata.price_bid,
            "REQUEST_START_DTM": null,
            "REQUEST_ENTER_DTM": null,
            "REQUEST_END_DTM": null,
            "REGISTER_STATUS": "0",
            "REGISTER_START_DTM": data.date,
            "REQUEST_LIST_NOTE": null,
            "RECORD_STATUS": "N",
            "CREATE_USER": logindata.USER_PID
        }
        dataArray.push(Obj)
    }
    console.log(dataArray, "dataArray")
    return dataArray
}

const regis3item = (registerid, registerseq, inputdata, customerdata, address, logindata, regDepData, depData) => {
    console.log("regis3item", inputdata)
    let dataArray = []
    for (var i in inputdata.objectiveItem) {
        let data = inputdata.objectiveItem[i]
        var Obj = {
            "REQUEST_LIST_ORDER": "0",
            "REQUEST_SEQ": registerseq,
            "DIVISION_SEQ": 0,
            "SECTION_SEQ": 0,
            "EXPRESSWAY_SEQ": data.selExpressway.EXPRESSWAY_SEQ,
            "TOLLGATE_SEQ": null,
            "DEPARTMENT_SEQ": 0,
            "OBJECTIVE_SEQ": 0,
            "OBJECTIVE_NAME_TH": null,
            "BILLBOARD_SEQ": data.selBillboard.BILLBOARD_SEQ,
            "BILLBOARD_NAME_TH": data.selBillboard.BILLBOARD_NAME_TH,
            "REQUEST_LOCATION": data.areaInput,
            "REQUEST_RENTAL" : data.isFree ? 1 : null ,
            "REQUEST_WIDTH": data.billboard_width,
            "REQUEST_HEIGHT": data.billboard_length,
            "REQUEST_GEOMETRY_0": data.billboard_coor != null ? "POINT (" + data.billboard_coor[1] + " " + data.billboard_coor[0] + ")" : null,
            "RENTAL_ALL": data.billboard_price,
            "OFFER_PRICE_ALL": data.price_bid == "" ? 0.00 : data.price_bid,
            "REQUEST_START_DTM": null,
            "REQUEST_ENTER_DTM": null,
            "REQUEST_END_DTM": null,
            "REGISTER_STATUS": "1",
            "REGISTER_START_DTM": null,
            "REQUEST_LIST_NOTE": null,
            "RECORD_STATUS": "N",
            "CREATE_USER": logindata.USER_PID
        }
        dataArray.push(Obj)
    }
    return dataArray
}

const regis2item = (registerid, registerseq, inputdata, customerdata, address, logindata, regDepData, depData) => {
    console.log("regis2item", inputdata)
    let dataArray = []

    let data = inputdata.objectiveItem
    var Obj = {
        "REQUEST_LIST_ORDER": "0",
        "REQUEST_SEQ": registerseq,
        "DIVISION_SEQ": 0,
        "SECTION_SEQ": 0,
        "EXPRESSWAY_SEQ": inputdata.selectedExpressway.EXPRESSWAY_SEQ,
        "TOLLGATE_SEQ": null,
        "DEPARTMENT_SEQ": 0,
        "OBJECTIVE_SEQ": inputdata.objectiveDetail.OBJECTIVE_SEQ,
        "OBJECTIVE_NAME_TH": inputdata.objectiveDetail.OBJECTIVE_NAME_TH,
        "BILLBOARD_SEQ": 0,
        "REQUEST_LOCATION": null,
        "REQUEST_WIDTH": 0.00,
        "REQUEST_HEIGHT": 0.00,
        // "REQUEST_START_DTM": null,
        "REQUEST_ENTER_DTM": null,
        "REQUEST_GEOMETRY_0": inputdata.billboard_coor ? "POINT (" + inputdata.billboard_coor[1] + " " + inputdata.billboard_coor[0] + ")" : null,
        "REGISTER_START_DTM": inputdata.startdate,
        "REQUEST_END_DTM": inputdata.enddate,
        "REGISTER_STATUS": "0",
        "REQUEST_LIST_NOTE": null,
        "RECORD_STATUS": "N",
        "CREATE_USER": logindata.USER_PID
    }
    dataArray.push(Obj)

    return dataArray
}

