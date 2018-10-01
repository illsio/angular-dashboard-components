System.register(["@angular/core", "./charts", "angular-highcharts", "highcharts/highcharts-more.src", "highcharts/modules/exporting.src", "highcharts/modules/wordcloud.src"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __moduleName = context_1 && context_1.id;
    function highchartsModules() {
        return [more, exporting, wordcloud];
    }
    exports_1("highchartsModules", highchartsModules);
    var core_1, charts_1, angular_highcharts_1, more, exporting, wordcloud, DashComponentsModule;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (charts_1_1) {
                charts_1 = charts_1_1;
            },
            function (angular_highcharts_1_1) {
                angular_highcharts_1 = angular_highcharts_1_1;
            },
            function (more_1) {
                more = more_1;
            },
            function (exporting_1) {
                exporting = exporting_1;
            },
            function (wordcloud_1) {
                wordcloud = wordcloud_1;
            }
        ],
        execute: function () {
            DashComponentsModule = (function () {
                function DashComponentsModule() {
                }
                DashComponentsModule = __decorate([
                    core_1.NgModule({
                        declarations: [
                            charts_1.LineComponent,
                            charts_1.PieComponent,
                            charts_1.WordCloudComponent,
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
                ], DashComponentsModule);
                return DashComponentsModule;
            }());
            exports_1("DashComponentsModule", DashComponentsModule);
        }
    };
});
//# sourceMappingURL=dash-components.module.js.map