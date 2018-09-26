var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { LineComponent, PieComponent, WordCloudComponent } from "./charts";
import { ChartModule, HIGHCHARTS_MODULES } from 'angular-highcharts';
import * as more from 'highcharts/highcharts-more.src';
import * as exporting from 'highcharts/modules/exporting.src';
import * as wordcloud from 'highcharts/modules/wordcloud.src';
export function highchartsModules() {
    return [more, exporting, wordcloud];
}
var DashComponentsModule = (function () {
    function DashComponentsModule() {
    }
    DashComponentsModule = __decorate([
        NgModule({
            declarations: [
                LineComponent,
                PieComponent,
                WordCloudComponent,
            ],
            imports: [
                ChartModule
            ],
            exports: [
                LineComponent,
                PieComponent,
                WordCloudComponent
            ],
            providers: [
                { provide: HIGHCHARTS_MODULES, useFactory: highchartsModules }
            ]
        })
    ], DashComponentsModule);
    return DashComponentsModule;
}());
export { DashComponentsModule };
//# sourceMappingURL=dash-components.module.js.map