import { EventEmitter, NgZone, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ChartUtils } from '../../utils/chart.utils';
export declare class PieComponent implements OnChanges, OnInit {
    private zone;
    private chartUtils;
    pieId: string;
    chartTitle: string;
    chartSubTitle: string;
    chartTitleAlign: string;
    isShowLabels: boolean;
    isPercentageLabel: boolean;
    isNoDecimalPlace: boolean;
    dataLabelDistance: number;
    isExport: boolean;
    innerSize: number;
    series: any;
    pieChart: any;
    clickOutput: EventEmitter<string[]>;
    constructor(zone: NgZone, chartUtils: ChartUtils);
    ngOnInit(): void;
    private getPieChart(series);
    redrawChart(isReflow: any): void;
    chartClick: (event: any) => void;
    ngOnChanges(changes: SimpleChanges): void;
    convertPoint(a: any): void;
}
