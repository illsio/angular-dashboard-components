CSL Angular Highcharts Module
========

Created 25.04.2018

- This Module holds different dashboard components for the use in different projects. 

- Before pushing new changes to the library install typescript globally and call 'tsc -p tsconfig.json'.
This will build the /lib folder.

- For usage in other projects:
    * in the package.json: 
        + "angular-dashboard-components": "git+ssh://git@csl-intern.local.hcu-hamburg.de:till.degkwitz/angular-dashboard-components.git"
    * in the app.module:
        + import {ChartModule, HIGHCHARTS_MODULES} from 'angular-highcharts';
        + import * as more from 'highcharts/highcharts-more.src';
        + import * as exporting from 'highcharts/modules/exporting.src';
        + import * as wordcloud from 'highcharts/modules/wordcloud.src';
        + imports [.., ChartModule, ..]
        + providers [.., {provide: HIGHCHARTS_MODULES, useFactory: highchartsModules }, ..]
        
    

 TODO: Sollte wohl zum Modul umgebaut werden, dass es analog zu Libs wie '@angular/material' verwendet werden kann.
 Derzeit werden die Komponenten einzeln als Pfad referenziert.