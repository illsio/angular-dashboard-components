import { NgZone, OnChanges, OnInit, SimpleChanges } from '@angular/core';
export declare class WordCloudComponent implements OnChanges, OnInit {
    private zone;
    chartTitle: string;
    text: string;
    minOccurences: any;
    wordCloudChart: any;
    constructor(zone: NgZone);
    ngOnInit(): void;
    private getWordCloudChart(text);
    ngOnChanges(changes: SimpleChanges): void;
    private createDataFromText(text);
}
