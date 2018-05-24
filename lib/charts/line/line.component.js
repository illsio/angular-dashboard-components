"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var angular_highcharts_1 = require("angular-highcharts");
var more = require("highcharts/highcharts-more.src");
var exporting = require("highcharts/modules/exporting.src");
var wordcloud = require("highcharts/modules/wordcloud.src");
function highchartsModules() {
    return [more, exporting, wordcloud];
}
exports.highchartsModules = highchartsModules;
var LineComponent = (function () {
    function LineComponent(zone) {
        var _this = this;
        this.zone = zone;
        this.chartTitle = '';
        this.chartType = '';
        this.yTitle = '';
        this.xTitle = '';
        this.legendEnabled = true;
        this.xCategories = [];
        this.clickOutput = new core_1.EventEmitter();
        this.chartClick = function (event) {
            _this.clickOutput.emit(event);
        };
    }
    LineComponent.prototype.ngOnInit = function () {
        this.lineChart = this.getLineChart(this.series, this.xCategories);
    };
    LineComponent.prototype.getLineChart = function (series, categories) {
        return new angular_highcharts_1.Chart({
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: this.chartType
            },
            exporting: {
                enabled: true,
                buttons: {
                    contextButton: {
                        enabled: true
                    },
                },
            },
            title: {
                text: this.chartTitle
            },
            yAxis: {
                title: {
                    text: this.yTitle
                }
            },
            xAxis: {
                categories: categories,
                title: {
                    text: this.yTitle
                }
            },
            legend: {
                enabled: this.legendEnabled,
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle'
            },
            credits: {
                enabled: false
            },
            plotOptions: {
                series: {
                    cursor: 'pointer',
                    events: {
                        click: this.chartClick,
                    },
                },
            },
            series: [series]
        });
    };
    LineComponent.prototype.ngOnChanges = function (changes) {
        var _this = this;
        if (changes['series'] && !changes['series'].firstChange) {
            this.zone.run(function () {
                _this.lineChart = _this.getLineChart(changes['series'].currentValue, _this.xCategories);
            });
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], LineComponent.prototype, "chartTitle", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], LineComponent.prototype, "chartType", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], LineComponent.prototype, "yTitle", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], LineComponent.prototype, "xTitle", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], LineComponent.prototype, "legendEnabled", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], LineComponent.prototype, "xCategories", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], LineComponent.prototype, "series", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], LineComponent.prototype, "clickOutput", void 0);
    LineComponent = __decorate([
        core_1.Component({
            selector: 'dash-line',
            styles: [
                '.lineHolder {}'
            ],
            template: "<div [chart]=\"lineChart\" class=\"lineHolder\"></div>"
        }),
        __metadata("design:paramtypes", [core_1.NgZone])
    ], LineComponent);
    return LineComponent;
}());
exports.LineComponent = LineComponent;
//# sourceMappingURL=line.component.js.map