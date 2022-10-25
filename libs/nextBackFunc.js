import { padNum } from "./datacontrol";

export function NextProcess(reqProcessDataCur, curStep) {
    try {
        const current_url = new URL('' + window.location.href);
        const search_params = current_url.searchParams;
        const token = search_params.get('req');
        let jsonReq = JSON.parse(atob(token));
        let processCur = reqProcessDataCur;
        for (let i in processCur) {
            if (processCur[i].PROCESS_SEQ == curStep) {
                let proSeqNext = processCur[parseInt(i) + 1].PROCESS_SEQ
                let dataJson = { req: jsonReq.req, processSeq: proSeqNext }
                let jsonStr = JSON.stringify(dataJson);
                let encode = btoa(jsonStr)
                console.log("processCur", i);
                let link = "/register/manageReq/process" + padNum(proSeqNext, 2) + "?req=" + encode;
                console.log(link);
                window.location.href = current_url.origin + link
            }
        }
    } catch (error) {
        console.log("error", error);
    }
}

export function BackProcess(reqProcessDataCur, curStep) {
    console.log("BackProcess");
    try {
        const current_url = new URL('' + window.location.href);
        const search_params = current_url.searchParams;
        const token = search_params.get('req');
        let jsonReq = JSON.parse(atob(token));
        let processCur = reqProcessDataCur;
        for (let i in processCur) {
            if (processCur[i].PROCESS_SEQ == curStep) {
                let proSeqNext = processCur[parseInt(i) - 1].PROCESS_SEQ
                let dataJson = { req: jsonReq.req, processSeq: proSeqNext }
                let jsonStr = JSON.stringify(dataJson);
                let encode = btoa(jsonStr)
                console.log("processCur", i);
                let link = "/register/manageReq/process" + padNum(proSeqNext, 2) + "?req=" + encode;
                console.log(link);
                window.location.href = current_url.origin + link
            }
        }
    } catch (error) {
        console.log("error", error);
    }
}