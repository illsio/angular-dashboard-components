import { EventEmitter, NgZone, OnChanges, OnInit, SimpleChanges } from '@angular/core';
export declare class LineComponent implements OnChanges, OnInit {
    private zone;
    chartTitle: string;
    chartType: string;
    yTitle: string;
    xTitle: string;
    legendEnabled: boolean;
    xCategories: any[];
    series: any;
    clickOutput: EventEmitter<string[]>;
    lineChart: any;
    constructor(zone: NgZone);
    ngOnInit(): void;
    private getLineChart(series, categories);
    chartClick: (event: any) => void;
    ngOnChanges(changes: SimpleChanges): void;
}
