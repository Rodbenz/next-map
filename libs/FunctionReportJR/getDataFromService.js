import {
    invoiceRequestExpresswayDTM,
    invoiceRequestInvoice,
    contractGuaranteeReturn,
    contractRegisterReturn,
    invoiceRequestExpresswayRegister,
    invoiceRequestExpresswayQuarter,
    paymentRequestCancel,
    paymentRequestRegister
} from "../../service/REG/dashboard";
import { SnackbarSet } from "../../pages/components/snackbar";
import dayjs from "dayjs";
import thaiyear from "dayjs/plugin/buddhistEra";
import thdate from "dayjs/locale/th";
import arraySupport from "dayjs/plugin/arraySupport";
import { id } from "date-fns/locale";
dayjs.extend(thaiyear, arraySupport);


export const getInvoiceRequestExpresswayDTM = async (selReportType) => {
    let res = await invoiceRequestExpresswayDTM();
    console.log(res, "res getInvoiceRequestExpresswayDTM");
    if (Array.isArray(res)) {
        if (selReportType.id == 1) {
            let ArrData = [];
            res.map((item, index) => {
                let dateStr = (item.INVOICE_DEADLINE_YEAR != null && item.INVOICE_DEADLINE_MONTH != null && item.INVOICE_DEADLINE_DAY != null) ? dayjs(item.INVOICE_DEADLINE_YEAR + "-" + item.INVOICE_DEADLINE_MONTH + "-" + item.INVOICE_DEADLINE_DAY).locale(thdate).format("DD MMMM BBBB") : "ไม่มีข้อมูลวันที่";
                item.DATE = dateStr
                item.ROW_NUM = parseInt(index) + 1;
                item.INVOICE_TOTAL_AMOUNT = item.INVOICE_TOTAL_AMOUNT != null ? item.INVOICE_TOTAL_AMOUNT : "ไม่มีข้อมูล";
                ArrData.push({ "วัน": item.DATE, "จำนวนเงิน": item.INVOICE_TOTAL_AMOUNT, "สายทางพิเศษ": item.EXPRESSWAY_NAME_TH });
            })
            return ArrData;
        }
        if (selReportType.id == 2) {
            let ArrData = [];
            res.map((item, index) => {
                item.DATE = item.INVOICE_DEADLINE_YEAR != null && item.INVOICE_DEADLINE_MONTH != null ? dayjs([item.INVOICE_DEADLINE_YEAR, item.INVOICE_DEADLINE_MONTH, item.INVOICE_DEADLINE_DAY]).locale(thdate).format("MMMM") : "ไม่มีข้อมูล";
                item.ROW_NUM = parseInt(index) + 1;
                item.INVOICE_TOTAL_AMOUNT = item.INVOICE_TOTAL_AMOUNT != 0 ? item.INVOICE_TOTAL_AMOUNT : "ไม่มีข้อมูล";
                ArrData.push({ "เดือน": item.DATE, "จำนวนเงิน": item.INVOICE_TOTAL_AMOUNT, "สายทางพิเศษ": item.EXPRESSWAY_NAME_TH });
            })
            return ArrData;
        }
    } else {
        console.log(res, "เกิดข้อผิดพลาด");
        SnackbarSet("เกิดข้อผิดพลาด", "error");
    }
};

export const getinvoiceRequestInvoice = async (selReportType) => {
    let res = await invoiceRequestInvoice();
    if (Array.isArray(res)) {
        console.log(res, "res getinvoiceRequestInvoice");
        let ArrData = [];
        res.map((item, index) => {
            item.ROW_NUM = parseInt(index) + 1;
            item.DATE = item.INVOICE_DEADLINE_YEAR != null && item.INVOICE_DEADLINE_MONTH != null && item.INVOICE_DEADLINE_DAY != null ? dayjs(item.INVOICE_DEADLINE_YEAR + "-" + item.INVOICE_DEADLINE_MONTH + "-" + item.INVOICE_DEADLINE_DAY).locale(thdate).format("DD MMMM BBBB") : "ไม่มีข้อมูล";
            item.INVOICE_TOTAL_AMOUNT = item.INVOICE_TOTAL_AMOUNT != null ? item.INVOICE_TOTAL_AMOUNT : 0;
            ArrData.push({ "วันที่": item.DATE, "จำนวนเงิน": item.INVOICE_TOTAL_AMOUNT, "สายทางพิเศษ": item.EXPRESSWAY_NAME_TH ,"ประเภท":item.INVOICE_NAME_TH});
        });
        return ArrData;
    } else {
        console.log(res, "เกิดข้อผิดพลาด");
        SnackbarSet("เกิดข้อผิดพลาด", "error");
    }
}

