import { cancelEtax, insEtax } from "../service/external/etax"
import { getInvoiceRequestByPK, upDateInvoiceRequest } from "../service/REG/invoice_request"
import { getRequestInvoiceByInvoice, updateRequestInvoice } from "../service/REG/request_invoice"
import { dbdateformat, getCookie, getFiscalYear, _readToken } from "./datacontrol"
import { dateFormat } from "./outputControl"
import SnackbarSet from "./../pages/components/snackbar"
import moment from "moment/moment"


export const _createInvoiceItems = async (seq) => {
    console.log(seq)
    let res = await getInvoiceRequestByPK(seq)
    let resRequestItem = await getRequestInvoiceByInvoice(seq)
    console.log(res, "_createInvoiceItems")
    console.log(resRequestItem, "resRequestItem")
    let dealData = dateFormat(res[0].INVOICE_DEADLINE_DTM)
    console.log(dealData, "_createInvoiceItems", "dealData")
    let id = res[0].INVOICE_NO
    console.log(id, "_createInvoiceItems")
    // return
    let tambolLabel = res[0].PROVICE_SEQ == 1 ? "แขวง" : "ตำบล"
    let amphurLabel = res[0].PROVICE_SEQ == 1 ? "เขต" : "อำเภอ"
    let addrText = res[0].ADDR_ADDR + " " +
        tambolLabel + res[0].TAMBOL_NAME_TH + " " +
        amphurLabel + res[0].AMPHUR_NAME_TH + " จังหวัด" + res[0].PROVINCE_NAME_TH
    console.log(id, addrText)


    let supplyItem = []

    for (var i in resRequestItem) {
        let totalVat = (parseFloat(resRequestItem[i].INVOICE_NET_AMOUNT) * 0.07).toFixed(2)
        let item = {
            "associatedDocumentLineDocument": {
                "lineID": parseInt(i) + 1,
                "ReferenceNumber": ""
            },
            "specifiedTradeProduct": {
                "name": [
                    resRequestItem[i].INVOICE_NAME_TH
                ],
                "Description": [
                    ""
                ],
                "originTradeCountry": {
                    "id": {
                        "schemeID": "3166-1 alpha-2",
                        "value": "TH"
                    }
                }
            },
            "specifiedLineTradeAgreement": {
                "grossPriceProductTradePrice": {
                    "chargeAmount": [
                        {
                            "currencyID": "THB",
                            "value": (resRequestItem[i].INVOICE_NET_AMOUNT).toFixed(2)
                        }
                    ],
                    "appliedTradeAllowanceCharge": [
                        {
                            "chargeIndicator": "false",
                            "actualAmount": [
                                "0.00"
                            ],
                            "reasonCode": ""
                        }
                    ]
                }
            },
            "specifiedLineTradeDelivery": {
                "billedQuantity": {
                    "unitCode": "EA",
                    "value": (resRequestItem[i].INVOICE_AMOUNT).toFixed(2)
                }
            },
            "specifiedLineTradeSettlement": {
                "applicableTradeTax": [
                    {
                        "typeCode": "VAT",
                        "calculatedRate": "7",
                        "basisAmount": [
                            (resRequestItem[i].INVOICE_NET_AMOUNT - totalVat).toFixed(2)
                        ],
                        "calculatedAmount": [
                            totalVat
                        ]
                    }
                ],
                "SpecifiedTradeAllowanceCharge": [
                    {
                        "chargeIndicator": "false",
                        "actualAmount": [
                            "0.00"
                        ],
                        "reasonCode": ""
                    }
                ],
                "specifiedTradeSettlementLineMonetarySummation": {
                    "taxTotalAmount": [
                        {
                            "currencyID": "THB",
                            "value": totalVat
                        }
                    ],
                    "netLineTotalAmount": [
                        {
                            "currencyID": "THB",
                            "value": (resRequestItem[i].INVOICE_NET_AMOUNT - totalVat).toFixed(2)
                        }
                    ],
                    "netIncludingTaxesLineTotalAmount": [
                        {
                            "currencyID": "THB",
                            "value": (resRequestItem[i].INVOICE_NET_AMOUNT).toFixed(2)
                        }
                    ]
                }
            }
        }
        supplyItem.push(item)
    }

    let item = {
        "exchangedDocument": {
            "id": id,
            "typeCode": "380",
            "issueDateTime": res[0].CREATE_DTM,
            "purpose": "",
            "purposeCode": ""
        },
        "supplyChainTradeTransaction": {
            "applicableHeaderTradeAgreement": {
                "sellerTradeParty": {
                    "id": [
                        "0010"
                    ]
                },
                "buyerTradeParty": {
                    "id": [
                        res[0].CUST_PID
                    ],
                    "name": res[0].CUST_NAME_TH,
                    "specifiedTaxRegistration": {
                        "id": {
                            "value": res[0].CUST_TAX,
                            "schemeID": "NIDN"
                        }
                    },
                    "postalTradeAddress": {
                        "postcodeCode": res[0].ADDR_POSTCODE,
                        "lineOne": addrText,
                        "lineTwo": "",
                        "countryID": {
                            "schemeID": "3166-1 alpha-2",
                            "value": "TH"
                        }
                    }
                },
                "additionalReferencedDocument": [
                    {
                        "issuerAssignedID": "",
                        "issueDateTime": "",
                        "referenceTypeCode": ""
                    }
                ]
            },
            "applicableHeaderTradeSettlement": {
                "invoiceCurrencyCode": {
                    "listID": "ISO 4217 3A",
                    "value": "THB"
                },
                "applicableTradeTax": [
                    {
                        "typeCode": "VAT",
                        "calculatedRate": "7",
                        "basisAmount": [
                            (res[0].INVOICE_TOTAL_AMOUNT).toFixed(2)
                        ],
                        "calculatedAmount": [
                            (res[0].INVOICE_TAX_VAT).toFixed(2)
                        ]
                    }
                ],
                "SpecifiedTradeAllowanceCharge": [
                    {
                        "chargeIndicator": res[0].INVOICE_DISCOUNT_OPTION ? "true" : "false",
                        "actualAmount": [
                            res[0].INVOICE_DISCOUNT ? (res[0].INVOICE_DISCOUNT).toFixed(2) : "0.00"
                        ],
                        "reasonCode": ""
                    }
                ],
                "specifiedTradeSettlementHeaderMonetarySummation": {
                    "originalInformationAmount": [
                        {
                            "currencyID": "THB",
                            "value": ""
                        }
                    ],
                    "lineTotalAmount": [
                        {
                            "currencyID": "THB",
                            "value": (res[0].INVOICE_SUBTOTAL).toFixed(2)
                        }
                    ],
                    "differenceInformationAmount": [
                        {
                            "currencyID": "THB",
                            "value": ""
                        }
                    ],
                    "allowanceTotalAmount": [
                        {
                            "currencyID": "THB",
                            "value": res[0].INVOICE_DISCOUNT ? (res[0].INVOICE_DISCOUNT).toFixed(2) : "0.00"
                        }
                    ],
                    "chargeTotalAmount": [
                        {
                            "currencyID": "THB",
                            "value": ""
                        }
                    ],
                    "taxBasisTotalAmount": [
                        {
                            "currencyID": "THB",
                            "value": (res[0].INVOICE_TOTAL_AMOUNT).toFixed(2)
                        }
                    ],
                    "taxTotalAmount": [
                        {
                            "currencyID": "THB",
                            "value": (res[0].INVOICE_TAX_VAT).toFixed(2)
                        }
                    ],
                    "grandTotalAmount": [
                        {
                            "currencyID": "THB",
                            "value": (res[0].INVOICE_TOTAL_AMOUNT).toFixed(2)
                        }
                    ]
                }
            },
            "includedSupplyChainTradeLineItem": supplyItem
        },
        "SmartCardNumber": "",
        "ContractNumber": res[0].REQUEST_NO,
        "CarRegisteration": "",
        "CarProvince": "",
        "DealDate": dealData,
        "DealDateText": "ชำระภายในวันที่ " + res[0].INVOICE_DAY + " ค่าปรับ " + res[0].INVOICE_FINES_DAY + " บาท\/วัน",
        "RentalDescription": res[0].INVOICE_NOTE,
        "PaymentChanel": "10",
        "MID": "",
        "TID": "",
        "ApprovalCode": "",
        "BankCheque": "",
        "ChequeNumber": "",
        "ChequeDate": "",
        "FastService": "",
        "Remark": "-",
        "FormNumber": "",
        "FIDoc": id + "BTE7",
        "Advice": "001",
        "RequestSendMail": res[0].ADDR_EMAIL ? "Y" : "N",
        "Channel": "LRS",
        "Topic": "LRS001",
        "ServiceType": "001",
        "CustomerBranchCode": "00000",
        "SellerBrachCode": "",
        "OBU": "",
        "CustomerAccountID": "",
        "PostingDate": res[0].CREATE_DTM,
        "PostBy": "FINANCE01",
        "TXNExitDate": "",
        "CSDate": "",
        "EMAIL": res[0].ADDR_EMAIL ? res[0].ADDR_EMAIL : "",
        "ContractTerm": "2021-05-01",
        "Reference1": "",
        "Reference2": "",
        "BillPaymentFlag": "Y",
        "Advice002": "001"
    }
    console.log(item, "itemEtax")
    // return item

    let el = res[0]
    try {

        let resItemEtax = await insEtax(item)
        el.E_TAX_NO = resItemEtax.data.transCode
        el.E_TAX_HREF = resItemEtax.data.documentUrl
        el.INVOICE_PEROID = String(el.INVOICE_PEROID)
        console.log(el, "el")
        let updRes = await upDateInvoiceRequest(el.INVOICE_REQUEST_SEQ, el)
        console.log(resItemEtax, "resItemEtax")
        console.log(item, "itemEtax")
        console.log(updRes, "updRes")
        return resItemEtax.data.transCode
    } catch (e) {
        console.log(e)
    }

}




