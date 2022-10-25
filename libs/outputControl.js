import { right } from "./datacontrol"
import month from "./month"

export const dateFormat = (date, method = null) => {
    if (method == null) {
        method = 'MONTH_NAME_TH'
    }
    if (date == null) {
        return ""
    }
    try {
        let newdate = date.split("-")
        let year = newdate[0]
        let m = newdate[1]
        let d = newdate[2]
        let mname = ""
        // console.log(m)
        for (var i in month) {
            if (month[i].MONTH_ID == m) {
                mname = month[i].MONTH_NAME_TH
            }
        }
        return String(parseInt(d)) + " " + mname + " " + (parseInt(year) + 543)
    }
    catch {
        return false
    }
}
export const dateFormatTime = (date, method = null) => {
    if (method == null) {
        method = 'MONTH_NAME_TH'
    }

    if (date == null) {
        return ""
    }
    let datex = date.split("T")
    let time = datex[1].split(":")
    try {
        let newdate = datex[0].split("-")
        let year = newdate[0]
        let m = newdate[1]
        let d = newdate[2]
        let mname = ""
        // console.log(m)
        for (var i in month) {
            if (month[i].MONTH_ID == m) {
                mname = month[i].MONTH_NAME_TH
            }
        }
        return String(parseInt(d)) + " " + mname + " " + (parseInt(year) + 543) + " " + time[0] + ":" + time[1]
    }
    catch {
        return false
    }
}

export const numberWithCommas = (x) => {
    try {
        if (isNaN(x)) {
            return null
        }
        var parts = x.toString().split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return parts.join(".");
    } catch
    {
        return null
    }
}

export const reqSeqNumber = (reqData) => {
    return "REQ" + right(String(reqData.REQUEST_NO_1 + 543), 2) + reqData.REQUEST_NO_2 + right("000000" + reqData.REQUEST_NO_3, 6)
}

export const viewObjectNameDoc = (array, colname) => {
    // ถ้าเป็น object เข้ามา จะทำเป็น array
    if (
        typeof array === 'object' &&
        !Array.isArray(array) &&
        array !== null
    ) {
        array = [array];
    }
    let data = array;
    let newData = "";
    let oldData = "";
    for (let i in data) {
        let req_location = data[i][colname] == null ? "" : data[i][colname];
        if (oldData != req_location) {
            if (i == 0) {
                newData += req_location;
            }
            else if ((parseInt(i) + 1) == array.length) {
                newData += " และ" + req_location;
            }
            else {
                newData += " " + req_location;
            }
        }
        oldData = req_location;

    }
    console.log("viewObjectNameDoc", newData);
    return newData;
};

export const getTypeImage = (file) => {
    if (typeof file === "object") {
        let fileType = file.name;
        let maxlength = fileType.split('.')
        console.log(fileType.split('.')[(maxlength.length - 1)]);
        return fileType.split('.')[(maxlength.length - 1)];
    } else {
        let fileType = file
        let maxlength = fileType.split('.')
        console.log(fileType.split('.')[(maxlength.length - 1)]);
        return fileType.split('.')[(maxlength.length - 1)];
    }
};

export const getExpressWayName = (requestData, expresswayData) => {
    let newExpressWayName = "";
    let oldExpressWayName = "";
    if (
        typeof requestData === 'object' &&
        !Array.isArray(requestData) &&
        requestData !== null
    ) {
        requestData = [requestData];
    }
    console.log(requestData, "requestData");
    for (let i in requestData) {
        let filterExpressway = expresswayData.filter((item) => (item.EXPRESSWAY_SEQ == requestData[i].EXPRESSWAY_SEQ));
        // console.log(filterExpressway, "filterExpressway");
        if (filterExpressway.length > 0) {
            if (oldExpressWayName != filterExpressway[0].EXPRESSWAY_NAME_TH) {
                if (parseInt(i) == 0) {
                    newExpressWayName += filterExpressway[0].EXPRESSWAY_NAME_TH;
                }
                // else if ((parseInt(i) + 1) == requestData.length) {
                //     newExpressWayName += " และ" + filterExpressway[0].EXPRESSWAY_NAME_TH;
                // } 
                // else {
                //     newExpressWayName += " " + filterExpressway[0].EXPRESSWAY_NAME_TH;
                // }
                else {
                    newExpressWayName += " ฯลฯ";
                    break;
                }
                console.log(newExpressWayName, "newExpressWayName");
            }
            oldExpressWayName = filterExpressway[0].EXPRESSWAY_NAME_TH;
        }
    }
    return newExpressWayName;
}


