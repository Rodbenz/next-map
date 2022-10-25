import { getRegisterByPK } from '../service/MAS/register';
import { getContractByPK } from '../service/REG/contract';
import { getRequestByPK } from '../service/REG/request';
import { getRequestInvoiceByContract } from '../service/REG/request_invoice';
import * as dataControl from './datacontrol'


export async function renewGenData(seq) {
    let data = await getRequestByPK(seq);
    // let contract_data = data.customerdata;
    let reqData = data[0];
    //console.log("renewGenData reqData", reqData);
    let contractData = await getContractByPK(reqData?.CONTRACT_REFERENCE_SEQ);
    let contract_data = contractData[0];
    console.log("renewGenData contractData", contractData[0]);
    let requestInvoiceData = await getRequestInvoiceByContract(contract_data.CONTRACT_SEQ);
    let invoiceFilterData = requestInvoiceData.filter(item => item.INVOICE_SEQ == 6);
    //console.log("renewGenData invoiceFilterData", invoiceFilterData);
    // let register = reqData.REGISTER_SEQ;
    var obj_data = new Object();
    var obj_arr = [];
    let seqNumInvoiceRegisterArr = { "seq": 6, "name": "ค่าเช่า" };


    let requestYear = reqData.REQUEST_YEAR;
    console.log("renewGenData requestYear", requestYear);
    let requestMonth = reqData.REQUEST_MONTH;
    let yearArr = dataControl._getUniqueFromArray(invoiceFilterData, "INVOICE_YEAR");
    // console.log("renewGenData yearArr", yearArr);
    let maxYear = Math.max(...yearArr);
    console.log("renewGenData maxYear", maxYear);
    let monthArr = dataControl._getUniqueFromArray(invoiceFilterData, "INVOICE_MONTH");
    console.log("renewGenData monthArr",monthArr);
    let maxMonth = Math.max(...monthArr);
    console.log("renewGenData maxMonth", maxMonth);
    let parseYearToMonth = requestYear * 12;
    let calMonth = parseYearToMonth + requestMonth  ;
    console.log("renewGenData calMonth", calMonth);
    if (maxMonth <= 12) {
        for (let index = 1; index <= calMonth; index++) {
            console.log("renewGenData index",index);
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
            if (index > 36 && index <= 48) {
                rentalMonth = reqData.RENTAL_MONTH_4;
            }
            if (index > 48) {
                rentalMonth = reqData.RENTAL_MONTH_5;
            }
            obj_data = {
                "INVOICE_SEQ": seqNumInvoiceRegisterArr.seq,
                "REQUEST_SEQ": contract_data.REQUEST_SEQ,
                "REQUEST_NO": "REQ" + dataControl.right(String(contract_data.REQUEST_NO_1 + 543), 2) + contract_data.REQUEST_NO_2 + dataControl.right("000000" + contract_data.REQUEST_NO_3, 6),
                "REQUEST_NO_1": contract_data.REQUEST_NO_1,
                "REQUEST_NO_2": contract_data.REQUEST_NO_2,
                "REQUEST_NO_3": contract_data.REQUEST_NO_3,
                "REGISTER_SEQ": contract_data.REGISTER_SEQ,
                "CONTRACT_SEQ": contract_data.CONTRACT_SEQ,
                "CUST_SEQ": contract_data.CUST_SEQ,
                "CUST_PID": contract_data.CUST_PID,
                "CUST_TAX": contract_data.CUST_PID,
                "CUST_FNAME_TH": contract_data.CUST_FNAME_TH,
                "CUST_LNAME_TH": contract_data.CUST_LNAME_TH,
                "CUST_EMAIL": contract_data?.CUST_EMAIL ?? null,
                "TITLE_SEQ": contract_data.TITLE_SEQ,
                "TITLE_NAME_TH": contract_data.TITLE_NAME_TH,
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
                "INVOICE_NAME_TH": seqNumInvoiceRegisterArr.name + " งวดที่ " + index,
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
    } else {
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
            if (index > 36 && index <= 48) {
                rentalMonth = reqData.RENTAL_MONTH_4;
            }
            if (index > 48) {
                rentalMonth = reqData.RENTAL_MONTH_5;
            }
            obj_data = {
                "INVOICE_SEQ": seqNumInvoiceRegisterArr.seq,
                "REQUEST_SEQ": contract_data.REQUEST_SEQ,
                "REQUEST_NO": "REQ" + dataControl.right(String(contract_data.REQUEST_NO_1 + 543), 2) + contract_data.REQUEST_NO_2 + dataControl.right("000000" + contract_data.REQUEST_NO_3, 6),
                "REQUEST_NO_1": contract_data.REQUEST_NO_1,
                "REQUEST_NO_2": contract_data.REQUEST_NO_2,
                "REQUEST_NO_3": contract_data.REQUEST_NO_3,
                "REGISTER_SEQ": contract_data.REGISTER_SEQ,
                "CONTRACT_SEQ": contract_data.CONTRACT_SEQ,
                "CUST_SEQ": contract_data.CUST_SEQ,
                "CUST_PID": contract_data.CUST_PID,
                "CUST_TAX": contract_data.CUST_PID,
                "CUST_FNAME_TH": contract_data.CUST_FNAME_TH,
                "CUST_LNAME_TH": contract_data.CUST_LNAME_TH,
                "CUST_EMAIL": contract_data?.CUST_EMAIL ?? null,
                "TITLE_SEQ": contract_data.TITLE_SEQ,
                "TITLE_NAME_TH": contract_data.TITLE_NAME_TH,
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
                "INVOICE_NAME_TH": seqNumInvoiceRegisterArr.name + " งวดที่ " + index,
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


    if (maxMonth <= 12) {
        console.log("renewGenData obj_arr maxMonth", obj_arr.filter(item => !monthArr.includes(item.INVOICE_MONTH) || !yearArr.includes(item.INVOICE_YEAR)) );
        return obj_arr.filter(item => obj_arr.filter(item => !monthArr.includes(item.INVOICE_MONTH)));
    } else {
        console.log("renewGenData obj_arr", obj_arr.filter(item => !yearArr.includes(item.INVOICE_YEAR)));
        return obj_arr.filter(item => !yearArr.includes(item.INVOICE_YEAR))
    }

}