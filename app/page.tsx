// app/voice-demo/page.tsx
'use client';

import { useEffect, useRef } from 'react';
import Head from 'next/head';

export const metadata = {
  title: 'Voice Assistant – BabaAI',
};

export default function VoiceDemoPage() {
  const backendUrlRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // iOS Safari AudioContext Fix
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    if (isIOS && isSafari && (window as any).Utils) {
      console.log('🍎 Patching Utils.audioContext for iOS Safari');
      const Utils = (window as any).Utils;
      const original = Utils.audioContext;
      Utils.audioContext = async (opts = {}) => {
        try {
          const Ctx = window.AudioContext || (window as any).webkitAudioContext;
          const ctx = new Ctx(opts);
          if (ctx.state === 'suspended') await ctx.resume();
          console.log('✅ Patched AudioContext');
          return ctx;
        } catch {
          return original(opts);
        }
      };
    }
    console.log('🎤 Voice Assistant Demo Ready!');
    return () => {
      (window as any).VoiceAssistant?.destroy();
    };
  }, []);

  function getConfig() {
    return {
      backendUrl: backendUrlRef.current?.value || '',
      theme: 'theme-dark',
      position: 'bottom-right',
      voiceName: 'Aoede',
    };
  }

  function startFullDemo() {
    console.log('🚀 Starting Full Demo...');
    (window as any).VoiceAssistant?.destroy();
    (window as any).VoiceAssistant.init({
      ...getConfig(),
      features: {
        video: true,
        screenShare: true,
        fileUpload: true,
        pageAccess: true,
      },
      websiteContext: {
        name: 'Voice Assistant Demo',
        description: 'Complete multimodal AI assistant demonstration',
        customInstructions:
          'You have access to ALL capabilities: voice, video, screen sharing, file analysis, and complete page access. Be helpful and demonstrate your multimodal abilities! Your name is Scarlett and you work for BabaAI.',
      },
    });
  }

  function stopAssistant() {
    console.log('⏹️ Stopping Assistant...');
    (window as any).VoiceAssistant.destroy();
  }

  return (
    <>
      <Head>
        <link rel='stylesheet' href='/src/voice‑assistant‑bundle.css' />
        <script src='/src/voice‑assistant‑bundle.js' defer />
      </Head>
      <div className='container'>
        <div className='header'>
          <h1>🎤 Voice Assistant</h1>
          <p>
            Complete multimodal AI assistant with voice, video, screen sharing, file upload, and
            page access capabilities.
          </p>
        </div>

        <div className='config'>
          <div className='config-row'>
            <label>Backend URL:</label>
            <input
              ref={backendUrlRef}
              defaultValue='wss://aiagent.babaai.live'
              placeholder='wss://your-backend.com'
            />
          </div>
        </div>

        <div className='demo-card'>
          <h3>🚀 AI Assistant</h3>
          <p>
            Voice, video, screen sharing, file upload, and complete page access. The full multimodal
            AI experience.
          </p>
          <button onClick={startFullDemo}>Start Assistant</button>
          <button className='stop-btn' onClick={stopAssistant}>
            Stop Assistant
          </button>
        </div>

        <div className='footer'>
          <p>Built with ❤️ by BabaAI • Powered by Gemini 2.0 Flash</p>
        </div>
      </div>

      {/* bring in your original CSS globally */}
      <style global jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
          background: linear-gradient(135deg, #1e1b4b, #312e81, #1e40af);
          min-height: 100vh;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }
        .container {
          text-align: center;
          max-width: 500px;
          width: 100%;
        }
        .header h1 {
          font-size: 2.5rem;
          font-weight: 800;
          background: linear-gradient(135deg, #60a5fa, #c084fc, #f472b6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 10px;
        }
        .header p {
          font-size: 1rem;
          opacity: 0.8;
          margin-bottom: 40px;
          line-height: 1.5;
        }
        .config {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 12px;
          padding: 20px;
          margin-bottom: 30px;
          text-align: left;
        }
        .config-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 10px;
        }
        .config-row:last-child {
          margin-bottom: 0;
        }
        .config-row label {
          color: white;
        }
        .config-row input {
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 6px;
          padding: 8px 12px;
          color: white;
          font-size: 0.9rem;
          width: 200px;
        }
        .demo-card {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(20px);
          border-radius: 20px;
          padding: 30px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          margin-bottom: 20px;
        }
        .demo-card h3 {
          font-size: 1.5rem;
          margin-bottom: 15px;
          color: #60a5fa;
        }
        .demo-card p {
          margin-bottom: 25px;
          opacity: 0.9;
          line-height: 1.5;
        }
        button {
          width: 100%;
          padding: 15px;
          border: none;
          border-radius: 12px;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          color: white;
          font-weight: 600;
          cursor: pointer;
          font-size: 1.1rem;
          transition: all 0.3s;
        }
        button:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(99, 102, 241, 0.4);
        }
        button:active {
          transform: translateY(0);
        }
        .stop-btn {
          background: linear-gradient(135deg, #ef4444, #dc2626);
          margin-top: 15px;
          padding: 12px;
          font-size: 1rem;
        }
        .stop-btn:hover {
          box-shadow: 0 10px 30px rgba(239, 68, 68, 0.4);
        }
        .footer {
          margin-top: 30px;
          opacity: 0.6;
          font-size: 0.9rem;
        }
        @media (max-width: 768px) {
          .header h1 {
            font-size: 2rem;
          }
          .config-row {
            flex-direction: column;
            align-items: flex-start;
            gap: 8px;
          }
          .config-row input {
            width: 100%;
          }
        }
      `}</style>
    </>
  );
}
