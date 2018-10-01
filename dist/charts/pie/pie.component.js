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
let PieComponent = class PieComponent {
    constructor(zone, chartUtils) {
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
        this.chartClick = (event) => {
            this.clickOutput.emit(event);
        };
    }
    ngOnInit() {
        this.pieChart = this.getPieChart(this.series);
        if (this.innerSize > 0) {
            this.series['innerSize'] = this.innerSize;
        }
    }
    getPieChart(series) {
        let renderTo = document.getElementById(this.pieId);
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
    }
    redrawChart(isReflow) {
        if (isReflow) {
            this.pieChart.ref.reflow();
        }
        else {
            this.pieChart = this.getPieChart(this.series);
        }
    }
    ngOnChanges(changes) {
        if (changes['series'] && !changes['series'].firstChange) {
            this.zone.run(() => {
                this.pieChart = this.getPieChart(changes['series'].currentValue);
            });
        }
    }
    convertPoint(a) {
    }
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
        template: `<div [chart]="pieChart" class="pieHolder" id="{{pieId}}"></div>`
    }),
    __metadata("design:paramtypes", [NgZone,
        ChartUtils])
], PieComponent);
export { PieComponent };
