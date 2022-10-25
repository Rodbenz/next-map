import { values } from 'underscore';
import { getRegisterByPK } from '../service/MAS/register';
import * as dataControl from './datacontrol'

export function invoiceGenData(data) {
    let cus_data = data.customerdata;
    let reqData = data.reqData;
    let register = reqData.REGISTER_SEQ;
    var obj_data = new Object();
    var obj_arr = [];
    let seqNumInvoiceRegisterArr1 = [{ "seq": 6, "name": "ค่าเช่า" }, { "seq": 9, "name": "หลักประกันฯ" }];
    let seqNumInvoiceRegisterArr2 = [{ "seq": 6, "name": "ค่าเช่า" }, { "seq": 9, "name": "หลักประกันฯ" }];
    let seqNumInvoiceRegisterArr3 = [{ "seq": 6, "name": "ค่าเช่า" }, { "seq": 9, "name": "หลักประกันฯ" }];
    // console.log(data);
    // console.log(cus_data);
    console.log(data.reqData);
    if (register == 1) {
        seqNumInvoiceRegisterArr1.map((values, index) => {
            if (values.seq == 6) {
                obj_data = {
                    "INVOICE_SEQ": values.seq,
                    "REQUEST_SEQ": reqData.REQUEST_SEQ,
                    "REQUEST_NO": "REQ" + dataControl.right(String(reqData.REQUEST_NO_1 + 543), 2) + reqData.REQUEST_NO_2 + dataControl.right("000000" + reqData.REQUEST_NO_3, 6),
                    "REQUEST_NO_1": reqData.REQUEST_NO_1,
                    "REQUEST_NO_2": reqData.REQUEST_NO_2,
                    "REQUEST_NO_3": reqData.REQUEST_NO_3,
                    "REGISTER_SEQ": reqData.REGISTER_SEQ,
                    "CUST_SEQ": cus_data.CUST_SEQ,
                    "CUST_PID": cus_data.CUST_PID,
                    "CUST_TAX": cus_data.CUST_PID,
                    "CUST_FNAME_TH": cus_data.CUST_FNAME_TH,
                    "CUST_LNAME_TH": cus_data.CUST_LNAME_TH,
                    "CUST_EMAIL": cus_data.CUST_EMAIL,
                    "TITLE_SEQ": cus_data.TITLE_SEQ,
                    "TITLE_NAME_TH": cus_data.TITLE_NAME_TH,
                    "ADDR_ADDR": reqData.CONT_ADDR,
                    "AMPHUR_NAME_TH": reqData.CONT_AMPHUR,
                    "AMPHUR_SEQ": reqData.CONT_AMPHUR_SEQ,
                    "ADDR_BLD": reqData.CONT_BLD,
                    "ADDR_MOO": reqData.CONT_MOO,
                    "ADDR_VILLAGE": reqData.CONT_VILLAGE,
                    "ADDR_SOI": reqData.CONT_SOI,
                    "ADDR_ROAD": reqData.CONT_ROAD,
                    "TAMBOL_NAME_TH": reqData.CONT_TAMBOL,
                    "TAMBOL_SEQ": reqData.CONT_TAMBOL_SEQ,
                    "PROVINCE_NAME_TH": reqData.CONT_PROVINCE,
                    "PROVINCE_SEQ": reqData.CONT_PROVINCE_SEQ,
                    "ADDR_POSTCODE": reqData.CONT_POSTCODE,
                    "RECORD_STATUS": "N",
                    "PROCESS_STS_NAME_TH": "ค้างชำระ",
                    "INVOICE_NAME_TH": values.name,
                    "INVOICE_NET_AMOUNT": reqData.RENTAL_ALL,
                    "INVOICE_AMOUNT": 1,
                    "PRICE_PER_UNIT": reqData.RENTAL_ALL,
                    "INVOICE_ORDER": 1
                }
            }
            if (values.seq == 9) {
                obj_data = {
                    "INVOICE_SEQ": values.seq,
                    "REQUEST_SEQ": reqData.REQUEST_SEQ,
                    "REQUEST_NO": "REQ" + dataControl.right(String(reqData.REQUEST_NO_1 + 543), 2) + reqData.REQUEST_NO_2 + dataControl.right("000000" + reqData.REQUEST_NO_3, 6),
                    "REQUEST_NO_1": reqData.REQUEST_NO_1,
                    "REQUEST_NO_2": reqData.REQUEST_NO_2,
                    "REQUEST_NO_3": reqData.REQUEST_NO_3,
                    "REGISTER_SEQ": reqData.REGISTER_SEQ,
                    "CUST_SEQ": cus_data.CUST_SEQ,
                    "CUST_PID": cus_data.CUST_PID,
                    "CUST_TAX": cus_data.CUST_PID,
                    "CUST_FNAME_TH": cus_data.CUST_FNAME_TH,
                    "CUST_LNAME_TH": cus_data.CUST_LNAME_TH,
                    "CUST_EMAIL": cus_data.CUST_EMAIL,
                    "TITLE_SEQ": cus_data.TITLE_SEQ,
                    "TITLE_NAME_TH": cus_data.TITLE_NAME_TH,
                    "ADDR_ADDR": reqData.CONT_ADDR,
                    "AMPHUR_NAME_TH": reqData.CONT_AMPHUR,
                    "AMPHUR_SEQ": reqData.CONT_AMPHUR_SEQ,
                    "ADDR_BLD": reqData.CONT_BLD,
                    "ADDR_MOO": reqData.CONT_MOO,
                    "ADDR_VILLAGE": reqData.CONT_VILLAGE,
                    "ADDR_SOI": reqData.CONT_SOI,
                    "ADDR_ROAD": reqData.CONT_ROAD,
                    "TAMBOL_NAME_TH": reqData.CONT_TAMBOL,
                    "TAMBOL_SEQ": reqData.CONT_TAMBOL_SEQ,
                    "PROVINCE_NAME_TH": reqData.CONT_PROVINCE,
                    "PROVINCE_SEQ": reqData.CONT_PROVINCE_SEQ,
                    "ADDR_POSTCODE": reqData.CONT_POSTCODE,
                    "RECORD_STATUS": "N",
                    "PROCESS_STS_NAME_TH": "ค้างชำระ",
                    "INVOICE_NAME_TH": values.name,
                    "INVOICE_NET_AMOUNT": reqData.SECURITY_DEPOSIT_ALL,
                    "INVOICE_AMOUNT": 1,
                    "PRICE_PER_UNIT": reqData.SECURITY_DEPOSIT_ALL,
                    "INVOICE_ORDER": 1
                }
            }
            obj_arr.push(obj_data);
        })

    }
    if (register == 2) {
        seqNumInvoiceRegisterArr2.map((values, index) => {
            if (values.seq == 6) {
                obj_data = {
                    "INVOICE_SEQ": values.seq,
                    "REQUEST_SEQ": reqData.REQUEST_SEQ,
                    "REQUEST_NO": "REQ" + dataControl.right(String(reqData.REQUEST_NO_1 + 543), 2) + reqData.REQUEST_NO_2 + dataControl.right("000000" + reqData.REQUEST_NO_3, 6),
                    "REQUEST_NO_1": reqData.REQUEST_NO_1,
                    "REQUEST_NO_2": reqData.REQUEST_NO_2,
                    "REQUEST_NO_3": reqData.REQUEST_NO_3,
                    "REGISTER_SEQ": reqData.REGISTER_SEQ,
                    "CUST_SEQ": cus_data.CUST_SEQ,
                    "CUST_PID": cus_data.CUST_PID,
                    "CUST_TAX": cus_data.CUST_PID,
                    "CUST_FNAME_TH": cus_data.CUST_FNAME_TH,
                    "CUST_LNAME_TH": cus_data.CUST_LNAME_TH,
                    "CUST_EMAIL": cus_data.CUST_EMAIL,
                    "TITLE_SEQ": cus_data.TITLE_SEQ,
                    "TITLE_NAME_TH": cus_data.TITLE_NAME_TH,
                    "ADDR_ADDR": reqData.CONT_ADDR,
                    "AMPHUR_NAME_TH": reqData.CONT_AMPHUR,
                    "AMPHUR_SEQ": reqData.CONT_AMPHUR_SEQ,
                    "ADDR_BLD": reqData.CONT_BLD,
                    "ADDR_MOO": reqData.CONT_MOO,
                    "ADDR_VILLAGE": reqData.CONT_VILLAGE,
                    "ADDR_SOI": reqData.CONT_SOI,
                    "ADDR_ROAD": reqData.CONT_ROAD,
                    "TAMBOL_NAME_TH": reqData.CONT_TAMBOL,
                    "TAMBOL_SEQ": reqData.CONT_TAMBOL_SEQ,
                    "PROVINCE_NAME_TH": reqData.CONT_PROVINCE,
                    "PROVINCE_SEQ": reqData.CONT_PROVINCE_SEQ,
                    "ADDR_POSTCODE": reqData.CONT_POSTCODE,
                    "RECORD_STATUS": "N",
                    "PROCESS_STS_NAME_TH": "ค้างชำระ",
                    "INVOICE_NAME_TH": values.name,
                    "INVOICE_NET_AMOUNT": reqData.RENTAL_ALL,
                    "INVOICE_AMOUNT": 1,
                    "PRICE_PER_UNIT": reqData.RENTAL_ALL,
                    "INVOICE_ORDER": index
                }
            }
            if (values.seq == 9) {
                obj_data = {
                    "INVOICE_SEQ": values.seq,
                    "REQUEST_SEQ": reqData.REQUEST_SEQ,
                    "REQUEST_NO": "REQ" + dataControl.right(String(reqData.REQUEST_NO_1 + 543), 2) + reqData.REQUEST_NO_2 + dataControl.right("000000" + reqData.REQUEST_NO_3, 6),
                    "REQUEST_NO_1": reqData.REQUEST_NO_1,
                    "REQUEST_NO_2": reqData.REQUEST_NO_2,
                    "REQUEST_NO_3": reqData.REQUEST_NO_3,
                    "REGISTER_SEQ": reqData.REGISTER_SEQ,
                    "CUST_SEQ": cus_data.CUST_SEQ,
                    "CUST_PID": cus_data.CUST_PID,
                    "CUST_TAX": cus_data.CUST_PID,
                    "CUST_FNAME_TH": cus_data.CUST_FNAME_TH,
                    "CUST_LNAME_TH": cus_data.CUST_LNAME_TH,
                    "CUST_EMAIL": cus_data.CUST_EMAIL,
                    "TITLE_SEQ": cus_data.TITLE_SEQ,
                    "TITLE_NAME_TH": cus_data.TITLE_NAME_TH,
                    "ADDR_ADDR": reqData.CONT_ADDR,
                    "AMPHUR_NAME_TH": reqData.CONT_AMPHUR,
                    "AMPHUR_SEQ": reqData.CONT_AMPHUR_SEQ,
                    "ADDR_BLD": reqData.CONT_BLD,
                    "ADDR_MOO": reqData.CONT_MOO,
                    "ADDR_VILLAGE": reqData.CONT_VILLAGE,
                    "ADDR_SOI": reqData.CONT_SOI,
                    "ADDR_ROAD": reqData.CONT_ROAD,
                    "TAMBOL_NAME_TH": reqData.CONT_TAMBOL,
                    "TAMBOL_SEQ": reqData.CONT_TAMBOL_SEQ,
                    "PROVINCE_NAME_TH": reqData.CONT_PROVINCE,
                    "PROVINCE_SEQ": reqData.CONT_PROVINCE_SEQ,
                    "ADDR_POSTCODE": reqData.CONT_POSTCODE,
                    "RECORD_STATUS": "N",
                    "PROCESS_STS_NAME_TH": "ค้างชำระ",
                    "INVOICE_NAME_TH": values.name,
                    "INVOICE_NET_AMOUNT": reqData.SECURITY_DEPOSIT_ALL,
                    "INVOICE_AMOUNT": 1,
                    "PRICE_PER_UNIT": reqData.SECURITY_DEPOSIT_ALL,
                    "INVOICE_ORDER": index
                }
            }
            obj_arr.push(obj_data);
        })

    }
    if (register == 3 || register == 4 || register == 5 || register == 6 || register == 9) {
        let requestYear = reqData.REQUEST_YEAR;
        let requestMonth = reqData.REQUEST_MONTH;
        let parseYearToMonth = requestYear * 12;
        let calMonth = parseYearToMonth + requestMonth;
        console.log(calMonth);
        seqNumInvoiceRegisterArr3.map((values, index) => {
            if (values.seq == 6) {
                for (let index = 1; index <= calMonth; index++) {
                    let rentalMonth = 0;
                    if (index <= 12) {
                        rentalMonth = reqData.RENTAL_MONTH_1;
                    }

                    if (index > 12 && index <= 24) {
                        rentalMonth = reqData.RENTAL_MONTH_2;
                    }

                    if (index > 24 && index <= 36) {
                        rentalMonth = reqData.RENTAL_MONTH_3;
                    }
                    
                    obj_data = {
                        "INVOICE_SEQ": values.seq,
                        "REQUEST_SEQ": reqData.REQUEST_SEQ,
                        "REQUEST_NO": "REQ" + dataControl.right(String(reqData.REQUEST_NO_1 + 543), 2) + reqData.REQUEST_NO_2 + dataControl.right("000000" + reqData.REQUEST_NO_3, 6),
                        "REQUEST_NO_1": reqData.REQUEST_NO_1,
                        "REQUEST_NO_2": reqData.REQUEST_NO_2,
                        "REQUEST_NO_3": reqData.REQUEST_NO_3,
                        "REGISTER_SEQ": reqData.REGISTER_SEQ,
                        "CUST_SEQ": cus_data.CUST_SEQ,
                        "CUST_PID": cus_data.CUST_PID,
                        "CUST_TAX": cus_data.CUST_PID,
                        "CUST_FNAME_TH": cus_data.CUST_FNAME_TH,
                        "CUST_LNAME_TH": cus_data.CUST_LNAME_TH,
                        "CUST_EMAIL": cus_data.CUST_EMAIL,
                        "TITLE_SEQ": cus_data.TITLE_SEQ,
                        "TITLE_NAME_TH": cus_data.TITLE_NAME_TH,
                        "ADDR_ADDR": reqData.CONT_ADDR,
                        "AMPHUR_NAME_TH": reqData.CONT_AMPHUR,
                        "AMPHUR_SEQ": reqData.CONT_AMPHUR_SEQ,
                        "ADDR_BLD": reqData.CONT_BLD,
                        "ADDR_MOO": reqData.CONT_MOO,
                        "ADDR_VILLAGE": reqData.CONT_VILLAGE,
                        "ADDR_SOI": reqData.CONT_SOI,
                        "ADDR_ROAD": reqData.CONT_ROAD,
                        "TAMBOL_NAME_TH": reqData.CONT_TAMBOL,
                        "TAMBOL_SEQ": reqData.CONT_TAMBOL_SEQ,
                        "PROVINCE_NAME_TH": reqData.CONT_PROVINCE,
                        "PROVINCE_SEQ": reqData.CONT_PROVINCE_SEQ,
                        "ADDR_POSTCODE": reqData.CONT_POSTCODE,
                        "PROCESS_STS_SEQ": 43,
                        "PROCESS_STS_NAME_TH": "ค้างชำระ",
                        "INVOICE_NAME_TH": values.name + " งวดที่ " + index,
                        "RECORD_STATUS": "N",
                        "INVOICE_NET_AMOUNT": rentalMonth,
                        "INVOICE_AMOUNT": 1,
                        "INVOICE_MONTH": index % 12 == 0 ? 12 : index % 12,
                        "INVOICE_YEAR": Math.ceil(index / 12),
                        "PRICE_PER_UNIT": rentalMonth,
                        "INVOICE_ORDER": index
                    }
                    obj_arr.push(obj_data);
                }
            }
            if (values.seq == 9) {
                obj_data = {
                    "INVOICE_SEQ": values.seq,
                    "REQUEST_SEQ": reqData.REQUEST_SEQ,
                    "REQUEST_NO": "REQ" + dataControl.right(String(reqData.REQUEST_NO_1 + 543), 2) + reqData.REQUEST_NO_2 + dataControl.right("000000" + reqData.REQUEST_NO_3, 6),
                    "REQUEST_NO_1": reqData.REQUEST_NO_1,
                    "REQUEST_NO_2": reqData.REQUEST_NO_2,
                    "REQUEST_NO_3": reqData.REQUEST_NO_3,
                    "REGISTER_SEQ": reqData.REGISTER_SEQ,
                    "CUST_SEQ": cus_data.CUST_SEQ,
                    "CUST_PID": cus_data.CUST_PID,
                    "CUST_TAX": cus_data.CUST_PID,
                    "CUST_FNAME_TH": cus_data.CUST_FNAME_TH,
                    "CUST_LNAME_TH": cus_data.CUST_LNAME_TH,
                    "CUST_EMAIL": cus_data.CUST_EMAIL,
                    "TITLE_SEQ": cus_data.TITLE_SEQ,
                    "TITLE_NAME_TH": cus_data.TITLE_NAME_TH,
                    "ADDR_ADDR": reqData.CONT_ADDR,
                    "AMPHUR_NAME_TH": reqData.CONT_AMPHUR,
                    "AMPHUR_SEQ": reqData.CONT_AMPHUR_SEQ,
                    "ADDR_BLD": reqData.CONT_BLD,
                    "ADDR_MOO": reqData.CONT_MOO,
                    "ADDR_VILLAGE": reqData.CONT_VILLAGE,
                    "ADDR_SOI": reqData.CONT_SOI,
                    "ADDR_ROAD": reqData.CONT_ROAD,
                    "TAMBOL_NAME_TH": reqData.CONT_TAMBOL,
                    "TAMBOL_SEQ": reqData.CONT_TAMBOL_SEQ,
                    "PROVINCE_NAME_TH": reqData.CONT_PROVINCE,
                    "PROVINCE_SEQ": reqData.CONT_PROVINCE_SEQ,
                    "ADDR_POSTCODE": reqData.CONT_POSTCODE,
                    "PROCESS_STS_SEQ": 43,
                    "PROCESS_STS_NAME_TH": "ค้างชำระ",
                    "INVOICE_NAME_TH": values.name,
                    "RECORD_STATUS": "N",
                    "INVOICE_NET_AMOUNT": reqData.SECURITY_DEPOSIT_ALL,
                    "INVOICE_AMOUNT": 1,
                    "PRICE_PER_UNIT": reqData.SECURITY_DEPOSIT_ALL,
                    "INVOICE_ORDER": index
                }
                obj_arr.push(obj_data);
            }
            if (values.seq == 6 && (register == 3 || register == 4 || register == 5 || register == 9)) {
                obj_data = {
                    "INVOICE_SEQ": values.seq,
                    "REQUEST_SEQ": reqData.REQUEST_SEQ,
                    "REQUEST_NO": "REQ" + dataControl.right(String(reqData.REQUEST_NO_1 + 543), 2) + reqData.REQUEST_NO_2 + dataControl.right("000000" + reqData.REQUEST_NO_3, 6),
                    "REQUEST_NO_1": reqData.REQUEST_NO_1,
                    "REQUEST_NO_2": reqData.REQUEST_NO_2,
                    "REQUEST_NO_3": reqData.REQUEST_NO_3,
                    "REGISTER_SEQ": reqData.REGISTER_SEQ,
                    "CUST_SEQ": cus_data.CUST_SEQ,
                    "CUST_PID": cus_data.CUST_PID,
                    "CUST_TAX": cus_data.CUST_PID,
                    "CUST_FNAME_TH": cus_data.CUST_FNAME_TH,
                    "CUST_LNAME_TH": cus_data.CUST_LNAME_TH,
                    "CUST_EMAIL": cus_data.CUST_EMAIL,
                    "TITLE_SEQ": cus_data.TITLE_SEQ,
                    "TITLE_NAME_TH": cus_data.TITLE_NAME_TH,
                    "ADDR_ADDR": reqData.CONT_ADDR,
                    "AMPHUR_NAME_TH": reqData.CONT_AMPHUR,
                    "AMPHUR_SEQ": reqData.CONT_AMPHUR_SEQ,
                    "ADDR_BLD": reqData.CONT_BLD,
                    "ADDR_MOO": reqData.CONT_MOO,
                    "ADDR_VILLAGE": reqData.CONT_VILLAGE,
                    "ADDR_SOI": reqData.CONT_SOI,
                    "ADDR_ROAD": reqData.CONT_ROAD,
                    "TAMBOL_NAME_TH": reqData.CONT_TAMBOL,
                    "TAMBOL_SEQ": reqData.CONT_TAMBOL_SEQ,
                    "PROVINCE_NAME_TH": reqData.CONT_PROVINCE,
                    "PROVINCE_SEQ": reqData.CONT_PROVINCE_SEQ,
                    "ADDR_POSTCODE": reqData.CONT_POSTCODE,
                    "PROCESS_STS_SEQ": 43,
                    "PROCESS_STS_NAME_TH": "ค้างชำระ",
                    "INVOICE_NAME_TH": "ค่าจัดทำและติดตั้งป้าย กทพ.",
                    "RECORD_STATUS": "N",
                    "PRICE_PER_UNIT": reqData.RENTAL_ALL,
                    "INVOICE_NET_AMOUNT": reqData.RENTAL_ALL,
                    "INVOICE_AMOUNT": 1,
                    "INVOICE_ORDER": 1
                }
                obj_arr.push(obj_data);
            }
        });
    }
    // console.log(obj_data);
    return obj_arr;
}


