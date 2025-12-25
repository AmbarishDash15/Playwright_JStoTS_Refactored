import {expect} from '@playwright/test';
import * as ExcelJS from 'exceljs';

export class ExcelUtils{
    readonly filePath: string;
    readonly sheetName: any;
    rowNum: number;
    colNum: number;
    constructor(excelFilePath: string,sheetName: any){
        this.filePath = excelFilePath;
        this.sheetName = sheetName;
        this.rowNum = -1;
        this.colNum = -1;
    }
    async updatePriceForFruit(fruitName: string,colToFetch: string,newPrice: string){
        interface CellRowCol {row: number; col: number;};
        var cellRowCol: CellRowCol = {row:-1,col:-1};
        const workbook: any = new ExcelJS.Workbook();
        await workbook.xlsx.readFile(this.filePath);
        const worksheet: any = workbook.getWorksheet(this.sheetName);
        await this.readExcelToGetColNum(worksheet,colToFetch);
        await this.readExcelToGetRowNum(worksheet,fruitName);
        cellRowCol.col = this.colNum;
        cellRowCol.row = this.rowNum;
        const cellToUpdate: any = await worksheet.getCell(cellRowCol.row,cellRowCol.col);
        cellToUpdate.value = newPrice;
        await workbook.xlsx.writeFile(this.filePath);
    }
    async readExcelToGetColNum(worksheet: any,colToFetch: string){
        worksheet.eachRow((row: any,rowNumber: number) => {
            row.eachCell((cell: any,colNumber: number) => {
                if(cell.value === colToFetch){
                    this.colNum = colNumber;
                }
            })
        })
    }
    async readExcelToGetRowNum(worksheet: any,fruitName: string){
        worksheet.eachRow((row: any,rowNumber: number) => {
            row.eachCell((cell: any,colNumber: number) => {
                if(cell.value === fruitName){
                    this.rowNum = rowNumber;
                }
            })
        })
    }
}