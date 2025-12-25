const {expect} = require('@playwright/test');
import * as fs from 'fs/promises';
const ExcelJS = require('exceljs');

class MiscUtils {
    constructor() {
    }
    async checkAndDeleteFile(path){
        try {
            if(await fs.stat(path)){
                await fs.unlink(path);
                await expect(fs.stat(path)).rejects.toHaveProperty('code', 'ENOENT');
            }
        }
        catch (err) {
            if (err.code === 'ENOENT') {
                console.log('File does not exist, skipping deletion.');
            }
            else {
                console.error('Error deleting the file:', err);
            }
        }
    }
}


module.exports = {MiscUtils};