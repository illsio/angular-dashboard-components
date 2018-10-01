var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, NgZone } from '@angular/core';
import { Chart } from 'angular-highcharts';
import * as highC from 'highcharts/js/highcharts.js';
let WordCloudComponent = class WordCloudComponent {
    constructor(zone) {
        this.zone = zone;
        this.chartTitle = '';
        this.text = '';
    }
    ngOnInit() {
        if (this.text) {
            this.wordCloudChart = this.getWordCloudChart(this.text);
        }
    }
    getWordCloudChart(text) {
        let seriesData = this.createDataFromText(text);
        return new Chart({
            chart: {},
            series: [{
                    type: 'wordcloud',
                    data: seriesData,
                    name: 'Occurrences'
                }],
            title: {
                text: this.chartTitle
            }
        });
    }
    ngOnChanges(changes) {
        if (changes['text'] && !changes['text'].firstChange) {
            this.zone.run(() => {
                this.wordCloudChart = this.getWordCloudChart(changes['text'].currentValue);
            });
        }
    }
    createDataFromText(text) {
        let lines = text.split(/[,\. ]+/g);
        let realLines = [];
        for (let line of lines) {
            if (line && line.length > 3) {
                realLines.push(line);
            }
        }
        let data = highC.reduce(realLines, function (arr, word) {
            let obj = highC.find(arr, function (object) {
                return object.name === word;
            });
            if (obj) {
                obj.weight += 1;
            }
            else {
                obj = {
                    name: word,
                    weight: 1
                };
                arr.push(obj);
            }
            return arr;
        }, []);
        if (this.minOccurences) {
            let filteredData = [];
            for (let wordElement of data) {
                if (wordElement['weight'] > this.minOccurences) {
                    filteredData.push(wordElement);
                }
            }
            if (filteredData.length > 0) {
                data = filteredData;
            }
        }
        return data;
    }
};
__decorate([
    Input(),
    __metadata("design:type", Object)
], WordCloudComponent.prototype, "chartTitle", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], WordCloudComponent.prototype, "text", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], WordCloudComponent.prototype, "minOccurences", void 0);
WordCloudComponent = __decorate([
    Component({
        selector: 'dash-word-cloud',
        styles: [
            '.wCloudHolder {}'
        ],
        template: `<div [chart]="wordCloudChart" class="wCloudHolder"></div>`
    }),
    __metadata("design:paramtypes", [NgZone])
], WordCloudComponent);
export { WordCloudComponent };
