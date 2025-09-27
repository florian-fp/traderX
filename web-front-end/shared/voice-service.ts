export interface VoiceCommand {
  action: 'buy' | 'sell';
  quantity: number;
  security: string;
  confidence: number;
}

export interface VoiceServiceConfig {
  elevenLabsApiKey: string;
  voiceId?: string;
}

declare global {
  interface Window {
    webkitSpeechRecognition: any;
    SpeechRecognition: any;
  }
}

export class VoiceRecognitionService {
  private recognition: any = null;
  private isListening = false;

  constructor() {
    if ('webkitSpeechRecognition' in window) {
      this.recognition = new window.webkitSpeechRecognition();
    } else if ('SpeechRecognition' in window) {
      this.recognition = new (window as any).SpeechRecognition();
    }

    if (this.recognition) {
      this.recognition.continuous = false;
      this.recognition.interimResults = false;
      this.recognition.lang = 'en-US';
    }
  }

  isSupported(): boolean {
    return this.recognition !== null;
  }

  startListening(): Promise<string> {
    return new Promise((resolve, reject) => {
      if (!this.recognition) {
        reject(new Error('Speech recognition not supported'));
        return;
      }

      if (this.isListening) {
        reject(new Error('Already listening'));
        return;
      }

      this.isListening = true;

      this.recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        this.isListening = false;
        resolve(transcript);
      };

      this.recognition.onerror = (event) => {
        this.isListening = false;
        reject(new Error(`Speech recognition error: ${event.error}`));
      };

      this.recognition.onend = () => {
        this.isListening = false;
      };

      this.recognition.start();
    });
  }

  stopListening(): void {
    if (this.recognition && this.isListening) {
      this.recognition.stop();
      this.isListening = false;
    }
  }

  getIsListening(): boolean {
    return this.isListening;
  }
}

export class VoiceCommandParser {
  private static readonly BUY_KEYWORDS = ['buy', 'purchase', 'get', 'acquire'];
  private static readonly SELL_KEYWORDS = ['sell', 'dispose', 'liquidate'];
  private static readonly QUANTITY_PATTERNS = [
    /(\d+)\s*shares?\s*of\s*([a-zA-Z]+)/i,
    /(\d+)\s*([a-zA-Z]+)\s*shares?/i,
    /(\d+)\s*([a-zA-Z]+)/i,
  ];

  static parseCommand(transcript: string): VoiceCommand | null {
    const normalizedTranscript = transcript.toLowerCase().trim();
    
    let action: 'buy' | 'sell' | null = null;
    
    for (const keyword of this.BUY_KEYWORDS) {
      if (normalizedTranscript.includes(keyword)) {
        action = 'buy';
        break;
      }
    }
    
    if (!action) {
      for (const keyword of this.SELL_KEYWORDS) {
        if (normalizedTranscript.includes(keyword)) {
          action = 'sell';
          break;
        }
      }
    }

    if (!action) {
      return null;
    }

    for (const pattern of this.QUANTITY_PATTERNS) {
      const match = normalizedTranscript.match(pattern);
      if (match) {
        const quantity = parseInt(match[1]);
        const security = match[2].toUpperCase();
        
        if (quantity > 0 && security.length > 0) {
          return {
            action,
            quantity,
            security,
            confidence: 0.8
          };
        }
      }
    }

    return null;
  }
}

export class ElevenLabsService {
  private config: VoiceServiceConfig;
  private audioContext: AudioContext | null = null;

  constructor(config: VoiceServiceConfig) {
    this.config = config;
  }

  async speak(text: string): Promise<void> {
    if (!this.config.elevenLabsApiKey) {
      console.warn('ElevenLabs API key not configured, skipping voice output');
      return;
    }

    try {
      const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${this.config.voiceId || 'pNInz6obpgDQGcFmaJgB'}`, {
        method: 'POST',
        headers: {
          'Accept': 'audio/mpeg',
          'Content-Type': 'application/json',
          'xi-api-key': this.config.elevenLabsApiKey
        },
        body: JSON.stringify({
          text: text,
          model_id: 'eleven_monolingual_v1',
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.5
          }
        })
      });

      if (!response.ok) {
        throw new Error(`ElevenLabs API error: ${response.status}`);
      }

      const audioBuffer = await response.arrayBuffer();
      await this.playAudio(audioBuffer);
    } catch (error) {
      console.error('Error with ElevenLabs TTS:', error);
      throw error;
    }
  }

  private async playAudio(audioBuffer: ArrayBuffer): Promise<void> {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    }

    const audioData = await this.audioContext.decodeAudioData(audioBuffer);
    const source = this.audioContext.createBufferSource();
    source.buffer = audioData;
    source.connect(this.audioContext.destination);
    
    return new Promise((resolve) => {
      source.onended = () => resolve();
      source.start();
    });
  }
}

export class VoiceTradeService {
  private voiceRecognition: VoiceRecognitionService;
  private elevenLabs: ElevenLabsService;

  constructor(config: VoiceServiceConfig) {
    this.voiceRecognition = new VoiceRecognitionService();
    this.elevenLabs = new ElevenLabsService(config);
  }

  async captureVoiceCommand(): Promise<VoiceCommand> {
    if (!this.voiceRecognition.isSupported()) {
      throw new Error('Voice recognition is not supported in this browser');
    }

    const transcript = await this.voiceRecognition.startListening();
    const command = VoiceCommandParser.parseCommand(transcript);
    
    if (!command) {
      throw new Error(`Could not understand command: "${transcript}"`);
    }

    return command;
  }

  async provideFeedback(message: string): Promise<void> {
    try {
      await this.elevenLabs.speak(message);
    } catch (error) {
      console.error('Voice feedback error:', error);
    }
  }

  isListening(): boolean {
    return this.voiceRecognition.getIsListening();
  }

  stopListening(): void {
    this.voiceRecognition.stopListening();
  }
}
