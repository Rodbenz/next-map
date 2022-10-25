import { getFitAccountingHeader, getFitAccountingHeaderByPK } from "../../service/SAP/FitAccountingHeader"
import { getFitAccountingLineItemByHeader } from "../../service/SAP/FitAccountingLineItem"
import { right } from "../datacontrol"


export const sapRequestZARI22 = async (seq) => {
    let resHeader = await getFitAccountingHeaderByPK(seq)
    console.log(resHeader, "resHeader")
    if (!resHeader[0]) {
        console.log("error")
        return
    }
    if (resHeader[0].FIT_ACCOUNTING_HEADER_ID !== 22) {
        console.log("error ID")
        return
    }
    let header = resHeader[0]
    let fitObj = new Object()



    fitObj.FI_S_HEADER = {
        DOCUMENT_DATE: convertSAPDate(new Date(header.DOCUMENT_DATE)),
        COMPANY_CODE: header.COMPANY_CODE,
        POSTING_DATE: convertSAPDate(new Date(header.POSTING_DATE)),
        CURRENCY: header.CURRENCY,
        EXCHANGE_RATE: header.EXCHANGE_RATE ? header.EXCHANGE_RATE : "",
        REFERENCE: header.REFERENCE ? header.REFERENCE : "",
        DOCUMENT_HEADER_TEXT: header.DOCUMENT_HEADER_TEXT,
        REF_KEY_1: header.REF_KEY_1,
        REF_KEY_2: header.REF_KEY_2,
        BRANCH_NUMBER: header.BRANCH_NUMBER,
    }
    let items = []
    let resItem = await getFitAccountingLineItemByHeader(seq)
    console.log(resItem, "ressItem")

    for (var i in resItem) {
        console.log(resItem[i], "item")
        let item = {
            POSTING_KEY: resItem[i].POSTING_KEY,
            ACCOUNT: resItem[i].ACCOUNT,
            SPECIALGL_IND: resItem[i].SPECIALGL_IND,
            TAX_BASE: resItem[i].TAX_BASE_AMOUNTY ? resItem[i].TAX_BASE_AMOUNTY : "",
            AMT_IN_DOC_CURR: resItem[i].AMT_IN_DOC_CURR,
            AMT_IN_LOCAL_CURR: resItem[i].AMT_IN_LOCAL_CURR,
            SPECIALGL_IND: resItem[i].SPECIAL_GL_INDICATOR,
            TAX_CODE: resItem[i].TAX_CODE,
            TERMS_OF_PAYMENT: resItem[i].TERMS_OF_PAYMENT,
            BASELINE_DATE: convertSAPDate(new Date(resItem[i].BASELINE_DATE)),
            REF_KEY_2: resItem[i].REF_KEY_2,
            REF_KEY_3: resItem[i].REF_KEY_3 ? resItem[i].REF_KEY_3 : "",
            PROFIT_CENTER: resItem[i].PROFIT_CENTER ? resItem[i].PROFIT_CENTER : resItem[i].POSTING_KEY == 50 ? resItem[i].PROFIT_CENTER ? resItem[i].PROFIT_CENTER : "10100000" : resItem[i].PROFIT_CENTER ? resItem[i].PROFIT_CENTER : "",
        }
        items.push(item)
    }
    fitObj.FIT_ITEM = items
    console.log(fitObj, "fitObj")
    return fitObj
}



export function convertSAPDate(date) {
    let y = date.getFullYear()
    let m = date.getMonth()
    let d = date.getDate()
    console.log(y, m, d, "docDate")
    let dateSapFormat = right("00" + d, 2) + "." + right("00" + (parseInt(m) + 1), 2) + "." + "2022"
    return dateSapFormat
}


