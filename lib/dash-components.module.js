"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var charts_1 = require("./charts");
var angular_highcharts_1 = require("angular-highcharts");
var more = require("highcharts/highcharts-more.src");
var exporting = require("highcharts/modules/exporting.src");
var wordcloud = require("highcharts/modules/wordcloud.src");
function highchartsModules() {
    return [more, exporting, wordcloud];
}
exports.highchartsModules = highchartsModules;
var AmazingModule = (function () {
    function AmazingModule() {
    }
    AmazingModule = __decorate([
        core_1.NgModule({
            declarations: [
                charts_1.LineComponent,
                charts_1.PieComponent,
                charts_1.WordCloudComponent
            ],
            imports: [
                angular_highcharts_1.ChartModule
            ],
            exports: [
                charts_1.LineComponent,
                charts_1.PieComponent,
                charts_1.WordCloudComponent
            ],
            providers: [
                { provide: angular_highcharts_1.HIGHCHARTS_MODULES, useFactory: highchartsModules }
            ]
        })
    ], AmazingModule);
    return AmazingModule;
}());
exports.AmazingModule = AmazingModule;
//# sourceMappingURL=dash-components.module.js.map