function NumberToThaiText(Number) {
    Number = Number.replace(/0/gi, "๐");
    Number = Number.replace(/1/gi, "๑");
    Number = Number.replace(/2/gi, "๒");
    Number = Number.replace(/3/gi, "๓");
    Number = Number.replace(/4/gi, "๔");
    Number = Number.replace(/5/gi, "๕");
    Number = Number.replace(/6/gi, "๖");
    Number = Number.replace(/7/gi, "๗");
    Number = Number.replace(/8/gi, "๘");
    Number = Number.replace(/9/gi, "๙");
    return Number
};

export function mapMonthThai(numMonth, showType = "MM") {
    let months_th = ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม",];
    let months_th_mini = ["ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค.",];
    let index = numMonth - 1;
    if (showType == "MM") {
        return months_th_mini[index]
    }
    if (showType == "MMMM") {
        return months_th[index]
    }
}

export function getNameWithTitle(t, f, l) {
    // console.log(t, f, l, "getNameWithTitle");
    let titile = t == null ? "" : t;
    let firstname = f == null ? "" : f;
    let lastname = l == null ? "" : l;
    // console.log(titile, "titile");
    if (titile) {
        let titleAddtionalPosition = titile.indexOf("...");
        // console.log(titleAddtionalPosition, "titleAddtionalPosition");
        if (titleAddtionalPosition > 0) {
            let titleFirst = t.substring(0, titleAddtionalPosition);
            let titleLast = t.substring(titleAddtionalPosition + 3, t.length);
            // console.log(titleFirst, titleLast, "titleFirst, titleLast");
            return titleFirst + " " + firstname + " " + lastname + titleLast;
        } else {
            return titile + " " + firstname + " " + lastname;
        }
    } else {
        return firstname + " " + (lastname == null ? "" : lastname);
    }

}


export function getAddrContractText(contractAddr) {
    try {
        let addrNo = contractAddr?.ADDR_ADDR;
        let moo = contractAddr?.ADDR_MOO;
        let mooText = moo == null ? "" : "หมู่ " + moo;
        let soi = contractAddr?.ADDR_SOI;
        let soiText = soi == null ? "" : "ซอย " + soi;
        let road = contractAddr.ADDR_ROAD;
        let roadText = road == null ? "" : "ถนน " + road;
        let tambolN = contractAddr.PROVINCE_SEQ == 1 ? "ตำบล" : "แขวง";
        let amphoeN = contractAddr.PROVINCE_SEQ == 1 ? "อำเภอ" : "เขต";
        let provinceN = contractAddr.PROVINCE_SEQ == 1 ? "จังหวัด" : "จังหวัด";
        let tambol = contractAddr.TAMBOL_NAME_TH == null ? "" : tambolN + contractAddr.TAMBOL_NAME_TH;
        let amphoe = contractAddr.AMPHUR_NAME_TH == null ? "" : amphoeN + contractAddr.AMPHUR_NAME_TH;
        let province = contractAddr.PROVINCE_NAME_TH == null ? "" : provinceN + contractAddr.PROVINCE_NAME_TH;
        let zipCode = contractAddr.ADDR_POSTCODE == null ? "" : " " + contractAddr.ADDR_POSTCODE;
        let addrText = addrNo + " " + mooText + " " + soiText + " " + roadText + " " + tambol + " " + amphoe + " " + province + " " + zipCode;
        return addrText
    } catch (error) {
        return ""
    }
}