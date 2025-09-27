# Voice Trading Service

This directory contains shared voice trading functionality that can be used by both Angular and React frontends.

## Components

- `voice-service.ts` - Core voice recognition, command parsing, and ElevenLabs integration

## Configuration

To enable voice trading, you need to:

1. Set up an ElevenLabs API key in your environment configuration
2. Ensure `voiceEnabled` is set to `true` in your environment
3. The application will use the Web Speech API for voice recognition (requires HTTPS in production)

## Voice Commands

The system supports natural language commands like:
- "Buy 100 shares of IBM"
- "Sell 50 Apple stock" 
- "Purchase 200 Microsoft"

## Browser Support

Voice recognition requires a modern browser with Web Speech API support:
- Chrome/Chromium (recommended)
- Safari (limited support)
- Firefox (limited support)

HTTPS is required for voice recognition to work in production environments.
