import { Injectable } from '@angular/core';
import { environment } from 'main/environments/environment';
import { VoiceTradeService, VoiceCommand } from '../../../../shared/voice-service';

@Injectable({
    providedIn: 'root'
})
export class AngularVoiceTradeService {
    private voiceService: VoiceTradeService;

    constructor() {
        this.voiceService = new VoiceTradeService({
            elevenLabsApiKey: environment.elevenLabsApiKey,
            voiceId: 'pNInz6obpgDQGcFmaJgB'
        });
    }

    async captureVoiceCommand(): Promise<VoiceCommand> {
        return this.voiceService.captureVoiceCommand();
    }

    async provideFeedback(message: string): Promise<void> {
        return this.voiceService.provideFeedback(message);
    }

    isListening(): boolean {
        return this.voiceService.isListening();
    }

    stopListening(): void {
        this.voiceService.stopListening();
    }

    isVoiceEnabled(): boolean {
        return environment.voiceEnabled;
    }
}
