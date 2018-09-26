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
var PieComponent = (function () {
    function PieComponent(zone, chartUtils) {
        var _this = this;
        this.zone = zone;
        this.chartUtils = chartUtils;
        this.pieId = '';
        this.chartTitle = '';
        this.chartSubTitle = '';
        this.chartTitleAlign = 'center';
        this.isShowLabels = true;
        this.isPercentageLabel = true;
        this.isNoDecimalPlace = false;
        this.dataLabelDistance = 30;
        this.isExport = true;
        this.innerSize = 0;
        this.clickOutput = new EventEmitter();
        this.chartClick = function (event) {
            _this.clickOutput.emit(event);
        };
    }
    PieComponent.prototype.ngOnInit = function () {
        this.pieChart = this.getPieChart(this.series);
        if (this.innerSize > 0) {
            this.series['innerSize'] = this.innerSize;
        }
    };
    PieComponent.prototype.getPieChart = function (series) {
        var renderTo = document.getElementById(this.pieId) ? document.getElementById(this.pieId) : new HTMLElement();
        return new Chart({
            chart: {
                plotBackgroundColor: undefined,
                plotBorderWidth: undefined,
                plotShadow: false,
                type: 'pie',
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
            credits: {
                enabled: false
            },
            plotOptions: {
                pie: {
                    center: ['50%', '50%'],
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: this.isShowLabels,
                        format: this.isPercentageLabel ? '<b>{point.name}</b>: {point.percentage:.1f} %'
                            : this.isNoDecimalPlace ? '<b>{point.name}</b>: {point.y:.0f}' : '<b>{point.name}</b>: {point.y:.2f}',
                        distance: this.dataLabelDistance,
                    },
                },
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
    PieComponent.prototype.redrawChart = function (isReflow) {
        if (isReflow) {
            this.pieChart.ref.reflow();
        }
        else {
            this.pieChart = this.getPieChart(this.series);
        }
    };
    PieComponent.prototype.ngOnChanges = function (changes) {
        var _this = this;
        if (changes['series'] && !changes['series'].firstChange) {
            this.zone.run(function () {
                _this.pieChart = _this.getPieChart(changes['series'].currentValue);
            });
        }
    };
    PieComponent.prototype.convertPoint = function (a) {
    };
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], PieComponent.prototype, "pieId", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], PieComponent.prototype, "chartTitle", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], PieComponent.prototype, "chartSubTitle", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], PieComponent.prototype, "chartTitleAlign", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], PieComponent.prototype, "isShowLabels", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], PieComponent.prototype, "isPercentageLabel", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], PieComponent.prototype, "isNoDecimalPlace", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], PieComponent.prototype, "dataLabelDistance", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], PieComponent.prototype, "isExport", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], PieComponent.prototype, "innerSize", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], PieComponent.prototype, "series", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], PieComponent.prototype, "clickOutput", void 0);
    PieComponent = __decorate([
        Component({
            selector: 'dash-pie',
            styles: [
                '.pieHolder {height: 100%}'
            ],
            template: "<div [chart]=\"pieChart\" class=\"pieHolder\" id=\"{{pieId}}\"></div>"
        }),
        __metadata("design:paramtypes", [NgZone,
            ChartUtils])
    ], PieComponent);
    return PieComponent;
}());
export { PieComponent };
//# sourceMappingURL=pie.component.js.map