export const _cancelInvoiceItems = async (seq) => {
    let loginData = _readToken(getCookie("userdata"))
    let res = await getInvoiceRequestByPK(seq)
    console.log(res, "res")
    if (!res) {
        SnackbarSet('ไม่พบข้อมูลใบแจ้งหนี้ที่ต้องการยกเลิก', "error")
        return
    }
    let el = res[0]

    let resRequestItem = await getRequestInvoiceByInvoice(el.INVOICE_REQUEST_SEQ)
    if (resRequestItem) {
        for (var i in resRequestItem) {
            resRequestItem[i].INVOICE_REQUEST_SEQ = null
            resRequestItem[i].LAST_UPD_USER = loginData.USER_PID
            let resUpdItem = await updateRequestInvoice(resRequestItem[i].REQUEST_INVOICE_SEQ, resRequestItem[i])
            console.log(resUpdItem, "resUpdItem")
        }
        // resRequestItem.map((item, index) => async () => {
        //     item.INVOICE_REQUEST_SEQ = null 
        //     let resUpdItem = await upDateRequestInvoice(item)
        // })
    }

    let eTaxNo = res[0].E_TAX_NO
    console.log(eTaxNo, "eTaxNo")
    let invoiceDate = res[0].INVOICE_DTM
    console.log(invoiceDate, "invoiceDate")
    invoiceDate = new Date(invoiceDate)

    let Fiscalyear = getFiscalYear(invoiceDate)
    console.log(Fiscalyear, "Fiscalyear")
    let cancelItem = {
        "documentNo": eTaxNo,
        "companyCode": "0010",
        "documentType": "380",
        "purposeCode": "CLN999",
        "purpose": "ยกเลิกเอกสาร",
        "Fiscalyear": Fiscalyear
    }
    try {
        let resCancel = await cancelEtax(cancelItem)
        console.log(resCancel, "resCancel")
        if (!resCancel) {
            SnackbarSet('ไม่สามารถยกเลิกได้', "error")
            return
        }
        el.CANCEL_SEQ = 1
        el.CANCEL_NAME_TH = "ยกเลิกใบแจ้งหนี้"
        el.RECORD_STATUS = "C"
        el.INVOICE_PEROID = String(el.INVOICE_PEROID)
        el.LAST_UPD_USER = loginData.USER_ID
        el.LAST_UPD_DTM = moment().format('YYYY-MM-DD HH:mm:ss')
        let updRes = await upDateInvoiceRequest(el.INVOICE_REQUEST_SEQ, el)
        console.log(updRes, "updRes")
        return resCancel
    } catch (e) {
        return e
    }

}