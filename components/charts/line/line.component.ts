import {Component, EventEmitter, Input, NgZone, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Chart} from 'angular-highcharts';

@Component({
    selector: 'dash-line',
    styles: [
        '.lineHolder {}'
    ],
    template: `<div [chart]="lineChart" class="lineHolder"></div>`
})
export class LineComponent implements OnChanges, OnInit {

    // Titles
    @Input() chartTitle = '';
    @Input() chartSubTitle = '';
    @Input() chartTitleAlign = 'center';

    // Column or line as type
    @Input() chartType = 'line';
    @Input() yTitle = '';
    @Input() xTitle = '';

    @Input() legendEnabled = true;
    @Input() isColorByPoint= false;

    @Input() plotLineValue;
    @Input() isNoGridLines = false;

    // E.G.: xCategories ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    @Input() xCategories = [];

    // E.G. Series:
    // [{name: 'Series1', data:[29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]},
    // {name: 'Series2', data:[216.4, 194.1, 95.6, 54.4, 29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5]}]
    @Input() series;

    @Output() clickOutput = new EventEmitter<string []>();

    public lineChart;

    constructor(private zone: NgZone) {
    }

    ngOnInit() {
        this.lineChart = this.getLineChart(this.series, this.xCategories);
    }

    private getLineChart(series, categories) {
        series["colorByPoint"] = this.isColorByPoint;

        let data = (series instanceof Array ? series : [series]);

        return new Chart({
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
                text: this.chartTitle,
                align: this.chartTitleAlign
            },
            subtitle: {
                text: this.chartSubTitle
            },
            yAxis: {
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
    }

    /*
    *   Selecting elements on charts or from the outside, will also alter the selected filter elements
    */

    chartClick = (event) => {
        this.clickOutput.emit(event);
    };


    ngOnChanges(changes: SimpleChanges) {
        if (changes['series'] && !changes['series'].firstChange) {
            this.zone.run(() => {
                this.lineChart = this.getLineChart(changes['series'].currentValue, this.xCategories);
            });
        }
    }

}
