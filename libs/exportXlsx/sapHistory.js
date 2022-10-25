import { getFitAccountingHeaderByPostDate } from "../../service/SAP/FitAccountingHeader"
import { getPaymentRequestByHeaderDate } from "../../service/SAP/RequestPayment"
import * as Excel from "exceljs";
import { saveAs } from 'file-saver';
import { dateFormat } from "../outputControl";
import { dbdateformat, _readToken, getCookie } from "../datacontrol";


export const xlsx_ZARI022byDate = async (dateDBFormate) => {
    const logindata = _readToken(getCookie('userdata'));

    const _createDataPayment = (data) => {
        let dataPayment = [];
        data.map((item, index) => {
            let amphurN = item.PROVINCE_SEQ == 1 ? "เขต" : "อำเภอ";
            let tambunN = item.PROVINCE_SEQ == 1 ? "แขวง" : "ตำบล";
            dataPayment.push({
                rownum: index + 1,
                id: item.id,
                PAYMENT_NO: item.PAYMENT_NO,
                PAYMENT_DTM: dateFormat(dbdateformat(item.PAYMENT_DTM)),
                REQUEST_NO: item.REQUEST_NO,
                CONTRACT_NO: item.CONTRACT_NO,
                CUST_TAX: item.CUST_TAX,
                CUST_NAME_TH: item.CUST_NAME_TH,
                ADDR_ADDR: item.ADDR_ADDR + " " + tambunN + " " + item.TAMBOL_NAME_TH + " " + amphurN + " " + item.AMPHUR_NAME_TH + " จังหวัด " + item.PROVINCE_NAME_TH + " " + item.ADDR_POSTCODE,
                INVOICE_NAME_TH: item.INVOICE_NAME_TH,
                PAYMENT_TOTAL_AMOUNT: parseFloat(item.PAYMENT_TOTAL_AMOUNT).toFixed(2),
                PAYMENT_NAME_TH: item.PAYMENT_NAME_TH,
                BANK_NAME_TH: item.BANK_NAME_TH,
                PAYMENT_BANK_BRANCH: item.PAYMENT_BANK_BRANCH,
                PAYMENT_BANK_NO: item.PAYMENT_BANK_NO,
                PAYMENT_BANK_DTM: dateFormat(dbdateformat(item.PAYMENT_BANK_DTM)),
            })
        })
        return dataPayment;
    }

    const _createData = (data) => {
        let _data = [];
        data.map((item, index) => {
            _data.push({
                rownum: index + 1,
                id: item.FIT_ACCOUNTING_HEADER_SEQ,
                DOCUMENT_HEADER: item.DOCUMENT_HEADER_TEXT,
                REF_KEY_1: item.REF_KEY_1,
                REF_KEY_2: item.REF_KEY_2,
                DOCUMENT_DATE: dateFormat(dbdateformat(item.DOCUMENT_DATE)),
                POSTING_DATE: dateFormat(dbdateformat(item.POSTING_DATE)),
                DOCUMENT_TYPE: item.DOCUMENT_TYPE,
                DOCUMENT_TYPE_TEXT: item.DOCUMENT_TYPE_TEXT,
                DOCUMENT_NUMBER: item.DOCUMENT_NUMBER,
                FISCAL_YEAR: parseInt(item.FISCAL_YEAR) + 543,
            })
        })
        return _data;
    }

    let dataSend = {
        "POSTING_DATE": dateDBFormate,
    }

    let res = await getFitAccountingHeaderByPostDate(dataSend)
    console.log(res, "getFitAccountingHeaderByPostDate")

    let data = _createData(res)
    const workbook = new Excel.Workbook();
    workbook.creator = logindata.USER_PID;
    const worksheet = workbook.addWorksheet("SAP Document");

    worksheet.mergeCells("A1", "K1");
    worksheet.getCell("A1").value = "รายงานส่งข้อมูล SAP ประจำวันที่ " + dateFormat(dataSend.POSTING_DATE);
    worksheet.getCell("A1").alignment = { vertical: 'middle', horizontal: 'center' };
    worksheet.getCell("A1").font = { bold: true };
    worksheet.getRow(1).height = 22.00;

    worksheet.mergeCells("A2", "K2");
    worksheet.getCell("A2").value = "ประเภทรายการข้อมูล SAP DOCUMENT";
    worksheet.getCell("A2").alignment = { vertical: 'middle', horizontal: 'center' };
    worksheet.getRow(2).height = 20.00;



    worksheet.getRow(3).values = ["ลำดับ", "ID", "DOCUMENT_HEADER", "REF_KEY_1", "REF_KEY_2", "วันที่เอกสาร", "วันที่ส่งข้อมูล", "ประเภทเอกสาร", "ชื่อเอกสาร", "หมายเลขเอกสาร", "ปีงบประมาน"];
    worksheet.getRow(3).font = { bold: true };
    worksheet.getRow(3).height = 20.25;
    worksheet.getRow(3).alignment = { vertical: 'middle', horizontal: 'center' };


    worksheet.columns = [
        { key: 'rownum', width: 10 },
        { key: 'id', width: 15 },
        { key: 'DOCUMENT_HEADER', width: 30 },
        { key: 'REF_KEY_1', width: 12 },
        { key: 'REF_KEY_2', width: 25 },
        { key: 'DOCUMENT_DATE', width: 20 },
        { key: 'POSTING_DATE', width: 20 },
        { key: 'DOCUMENT_TYPE', width: 15 },
        { key: 'DOCUMENT_TYPE_TEXT', width: 30 },
        { key: 'DOCUMENT_NUMBER', width: 25 },
        { key: 'FISCAL_YEAR', width: 15 },
    ]

    worksheet.addRows(data);


    const worksheet2 = workbook.addWorksheet("SAP Document PAYMENT");

    worksheet2.mergeCells("A1", "N1");
    worksheet2.getCell("A1").value = "รายงานส่งข้อมูล SAP ประจำวันที่ " + dateFormat(dataSend.POSTING_DATE);
    worksheet2.getCell("A1").alignment = { vertical: 'middle', horizontal: 'center' };
    worksheet2.getCell("A1").font = { bold: true };
    worksheet2.getRow(1).height = 22.00;

    worksheet2.mergeCells("A2", "N2");
    worksheet2.getCell("A2").value = "ประเภทรายการข้อมูล SAP DOCUMENT PAYMENT";
    worksheet2.getCell("A2").alignment = { vertical: 'middle', horizontal: 'center' };
    worksheet2.getRow(2).height = 20.00;

    worksheet2.getRow(3).values = ["ลำดับ", "ID", "เลขที่ใบเสร็จ", "วันที่ใบเสร็จ", "หมายเลขคำขอ", "หมายเลขสัญญา", "เลขผู้เสียภาษี", "ชื่อลูกค้า", "ที่อยู่", "ชื่อรายการ", "ยอดชำระ", "วิธีการชำระเงิน", "ธนาคาร", "สาขา", "เลขที่", "วันที่"];

    worksheet2.getRow(3).font = { bold: true };
    worksheet2.getRow(3).height = 20.25;
    worksheet2.getRow(3).alignment = { vertical: 'middle', horizontal: 'center' };


    worksheet2.columns = [
        { key: 'rownum', width: 10 },
        { key: 'id', width: 15 },
        { key: 'PAYMENT_NO', width: 18 },
        { key: 'PAYMENT_DTM', width: 20 },
        { key: 'REQUEST_NO', width: 20 },
        { key: 'CONTRACT_NO', width: 20 },
        { key: 'CUST_TAX', width: 20 },
        { key: 'CUST_NAME_TH', width: 30 },
        { key: 'ADDR_ADDR', width: 30 },
        { key: 'INVOICE_NAME_TH', width: 20 },
        { key: 'PAYMENT_TOTAL_AMOUNT', width: 20 },
        { key: 'PAYMENT_NAME_TH', width: 20 },
        { key: 'BANK_NAME_TH', width: 25 },
        { key: 'PAYMENT_BANK_BRANCH', width: 25 },
        { key: 'PAYMENT_BANK_NO', width: 20 },
        { key: 'PAYMENT_BANK_DTM', width: 20 },
    ]


    let res2 = await getPaymentRequestByHeaderDate(dataSend)

    console.log(res2, "getPaymentRequestByHeaderDate")

    let data2 = _createDataPayment(res2)

    worksheet2.addRows(data2);
    const buffer = await workbook.xlsx.writeBuffer();
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    const fileExtension = '.xlsx';

    const blob = new Blob([buffer], { type: fileType });

    saveAs(blob, "รายงานส่งข้อมูล SAP ประจำวันที่ " + dateFormat(dataSend.POSTING_DATE) + fileExtension)
}