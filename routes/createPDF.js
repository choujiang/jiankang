var fs = require('fs');
var doc = require('./docDefine');

 async function createPDF (user,fileName) {
    var fonts = {
        Roboto: {
            normal: 'Roboto-Regular.ttf',
            bold: 'Roboto-Medium.ttf',
            italics: 'Roboto-Italic.ttf',
            bolditalics: 'Roboto-Italic.ttf'
        },
        微软雅黑: {
            normal: 'fonts/微软雅黑.ttf',
            bold: 'fonts/微软雅黑.ttf',
            italics: 'fonts/微软雅黑.ttf',
            bolditalics: 'fonts/微软雅黑.ttf'
        },
        DengXi: {
            normal: 'fonts/Deng.ttf',
            bold: 'fonts/Dengb.ttf',
            italics: 'fonts/Dengl.ttf',
            bolditalics: 'fonts/微软雅黑.ttf'
        }
    };


    var PdfPrinter = require('pdfmake');
    var printer = new PdfPrinter(fonts);

// var base64 = require('base64-stream');


    var docDefinition = doc.definition(user);


    var pdfDoc = printer.createPdfKitDocument(docDefinition);

    var promise = new Promise(resolve => pdfDoc
        .pipe(fs.createWriteStream('pdfs/'+ fileName +'.pdf'))
        .on('finish', resolve));
    console.log('write')
    pdfDoc.end();
    return await promise;
}
module.exports=createPDF;