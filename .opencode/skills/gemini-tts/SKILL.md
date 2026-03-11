---
name: gemini-tts
description: Generate natural-sounding speech from text using Google Gemini TTS models with multiple expressive voices and multi-speaker conversation support.
metadata:
  tags: tts, audio, speech, gemini, google, voiceover, multi-speaker
---

# Gemini Text-to-Speech

Generate natural-sounding speech from text using Gemini's TTS models through executable scripts with support for multiple voices and multi-speaker conversations.

## When to Use This Skill

Use this skill when you need to:

- Convert text to natural speech
- Create audio for podcasts, audiobooks, or videos
- Generate multi-speaker conversations
- Stream audio for long content
- Choose from multiple voice options
- Create accessible audio content
- Generate voiceovers for presentations
- Batch convert text to audio files

## Available Scripts

### scripts/tts.py

**Purpose**: Convert text to speech using Gemini TTS models

**When to use**:

- Any text-to-speech conversion
- Multi-speaker conversation generation
- Streaming audio for long texts
- Voiceovers for content creation
- Accessible audio generation

**Key parameters**:

| Parameter | Description | Example |
|-----------|-------------|---------|
| `text` | Text to convert (required) | `"Hello, world!"` |
| `--voice`, `-v` | Voice name | `Kore` |
| `--output`, `-o` | Base name for output file | `welcome` |
| `--output-dir` | Output directory for audio | `audio/` |
| `--no-timestamp` | Disable auto timestamp | Flag |
| `--model`, `-m` | TTS model | `gemini-2.5-flash-preview-tts` |
| `--stream`, `-s` | Enable streaming | Flag |
| `--speakers` | Multi-speaker mapping | `"Joe:Kore,Jane:Puck"` |

**Output**: WAV audio file path

## Workflows

### Workflow 1: Basic Text-to-Speech

```bash
python scripts/tts.py "Hello, world! Have a wonderful day."
```

- Best for: Quick audio generation, simple messages
- Voice: `Kore` (default, clear and professional)
- Output: `audio/tts_output_YYYYMMDD_HHMMSS.wav` (auto timestamp)

### Workflow 2: Choose Different Voice

```bash
python scripts/tts.py "Welcome to our podcast about technology trends" --voice Puck --output welcome
```

- Best for: Friendly, conversational content
- Voice options: Kore, Puck, Charon, Fenrir, Aoede, Zephyr, Sulafat

### Workflow 3: Multi-Speaker Conversation

```bash
python scripts/tts.py "TTS the following conversation:
Joe: How's it going today?
Jane: Not too bad, how about you?" --speakers "Joe:Kore,Jane:Puck" --output conversation
```

### Workflow 4: Long Content with Streaming

```bash
python scripts/tts.py "This is a very long text..." --stream --output long-form
```

### Workflow 5: Professional Voiceover

```bash
python scripts/tts.py "Welcome to our quarterly earnings presentation." --voice Charon --output voiceover
```

### Workflow 6: Custom Output Directory

```bash
python scripts/tts.py "Save to specific folder." --output-dir ./my-projects/podcasts/ --output episode1
```

### Workflow 10: Disable Timestamp

```bash
python scripts/tts.py "Fixed filename." --output my-audio --no-timestamp
```

## Parameters Reference

### Model Selection

| Model | Quality | Speed | Best For |
|-------|---------|-------|----------|
| `gemini-2.5-flash-preview-tts` | Good | Fast | General use, high volume |
| `gemini-2.5-pro-preview-tts` | Higher | Slower | Premium content, voiceovers |

### Voice Selection

| Voice | Characteristics | Best For |
|-------|----------------|----------|
| **Kore** | Clear, professional | Announcements, general purpose (default) |
| **Puck** | Friendly, conversational | Casual content, interviews |
| **Charon** | Deep, authoritative | Corporate, serious content |
| **Fenrir** | Warm, expressive | Storytelling, narratives |
| **Aoede** | Melodic, pleasant | Educational, accessibility |
| **Zephyr** | Light, airy | Gentle content, tutorials |
| **Sulafat** | Neutral, balanced | Documentaries, factual content |

### Audio Format

| Specification | Value |
|---------------|-------|
| Format | WAV (PCM) |
| Sample rate | 24000 Hz |
| Channels | 1 (mono) |
| Bit depth | 16-bit |

### Token Limits

| Limit | Type | Description |
|-------|------|-------------|
| 8,192 | Input | Maximum input text tokens |
| 16,384 | Output | Maximum output audio tokens |

## Common Issues

### "google-genai not installed"

```bash
pip install google-genai
```

### "Voice name not found"

- Check voice name spelling
- Use available voices: Kore, Puck, Charon, Fenrir, Aoede, Zephyr, Sulafat
- Voice names are case-sensitive

### "No audio generated"

- Check text is not empty
- Verify text doesn't exceed token limit (8,192)
- Try shorter text segments
- Check API quota limits

## Best Practices

### Voice Selection

- **Kore**: General purpose, clear articulation
- **Puck**: Conversational, engaging tone
- **Charon**: Professional, authoritative
- **Fenrir**: Emotional, storytelling
- **Aoede**: Soft, gentle for accessibility
- **Zephyr**: Educational, clear explanations

### Text Preparation

- Use natural language and punctuation
- Include pauses with commas and periods
- Spell out difficult words if needed
- Break very long text into logical segments
- Add speaker labels for multi-speaker content

## Quick Reference

```bash
# Basic
python scripts/tts.py "Your text here"

# Custom voice
python scripts/tts.py "Your text" --voice Puck --output audio.wav

# Multi-speaker
python scripts/tts.py "Joe: Hi. Jane: Hello!" --speakers "Joe:Kore,Jane:Puck"

# Streaming
python scripts/tts.py "Long text..." --stream --output long.wav

# Professional
python scripts/tts.py "Corporate announcement" --voice Charon
```

## Reference

- See `references/voices.md` for complete voice documentation
- Get API key: https://aistudio.google.com/apikey
- Documentation: https://ai.google.dev/gemini-api/docs/text-to-speech
- Sample rate: 24000 Hz standard for most applications

Base directory for this skill: file:///C:/Projects/good-video/.opencode/skills/gemini-tts
Relative paths in this skill (e.g., scripts/, reference/) are relative to this base directory.
