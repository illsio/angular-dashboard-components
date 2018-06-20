import {Component, EventEmitter, Input, NgZone, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Chart} from 'angular-highcharts';

@Component({
    selector: 'dash-pie',
    styles: [
        '.pieHolder {}'
    ],
    template: `<div [chart]="pieChart"  class="pieHolder"></div>`
})
export class PieComponent implements OnChanges, OnInit {

    // Titles
    @Input() chartTitle = '';
    @Input() chartSubTitle = '';
    @Input() chartTitleAlign = 'center';

    @Input() isPercentageLabel = true;
    @Input() isNoDecimalPlace = false;
    @Input() dataLabelDistance = 30;

    @Input() innerSize = 0;

    // E.G. Series:
    // [{name: 'Brands', data: [{name: 'IE', y: 56.33}, {name: 'Chrome', y: 24.03}]}]
    @Input() series;
    public pieChart;

    @Output() clickOutput = new EventEmitter<string []>();

    constructor(private zone: NgZone) { }

    ngOnInit() {
        this.pieChart = this.getPieChart(this.series);
        if (this.innerSize> 0) {
            this.series['innerSize'] = this.innerSize;
        }
    }

    private getPieChart(series) {
        return new Chart({
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: this.chartTitle,
                align: this.chartTitleAlign
            },
            subtitle: {
                text: this.chartSubTitle
            },
            // tooltip: {
            //   pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            // },
            credits: {
                enabled: false
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: this.isPercentageLabel ? '<b>{point.name}</b>: {point.percentage:.1f} %'
                            : this.isNoDecimalPlace ? '<b>{point.name}</b>: {point.y:.0f}' : '<b>{point.name}</b>: {point.y:.2f}',
                        distance: this.dataLabelDistance,
                        /*,
                      style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                      }*/
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

    /*
    *   Selecting elements on charts or from the outside, will also alter the selected filter elements
    */

    chartClick = (event) => {
        this.clickOutput.emit(event);
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['series'] && !changes['series'].firstChange) {
            this.zone.run(() => {
                this.pieChart = this.getPieChart(changes['series'].currentValue);
            });
        }
    }

    convertPoint(a: any) {
    }
}