export const getcontractGuaranteeReturn = async (selReportType) => {
    let res = await contractGuaranteeReturn();
    if (Array.isArray(res)) {
        // console.log(res, "res contractGuaranteeReturn");
        return res.map((item, index) => {
            item.ROW_NUM = parseInt(index) + 1;
            item.CUST_FULLNAME_TH = (item.TITLE_NAME_TH != null && item.CUST_FNAME_TH != null && item.CUST_LNAME_TH != null) ? item.TITLE_NAME_TH + item.CUST_FNAME_TH + item.CUST_LNAME_TH : "ไม่มีข้อมูล";
            item.GUARANTEE_AMOUNT = item.GUARANTEE_AMOUNT != null ? item.GUARANTEE_AMOUNT.toLocaleString() : "ไม่มีข้อมูล";
            item.CONTRACT_END_DTM = item.CONTRACT_END_DTM != null ? dayjs(item.CONTRACT_END_DTM).locale(thdate).format("DD MMMM BBBB") : "ไม่มีข้อมูล";
            item.CONTRACT_START_DTM = item.CONTRACT_START_DTM != null ? dayjs(item.CONTRACT_START_DTM).locale(thdate).format("DD MMMM BBBB") : "ไม่มีข้อมูล";
            item.MANAGE_RETURN_STS = item.MANAGE_RETURN_STS != null ? item.MANAGE_RETURN_STS : "ไม่มีข้อมูล";
            item.RETURN_DAMAGES_STS = item.RETURN_DAMAGES_STS != null ? item.RETURN_DAMAGES_STS : "ไม่มีข้อมูล";
            item.CONTRACT_NO = item.CONTRACT_NO != null ? item.CONTRACT_NO : "ไม่มีข้อมูล";
            return item;
        })
    } else {
        console.log(res, "เกิดข้อผิดพลาด");
        SnackbarSet("เกิดข้อผิดพลาด", "error");
    }
}

export const getcontractRegisterReturn = async (selReportType) => {
    let res = await contractRegisterReturn();
    if (Array.isArray(res)) {
        console.log(res, "res contractGuaranteeReturn");
        return res.map((item, index) => {
            item.ROW_NUM = parseInt(index) + 1;
            item.MANAGE_RETURN_STS = item.MANAGE_RETURN_STS != null ? item.MANAGE_RETURN_STS : "ไม่มีข้อมูล";
            item.RETURN_DAMAGES_STS = item.RETURN_DAMAGES_STS != null ? item.RETURN_DAMAGES_STS : "ไม่มีข้อมูล";
            item.CONTRACT_NO = item.CONTRACT_NO != null ? item.CONTRACT_NO : "ไม่มีข้อมูล";
            item.CONTRACT_LOCATION = item.CONTRACT_LOCATION != null ? item.CONTRACT_LOCATION : "ไม่มีข้อมูล";
            return item;
        })
    } else {
        console.log(res, "เกิดข้อผิดพลาด");
        SnackbarSet("เกิดข้อผิดพลาด", "error");
    }
}

export const getinvoiceRequestExpresswayRegister = async (selReportType) => {
    let res = await invoiceRequestExpresswayRegister();
    if (Array.isArray(res)) {
        console.log(res, "res invoiceRequestExpresswayRegister");
        let ArrData = [];
        res.map((item, index) => {
            item.ROW_NUM = parseInt(index) + 1;
            item.EXPRESSWAY_NAME_TH = item.EXPRESSWAY_NAME_TH != null ? item.EXPRESSWAY_NAME_TH : "ไม่มีข้อมูล";
            item.MANAGE_RETURN_STS = item.MANAGE_RETURN_STS != null ? item.MANAGE_RETURN_STS : "ไม่มีข้อมูล";
            item.RETURN_DAMAGES_STS = item.RETURN_DAMAGES_STS != null ? item.RETURN_DAMAGES_STS : "ไม่มีข้อมูล";
            item.COUNT_ = item.COUNT_ != null ? item.COUNT_ : 0;
            item.MONTH =item.INVOICE_DEADLINE_YEAR != null && item.INVOICE_DEADLINE_MONTH != null  ? dayjs([item.INVOICE_DEADLINE_YEAR , item.INVOICE_DEADLINE_MONTH ,item.INVOICE_DEADLINE_DAY]).locale(thdate).format("MMMM") : "ไม่มีข้อมูล";
            item.YEAR =item.INVOICE_DEADLINE_YEAR != null && item.INVOICE_DEADLINE_MONTH != null ? dayjs([item.INVOICE_DEADLINE_YEAR , item.INVOICE_DEADLINE_MONTH ,item.INVOICE_DEADLINE_DAY]).locale(thdate).format("BBBB") : "ไม่มีข้อมูล";
            ArrData.push({"จำนวนสัญญา": item.COUNT_, "สายทางพิเศษ": item.EXPRESSWAY_NAME_TH, "เดือน":item.MONTH,"ปี":item.YEAR});
        })
        return ArrData;
    } else {
        console.log(res, "เกิดข้อผิดพลาด");
        SnackbarSet("เกิดข้อผิดพลาด", "error");
    }
}

