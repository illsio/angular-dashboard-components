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
var PieComponent = (function () {
    function PieComponent(zone) {
        var _this = this;
        this.zone = zone;
        this.chartTitle = '';
        this.clickOutput = new core_1.EventEmitter();
        this.chartClick = function (event) {
            _this.clickOutput.emit(event);
        };
    }
    PieComponent.prototype.ngOnInit = function () {
        this.pieChart = this.getPieChart(this.series);
    };
    PieComponent.prototype.getPieChart = function (series) {
        return new angular_highcharts_1.Chart({
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: this.chartTitle
            },
            credits: {
                enabled: false
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %'
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
        core_1.Input(),
        __metadata("design:type", Object)
    ], PieComponent.prototype, "chartTitle", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], PieComponent.prototype, "series", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], PieComponent.prototype, "clickOutput", void 0);
    PieComponent = __decorate([
        core_1.Component({
            selector: 'dash-pie',
            styles: [
                '.pieHolder {}'
            ],
            template: "<div [chart]=\"pieChart\"  class=\"pieHolder\"></div>"
        }),
        __metadata("design:paramtypes", [core_1.NgZone])
    ], PieComponent);
    return PieComponent;
}());
exports.PieComponent = PieComponent;
//# sourceMappingURL=pie.component.js.map