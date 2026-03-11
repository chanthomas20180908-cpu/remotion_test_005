#!/usr/bin/env python3
"""
Gemini Text-to-Speech Script
Generates natural-sounding speech from text using Google Gemini TTS models.

Usage:
    python scripts/tts.py "Your text here"
    python scripts/tts.py "Your text" --voice Charon --output my-audio --no-timestamp
    python scripts/tts.py "Joe: Hi. Jane: Hello!" --speakers "Joe:Kore,Jane:Puck"

Requirements:
    pip install google-genai
    Set GEMINI_API_KEY environment variable
"""

import argparse
import os
import struct
import sys
import wave
from datetime import datetime
from pathlib import Path


def parse_speakers(speakers_str: str) -> dict[str, str]:
    """Parse speaker mapping string like 'Joe:Kore,Jane:Puck' into dict."""
    result = {}
    if not speakers_str:
        return result
    for pair in speakers_str.split(","):
        pair = pair.strip()
        if ":" in pair:
            name, voice = pair.split(":", 1)
            result[name.strip()] = voice.strip()
    return result


def save_wav(audio_data: bytes, output_path: str, sample_rate: int = 24000) -> None:
    """Save raw PCM audio data as WAV file."""
    with wave.open(output_path, "wb") as wf:
        wf.setnchannels(1)       # mono
        wf.setsampwidth(2)       # 16-bit
        wf.setframerate(sample_rate)
        wf.writeframes(audio_data)


def generate_tts(
    text: str,
    voice: str = "Kore",
    model: str = "gemini-2.5-flash-preview-tts",
    output_dir: str = "audio",
    output_name: str = "tts_output",
    use_timestamp: bool = True,
    stream: bool = False,
    speakers: dict[str, str] | None = None,
) -> str:
    """
    Generate TTS audio using Gemini API.

    Returns:
        Path to generated WAV file.
    """
    try:
        from google import genai
        from google.genai import types
    except ImportError:
        print("Error: google-genai package not installed.")
        print("Install with: pip install google-genai")
        sys.exit(1)

    api_key = os.environ.get("GEMINI_API_KEY")
    if not api_key:
        print("Error: GEMINI_API_KEY environment variable not set.")
        print("Get your API key at: https://aistudio.google.com/apikey")
        sys.exit(1)

    client = genai.Client(api_key=api_key)

    # Build output path
    out_dir = Path(output_dir)
    out_dir.mkdir(parents=True, exist_ok=True)

    if use_timestamp:
        ts = datetime.now().strftime("%Y%m%d_%H%M%S")
        filename = f"{output_name}_{ts}.wav"
    else:
        filename = f"{output_name}.wav"

    output_path = str(out_dir / filename)

    # Build speech config
    if speakers:
        # Multi-speaker mode
        multi_speaker_voice_config = types.MultiSpeakerVoiceConfig(
            speaker_voice_configs=[
                types.SpeakerVoiceConfig(
                    speaker=speaker_name,
                    voice_config=types.VoiceConfig(
                        prebuilt_voice_config=types.PrebuiltVoiceConfig(
                            voice_name=voice_name
                        )
                    ),
                )
                for speaker_name, voice_name in speakers.items()
            ]
        )
        speech_config = types.SpeechConfig(
            multi_speaker_voice_config=multi_speaker_voice_config
        )
    else:
        # Single speaker mode
        speech_config = types.SpeechConfig(
            voice_config=types.VoiceConfig(
                prebuilt_voice_config=types.PrebuiltVoiceConfig(voice_name=voice)
            )
        )

    config = types.GenerateContentConfig(
        response_modalities=["AUDIO"],
        speech_config=speech_config,
    )

    if stream:
        print(f"Streaming audio generation [{voice}]...")
        audio_chunks = []
        for chunk in client.models.generate_content_stream(
            model=model,
            contents=text,
            config=config,
        ):
            if (
                chunk.candidates
                and chunk.candidates[0].content.parts
                and chunk.candidates[0].content.parts[0].inline_data
            ):
                audio_chunks.append(
                    chunk.candidates[0].content.parts[0].inline_data.data
                )
        audio_data = b"".join(audio_chunks)
    else:
        print(f"Generating audio [{voice}]...")
        response = client.models.generate_content(
            model=model,
            contents=text,
            config=config,
        )
        audio_data = response.candidates[0].content.parts[0].inline_data.data

    if not audio_data:
        print("Error: No audio data received from API.")
        sys.exit(1)

    save_wav(audio_data, output_path)
    print(f"Audio saved to: {output_path}")
    return output_path


def main() -> None:
    parser = argparse.ArgumentParser(
        description="Generate TTS audio using Google Gemini",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  python scripts/tts.py "Hello, world!"
  python scripts/tts.py "Corporate announcement" --voice Charon --output voiceover
  python scripts/tts.py "Joe: Hi! Jane: Hello!" --speakers "Joe:Kore,Jane:Puck"
  python scripts/tts.py "Long text..." --stream --output long-form
  python scripts/tts.py "Fixed name" --output my-audio --no-timestamp

Available voices: Kore, Puck, Charon, Fenrir, Aoede, Zephyr, Sulafat
        """,
    )
    parser.add_argument("text", help="Text to convert to speech")
    parser.add_argument(
        "--voice", "-v",
        default="Kore",
        help="Voice name (default: Kore). Options: Kore, Puck, Charon, Fenrir, Aoede, Zephyr, Sulafat",
    )
    parser.add_argument(
        "--output", "-o",
        default="tts_output",
        help="Base name for output file (default: tts_output)",
    )
    parser.add_argument(
        "--output-dir",
        default="audio",
        help="Output directory for audio files (default: audio/)",
    )
    parser.add_argument(
        "--no-timestamp",
        action="store_true",
        help="Disable automatic timestamp in filename",
    )
    parser.add_argument(
        "--model", "-m",
        default="gemini-2.5-flash-preview-tts",
        help="Gemini TTS model (default: gemini-2.5-flash-preview-tts)",
    )
    parser.add_argument(
        "--stream", "-s",
        action="store_true",
        help="Enable streaming for long content",
    )
    parser.add_argument(
        "--speakers",
        default=None,
        help='Multi-speaker mapping, e.g. "Joe:Kore,Jane:Puck"',
    )

    args = parser.parse_args()

    speakers = parse_speakers(args.speakers) if args.speakers else None

    generate_tts(
        text=args.text,
        voice=args.voice,
        model=args.model,
        output_dir=args.output_dir,
        output_name=args.output,
        use_timestamp=not args.no_timestamp,
        stream=args.stream,
        speakers=speakers,
    )


if __name__ == "__main__":
    main()