export async function invoiceTax(data) {
    console.log(data, "invoiceTax")
    let taxyear1 = data.reqData.PROPERTY_TAX_MONTH_1
    let taxyear2 = data.reqData.PROPERTY_TAX_MONTH_2
    let taxyear3 = data.reqData.PROPERTY_TAX_MONTH_3
    let reqData = data.reqData
    let cus_data = data.customerdata
    let requestYear = reqData.REQUEST_YEAR;
    let requestMonth = reqData.REQUEST_MONTH;
    let parseYearToMonth = requestYear * 12;
    let calMonth = parseYearToMonth + requestMonth;
    console.log(calMonth);
    let masRegister = await getRegisterByPK(reqData.REGISTER_SEQ)
    console.log(masRegister, "masRegister")
    console.log(taxyear1, taxyear2, taxyear3, "yearTax")
    let invoiceList = []
    if (taxyear1 && calMonth >= 12) {
        let c = 1
        for (var i = 1; i <= 12; i++) {
            let obj_data = {
                "INVOICE_SEQ": 8,
                "REQUEST_SEQ": reqData.REQUEST_SEQ,
                "REQUEST_NO": "REQ" + dataControl.right(String(reqData.REQUEST_NO_1 + 543), 2) + reqData.REQUEST_NO_2 + dataControl.right("000000" + reqData.REQUEST_NO_3, 6),
                "REQUEST_NO_1": reqData.REQUEST_NO_1,
                "REQUEST_NO_2": reqData.REQUEST_NO_2,
                "REQUEST_NO_3": reqData.REQUEST_NO_3,
                "REGISTER_SEQ": reqData.REGISTER_SEQ,
                "CUST_SEQ": cus_data.CUST_SEQ,
                "CUST_PID": cus_data.CUST_PID,
                "CUST_TAX": cus_data.CUST_PID,
                "CUST_FNAME_TH": cus_data.CUST_FNAME_TH,
                "CUST_LNAME_TH": cus_data.CUST_LNAME_TH,
                "CUST_EMAIL": cus_data.CUST_EMAIL,
                "TITLE_SEQ": cus_data.TITLE_SEQ,
                "TITLE_NAME_TH": cus_data.TITLE_NAME_TH,
                "ADDR_ADDR": reqData.CONT_ADDR,
                "AMPHUR_NAME_TH": reqData.CONT_AMPHUR,
                "AMPHUR_SEQ": reqData.CONT_AMPHUR_SEQ,
                "ADDR_BLD": reqData.CONT_BLD,
                "ADDR_MOO": reqData.CONT_MOO,
                "ADDR_VILLAGE": reqData.CONT_VILLAGE,
                "ADDR_SOI": reqData.CONT_SOI,
                "ADDR_ROAD": reqData.CONT_ROAD,
                "TAMBOL_NAME_TH": reqData.CONT_TAMBOL,
                "TAMBOL_SEQ": reqData.CONT_TAMBOL_SEQ,
                "PROVINCE_NAME_TH": reqData.CONT_PROVINCE,
                "PROVINCE_SEQ": reqData.CONT_PROVINCE_SEQ,
                "ADDR_POSTCODE": reqData.CONT_POSTCODE,
                "RECORD_STATUS": "N",
                "PRICE_PER_UNIT": taxyear1,
                "INVOICE_NAME_TH": "ค่าภาษีที่ดินและสิ่งปลูกสร้าง",
                "REGISTER_NAME_TH": masRegister[0].REGISTER_NAME_TH,
                "INVOICE_YEAR": 3,
                "INVOICE_MONTH": c,
                "PROCESS_STS_SEQ": 43,
                "PROCESS_STS_NAME_TH": "ค้างชำระ",
                "PROCESS_SEQ": 14,
                "INVOICE_ORDER": i
            }
            invoiceList.push(obj_data)
            c++
        }
    }
    if (taxyear2 && calMonth >= 24) {
        let c = 1
        for (var i = 13; i <= 24; i++) {
            let obj_data = {
                "INVOICE_SEQ": 8,
                "REQUEST_SEQ": reqData.REQUEST_SEQ,
                "REQUEST_NO": "REQ" + dataControl.right(String(reqData.REQUEST_NO_1 + 543), 2) + reqData.REQUEST_NO_2 + dataControl.right("000000" + reqData.REQUEST_NO_3, 6),
                "REQUEST_NO_1": reqData.REQUEST_NO_1,
                "REQUEST_NO_2": reqData.REQUEST_NO_2,
                "REQUEST_NO_3": reqData.REQUEST_NO_3,
                "REGISTER_SEQ": reqData.REGISTER_SEQ,
                "CUST_SEQ": cus_data.CUST_SEQ,
                "CUST_PID": cus_data.CUST_PID,
                "CUST_TAX": cus_data.CUST_PID,
                "CUST_FNAME_TH": cus_data.CUST_FNAME_TH,
                "CUST_LNAME_TH": cus_data.CUST_LNAME_TH,
                "CUST_EMAIL": cus_data.CUST_EMAIL,
                "TITLE_SEQ": cus_data.TITLE_SEQ,
                "TITLE_NAME_TH": cus_data.TITLE_NAME_TH,
                "ADDR_ADDR": reqData.CONT_ADDR,
                "AMPHUR_NAME_TH": reqData.CONT_AMPHUR,
                "AMPHUR_SEQ": reqData.CONT_AMPHUR_SEQ,
                "ADDR_BLD": reqData.CONT_BLD,
                "ADDR_MOO": reqData.CONT_MOO,
                "ADDR_VILLAGE": reqData.CONT_VILLAGE,
                "ADDR_SOI": reqData.CONT_SOI,
                "ADDR_ROAD": reqData.CONT_ROAD,
                "TAMBOL_NAME_TH": reqData.CONT_TAMBOL,
                "TAMBOL_SEQ": reqData.CONT_TAMBOL_SEQ,
                "PROVINCE_NAME_TH": reqData.CONT_PROVINCE,
                "PROVINCE_SEQ": reqData.CONT_PROVINCE_SEQ,
                "ADDR_POSTCODE": reqData.CONT_POSTCODE,
                "RECORD_STATUS": "N",
                "PRICE_PER_UNIT": taxyear2,
                "INVOICE_NAME_TH": "ค่าภาษีที่ดินและสิ่งปลูกสร้าง",
                "REGISTER_NAME_TH": masRegister[0].REGISTER_NAME_TH,
                "INVOICE_YEAR": 3,
                "INVOICE_MONTH": c,
                "PROCESS_STS_SEQ": 43,
                "PROCESS_STS_NAME_TH": "ค้างชำระ",
                "PROCESS_SEQ": 14,
                "INVOICE_ORDER": i
            }
            invoiceList.push(obj_data)
            c++
        }
    }
    if (taxyear3 && calMonth >= 36) {
        let c = 1
        for (var i = 25; i <= 36; i++) {
            let obj_data = {
                "INVOICE_SEQ": 8,
                "REQUEST_SEQ": reqData.REQUEST_SEQ,
                "REQUEST_NO": "REQ" + dataControl.right(String(reqData.REQUEST_NO_1 + 543), 2) + reqData.REQUEST_NO_2 + dataControl.right("000000" + reqData.REQUEST_NO_3, 6),
                "REQUEST_NO_1": reqData.REQUEST_NO_1,
                "REQUEST_NO_2": reqData.REQUEST_NO_2,
                "REQUEST_NO_3": reqData.REQUEST_NO_3,
                "REGISTER_SEQ": reqData.REGISTER_SEQ,
                "CUST_SEQ": cus_data.CUST_SEQ,
                "CUST_PID": cus_data.CUST_PID,
                "CUST_TAX": cus_data.CUST_PID,
                "CUST_FNAME_TH": cus_data.CUST_FNAME_TH,
                "CUST_LNAME_TH": cus_data.CUST_LNAME_TH,
                "CUST_EMAIL": cus_data.CUST_EMAIL,
                "TITLE_SEQ": cus_data.TITLE_SEQ,
                "TITLE_NAME_TH": cus_data.TITLE_NAME_TH,
                "ADDR_ADDR": reqData.CONT_ADDR,
                "AMPHUR_NAME_TH": reqData.CONT_AMPHUR,
                "AMPHUR_SEQ": reqData.CONT_AMPHUR_SEQ,
                "ADDR_BLD": reqData.CONT_BLD,
                "ADDR_MOO": reqData.CONT_MOO,
                "ADDR_VILLAGE": reqData.CONT_VILLAGE,
                "ADDR_SOI": reqData.CONT_SOI,
                "ADDR_ROAD": reqData.CONT_ROAD,
                "TAMBOL_NAME_TH": reqData.CONT_TAMBOL,
                "TAMBOL_SEQ": reqData.CONT_TAMBOL_SEQ,
                "PROVINCE_NAME_TH": reqData.CONT_PROVINCE,
                "PROVINCE_SEQ": reqData.CONT_PROVINCE_SEQ,
                "ADDR_POSTCODE": reqData.CONT_POSTCODE,
                "RECORD_STATUS": "N",
                "PRICE_PER_UNIT": taxyear3,
                "INVOICE_NAME_TH": "ค่าภาษีที่ดินและสิ่งปลูกสร้าง",
                "REGISTER_NAME_TH": masRegister[0].REGISTER_NAME_TH,
                "INVOICE_YEAR": 3,
                "INVOICE_MONTH": c,
                "PROCESS_STS_SEQ": 43,
                "PROCESS_STS_NAME_TH": "ค้างชำระ",
                "PROCESS_SEQ": 14,
                "INVOICE_ORDER": i
            }
            invoiceList.push(obj_data)
            c++
        }
    }
    return invoiceList

}