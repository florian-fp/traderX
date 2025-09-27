import React from "react";
import { Box, Button, Alert } from "@mui/material";
import { Mic as MicIcon, MicOff as MicOffIcon } from "@mui/icons-material";
import { ActionButtonsProps } from "./types";
import { useVoiceTrading } from "../hooks/useVoiceTrading";
import { Environment } from '../env';

export const VoiceTradeButton = ({ accountId }: ActionButtonsProps) => {
  const {
    isListening,
    voiceCommand,
    voiceError,
    startVoiceCommand,
    stopVoiceCommand,
    clearVoiceState,
    isVoiceEnabled
  } = useVoiceTrading();

  const handleVoiceCommand = async () => {
    if (!accountId) {
      return;
    }

    const command = await startVoiceCommand();
    
    if (command) {
      try {
        const tradeId = Math.floor(Math.random() * 1000000);
        const response = await fetch(`${Environment.trade_service_url}/trade/`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: `VOICE-TRADE-${tradeId}`,
            security: command.security,
            quantity: command.quantity,
            accountId: accountId,
            side: command.action === 'buy' ? 'Buy' : 'Sell',
          }),
        });

        if (response.ok) {
          console.log('Voice trade submitted successfully');
          clearVoiceState();
        } else {
          throw new Error(`Trade submission failed: ${response.status}`);
        }
      } catch (error) {
        console.error('Voice trade submission error:', error);
      }
    }
  };

  if (!isVoiceEnabled) {
    return null;
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 2 }}>
      <Box sx={{ display: 'flex', gap: 1 }}>
        <Button
          variant="contained"
          color="success"
          onClick={handleVoiceCommand}
          disabled={isListening || !accountId}
          startIcon={isListening ? <MicIcon /> : <MicIcon />}
        >
          {isListening ? 'Listening...' : 'Voice Trade'}
        </Button>
        
        {isListening && (
          <Button
            variant="outlined"
            color="warning"
            onClick={stopVoiceCommand}
            startIcon={<MicOffIcon />}
          >
            Stop
          </Button>
        )}
      </Box>

      {voiceCommand && (
        <Alert severity="info">
          <strong>Voice Command:</strong> {voiceCommand}
        </Alert>
      )}

      {voiceError && (
        <Alert severity="error">
          <strong>Voice Error:</strong> {voiceError}
        </Alert>
      )}
    </Box>
  );
};
