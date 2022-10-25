import { getRequestRentalByRequest } from "../service/REG/request_rental"
import { filterRecordStatus } from "./datacontrol"

export const _getRentalData = async (seq) => {
    let res = await getRequestRentalByRequest(seq)
    console.log(res, "_getRentalData")
    let areaList = [14, 15, 16, 17]
    let areaListD = [18, 19, 20]
    let totalArea = 0
    let totalAreaD = 0
    res = filterRecordStatus(res)
    for (var i in res) {
        if (areaList.includes(res[i].PROCESS_STS_SEQ)) {
            totalArea += res[i].REQUEST_AREA_NUM
        }
    }
    for (var i in res) {
        if (areaListD.includes(res[i].PROCESS_STS_SEQ)) {
            totalAreaD += res[i].REQUEST_AREA_NUM
        }
    }
    try {
        let area = (totalArea - totalAreaD) / 4
        console.log(area, "_getRentalData")
        return Math.round(area)
        
    } catch {
        return 0
    }
}