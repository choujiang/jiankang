let item= require('../data/itemDetails.js');
let imagesBase64 = require('../data/image');
let zhuxian = require('../data/zhuxian');
let fujiaxian = require('../data/fujiaxian.js')

function definition(user) {

    var itemDetail=[];

    item.itemDetails.forEach(item => {
            let total = 0;
            switch (item.relate) {
                case 'baoXianJinE':
                    total = user.baoXianJinE * item.ratio;
                    break;
                case 'yiWaiJinTie':
                    total = user.yiWaiJinTie * item.ratio;
                    break;
                case 'zhuYuanBaoE':
                    total = user.zhuYuanBaoE * item.ratio;
                    break;
                case 'baoFei':
                    total = user.baoFei * item.ratio;
                    break;
            }
            itemDetail.push(
                {text: item.title + ': ', color: 'red', fontSize: 18, bold: true, lineHeight: 2.1}
            );
            itemDetail.push(
                {text: item.detail.replace(/{}/, total.toString()), fontSize: 14},
            );
            itemDetail.push(
                '\n'
            );
        },
    );

    let genderEn;
    if (user.gender === '男') {
        genderEn = 'man';
    } else {
        genderEn = 'woman';
    }
    //todo remove before deploy
    if(!user.during)
        user.during='1';
    const type = genderEn + '_' + user.during.toString();
    user.baoFei = zhuxian.get(type)[user.age - 18] * (user.baoXianJinE / 10);

    const yiWaiYiLiaoBaoFei = fujiaxian.yiWaiYiLiao[user.age - 18] * (user.yiWaiBaoE / 1000);
    const yiWaiJinTieBaoFei = fujiaxian.jinTie[user.age - 18] * (user.yiWaiJinTie / 20);
    user.yiWaiHeJinTieBaoFei = yiWaiYiLiaoBaoFei + yiWaiJinTieBaoFei;

    user.zhuYuanBaoFei = fujiaxian.zhuYuanYiLiao[user.age - 18] * (user.zhuYuanBaoE / 1000);
    // todo 百万医疗年龄和年龄区别？
    user.baiWanYiLiaoBaoFei = fujiaxian.baiWanYiLiao[user.baiWanYiliaoNanLing - 18];

    user.sum = user.baoFei + user.yiWaiHeJinTieBaoFei + user.zhuYuanBaoFei + user.baiWanYiLiaoBaoFei;


    var docDefinition = {
        pageSize: 'A4',
        pageMargins: [20, 30],
        defaultStyle: {
            font: 'DengXi'
        },
        styles: {
            tableHeader: {
                fontSize: 9.5,
                lineHeight: 1.4,
                color: 'black'
            }
        },
        content: [
            {
                image: imagesBase64[0].base64,
                width: 380,
                margin: [100, 0]
            },
            {
                style: 'tableExample',
                color: '#444',
                fontSize: 14,
                table: {
                    widths: [130, 130, 130, 130],
                    headerRows: 2,
                    // keepWithHeaderRows: 1,
                    body: [
                        [
                            {text: '职业类别：一类职业', style: 'tableHeader', colSpan: 2, alignment: 'center'},
                            {},
                            {text: user.gender + user.age + '岁', style: 'tableHeader', colSpan: 2, alignment: 'center'},
                            {}
                        ],
                        [
                            {text: '险种', style: 'tableHeader', alignment: 'center', fillColor: '#FDE9D9'},
                            {text: '保额', style: 'tableHeader', alignment: 'center', fillColor: '#FDE9D9'},
                            {text: '保险期限', style: 'tableHeader', alignment: 'center', fillColor: '#FDE9D9'},
                            {text: '保费', style: 'tableHeader', alignment: 'center', fillColor: '#FDE9D9'}
                        ],
                        [
                            {text: '全能保2017', style: 'tableHeader', alignment: 'center', bold: true},
                            {text: user.baoXianJinE + '万元', style: 'tableHeader', alignment: 'center', bold: true},
                            {
                                text: '保至80岁，' + user.during + '年交',
                                style: 'tableHeader',
                                alignment: 'center',
                                bold: true
                            },
                            {text: user.baoFei + '元', style: 'tableHeader', alignment: 'center', bold: true}
                        ],
                        [
                            {text: '附意外医疗/津贴', style: 'tableHeader', alignment: 'center'},
                            {
                                text: user.yiWaiBaoE + '元，' + user.yiWaiJinTie + '元/天',
                                style: 'tableHeader',
                                alignment: 'center'
                            },
                            {text: '续保至64岁，年交', style: 'tableHeader', alignment: 'center'},
                            {text: user.yiWaiHeJinTieBaoFei + '元', style: 'tableHeader', alignment: 'center'}
                        ],
                        [
                            {text: '附无忧住院医疗', style: 'tableHeader', alignment: 'center'},
                            {text: user.zhuYuanBaoE + '元', style: 'tableHeader', alignment: 'center'},
                            {text: '续保至64岁，年交', style: 'tableHeader', alignment: 'center'},
                            {text: user.zhuYuanBaoFei + '元', style: 'tableHeader', alignment: 'center'}
                        ],
                        [
                            {
                                text: '尊享300万医疗(' + user.baiWanYiliaoNanLing + '岁)',
                                style: 'tableHeader',
                                alignment: 'center'
                            },
                            {text: '50万元', style: 'tableHeader', alignment: 'center'},
                            {text: '续保至99岁，年交', style: 'tableHeader', alignment: 'center'},
                            {text: user.baiWanYiLiaoBaoFei + '元', style: 'tableHeader', alignment: 'center'}
                        ],
                    ]
                }
            },
            {
                columns: [
                    {
                        width: '75%', text: '保费合计：', alignment: 'right'
                    },
                    {
                        width: '25%', text: user.sum + '元', alignment: 'center'
                    },
                ]
            },
            {
                text: '我们提供的保障',
                style: 'tableHeader',
                fontSize: 20,
                alignment: 'center',
                bold: true,
                margin: [0, 10, 0, 0]
            },
            {
                columns: [
                    [
                        {
                            image: imagesBase64[1].base64,
                            width: 80,
                            margin: [10, 0, 0, 0]
                        },
                    ],
                    {
                        width: '87%',
                        margin: [0, 20, 0, 0],
                        text: 
                            itemDetail
                    },
                ]
            },
            {
                image: imagesBase64[2].base64,
                width: 450,
                margin: [50, 20, 50, 80]
            },
            {
                columns: [
                    [
                        {
                            image: imagesBase64[3].base64,
                            width: '120',
                        }
                    ],
                    {
                        width: '55%',
                        columns: [
                            [
                                {
                                    style: 'tableExample',
                                    fontSize: 11,
                                    table: {
                                        widths: ['*', '*'],
                                        body: [
                                            [
                                                {
                                                    text: '健康尊享百万医疗保障',
                                                    style: 'tableHeader',
                                                    alignment: 'center',
                                                    fillColor: '#FDE9D9'
                                                },
                                                {
                                                    text: '投保年龄：' + user.baiWanYiliaoNanLing + '岁',
                                                    style: 'tableHeader',
                                                    alignment: 'center',
                                                    fillColor: '#FDE9D9'
                                                },
                                            ],
                                            [
                                                {
                                                    text: '在二级以上医院发生疾病住院，意外住院，特殊门诊，经医保报销后按100%报销剩余合理费用(含进口自费药,自费项目,自费材料)，起付线1万元，若医保报销已满1万则无免赔额，若医保报销不足1万的部分需自付',
                                                    style: 'tableHeader',
                                                    alignment: 'center'
                                                },
                                                {
                                                    text: '\n\n\n前三年续保需人工核保满第三年起保证续保至99岁',
                                                    style: 'tableHeader',
                                                    alignment: 'center'
                                                },
                                            ]
                                        ]
                                    }
                                },
                                {text: '\n'},
                                {
                                    style: 'tableExample',
                                    fontSize: 11,
                                    table: {
                                        widths: ['*', '*'],
                                        body: [
                                            [
                                                {
                                                    text: '泰康健康尊享百万医疗保险保障计划表',
                                                    colSpan: 2,
                                                    style: 'tableHeader',
                                                    alignment: 'center',
                                                    fillColor: '#FDE9D9'
                                                },
                                                {},
                                            ],
                                            [
                                                {
                                                    text: '（以下所有金额均以人民币计算，单位为元）',
                                                    colSpan: 2,
                                                    style: 'tableHeader',
                                                    alignment: 'center'
                                                },
                                                {},
                                            ],
                                            [
                                                {
                                                    text: '\n保险区域',
                                                    style: 'tableHeader',
                                                    alignment: 'center'
                                                },
                                                {
                                                    text: '中国大陆，二级及以上社保定点医院（不含其附属特需医疗、国际医疗）',
                                                    style: 'tableHeader',
                                                    alignment: 'center'
                                                },
                                            ],
                                            [
                                                {
                                                    text: '年度报销额',
                                                    style: 'tableHeader',
                                                    alignment: 'center'
                                                },
                                                {text: '50万', style: 'tableHeader', alignment: 'center'},
                                            ],
                                            [
                                                {
                                                    text: '终身报销额',
                                                    style: 'tableHeader',
                                                    alignment: 'center'
                                                },
                                                {text: '300万', style: 'tableHeader', alignment: 'center'},
                                            ],
                                            [
                                                {
                                                    text: '年度基础免赔额(与医保共用)',
                                                    style: 'tableHeader',
                                                    alignment: 'center'
                                                },
                                                {text: '1万', style: 'tableHeader', alignment: 'center'},
                                            ],
                                            [
                                                {
                                                    text: '住院医疗报销保险金',
                                                    colSpan: 2,
                                                    style: 'tableHeader',
                                                    alignment: 'center',
                                                    fillColor: '#FDE9D9'
                                                },
                                                {},
                                            ],
                                            [
                                                {
                                                    text: '床位费,膳食费',
                                                    style: 'tableHeader',
                                                    alignment: 'center'
                                                },
                                                {text: '1,000/天', style: 'tableHeader', alignment: 'center'},
                                            ],
                                            [
                                                {
                                                    text: '重症监护室床位费',
                                                    style: 'tableHeader',
                                                    alignment: 'center'
                                                },
                                                {text: '不设单项限额', style: 'tableHeader', alignment: 'center'},
                                            ],
                                            [
                                                {
                                                    text: '药品费,材料费 ',
                                                    style: 'tableHeader',
                                                    alignment: 'center'
                                                },
                                                {text: '不设单项限额', style: 'tableHeader', alignment: 'center'},
                                            ],
                                            [
                                                {
                                                    text: '手术费用,器官移植费',
                                                    style: 'tableHeader',
                                                    alignment: 'center'
                                                },
                                                {text: '不设单项限额', style: 'tableHeader', alignment: 'center'},
                                            ],
                                            [
                                                {
                                                    text: '医生费（诊疗费）,治疗费',
                                                    style: 'tableHeader',
                                                    alignment: 'center'
                                                },
                                                {text: '不设单项限额', style: 'tableHeader', alignment: 'center'},
                                            ],
                                            [
                                                {
                                                    text: '检查化验费',
                                                    style: 'tableHeader',
                                                    alignment: 'center'
                                                },
                                                {text: '不设单项限额', style: 'tableHeader', alignment: 'center'},
                                            ],
                                            [
                                                {
                                                    text: '护理费',
                                                    style: 'tableHeader',
                                                    alignment: 'center'
                                                },
                                                {text: '不设单项限额', style: 'tableHeader', alignment: 'center'},
                                            ],
                                            [
                                                {
                                                    text: '特殊门诊医疗报销保险金',
                                                    colSpan: 2,
                                                    style: 'tableHeader',
                                                    alignment: 'center',
                                                    fillColor: '#FDE9D9'
                                                },
                                                {},
                                            ],
                                            [
                                                {
                                                    text: '门诊恶性肿瘤放化疗费',
                                                    style: 'tableHeader',
                                                    alignment: 'center'
                                                },
                                                {text: '10万/年', style: 'tableHeader', alignment: 'center'},
                                            ],
                                            [
                                                {
                                                    text: '门诊肾透析费',
                                                    style: 'tableHeader',
                                                    alignment: 'center'
                                                },
                                                {text: '10万/年', style: 'tableHeader', alignment: 'center'},
                                            ],
                                            [
                                                {
                                                    text: '器官移植后门诊抗排异治疗费',
                                                    style: 'tableHeader',
                                                    alignment: 'center'
                                                },
                                                {text: '不设单项限额', style: 'tableHeader', alignment: 'center'},
                                            ],
                                        ]
                                    }
                                },
                            ]
                        ],
                    },
                    [
                        {
                            image: imagesBase64[4].base64,
                            width: '120',
                        },
                    ],
                ]
            },
            {text: '\n\n附表：全能保42种重疾列表\n', fillColor: '#FDE9D9', bold: true, lineHeight: 1.8},

            {
                columns: [
                    {
                        width: 300,
                        text:
                        '1冠状动脉搭桥术(或称冠状动脉旁路移植术)\n' +
                        '2终末期肾病(或称慢性肾功能衰竭尿毒症期)\n' +
                        '3经输血导致的感染艾滋病病毒或者患艾滋病\n' +
                        '4系统性红斑狼疮并发重度的肾功能损害\n' +
                        '5重大器官移植术或造血干细胞移植术\n' +
                        '6侵蚀性葡萄胎（或称恶性葡萄胎）\n' +
                        '7急性出血坏死性胰腺炎开腹手术\n' +
                        '8脑炎后遗症或脑膜炎后遗症\n' +
                        '9慢性肝功能衰竭失代偿期\n' +
                        '10溶血性链球菌引起的坏疽\n' +
                        '11急性或亚急性重症肝炎\n' +
                        '12严重原发性肺动脉高压\n' +
                        '13重型再生障碍性贫血\n' +
                        '14严重类风湿性关节炎',
                        fontSize: 8,
                        lineHeight: 1.2

                    },
                    {
                        width: '*',
                        text:
                        '15严重阿尔茨海默病\n' +
                        '16严重运动神经元病\n' +
                        '17严重多发性硬化症\n' +
                        '18严重溃疡性结肠炎\n' +
                        '19严重I型糖尿病\n' +
                        '20持续植物人状态\n' +
                        '21急性心肌梗塞\n' +
                        '22脑中风后遗症\n' +
                        '23多个肢体缺失\n' +
                        '24心脏瓣膜手术\n' +
                        '25严重帕金森病\n' +
                        '26严重Ⅲ度烧伤\n' +
                        '27语言能力丧失\n' +
                        '28坏死性筋膜炎',
                        fontSize: 8,
                        lineHeight: 1.2

                    },
                    {
                        width: '*',
                        text:
                        '29系统性硬皮病\n' +
                        '30良性脑肿瘤\n' +
                        '31严重脑损伤\n' +
                        '32主动脉手术\n' +
                        '33严重心肌病\n' +
                        '34重症肌无力\n' +
                        '35终末期肺病\n' +
                        '36严重克隆病\n' +
                        '37恶性肿瘤\n' +
                        '38深度昏迷\n' +
                        '39双耳失聪\n' +
                        '40双目失明\n' +
                        '41颅脑手术\n' +
                        '42瘫痪',
                        fontSize: 8,
                        lineHeight: 1.2
                    }
                ]
            },
        ],
    };

    return docDefinition;
}

module.exports.definition = definition;
