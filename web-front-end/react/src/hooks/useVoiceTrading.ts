import { useState, useCallback } from 'react';
import { VoiceTradeService, VoiceCommand } from '../../shared/voice-service';
import { Environment } from '../env';

export const useVoiceTrading = () => {
  const [isListening, setIsListening] = useState(false);
  const [voiceCommand, setVoiceCommand] = useState('');
  const [voiceError, setVoiceError] = useState('');
  
  const voiceService = new VoiceTradeService({
    elevenLabsApiKey: Environment.eleven_labs_api_key,
    voiceId: 'pNInz6obpgDQGcFmaJgB'
  });

  const startVoiceCommand = useCallback(async (): Promise<VoiceCommand | null> => {
    if (!Environment.voice_enabled) {
      setVoiceError('Voice functionality is not enabled');
      return null;
    }

    try {
      setIsListening(true);
      setVoiceError('');
      setVoiceCommand('');

      await voiceService.provideFeedback('Listening for your trade command');
      
      const command = await voiceService.captureVoiceCommand();
      
      setVoiceCommand(`${command.action} ${command.quantity} shares of ${command.security}`);
      
      await voiceService.provideFeedback(
        `Confirming ${command.action} order for ${command.quantity} shares of ${command.security}`
      );

      return command;

    } catch (error: any) {
      const errorMessage = error.message || 'Voice command failed';
      setVoiceError(errorMessage);
      await voiceService.provideFeedback('Voice command failed. Please try again.');
      return null;
    } finally {
      setIsListening(false);
    }
  }, [voiceService]);

  const stopVoiceCommand = useCallback(() => {
    voiceService.stopListening();
    setIsListening(false);
  }, [voiceService]);

  const clearVoiceState = useCallback(() => {
    setVoiceCommand('');
    setVoiceError('');
  }, []);

  return {
    isListening,
    voiceCommand,
    voiceError,
    startVoiceCommand,
    stopVoiceCommand,
    clearVoiceState,
    isVoiceEnabled: Environment.voice_enabled
  };
};
