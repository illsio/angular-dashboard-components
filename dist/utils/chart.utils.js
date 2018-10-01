import { DataFunctionEnum } from "../enum/data-function.enum";
export class ChartUtils {
    constructor() {
    }
    getCountData(data, seriesIdent) {
        return this.getDataByFunction(data, seriesIdent, DataFunctionEnum.COUNT);
    }
    getSumData(data, seriesIdent, dataIdent) {
        return this.getDataByFunction(data, seriesIdent, DataFunctionEnum.SUM, dataIdent);
    }
    getMinData(data, seriesIdent, dataIdent) {
        return this.getDataByFunction(data, seriesIdent, DataFunctionEnum.MINIMUM, dataIdent);
    }
    getMaxData(data, seriesIdent, dataIdent) {
        return this.getDataByFunction(data, seriesIdent, DataFunctionEnum.MAXIMUM, dataIdent);
    }
    getSeriesData(data, seriesIdent, dataIdent, seriesPointIdent, seriesPointElements, highlight) {
        let dataArray = [];
        let seriesNames = this.getUniqueSeriesNames(data, [seriesIdent]);
        for (let uniqueName of seriesNames) {
            let series = { name: uniqueName };
            let seriesData = [];
            for (let seriesPoint of seriesPointElements) {
                let found = true;
                for (let obj of data) {
                    if (obj[seriesPointIdent] === seriesPoint &&
                        this.getElementNameAtLevel([seriesIdent], obj) === uniqueName) {
                        seriesData.push(Number(obj[dataIdent]));
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    seriesData.push(null);
                }
            }
            if (series.name == highlight) {
                series["color"] = '#434348';
            }
            if (seriesPointElements.length == 1) {
                series["y"] = seriesData[0];
            }
            else {
                series["data"] = seriesData;
            }
            dataArray.push(series);
        }
        if (seriesPointElements.length == 1) {
            let newDataArray = {};
            newDataArray["data"] = dataArray;
            newDataArray["name"] = [seriesIdent];
            return newDataArray;
        }
        else {
            return dataArray;
        }
    }
    getDataByFunction(data, seriesIdent, calcFunction, dataIdentity) {
        let dataArray = {};
        dataArray['name'] = seriesIdent;
        let seriesCollection = [];
        let seriesNames = this.getUniqueSeriesNames(data, seriesIdent);
        const ident = dataIdentity ? dataIdentity : '';
        for (let uniqueName of seriesNames) {
            let series = { name: uniqueName };
            let dataFunction = 0;
            for (let obj of data) {
                if (this.getElementNameAtLevel(seriesIdent, obj) === uniqueName) {
                    let dataElement = Number(obj[ident]);
                    if (calcFunction === DataFunctionEnum.COUNT ||
                        calcFunction === DataFunctionEnum.SUM) {
                        if (!dataFunction) {
                            dataFunction = 0;
                        }
                    }
                    if (calcFunction === DataFunctionEnum.COUNT) {
                        dataFunction++;
                    }
                    else if (calcFunction === DataFunctionEnum.SUM) {
                        dataFunction = dataFunction + dataElement;
                    }
                    else if (calcFunction === DataFunctionEnum.MAXIMUM) {
                        if (!dataFunction) {
                            dataFunction = dataElement;
                        }
                        else {
                            dataFunction = dataElement > dataFunction ? dataElement : dataFunction;
                        }
                    }
                    else if (calcFunction === DataFunctionEnum.MINIMUM) {
                        if (!dataFunction) {
                            dataFunction = dataElement;
                        }
                        else {
                            dataFunction = dataElement < dataFunction ? dataElement : dataFunction;
                        }
                    }
                }
            }
            series['y'] = dataFunction;
            seriesCollection.push(series);
        }
        dataArray['data'] = seriesCollection;
        return dataArray;
    }
    getUniqueSeriesNames(data, seriesIdent) {
        let seriesNames = [];
        for (let obj of data) {
            let currentSeriesName = this.getElementNameAtLevel(seriesIdent, obj);
            if (seriesNames.indexOf(currentSeriesName) === -1) {
                seriesNames.push(currentSeriesName);
            }
        }
        return seriesNames;
    }
    getElementNameAtLevel(seriesIdent, obj) {
        let latestElement;
        for (let sIdent of seriesIdent) {
            latestElement = latestElement ? latestElement : obj;
            if (latestElement[sIdent] instanceof Array) {
                latestElement = latestElement[sIdent][0];
            }
            else {
                latestElement = latestElement[sIdent];
            }
        }
        let currentSeriesName = latestElement;
        return currentSeriesName;
    }
    concatAllElements(textArr) {
        let concatenated = '';
        for (let text of textArr) {
            concatenated = concatenated.concat(' ' + text);
        }
        return concatenated;
    }
    capitalize(value) {
        let string = '';
        if (value instanceof Array) {
            string = value[0].name;
        }
        else if (typeof value === 'object') {
            string = value.name[0];
        }
        else {
            string = value.name;
        }
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
}
