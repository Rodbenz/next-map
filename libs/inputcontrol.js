export const numberWithCommas = (x) => {
    try {
        if (isNaN(x)) {
            return null
        }
        var parts = x.toString().split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return parts.join(".");
    } catch
    {
        return null
    }
}


export const validNumber = (string) => {
    // if (string == '') {
    //     return 0
    // }
    try {
        string = string.replace(/[^\d]/g, '')
        return string
    } catch {
        return ''
    }
}

export const validNumInt = (string) => {
    if (string == '' || string == 0) {
        return 0
    }
    try {
        string = string.replace(/[^\d]/g, '')
        string.indexOf("0") == 0 ? string = string.substr(1, string.length) : string
        return string
    } catch {
        return false
    }
}


export const validNumberFloat = (string) => {
    if (string == '' || string == "0") {
        return 0
    }
    try {
        var countdot = (string.match(/[.]/g)).length
    } catch {
        var countdot = 0
    }
    if (countdot > 1) {
        return (string.substr(0, string.length - 1)).replace(/[^\d.-]/g, '')
    }
    if (string.length > 21) {
        string = string.substr(0, 21)
    }
    try {
        string = string.replace(/[^\d.-]/g, '')
        string.indexOf("0") == 0 ?
            string.indexOf("0.") == 0 ?
                string :
                string = string.substr(1, string.length)
            :
            string
        return string
    } catch {
        return false
    }
}


