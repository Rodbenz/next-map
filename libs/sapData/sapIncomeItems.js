import { first } from "underscore"
import { getExpressWayByPK } from "../../service/MAS/expressway"
import { getInvoiceByPK } from "../../service/MAS/invoice"
import { filterRecordX, formatDate, _getDatafromArray, _getUniqueFromArray } from "../datacontrol"




export const sapDepositeItems = (data) => {
    console.log(data, "sapDepositeItems")
    let expressWayList = _getUniqueFromArray(data, "EXPRESSWAY_SEQ")
    console.log(expressWayList, "expressWayList")
    let newData = []
    for (var i in expressWayList) {
        let obj = new Object()
        obj.EXPRESSWAY_SEQ = expressWayList[i]
        obj.EXPRESSWAY_NAME_TH = _getDatafromArray(data, "EXPRESSWAY_SEQ", "EXPRESSWAY_NAME_TH", expressWayList[i])
        obj.items = []
        for (var j in data) {
            if (data[j].EXPRESSWAY_SEQ == expressWayList[i]) {
                obj.items.push(data[j])
            }
        }
        newData.push(obj)
    }
    console.log(newData, "newData")
    return newData
}

export const itemPostingKey01Genarator = (incomeList) => {
    console.log(incomeList, "itemPostingKey01Genarator")
    let incomeListArray = _getUniqueFromArray(incomeList, "PAYMENT_SEQ") // แยกประเภทการชำระเงิน
    let item = []
    for (var i in incomeListArray) {
        let c = 0
        for (var j in incomeList) {
            if (incomeList[j].PAYMENT_SEQ == incomeListArray[i]) {
                c += incomeList[j].INVOICE_NET_AMOUNT
            }
        }
        let obj = {
            PAYMENT_SEQ: incomeListArray[i],
            TOTAL: c
        }
        item.push(obj)
    }
    console.log(item, "item01")

    let postingKeyItem = []
    for (var i in item) {
        if (item[i].TOTAL > 0) {
            let obj = {
                "POSTING_KEY": "01",
                "ACCOUNT": "2000000407",
                "SPECIAL_GL_INDICATOR": "",
                "TAX_BASE_AMOUNTY": 0,
                "AMT_IN_DOC_CURR": item[i].TOTAL,
                "AMT_IN_LOCAL_CURR": item[i].TOTAL,
                "TAX_CODE": "OX",
                "TERMS_OF_PAYMENT": "ZR00",
                "BASELINE_DATE": formatDate(new Date()),
                "REF_KEY_1": "GIS",
                "REF_KEY_2": sapPostingKey01Method(item[i].PAYMENT_SEQ),
                "PROFIT_CENTER": ""
            }
            postingKeyItem.push(obj)
        }
    }
    // console.log(postingKeyItem, "postingKeyItem")
    return postingKeyItem
}

