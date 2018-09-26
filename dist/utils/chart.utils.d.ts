export declare class ChartUtils {
    constructor();
    getCountData(data: Object[], seriesIdent: string[]): {};
    getSumData(data: Object[], seriesIdent: string[], dataIdent: any): {};
    getMinData(data: Object[], seriesIdent: string[], dataIdent: any): {};
    getMaxData(data: Object[], seriesIdent: string[], dataIdent: any): {};
    getSeriesData(data: Object[], seriesIdent: string, dataIdent: any, seriesPointIdent: any, seriesPointElements: string[], highlight?: string): {};
    private getDataByFunction(data, seriesIdent, calcFunction, dataIdentity?);
    getUniqueSeriesNames(data: Object[], seriesIdent: string[]): any[];
    private getElementNameAtLevel(seriesIdent, obj);
    concatAllElements(textArr: string[]): string;
    capitalize(value: any): string;
}
