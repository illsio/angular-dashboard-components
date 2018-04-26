import { EventEmitter, NgZone, OnChanges, OnInit, SimpleChanges } from '@angular/core';
export declare class PieComponent implements OnChanges, OnInit {
    private zone;
    chartTitle: string;
    series: any;
    pieChart: any;
    clickOutput: EventEmitter<string[]>;
    constructor(zone: NgZone);
    ngOnInit(): void;
    private getPieChart(series);
    chartClick: (event: any) => void;
    ngOnChanges(changes: SimpleChanges): void;
    convertPoint(a: any): void;
}