export const getinvoiceRequestExpresswayQuarter = async (selReportType) => {
    let res = await invoiceRequestExpresswayQuarter();
    if (Array.isArray(res)) {
        console.log(res, "res getinvoiceRequestExpresswayQuarter");
        let ArrData = [];
       res.sort((a, b) => a.QUARTER_SEQ - b.QUARTER_SEQ).map((item, index) => {
            item.QUARTER_NAME_TH = item.QUARTER_SEQ == null ? "ไม่มีข้อมูล" : item.QUARTER_NAME_TH;
            item.CONTRACT_START_YEAR = item.CONTRACT_START_YEAR == null? "ไม่มีข้อมูล" : dayjs([item.CONTRACT_START_YEAR]).locale(thdate).format("BBBB");
            item.PAYMENT_NET_TOTAL = item.PAYMENT_NET_TOTAL != null ? item.PAYMENT_NET_TOTAL : 0;
            item.RENTAL_FEE_TAX_QUARTER = item.RENTAL_FEE_TAX_QUARTER != null ? item.RENTAL_FEE_TAX_QUARTER : 0;
            ArrData.push({"ประมาณการค่าเช่าที่ควรได้รับ":item.RENTAL_FEE_TAX_QUARTER,"รายได้ที่ได้รับ":item.PAYMENT_NET_TOTAL,"ไตรมาส":item.QUARTER_NAME_TH,"ปี":item.CONTRACT_START_YEAR});
        })
        return ArrData;
    } else {
        console.log(res, "เกิดข้อผิดพลาด");
        SnackbarSet("เกิดข้อผิดพลาด", "error");
    }
}

export const getpaymentRequestCancel = async (selReportType) => {
    let res = await paymentRequestCancel();
    if (Array.isArray(res)) {
        let ArrData = [];
        console.log(res, "res getinvoiceRequestExpresswayQuarter");
        res.map((item, index) => {

        });
        return ArrData;
    } else {
        console.log(res, "เกิดข้อผิดพลาด");
        SnackbarSet("เกิดข้อผิดพลาด", "error");
    }
}

export const getpaymentRequestRegister = async (selReportType) => {
    let res = await paymentRequestRegister();
    if (Array.isArray(res)) {
        let ArrData = [];
        res.map((item, index) => {
            item.ROW_NUM = parseInt(index) + 1;
            item.PAYMENT_NET_TOTAL_1 = item.PAYMENT_NET_TOTAL_1 != null ? item.PAYMENT_NET_TOTAL_1.toLocaleString() : "ไม่มีข้อมูล";
            item.PAYMENT_NET_TOTAL_2 = item.PAYMENT_NET_TOTAL_2 != null ? item.PAYMENT_NET_TOTAL_2.toLocaleString() : "ไม่มีข้อมูล";
            item.PAYMENT_NET_TOTAL_3 = item.PAYMENT_NET_TOTAL_3 != null ? item.PAYMENT_NET_TOTAL_3.toLocaleString() : "ไม่มีข้อมูล";
            item.PAYMENT_NET_TOTAL = item.PAYMENT_NET_TOTAL != null ? item.PAYMENT_NET_TOTAL.toLocaleString() : "ไม่มีข้อมูล";
            item.PAYMENT_DTM =item.PAYMENT_DTM != null ? dayjs(item.PAYMENT_DTM).locale(thdate).format("DD MMMM BBBB") : "ไม่มีข้อมูล";
        });
        return res;
    } else {
        console.log(res, "เกิดข้อผิดพลาด");
        SnackbarSet("เกิดข้อผิดพลาด", "error");
    }
}