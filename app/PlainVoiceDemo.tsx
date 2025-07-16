'use client';

import { useEffect } from 'react';
import Script from 'next/script';

declare global {
  interface Window {
    VoiceAssistant?: any;
    Utils?: any;
  }
}

export default function PlainVoiceDemo() {
  useEffect(() => {
    // iOS Safari AudioContext patch (keep this)
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    if (isIOS && isSafari && window.Utils) {
      const orig = window.Utils.audioContext;
      window.Utils.audioContext = async (opts = {}) => {
        try {
          const C = window.AudioContext || (window as any).webkitAudioContext;
          const ctx = new C(opts);
          if (ctx.state === 'suspended') await ctx.resume();
          return ctx;
        } catch {
          return orig(opts);
        }
      };
    }

    // cleanup on unmount
    return () => {
      window.VoiceAssistant?.destroy();
    };
  }, []);

  // **new**: wrapper that must be called synchronously inside click
  async function startAssistant() {
    // 1) force-resume a fresh AudioContext
    try {
      const C = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new C();
      if (ctx.state === 'suspended') {
        await ctx.resume();
      }
    } catch (err) {
      console.warn('AudioContext resume failed', err);
    }

    // 2) request mic in direct user gesture
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
    } catch (err) {
      console.error('Microphone permission denied or failed:', err);
      return;
    }

    // 3) now init your assistant
    window.VoiceAssistant?.destroy();
    window.VoiceAssistant?.init({
      backendUrl: (document.getElementById('backendUrl') as HTMLInputElement).value,
      theme: 'theme-dark',
      position: 'bottom-right',
      voiceName: 'Aoede',
      features: {
        video: true,
        screenShare: true,
        fileUpload: true,
        pageAccess: true,
      },
      websiteContext: {
        name: 'Plain JS Demo',
        description: 'Multimodal AI assistant demo',
        customInstructions: 'You have ALL capabilities. Your name is Scarlett of BabaAI.',
      },
    });
  }

  function stopAssistant() {
    window.VoiceAssistant?.destroy();
  }

  return (
    <>
      {/* load your bundle before React hydrates */}
      <Script src='/src/voice-assistant-bundle.js' strategy='beforeInteractive' />

      <div className='container'>
        <h1>🎤 Voice Assistant</h1>
        <p>
          Plain‑JS demo of our multimodal AI assistant (voice, video, screen share, file‑analysis).
        </p>

        <input
          id='backendUrl'
          type='text'
          placeholder='wss://your-backend.com'
          defaultValue='wss://aiagent.babaai.live'
          className='config-input'
        />

        <button id='startBtn' className='demo-btn' onClick={startAssistant}>
          Start Assistant
        </button>
        <button id='stopBtn' className='demo-btn stop-btn' onClick={stopAssistant}>
          Stop Assistant
        </button>
      </div>
    </>
  );
}
