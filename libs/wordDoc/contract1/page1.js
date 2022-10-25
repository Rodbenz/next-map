import * as docx from "docx";
import { dbdateformat } from "../../datacontrol";
import { dateFormat } from "../../outputControl";

const config = {
    font: "TH SarabunPSK"
}
// const data = {
//     contractCode: "กทพ/บค/16368/2เอ/2565",
//     contractType: "กิจการสาธารณูปโภค",
//     contractOwner: "นาย Exat10 Test",
//     contractStartDate: "2021-01-01",
//     contractEndDate: "2024-01-01",
//     contractLength: 36 // mount
// }
export default async function page1(data) {
    const blob = await fetch(
        "https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Emblem_of_the_Expressway_Authority_of_Thailand.svg/1024px-Emblem_of_the_Expressway_Authority_of_Thailand.svg.png"
    ).then(r => r.blob());
    return {
        properties: {
            page: {
                margin: {
                    left: 72 * 10,
                    top: 72 * 10,
                    bottom: 72 * 10,
                    right: 72 * 10
                },
                borders: {
                    pageBorderBottom: {
                        style: docx.BorderStyle.THICK_THIN_LARGE_GAP,
                        size: 4 * 8, //2pt;
                        color: '000000',
                        space: 2 * 8
                    },
                    pageBorderLeft: {
                        style: docx.BorderStyle.THIN_THICK_LARGE_GAP,
                        size: 4 * 8, //1pt;
                        color: '000000',
                        space: 3 * 8
                    },
                    pageBorderRight: {
                        style: docx.BorderStyle.THICK_THIN_LARGE_GAP,
                        size: 4 * 8, //1pt;
                        color: '000000',
                        space: 3 * 8
                    },
                    pageBorderTop: {
                        style: docx.BorderStyle.THIN_THICK_LARGE_GAP,
                        size: 4 * 8, //1pt;
                        color: '000000',
                        space: 2 * 8
                    },
                    pageBorders: {
                        display: "firstPage", //https://docx.js.org/api/enums/PageBorderDisplay.html
                        offsetFrom: "page", //https://docx.js.org/api/enums/PageBorderOffsetFrom.html
                        zOrder: "front" //https://docx.js.org/api/enums/PageBorderZOrder.html
                    }
                }
            },
        },
        children: [
            /// LINE 1 //// สัญญาที่
            new docx.Paragraph({
                alignment: "end",
                children: [
                    new docx.TextRun({
                        text: "",
                        font: config.font,
                        size: 16 * 2,
                        bold: true

                    }),
                    new docx.Table({
                        alignment: "end",
                        rows: [
                            new docx.TableRow({
                                children: [
                                    new docx.TableCell({
                                        borders: {
                                            top: { size: 1 },
                                            bottom: { size: 1 },
                                            left: { size: 1 },
                                            right: { size: 1 },
                                        },
                                        children: [new docx.Paragraph({
                                            children: [new docx.TextRun({
                                                text: "สัญญาที่",
                                                font: config.font,
                                                size: 16 * 2
                                            })]
                                        })],
                                    }),
                                    new docx.TableCell({
                                        borders: {
                                            top: { size: 1 },
                                            bottom: { size: 1 },
                                            left: { size: 1 },
                                            right: { size: 1 },
                                        },
                                        children: [
                                            new docx.Paragraph({
                                                alignment: docx.AlignmentType.CENTER,
                                                spacing: {
                                                    lineRule: docx.LineRuleType.EXACTLY,
                                                    afterAutoSpacing: true,
                                                    beforeAutoSpacing: true,
                                                },
                                                children: [
                                                    new docx.TextRun({
                                                        text: NumberToThaiText(data.CONTRACT_NO),
                                                        font: config.font,
                                                        size: 16 * 2
                                                    })
                                                ],
                                                border: {
                                                    bottom: { size: 8, style: docx.BorderStyle.DOTTED }
                                                }
                                            }

                                            )
                                        ],
                                        width: {
                                            type: docx.WidthType.DXA,
                                            size: 3000
                                        }
                                    }),
                                ],
                            }),
                        ],
                    })
                ],
            }),
            /// LINE 2 /// * IMG LOGO
            new docx.Paragraph({
                alignment: docx.AlignmentType.CENTER,
                children: [
                    new docx.ImageRun({
                        data: blob,
                        transformation: {
                            width: 100,
                            height: 100
                        }
                    })
                ]
            }),
            /// LINE 3 ///
            new docx.Paragraph(""),
            /// LINE 4 ///
            new docx.Paragraph(""),
            /// LINE 5 ///
            new docx.Paragraph(""),
            /// LINE 6 ///
            new docx.Paragraph(""),
            /// LINE 7 ///
            new docx.Paragraph(""),
            /// LINE 8 ///
            new docx.Paragraph(""),
            /// LINE 9 /// สัญญา ....
            new docx.Paragraph({
                alignment: docx.AlignmentType.CENTER,
                children: [
                    new docx.TextRun({
                        text: "",
                        font: config.font,
                        size: 16 * 2,
                        bold: true
                    }),
                    new docx.Table({
                        alignment: "center",
                        rows: [
                            new docx.TableRow({
                                children: [
                                    new docx.TableCell({
                                        borders: {
                                            top: { size: 1 },
                                            bottom: { size: 1 },
                                            left: { size: 1 },
                                            right: { size: 1 },
                                        },
                                        children: [new docx.Paragraph({
                                            children: [new docx.TextRun({
                                                text: "สัญญา",
                                                font: config.font,
                                                size: 16 * 2,
                                                bold: true
                                            })]
                                        })],
                                    }),
                                    new docx.TableCell({
                                        borders: {
                                            top: { size: 1 },
                                            bottom: { size: 1 },
                                            left: { size: 1 },
                                            right: { size: 1 },
                                        },
                                        width: {
                                            type: docx.WidthType.DXA,
                                            size: 7000
                                        },
                                        children: [new docx.Paragraph({
                                            children: [new docx.TextRun({
                                                text: "สัญญา",
                                                font: config.font,
                                                size: 16 * 2,
                                                bold: true,
                                                children: [
                                                    new docx.Paragraph({
                                                        alignment: docx.AlignmentType.CENTER,

                                                        border: {
                                                            bottom: { size: 8, style: docx.BorderStyle.DOTTED }
                                                        },
                                                        children: [
                                                            new docx.TextRun({
                                                                text: data.OBJECTIVE_NAME_TH,
                                                                font: config.font,
                                                                size: 16 * 2
                                                            })
                                                        ]
                                                    })
                                                ]
                                            })],
                                            spacing: {
                                                lineRule: docx.LineRuleType.EXACTLY,
                                                afterAutoSpacing: true,
                                                beforeAutoSpacing: true,
                                            },
                                        })],
                                    }),
                                ],
                            }),
                        ],
                    })
                ]
            }),
            /// LINE 10 ///
            new docx.Paragraph(""),
            /// LINE 11 ///
            new docx.Paragraph(""),
            /// LINE 12 /// ระหว่าง
            new docx.Paragraph({
                alignment: docx.AlignmentType.CENTER,
                children: [
                    new docx.TextRun({
                        font: config.font,
                        size: 18 * 2,
                        text: "ระหว่าง"
                    })
                ]
            }),
            new docx.Paragraph(""),
            /// LINE 13 ///
            new docx.Paragraph(""),
            /// LINE 14 /// การทางพิเศษแห่งประเทศไทย
            new docx.Paragraph({
                alignment: docx.AlignmentType.CENTER,
                children: [
                    new docx.TextRun({
                        font: config.font,
                        bold: true,
                        size: 24 * 2,
                        text: "การทางพิเศษแห่งประเทศไทย"
                    })
                ]
            }),
            new docx.Paragraph(""),
            /// LINE 13 ///
            new docx.Paragraph(""),
            /// LINE 14 ///
            new docx.Paragraph({
                alignment: docx.AlignmentType.CENTER,
                children: [
                    new docx.TextRun({
                        font: config.font,
                        size: 18 * 2,
                        text: "กับ"
                    })
                ]
            }),
            /// LINE 15 ///
            new docx.Paragraph(""),
            /// LINE 16 ///
            new docx.Paragraph(""),
            /// LINE 17 ///
            new docx.Paragraph({
                alignment: docx.AlignmentType.CENTER,
                children: [
                    new docx.TextRun({
                        font: config.font,
                        size: 16 * 2,
                        children: [
                            new docx.Table({
                                alignment: "center",
                                rows: [
                                    new docx.TableRow({
                                        children: [
                                            new docx.TableCell({
                                                borders: {
                                                    top: { size: 1 },
                                                    bottom: { size: 1 },
                                                    left: { size: 1 },
                                                    right: { size: 1 },
                                                },
                                                width: {
                                                    type: docx.WidthType.DXA,
                                                    size: 7500
                                                },
                                                children: [new docx.Paragraph({
                                                    children: [new docx.TextRun({
                                                        text: "สัญญา",
                                                        font: config.font,
                                                        size: 16 * 2,
                                                        bold: true,
                                                        children: [
                                                            new docx.Paragraph({
                                                                alignment: docx.AlignmentType.CENTER,

                                                                border: {
                                                                    bottom: { size: 8, style: docx.BorderStyle.DOTTED }
                                                                },
                                                                children: [
                                                                    new docx.TextRun({
                                                                        text: data.contractOwner,
                                                                        font: config.font,
                                                                        size: 16 * 2
                                                                    })
                                                                ]
                                                            })
                                                        ]
                                                    })],
                                                    spacing: {
                                                        lineRule: docx.LineRuleType.EXACTLY,
                                                        afterAutoSpacing: true,
                                                        beforeAutoSpacing: true,
                                                    },
                                                })],
                                            })
                                        ]
                                    })
                                ]
                            })
                        ]
                    })
                ]
            }),
            /// LINE 18 ///
            new docx.Paragraph(""),
            /// LINE 19 ///
            new docx.Paragraph(""),
            /// LINE 20 ///
            new docx.Paragraph(""),
            /// LINE 21 ///
            new docx.Paragraph(""),
            /// LINE 22 ///
            new docx.Paragraph(""),
            /// LINE 23 ///
            new docx.Paragraph(""),
            /// LINE 24 ///
            new docx.Paragraph(""),
            /// LINE 25 ///
            new docx.Paragraph(""),
            /// LINE 26 ///
            new docx.Paragraph(""),
            /// LINE 27 ///
            new docx.Paragraph(""),
            /// LINE 28 ///
            new docx.Paragraph(""),
            /// LINE 29 ///
            new docx.Paragraph(""),
            /// LINE 30 ///
            new docx.Paragraph(""),
            /// LINE 31 ///
            new docx.Paragraph(""),
            /// LINE 32 ///
            new docx.Paragraph(""),
            /// LINE 33 ///
            new docx.Paragraph(""),
            /// LINE 34 ///
            new docx.Paragraph(""),
            /// LINE 35 ///
            new docx.Paragraph(""),
            /// LINE 36  ///
            new docx.Paragraph({
                alignment: docx.AlignmentType.LEFT,
                children: [
                    new docx.TextRun({
                        size: 16 * 2,
                        font: config.font,
                        children: [
                            new docx.Table({
                                alignment: "left",
                                rows: [
                                    new docx.TableRow({
                                        children: [
                                            new docx.TableCell({
                                                width: {
                                                    type: docx.WidthType.DXA,
                                                    size: 72 * 20
                                                },
                                                borders: {
                                                    top: { size: 1 },
                                                    bottom: { size: 1 },
                                                    left: { size: 1 },
                                                    right: { size: 1 },
                                                },
                                                children: [
                                                    new docx.Paragraph({
                                                        children: [
                                                            new docx.TextRun({
                                                                text: "วันเริ่มต้นสัญญา",
                                                                font: config.font,
                                                                size: 16 * 2,
                                                                bold: true
                                                            })
                                                        ]
                                                    })
                                                ]
                                            }),
                                            new docx.TableCell({
                                                width: {
                                                    type: docx.WidthType.DXA,
                                                    size: 3000
                                                },
                                                borders: {
                                                    top: { size: 1 },
                                                    bottom: { size: 1 },
                                                    left: { size: 1 },
                                                    right: { size: 1 },
                                                },
                                                children: [
                                                    new docx.Paragraph({
                                                        alignment: docx.AlignmentType.CENTER,
                                                        border: {
                                                            bottom: { size: 8, style: docx.BorderStyle.DOTTED }
                                                        },
                                                        children: [
                                                            new docx.TextRun({
                                                                text: data.CONTRACT_START_DTM ? NumberToThaiText(dateFormat(dbdateformat(data.CONTRACT_START_DTM))) : ` `,
                                                                font: config.font,
                                                                size: 16 * 2,
                                                                bold: true
                                                            })
                                                        ]
                                                    })

                                                ]
                                            }),
                                        ]
                                    }),
                                    new docx.TableRow({
                                        children: [
                                            new docx.TableCell({
                                                width: {
                                                    type: docx.WidthType.DXA,
                                                    size: 72 * 20
                                                },
                                                borders: {
                                                    top: { size: 1 },
                                                    bottom: { size: 1 },
                                                    left: { size: 1 },
                                                    right: { size: 1 },
                                                },
                                                children: [
                                                    new docx.Paragraph({
                                                        children: [
                                                            new docx.TextRun({
                                                                text: "วันสิ้นสุดสัญญา",
                                                                font: config.font,
                                                                size: 16 * 2,
                                                                bold: true
                                                            })
                                                        ]
                                                    })
                                                ]
                                            }),
                                            new docx.TableCell({
                                                width: {
                                                    type: docx.WidthType.DXA,
                                                    size: 3000
                                                },
                                                borders: {
                                                    top: { size: 1 },
                                                    bottom: { size: 1 },
                                                    left: { size: 1 },
                                                    right: { size: 1 },
                                                },
                                                children: [
                                                    new docx.Paragraph({
                                                        alignment: docx.AlignmentType.CENTER,
                                                        border: {
                                                            bottom: { size: 8, style: docx.BorderStyle.DOTTED }
                                                        },
                                                        children: [
                                                            new docx.TextRun({
                                                                text: data.CONTRACT_END_DTM ? NumberToThaiText(dateFormat(dbdateformat(data.CONTRACT_END_DTM))) : ` `,
                                                                font: config.font,
                                                                size: 16 * 2,
                                                                bold: true
                                                            })
                                                        ]
                                                    })

                                                ]
                                            }),
                                        ]
                                    }),
                                    new docx.TableRow({
                                        children: [
                                            new docx.TableCell({
                                                width: {
                                                    type: docx.WidthType.DXA,
                                                    size: 72 * 20
                                                },
                                                borders: {
                                                    top: { size: 1 },
                                                    bottom: { size: 1 },
                                                    left: { size: 1 },
                                                    right: { size: 1 },
                                                },
                                                children: [
                                                    new docx.Paragraph({
                                                        children: [
                                                            new docx.TextRun({
                                                                text: "ระยะเวลา",
                                                                font: config.font,
                                                                size: 16 * 2,
                                                                bold: true
                                                            })
                                                        ]
                                                    })
                                                ]
                                            }),
                                            new docx.TableCell({
                                                width: {
                                                    type: docx.WidthType.DXA,
                                                    size: 3000
                                                },
                                                borders: {
                                                    top: { size: 1 },
                                                    bottom: { size: 1 },
                                                    left: { size: 1 },
                                                    right: { size: 1 },
                                                },
                                                children: [
                                                    new docx.Paragraph({
                                                        alignment: docx.AlignmentType.CENTER,
                                                        border: {
                                                            bottom: { size: 8, style: docx.BorderStyle.DOTTED }
                                                        },
                                                        children: [
                                                            new docx.TextRun({
                                                                text: data.CONTRACT_YEAR ? NumberToThaiText(data.CONTRACT_YEAR) + ` ปี ` : ` ` + data.CONTRACT_MONTH ? NumberToThaiText(data.CONTRACT_MONTH) + ` เดือน ` : ` `,
                                                                font: config.font,
                                                                size: 16 * 2,
                                                                bold: true
                                                            })
                                                        ]
                                                    })
                                                ]
                                            }),
                                        ]
                                    }),
                                ],
                            })
                        ]
                    })
                ]
            }),
        ],
    }
}



// ==========================HEAD==========================


function NumberToThaiText(Number) {
    try {
        Number = String(Number)
        Number = Number.replace(/0/gi, "๐");
        Number = Number.replace(/1/gi, "๑");
        Number = Number.replace(/2/gi, "๒");
        Number = Number.replace(/3/gi, "๓");
        Number = Number.replace(/4/gi, "๔");
        Number = Number.replace(/5/gi, "๕");
        Number = Number.replace(/6/gi, "๖");
        Number = Number.replace(/7/gi, "๗");
        Number = Number.replace(/8/gi, "๘");
        Number = Number.replace(/9/gi, "๙");
        return Number
    } catch {
        return Number
    }
};