import * as ServiceHRMPersonelNoti from "./../service/HRM/personnelNotification"
import * as ServiceCustomerNoti  from "./../service/REG/customer_notification"
import { getCookie, _readToken } from "./datacontrol"

const loginData = _readToken(getCookie("userdata"))

export const _sendNotificationHRM = async (reqSeq, perSeq, nocType, msg, link) => {
    // personnel 
    // console.log(reqSeq, perSeq, "reqSeq, perSeq")
    let notidata = {
        "PERS_SEQ": perSeq,
        "NOTIFICATION_SEQ": nocType,
        "PERS_NOTIFICATION_NOTE": msg,
        "PERS_NOTIFICATION_HREF": link,
        "RECORD_STATUS": "N",
        "CREATE_USER": String(loginData.USER_PID)
    }
    console.log(notidata)
    try {
        let res = await ServiceHRMPersonelNoti.addPersonnelNotification(notidata)
        console.log(res, "_sendNotification")
    } catch (e) {
        console.log(e)
    }

}
export const _sendNotificationCustomer = async (link, custSeq, nocType, msg) => {
    // customer
    let customerData = {
        CUST_SEQ: custSeq,
        NOTIFICATION_SEQ: nocType,
        CUST_NOTIFICATION_NOTE: msg,
        CUST_NOTIFICATION_HREF: link,
        RECORD_STATUS: "N",
        CREATE_USER: String(loginData.USER_PID)
    }
    try {
        let res = await ServiceCustomerNoti.insCustomerNotification(customerData)
        console.log(res)
    } catch (e) {
        console.log(e, "_sendnotificationCustomer")
    }
}