var fs = require('fs');
var doc = require('./docDefine');

 async function createPDF (user,fileName) {
     console.log(__dirname);
    var fonts = {
        Roboto: {
            normal: 'Roboto-Regular.ttf',
            bold: 'Roboto-Medium.ttf',
            italics: 'Roboto-Italic.ttf',
            bolditalics: 'Roboto-Italic.ttf'
        },
        微软雅黑: {
            normal: __dirname + '/../fonts/微软雅黑.ttf',
            bold: __dirname + '/../fonts/微软雅黑.ttf',
            italics: __dirname + '/../fonts/微软雅黑.ttf',
            bolditalics: __dirname + '/.. /fonts/微软雅黑.ttf'
        },
        DengXi: {
            normal: __dirname + '/.. /fonts/Deng.ttf',
            bold: __dirname + '/.. /fonts/Dengb.ttf',
            italics: __dirname + '/.. /fonts/Dengl.ttf',
            bolditalics: __dirname + '/.. /fonts/微软雅黑.ttf'
        }
    };


    var PdfPrinter = require('pdfmake');
    var printer = new PdfPrinter(fonts);

// var base64 = require('base64-stream');


    var docDefinition = doc.definition(user);


    var pdfDoc = printer.createPdfKitDocument(docDefinition);

    var promise = new Promise(resolve => pdfDoc
        .pipe(fs.createWriteStream(__dirname + '/../pdfs/'+ fileName +'.pdf'))
        .on('finish', resolve));
    console.log('write')
    pdfDoc.end();
    return await promise;
}
module.exports=createPDF;