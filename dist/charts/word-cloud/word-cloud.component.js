System.register(["@angular/core", "angular-highcharts", "highcharts/js/highcharts.js"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __moduleName = context_1 && context_1.id;
    var core_1, angular_highcharts_1, highC, WordCloudComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (angular_highcharts_1_1) {
                angular_highcharts_1 = angular_highcharts_1_1;
            },
            function (highC_1) {
                highC = highC_1;
            }
        ],
        execute: function () {
            WordCloudComponent = (function () {
                function WordCloudComponent(zone) {
                    this.zone = zone;
                    this.chartTitle = '';
                    this.text = '';
                }
                WordCloudComponent.prototype.ngOnInit = function () {
                    if (this.text) {
                        this.wordCloudChart = this.getWordCloudChart(this.text);
                    }
                };
                WordCloudComponent.prototype.getWordCloudChart = function (text) {
                    var seriesData = this.createDataFromText(text);
                    return new angular_highcharts_1.Chart({
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
                };
                WordCloudComponent.prototype.ngOnChanges = function (changes) {
                    var _this = this;
                    if (changes['text'] && !changes['text'].firstChange) {
                        this.zone.run(function () {
                            _this.wordCloudChart = _this.getWordCloudChart(changes['text'].currentValue);
                        });
                    }
                };
                WordCloudComponent.prototype.createDataFromText = function (text) {
                    var lines = text.split(/[,\. ]+/g);
                    var realLines = [];
                    for (var _i = 0, lines_1 = lines; _i < lines_1.length; _i++) {
                        var line = lines_1[_i];
                        if (line && line.length > 3) {
                            realLines.push(line);
                        }
                    }
                    var data = highC.reduce(realLines, function (arr, word) {
                        var obj = highC.find(arr, function (object) {
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
                        var filteredData = [];
                        for (var _a = 0, data_1 = data; _a < data_1.length; _a++) {
                            var wordElement = data_1[_a];
                            if (wordElement['weight'] > this.minOccurences) {
                                filteredData.push(wordElement);
                            }
                        }
                        if (filteredData.length > 0) {
                            data = filteredData;
                        }
                    }
                    return data;
                };
                __decorate([
                    core_1.Input(),
                    __metadata("design:type", Object)
                ], WordCloudComponent.prototype, "chartTitle", void 0);
                __decorate([
                    core_1.Input(),
                    __metadata("design:type", Object)
                ], WordCloudComponent.prototype, "text", void 0);
                __decorate([
                    core_1.Input(),
                    __metadata("design:type", Object)
                ], WordCloudComponent.prototype, "minOccurences", void 0);
                WordCloudComponent = __decorate([
                    core_1.Component({
                        selector: 'dash-word-cloud',
                        styles: [
                            '.wCloudHolder {}'
                        ],
                        template: "<div [chart]=\"wordCloudChart\" class=\"wCloudHolder\"></div>"
                    }),
                    __metadata("design:paramtypes", [core_1.NgZone])
                ], WordCloudComponent);
                return WordCloudComponent;
            }());
            exports_1("WordCloudComponent", WordCloudComponent);
        }
    };
});
//# sourceMappingURL=word-cloud.component.js.map