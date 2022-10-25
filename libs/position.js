import { getPersonnelByPK } from "../service/HRM/personnel"
import { getDepartmentByPK } from "../service/MAS/department"
import { getPositionByPK } from "../service/MAS/position"

export const _getPositionName = async (seq) => {
    // console.log(perseq, "_getPositionName")
    let resHrm = await getPersonnelByPK(seq)
    console.log(resHrm, "resHrm")
    try {
        let resPosition = await getPositionByPK(resHrm[0].POSITION_SEQ)
        console.log(resPosition, "resPosition")
        let name = resPosition[0].POSITION_NAME_TH + " " + resHrm[0].LEVEL_C
        return name
    } catch {
        return ""
    }
}



export const getApproveName = async (depseq) => {
    // console.log(props.reqData, "getApproveNameTH")
    let resDep = await getDepartmentByPK(depseq)
    console.log(resDep, "resDep")
    // setPersonApproveNameTH("ห. " + resDep[0].DEPARTMENT_ABBR)
    return "ห. " + resDep[0].DEPARTMENT_ABBR
}
