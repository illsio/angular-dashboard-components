"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var data_function_enum_1 = require("../enum/data-function.enum");
var ChartUtils = (function () {
    function ChartUtils() {
    }
    ChartUtils.prototype.getCountData = function (data, seriesIdent) {
        return this.getDataByFunction(data, seriesIdent, data_function_enum_1.DataFunctionEnum.COUNT);
    };
    ChartUtils.prototype.getSumData = function (data, seriesIdent, dataIdent) {
        return this.getDataByFunction(data, seriesIdent, data_function_enum_1.DataFunctionEnum.SUM, dataIdent);
    };
    ChartUtils.prototype.getMinData = function (data, seriesIdent, dataIdent) {
        return this.getDataByFunction(data, seriesIdent, data_function_enum_1.DataFunctionEnum.MINIMUM, dataIdent);
    };
    ChartUtils.prototype.getMaxData = function (data, seriesIdent, dataIdent) {
        return this.getDataByFunction(data, seriesIdent, data_function_enum_1.DataFunctionEnum.MAXIMUM, dataIdent);
    };
    ChartUtils.prototype.getSeriesData = function (data, seriesIdent, dataIdent, seriesPointIdent, seriesPointElements, highlight) {
        var dataArray = [];
        var seriesNames = this.getUniqueSeriesNames(data, [seriesIdent]);
        for (var _i = 0, seriesNames_1 = seriesNames; _i < seriesNames_1.length; _i++) {
            var uniqueName = seriesNames_1[_i];
            var series = { name: uniqueName };
            var seriesData = [];
            for (var _a = 0, seriesPointElements_1 = seriesPointElements; _a < seriesPointElements_1.length; _a++) {
                var seriesPoint = seriesPointElements_1[_a];
                var found = true;
                for (var _b = 0, data_1 = data; _b < data_1.length; _b++) {
                    var obj = data_1[_b];
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
            var newDataArray = {};
            newDataArray["data"] = dataArray;
            newDataArray["name"] = [seriesIdent];
            return newDataArray;
        }
        else {
            return dataArray;
        }
    };
    ChartUtils.prototype.getDataByFunction = function (data, seriesIdent, calcFunction, dataIdentity) {
        var dataArray = {};
        dataArray['name'] = seriesIdent;
        var seriesCollection = [];
        var seriesNames = this.getUniqueSeriesNames(data, seriesIdent);
        var ident = dataIdentity ? dataIdentity : '';
        for (var _i = 0, seriesNames_2 = seriesNames; _i < seriesNames_2.length; _i++) {
            var uniqueName = seriesNames_2[_i];
            var series = { name: uniqueName };
            var dataFunction = 0;
            for (var _a = 0, data_2 = data; _a < data_2.length; _a++) {
                var obj = data_2[_a];
                if (this.getElementNameAtLevel(seriesIdent, obj) === uniqueName) {
                    var dataElement = Number(obj[ident]);
                    if (calcFunction === data_function_enum_1.DataFunctionEnum.COUNT ||
                        calcFunction === data_function_enum_1.DataFunctionEnum.SUM) {
                        if (!dataFunction) {
                            dataFunction = 0;
                        }
                    }
                    if (calcFunction === data_function_enum_1.DataFunctionEnum.COUNT) {
                        dataFunction++;
                    }
                    else if (calcFunction === data_function_enum_1.DataFunctionEnum.SUM) {
                        dataFunction = dataFunction + dataElement;
                    }
                    else if (calcFunction === data_function_enum_1.DataFunctionEnum.MAXIMUM) {
                        if (!dataFunction) {
                            dataFunction = dataElement;
                        }
                        else {
                            dataFunction = dataElement > dataFunction ? dataElement : dataFunction;
                        }
                    }
                    else if (calcFunction === data_function_enum_1.DataFunctionEnum.MINIMUM) {
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
    };
    ChartUtils.prototype.getUniqueSeriesNames = function (data, seriesIdent) {
        var seriesNames = [];
        for (var _i = 0, data_3 = data; _i < data_3.length; _i++) {
            var obj = data_3[_i];
            var currentSeriesName = this.getElementNameAtLevel(seriesIdent, obj);
            if (seriesNames.indexOf(currentSeriesName) === -1) {
                seriesNames.push(currentSeriesName);
            }
        }
        return seriesNames;
    };
    ChartUtils.prototype.getElementNameAtLevel = function (seriesIdent, obj) {
        var latestElement;
        for (var _i = 0, seriesIdent_1 = seriesIdent; _i < seriesIdent_1.length; _i++) {
            var sIdent = seriesIdent_1[_i];
            latestElement = latestElement ? latestElement : obj;
            if (latestElement[sIdent] instanceof Array) {
                latestElement = latestElement[sIdent][0];
            }
            else {
                latestElement = latestElement[sIdent];
            }
        }
        var currentSeriesName = latestElement;
        return currentSeriesName;
    };
    ChartUtils.prototype.concatAllElements = function (textArr) {
        var concatenated = '';
        for (var _i = 0, textArr_1 = textArr; _i < textArr_1.length; _i++) {
            var text = textArr_1[_i];
            concatenated = concatenated.concat(' ' + text);
        }
        return concatenated;
    };
    ChartUtils.prototype.capitalize = function (value) {
        var string = '';
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
    };
    return ChartUtils;
}());
exports.ChartUtils = ChartUtils;
//# sourceMappingURL=chart.utils.js.map