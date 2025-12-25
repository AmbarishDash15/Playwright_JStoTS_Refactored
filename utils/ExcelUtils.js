const {expect} = require('@playwright/test');
const ExcelJS = require('exceljs');

class ExcelUtils{
    constructor(excelFilePath,sheetName){
        this.filePath = excelFilePath;
        this.sheetName = sheetName;
        this.rowNum = -1;
        this.colNum = -1;
    }
    async updatePriceForFruit(fruitName,colToFetch,newPrice){
        var cellRowCol = {row:-1,col:-1};
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.readFile(this.filePath);
        const worksheet = workbook.getWorksheet(this.sheetName);
        await this.readExcelToGetColNum(worksheet,colToFetch);
        await this.readExcelToGetRowNum(worksheet,fruitName);
        cellRowCol.col = this.colNum;
        cellRowCol.row = this.rowNum;
        const cellToUpdate = await worksheet.getCell(cellRowCol.row,cellRowCol.col);
        cellToUpdate.value = newPrice;
        await workbook.xlsx.writeFile(this.filePath);
    }
    async readExcelToGetColNum(worksheet,colToFetch){
        worksheet.eachRow((row,rowNumber) => {
            row.eachCell((cell,colNumber) => {
                if(cell.value === colToFetch){
                    this.colNum = colNumber;
                }
            })
        })
    }
    async readExcelToGetRowNum(worksheet,fruitName){
        worksheet.eachRow((row,rowNumber) => {
            row.eachCell((cell,colNumber) => {
                if(cell.value === fruitName){
                    this.rowNum = rowNumber;
                }
            })
        })
    }
}
module.exports = {ExcelUtils};