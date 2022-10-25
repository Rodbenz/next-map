
import { insEtax } from "../service/external/etax"
import { getPaymentRequestByPK, updatePaymentRequest } from "../service/REG/payment_request"
import { getRequestPaymentByPayment } from "../service/REG/request_payment"
import { getCookie, getFiscalYear, reqSeqNumber, _readToken } from "./datacontrol"
import { dateFormat } from "./outputControl"



export const paymentItem = async (seq) => {
    let res = await getPaymentRequestByPK(seq)
    let resRequestItem = await getRequestPaymentByPayment(res[0].PAYMENT_REQUEST_SEQ)
    console.log(resRequestItem,"resRequestItem");
    console.log(res,"res");
    let id = res[0].PAYMENT_NO
    console.log(id,"id");
    let dealData = dateFormat(res[0].INVOICE_DEADLINE_DTM)
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
            "typeCode": "T03",
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
                            (res[0].PAYMENT_TOTAL_AMOUNT).toFixed(2)
                        ],
                        "calculatedAmount": [
                            (res[0].PAYMENT_TAX_VAT).toFixed(2)
                        ]
                    }
                ],
                "SpecifiedTradeAllowanceCharge": [
                    {
                        "chargeIndicator": res[0].PAYMENT_DISCOUNT_OPTION ? "true" : "false",
                        "actualAmount": [
                            res[0].PAYMENT_DISCOUNT ? (res[0].PAYMENT_DISCOUNT).toFixed(2) : "0.00"
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
                            "value": (res[0].PAYMENT_SUBTOTAL).toFixed(2)
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
                            "value": res[0].PAYMENT_DISCOUNT ? (res[0].PAYMENT_DISCOUNT).toFixed(2) : "0.00"
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
                            "value": (res[0].PAYMENT_TOTAL_AMOUNT).toFixed(2)
                        }
                    ],
                    "taxTotalAmount": [
                        {
                            "currencyID": "THB",
                            "value": (res[0].PAYMENT_TAX_VAT).toFixed(2)
                        }
                    ],
                    "grandTotalAmount": [
                        {
                            "currencyID": "THB",
                            "value": (res[0].PAYMENT_TOTAL_AMOUNT).toFixed(2)
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
        "RequestSendMail": "N",
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
        "EMAIL": "",
        "ContractTerm": "2021-05-01",
        "Reference1": "",
        "Reference2": "",
        "BillPaymentFlag": "Y",
        "Advice002": "001"
    }
    console.log(item, "itemEtax")

    let el = res[0]
    try {
        let resItemEtax = await insEtax(item)
        el.E_TAX_NO = resItemEtax.data.transCode
        el.E_TAX_HREF = resItemEtax.data.documentUrl
        el.INVOICE_PEROID = String(el.INVOICE_PEROID)
        console.log(el, "el")
        let updRes = await updatePaymentRequest(el.PAYMENT_REQUEST_SEQ, el)
        console.log(resItemEtax, "resItemEtax")
        console.log(item, "itemEtax")
        console.log(updRes, "updRes")
        return resItemEtax.data.transCode
    } catch (e) {
        console.log(e)
    }
}


export const _cancelPaymentItems = async (seq) => {
    let loginData = _readToken(getCookie("userdata"))
    let res = await getPaymentRequestByPK(seq)
    console.log(res, "res")
    if (!res) {
        SnackbarSet('ไม่พบข้อมูลใบแจ้งหนี้ที่ต้องการยกเลิก', "error")
        return
    }
    let el = res[0]

    let eTaxNo = res[0].E_TAX_NO
    console.log(eTaxNo, "eTaxNo")
    let invoiceDate = res[0].PAYMENT_DTM
    console.log(invoiceDate, "invoiceDate")
    invoiceDate = new Date(invoiceDate)

    let Fiscalyear = getFiscalYear(invoiceDate)
    console.log(Fiscalyear, "Fiscalyear")
    let cancelItem = {
        "documentNo": eTaxNo,
        "companyCode": "0010",
        "documentType": "T03",
        "purposeCode": "CLN999",
        "purpose": "ยกเลิกเอกสาร",
        "Fiscalyear": Fiscalyear
    }
    // return c
    try {
        let resCancel = await cancelEtax(cancelItem)
        console.log(resCancel, "resCancel")
        if (!resCancel) {
            SnackbarSet('ไม่สามารถยกเลิกได้', "error")
            return
        }
    } catch (e) {
        return e
    }

}


export const _createfineItem = (invoiceData, invoiceListData , fineDayC) => {
    const logindata = _readToken(getCookie("userdata"))
    if (!invoiceData) return
    console.log(invoiceData, fineDayC, "_create_fine")
    let c = fineDayC
    let item = [{
        "REQUEST_SEQ": invoiceData.REQUEST_SEQ,
        "REQUEST_NO": reqSeqNumber(invoiceData.REQUEST_NO_1, invoiceData.REQUEST_NO_2, invoiceData.REQUEST_NO_3),
        "REQUEST_NO_1": invoiceData.REQUEST_NO_1,
        "REQUEST_NO_2": invoiceData.REQUEST_NO_2,
        "REQUEST_NO_3": invoiceData.REQUEST_NO_3,
        "REGISTER_SEQ": invoiceData.REQUEST_SEQ,
        "REGISTER_NAME_TH": invoiceData.REGISTER_NAME_TH,
        "OBJECTIVE_SEQ": invoiceData.OBJECTIVE_SEQ,
        "OBJECTIVE_NAME_TH": invoiceData.OBJECTIVE_NAME_TH,
        "PROCESS_SEQ": 14,
        "CONTRACT_SEQ": invoiceData.CONTRACT_SEQ,
        "CONTRACT_NO": invoiceData.CONTRACT_NO,
        "CONTRACT_NO_1": invoiceData.CONTRACT_NO_1,
        "CONTRACT_NO_2": invoiceData.CONTRACT_NO_2,
        "CONTRACT_NO_3": invoiceData.CONTRACT_NO_3,
        "CONTRACT_NO_4": invoiceData.CONTRACT_NO_4,
        "CONTRACT_NO_5": invoiceData.CONTRACT_NO_5,
        "CONTRACT_NO_6": invoiceData.CONTRACT_NO_6,
        "CONTRACT_NO_7": invoiceData.CONTRACT_NO_7,
        "CONTRACT_NO_8": invoiceData.CONTRACT_NO_8,
        "AREAWAY_SEQ": invoiceData.AREAWAY_SEQ,
        "INVOICE_REQUEST_SEQ": invoiceData.INVOICE_REQUEST_SEQ,
        "INVOICE_ORDER": invoiceListData.length + 1,
        "INVOICE_SEQ": 7,
        "INVOICE_NAME_TH": "ค่าปรับ",
        "INVOICE_YEAR": null,
        "INVOICE_MONTH": null,
        "INVOICE_AMOUNT": c,
        "PRICE_PER_UNIT": invoiceData.INVOICE_FINES_DAY,
        "INVOICE_NET_AMOUNT": invoiceData.INVOICE_FINES_DAY * c,
        "PROCESS_STS_SEQ": 43,
        "PROCESS_STS_NAME_TH": "ค้างชำระ",
        "CANCEL_SEQ": null,
        "CANCEL_NAME_TH": null,
        "SAP_STATUS": null,
        "SAP_DOC_NUMBER": null,
        "SAP_DOC_INV_NUMBER": null,
        "REQUEST_INVOICE_NOTE": null,
        "RECORD_STATUS": "N",
        "CREATE_USER": logindata.USER_PID
    }]
    console.log(item, "item")
    return item
}