import {test, expect, type Locator} from '@playwright/test';
import { MiscUtils } from '../utils/MiscUtils';
import { ExcelUtils } from '../utils/ExcelUtils';

test('Update Price with Excel operation @FileOpnUI',async({page}) => {
    const itemName: string = 'Orange';
    const newPrice: string = '500';
    const fileName: string = 'download.xlsx'
    const filePath: string = './downloads/'
    const fileDownloadFullPath: string = filePath+fileName;
    const miscUtils: MiscUtils = new MiscUtils();
    await miscUtils.checkAndDeleteFile(fileDownloadFullPath);
    await page.goto('https://rahulshettyacademy.com/upload-download-test/index.html');
    const downloadBtn: Locator = page.locator('#downloadButton');
    const browseInput: Locator = page.locator('#fileinput');
    const tableRows: Locator = page.locator('div[role="row"]');
    const downloadPromise: any = page.waitForEvent('download');
    await downloadBtn.click();
    const downloadedFile: any = await downloadPromise;
    await downloadedFile.saveAs(fileDownloadFullPath);
    const excelUtils: ExcelUtils = new ExcelUtils(fileDownloadFullPath,'Sheet1');
    await excelUtils.updatePriceForFruit(itemName,'price',newPrice);
    await browseInput.setInputFiles(fileDownloadFullPath);
    await page.getByText('Updated Excel Data Successfully.').waitFor({state: 'visible'});
    const rowCount: number = await tableRows.count();
    for(var i: number=1;i<=rowCount;i++){
        var fruitName: any = await tableRows.nth(i).locator('#cell-2-undefined').textContent();
        if( fruitName === itemName){
            await expect(tableRows.nth(i).locator('#cell-4-undefined')).toContainText(newPrice);
            break;
        }
    }
})