export const sapIncomeItems = async (data) => {
    console.log(data, "sapIncomeItems")
    const spGlitems = (datax) => {
        let incomeList = _getUniqueFromArray(datax, "INVOICE_SEQ")
        console.log(incomeList, datax, "incomeList")
        let items = []
        for (var i in incomeList) {
            let obj = new Object()
            obj.INVOICE_SEQ = incomeList[i]
            obj.INVOICE_TYPE_NAME = _getDatafromArray(datax, "INVOICE_SEQ", "INVOICE_TYPE_NAME", incomeList[i])
            obj.INVOICE_ID = _getDatafromArray(datax, "INVOICE_SEQ", "INVOICE_ID", incomeList[i])
            let sum = 0
            for (var j in datax) {
                if (incomeList[i] == datax[j].INVOICE_SEQ) {
                    sum += datax[j].AMOUNT
                }
            }
            obj.AMOUNT = sum
            console.log(obj, "sum")
            items.push(obj)
        }
        return items
    }
    // console.log(data, "sapIncomeItems")

    let expressWayList = _getUniqueFromArray(data, "EXPRESSWAY_SEQ")
    let invoiceIdList = _getUniqueFromArray(data, "INVOICE_ID")
    let invoiceSeqList = _getUniqueFromArray(data, "INVOICE_SEQ")
    console.log(expressWayList, "expressWayList")
    console.log(invoiceIdList, "invoiceIdList")
    console.log(invoiceSeqList, "invoiceSeqList")
    // let dataGroupByExpressWay = []
    let newData = []

    for (var i in expressWayList) {
        let newObj = new Object()
        let resExpress = await getExpressWayByPK(expressWayList[i])
        let totalExpress = 0
        newObj.EXPRESSWAY_SEQ = resExpress[0].EXPRESSWAY_SEQ
        newObj.EXPRESSWAY_NAME_TH = resExpress[0].EXPRESSWAY_NAME_TH
        newObj.item = []
        for (var j in invoiceSeqList) {
            let item = new Object()
            let resInvoice = await getInvoiceByPK(invoiceSeqList[j])
            console.log(resInvoice, "resInvoice")
            item.INVOICE_ID = resInvoice[0].INVOICE_ID
            item.INVOICE_SEQ = resInvoice[0].INVOICE_SEQ
            item.INVOICE_NAME_TH = resInvoice[0].INVOICE_NAME_TH
            item.INVOICE_ABBR = resInvoice[0].INVOICE_ABBR
            let c = 0
            for (var k in data) {
                if (expressWayList[i] == data[k].EXPRESSWAY_SEQ && invoiceSeqList[j] == data[k].INVOICE_SEQ) {
                    c += data[k].INVOICE_NET_AMOUNT
                    totalExpress += data[k].INVOICE_NET_AMOUNT
                }
            }
            item.AMOUNT = c
            console.log(item, "item")
            newObj.item.push(item)
        }
        newObj.TOTAL_EXPRESS_AMT = totalExpress
        console.log(newObj, "newObj")
        newData.push(newObj)
    }
    let postingKey01item = itemPostingKey01Genarator(data)
    // newData.push({
    //     POSTING_KEY: postingKey01item
    // })
    // for (var i in expressWayList) {
    //     let obj = new Object()
    //     obj.EXPRESSWAY_SEQ = expressWayList[i]
    //     obj.EXPRESSWAY_NAME_TH = _getDatafromArray(data, "EXPRESSWAY_SEQ", "EXPRESSWAY_NAME_TH", expressWayList[i])
    //     obj.items = []
    //     for (var j in data) {
    //         console.log(data[j],"data[j]")
    //         if (expressWayList[i] == data[j].EXPRESSWAY_SEQ && data[j].INVOICE_ID != 50) {
    //             obj.items.push(data[j])
    //         }
    //     }
    //     console.log(obj, "obj")
    //     if (obj.items.length > 0) {
    //         newData.push(obj)
    //     }

    // }
    // let incomeList = _getUniqueFromArray(data, "INVOICE_SEQ")
    // console.log(incomeList, "incomeList")


    // for (var i in incomeList) {
    //     let obj = new Object()
    //     obj.EXPRESSWAY_SEQ = null
    //     obj.EXPRESSWAY_NAME_TH = "รายได้อื่นๆ (เครดิต Sp.GL)"
    //     obj.items = []
    //     for (var j in data) {
    //         console.log(data[j], "data[j].INVOICE_ID")
    //         if (incomeList[i] == data[j].INVOICE_SEQ && data[j].INVOICE_ID == 50) {
    //             obj.items.push(data[j])
    //         }
    //     }
    //     console.log(obj, "obj")
    //     obj.items = spGlitems(obj.items)
    //     if (obj.items.length > 0) {
    //         newData.push(obj)
    //     }

    // }


    console.log(newData, "newDataxxx")
    return newData
}

const sapPostingKey01Method = (key) => {
    if (key == 11) {
        return "CASH"
    } else
        if (key == 12) {
            return "CHECK"
        }
    return ""
}


export const sapAccountNo = (key) => {
    if (key == 6) {
        return "4121000"
    } else
        if (key == 7) {
            return "4295000"
        } else
            if (key == 8) {
                return "2000000407"
            } else
                if (key == 9) {
                    return "2000000407"
                }
    return ""
}

export const sapAccountNoDeposite = (key) => {
    if (key == 40) {
        return "1114021"
    } else
        if (key == 50) {
            return "1111000"
        }
    return ""
}

export const sapSpGLindecator = (key) => {
    if (key == 8) {
        return "D"
    }
    if (key == 9) {
        return "H"
    }
    return ""
}