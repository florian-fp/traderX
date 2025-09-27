# Voice Trading Setup Guide

This document explains how to set up and use the voice trading functionality in TraderX.

## Prerequisites

1. **ElevenLabs API Key**: You need an API key from ElevenLabs for text-to-speech functionality
2. **HTTPS**: Voice recognition requires HTTPS in production environments
3. **Modern Browser**: Chrome/Chromium recommended for best voice recognition support

## Configuration

### Angular Frontend

Update the environment files with your ElevenLabs API key:

```typescript
// web-front-end/angular/main/environments/environment.ts
export const environment = {
  // ... existing config
  elevenLabsApiKey: 'your-elevenlabs-api-key-here',
  voiceEnabled: true
};
```

### React Frontend

Update the environment file:

```typescript
// web-front-end/react/src/env.ts
export const Environment = {
  // ... existing config
  eleven_labs_api_key: 'your-elevenlabs-api-key-here',
  voice_enabled: true
};
```

## Usage

### Voice Commands

The system supports natural language commands such as:

- "Buy 100 shares of IBM"
- "Sell 50 Apple stock"
- "Purchase 200 Microsoft"
- "Sell 75 shares of Google"

### How to Use

1. **Select an Account**: Choose an account from the dropdown
2. **Click Voice Trade Button**: Click the microphone button to start voice recognition
3. **Speak Your Command**: Clearly state your trade command
4. **Confirm**: The system will parse your command and submit the trade
5. **Listen for Feedback**: Audio confirmation will be provided

### Error Handling

- If voice recognition fails, try speaking more clearly
- Ensure you have selected an account before using voice commands
- Check that your microphone permissions are enabled
- Verify your internet connection for ElevenLabs API calls

## Technical Details

### Components Added

- **Shared Voice Service** (`web-front-end/shared/voice-service.ts`): Core voice functionality
- **Angular Integration** (`voice-trade.service.ts`): Angular-specific service wrapper
- **React Integration** (`useVoiceTrading.ts`): React hook for voice functionality
- **UI Components**: Voice buttons and status indicators in both frontends

### Browser Compatibility

- **Chrome/Chromium**: Full support
- **Safari**: Limited support (iOS Safari has restrictions)
- **Firefox**: Limited support
- **Edge**: Good support (Chromium-based)

### Security Considerations

- Voice recognition data is processed locally by the browser
- ElevenLabs API calls are made directly from the client
- No voice data is stored or logged by the application
- Standard trade validation and security measures still apply

## Troubleshooting

### Common Issues

1. **"Voice functionality is not enabled"**
   - Check that `voiceEnabled`/`voice_enabled` is set to `true` in environment config

2. **"Speech recognition not supported"**
   - Use a supported browser (Chrome recommended)
   - Ensure you're using HTTPS in production

3. **"Voice command failed"**
   - Check microphone permissions
   - Speak more clearly and distinctly
   - Ensure stable internet connection

4. **No audio feedback**
   - Verify ElevenLabs API key is configured
   - Check browser audio permissions
   - Ensure speakers/headphones are working

### Development Notes

- Voice recognition works on localhost for development
- ElevenLabs API requires internet connection
- Consider rate limiting for API calls in production
- Test with various accents and speaking patterns
