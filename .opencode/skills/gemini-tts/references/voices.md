# Gemini TTS Voice Reference

## Available Voices

| Voice | Characteristics | Best Use Cases |
|-------|----------------|----------------|
| **Kore** | Clear, professional, neutral | Announcements, navigation, general info (default) |
| **Puck** | Friendly, conversational, warm | Podcasts, interviews, casual content |
| **Charon** | Deep, authoritative, commanding | Corporate, news, formal presentations |
| **Fenrir** | Warm, expressive, emotional | Audiobooks, stories, emotional content |
| **Aoede** | Melodic, pleasant, gentle | Accessibility, educational, gentle content |
| **Zephyr** | Light, airy, clear | Tutorials, explanations, guides |
| **Sulafat** | Neutral, balanced, documentary | Documentaries, factual presentations |

## Voice Selection Guide

### By Content Type

| Content | Recommended Voice |
|---------|------------------|
| Product announcements | Kore or Charon |
| Marketing videos | Fenrir or Puck |
| Brand authority | Charon |
| User reviews / testimonials | Puck or Fenrir |
| Technical explanations | Kore or Zephyr |
| Emotional storytelling | Fenrir |
| Educational content | Aoede or Zephyr |
| Call to action / sales | Charon or Fenrir |
| Documentary narration | Sulafat |
| Accessibility content | Aoede |

### By Emotion/Tone

| Tone | Voice |
|------|-------|
| Authoritative / Commanding | Charon |
| Warm / Friendly | Puck, Fenrir |
| Professional / Clean | Kore |
| Expressive / Dramatic | Fenrir |
| Calm / Gentle | Aoede, Zephyr |
| Neutral / Balanced | Sulafat, Kore |

## Multi-Speaker Format

For conversations and dialogues:

```bash
python scripts/tts.py "Host: Welcome to the show!
Guest: Thank you for having me.
Host: Let's talk about the product.
Guest: Sure, it changed my life!" \
--speakers "Host:Charon,Guest:Puck" \
--output interview
```

Speaker label format in text: `SpeakerName: Their dialogue here`
Speakers parameter format: `"Name1:Voice1,Name2:Voice2"`

## Audio Specifications

- **Format**: WAV (PCM, uncompressed)
- **Sample Rate**: 24000 Hz
- **Channels**: 1 (mono)
- **Bit Depth**: 16-bit
- **Typical file size**: ~1.4 MB per minute of audio

## Model Comparison

| Model | Latency | Quality | Cost | Best For |
|-------|---------|---------|------|----------|
| `gemini-2.5-flash-preview-tts` | Fast | Good | Lower | Batch generation, drafts |
| `gemini-2.5-pro-preview-tts` | Slower | Higher | Higher | Final production, voiceovers |

## API Key

Get your Gemini API key at: https://aistudio.google.com/apikey

Set environment variable:
```bash
# Windows
set GEMINI_API_KEY=your_key_here

# macOS/Linux
export GEMINI_API_KEY=your_key_here
```
