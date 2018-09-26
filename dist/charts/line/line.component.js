var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, EventEmitter, Input, NgZone, Output } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { ChartUtils } from '../../utils/chart.utils';
var LineComponent = (function () {
    function LineComponent(zone, chartUtils) {
        var _this = this;
        this.zone = zone;
        this.chartUtils = chartUtils;
        this.lineId = '';
        this.chartTitle = '';
        this.chartSubTitle = '';
        this.chartTitleAlign = 'center';
        this.chartType = 'line';
        this.yTitle = '';
        this.xTitle = '';
        this.isShowYAxis = true;
        this.pointStart = null;
        this.legendEnabled = true;
        this.isColorByPoint = false;
        this.isExport = true;
        this.isNoGridLines = false;
        this.xCategories = [];
        this.clickOutput = new EventEmitter();
        this.chartClick = function (event) {
            _this.clickOutput.emit(event);
        };
    }
    LineComponent.prototype.ngOnInit = function () {
        this.lineChart = this.getLineChart(this.series, this.xCategories);
    };
    LineComponent.prototype.ngAfterViewChecked = function () {
    };
    LineComponent.prototype.getLineChart = function (series, categories) {
        series['colorByPoint'] = this.isColorByPoint;
        var data = (series instanceof Array ? series : [series]);
        var renderTo = document.getElementById(this.lineId);
        return new Chart({
            chart: {
                plotBackgroundColor: undefined,
                plotBorderWidth: undefined,
                plotShadow: false,
                type: this.chartType,
                renderTo: renderTo
            },
            exporting: {
                enabled: this.isExport,
                buttons: {
                    contextButton: {
                        enabled: true
                    },
                },
            },
            title: {
                text: this.chartTitle,
                align: this.chartTitleAlign
            },
            subtitle: {
                text: this.chartSubTitle
            },
            tooltip: {
                pointFormat: this.chartUtils.capitalize(series) + ': <b>{point.y}</b>'
            },
            yAxis: {
                visible: this.isShowYAxis,
                title: {
                    text: this.yTitle
                },
                gridLineWidth: this.isNoGridLines ? 0 : 1,
                lineWidth: this.isNoGridLines ? 0 : 1,
                plotLines: [{
                        color: '#FF0000',
                        width: this.plotLineValue ? 2 : 0,
                        value: this.plotLineValue ? this.plotLineValue : null
                    }]
            },
            xAxis: {
                categories: categories,
                title: {
                    text: this.yTitle
                },
                labels: {
                    autoRotationLimit: 0
                },
                tickWidth: this.isNoGridLines ? 0 : 1,
                lineWidth: this.isNoGridLines ? 0 : 1
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
            series: data
        });
    };
    LineComponent.prototype.redrawChart = function (isReflow) {
        if (isReflow) {
            this.lineChart.ref.reflow();
        }
        else {
            this.lineChart = this.getLineChart(this.series, this.xCategories);
        }
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
        Input(),
        __metadata("design:type", String)
    ], LineComponent.prototype, "lineId", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], LineComponent.prototype, "chartTitle", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], LineComponent.prototype, "chartSubTitle", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], LineComponent.prototype, "chartTitleAlign", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], LineComponent.prototype, "chartType", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], LineComponent.prototype, "yTitle", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], LineComponent.prototype, "xTitle", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], LineComponent.prototype, "isShowYAxis", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], LineComponent.prototype, "pointStart", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], LineComponent.prototype, "legendEnabled", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], LineComponent.prototype, "isColorByPoint", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], LineComponent.prototype, "isExport", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], LineComponent.prototype, "plotLineValue", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], LineComponent.prototype, "isNoGridLines", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], LineComponent.prototype, "xCategories", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], LineComponent.prototype, "series", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], LineComponent.prototype, "clickOutput", void 0);
    LineComponent = __decorate([
        Component({
            selector: 'dash-line',
            styles: [
                '.lineHolder {height: 100%}'
            ],
            template: "<div [chart]=\"lineChart\" class=\"lineHolder\"  id=\"{{lineId}}\"></div>"
        }),
        __metadata("design:paramtypes", [NgZone,
            ChartUtils])
    ], LineComponent);
    return LineComponent;
}());
export { LineComponent };
//# sourceMappingURL=line.component.js.map