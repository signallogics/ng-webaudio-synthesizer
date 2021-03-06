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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var models_1 = require("../../../models");
var DrumPCMTriggeringService = (function () {
    function DrumPCMTriggeringService(http) {
        this.http = http;
    }
    DrumPCMTriggeringService.prototype.setup = function (synthStream$, context, targetNode) {
        var _this = this;
        var self = this;
        this.synthStream$ = synthStream$;
        self.samples = {
            bass: new models_1.Sample('assets/drums/bass-thud.wav'),
            hihat: new models_1.Sample('assets/drums/hi-hat-closed.wav'),
            hihatopen: new models_1.Sample('assets/drums/hi-hat-open.wav'),
            snare: new models_1.Sample('assets/drums/short-snare.wav'),
            flam: new models_1.Sample('assets/drums/snare-flam.wav'),
            rimshot: new models_1.Sample('assets/drums/snare-rimshot.wav'),
            htrimshot: new models_1.Sample('assets/drums/hi-tom-rimshot.wav'),
            tom1: new models_1.Sample('assets/drums/hi-tom-normal.wav'),
            tom2: new models_1.Sample('assets/drums/low-tom.wav'),
            crash: new models_1.Sample('assets/drums/crash-trash.wav'),
            ride: new models_1.Sample('assets/drums/ride-standard.wav'),
            ping: new models_1.Sample('assets/drums/ride-ping.wav')
        };
        self.loadSamples(context).then(function () {
            console.log('samples loaded...  Subscribing to streams');
            _this.subscribeTo(context, targetNode);
        });
    };
    DrumPCMTriggeringService.prototype.subscribeTo = function (context, targetNode) {
        var self = this;
        var gain = context.createGain();
        gain.gain.value = 1;
        // now sip please, get what you want and play it!
        self.synthStream$
            .filter(function (synthMessage) {
            return synthMessage instanceof models_1.TriggerSample;
        })
            .subscribe(function (message) {
            var instrument = message.instrument;
            var sample = self.samples[instrument];
            if (sample) {
                var source = context.createBufferSource();
                if (!sample.gain) {
                    sample.gain = gain;
                }
                source.connect(sample.gain);
                sample.gain.connect(targetNode);
                source.buffer = sample.audioBuffer;
                source.start(0);
            }
        }, function (error) {
            console.error('error in subscription', error);
        }, function () {
            console.log('stream closed.');
        });
    };
    DrumPCMTriggeringService.prototype.loadSamples = function (context) {
        var _this = this;
        var self = this;
        return new Promise(function (resolve, reject) {
            Promise.all([
                self.loadSample(context, _this.samples.bass),
                self.loadSample(context, _this.samples.crash),
                self.loadSample(context, _this.samples.hihat),
                self.loadSample(context, _this.samples.hihatopen),
                self.loadSample(context, _this.samples.ride),
                self.loadSample(context, _this.samples.snare),
                self.loadSample(context, _this.samples.flam),
                self.loadSample(context, _this.samples.rimshot),
                self.loadSample(context, _this.samples.ping),
                self.loadSample(context, _this.samples.htrimshot),
                self.loadSample(context, _this.samples.tom1),
                self.loadSample(context, _this.samples.tom2)
            ])
                .then(function () {
                console.log('samples loaded...');
                resolve();
            });
        });
    };
    DrumPCMTriggeringService.prototype.loadSample = function (context, sample) {
        var _this = this;
        var options = new http_1.BaseRequestOptions();
        options.responseType = http_1.ResponseContentType.ArrayBuffer;
        return new Promise(function (resolve, reject) {
            _this.http.get(sample.fileName, options)
                .map(function (response) {
                return response.arrayBuffer();
            })
                .subscribe(function (rawBuffer) {
                sample.arrayBuffer = rawBuffer;
                context.decodeAudioData(rawBuffer, function (buffer) {
                    sample.audioBuffer = buffer;
                    resolve();
                });
            }, function (error) {
                console.dir(error);
                reject();
            });
        });
    };
    return DrumPCMTriggeringService;
}());
DrumPCMTriggeringService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], DrumPCMTriggeringService);
exports.DrumPCMTriggeringService = DrumPCMTriggeringService;
//# sourceMappingURL=drum-pcm-triggering.service.js.map