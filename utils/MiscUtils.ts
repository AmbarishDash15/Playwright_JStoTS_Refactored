import {expect} from '@playwright/test';
import * as fs from 'fs/promises';

export class MiscUtils {
    constructor() {
    }
    async checkAndDeleteFile(path: string){
        try {
            if(await fs.stat(path)){
                await fs.unlink(path);
                await expect(fs.stat(path)).rejects.toHaveProperty('code', 'ENOENT');
            }
        }
        catch (err: any) {
            if (err.code != 'ENOENT') {
                console.error('Error deleting the file:', err);
            }
        }
    }
}