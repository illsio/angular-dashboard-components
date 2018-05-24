import { NgModule } from '@angular/core';
import {LineComponent, PieComponent, WordCloudComponent} from "./charts";

import {ChartModule, HIGHCHARTS_MODULES} from 'angular-highcharts';
import * as more from 'highcharts/highcharts-more.src';
import * as exporting from 'highcharts/modules/exporting.src';
import * as wordcloud from 'highcharts/modules/wordcloud.src';

export function highchartsModules() {
  return [ more, exporting, wordcloud];
}

@NgModule({
    declarations: [
        LineComponent,
        PieComponent,
        WordCloudComponent
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
        {provide: HIGHCHARTS_MODULES, useFactory: highchartsModules }
    ]
})
export class DashComponentsModule {}