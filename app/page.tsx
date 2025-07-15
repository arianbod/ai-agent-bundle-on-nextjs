// File location: src/app/page.tsx
export default function Home() {
  return (
    <main className='min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-blue-800 text-white'>
      <div className='container mx-auto px-4 py-8'>
        <div className='max-w-4xl mx-auto text-center'>
          <h1 className='text-4xl font-bold mb-8'>🎤 My Next.js App with Voice Assistant</h1>

          <div className='bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20 mb-8'>
            <p className='text-xl mb-6'>
              Click the "Start Assistant" button in the top-right corner to activate the AI voice
              assistant!
            </p>

            <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
              <div className='bg-white/5 rounded-lg p-6'>
                <h3 className='font-semibold text-blue-400 mb-3'>🎙️ Voice Chat</h3>
                <p className='text-sm text-gray-300'>
                  Natural voice conversation with AI assistant
                </p>
              </div>

              <div className='bg-white/5 rounded-lg p-6'>
                <h3 className='font-semibold text-green-400 mb-3'>📹 Video Support</h3>
                <p className='text-sm text-gray-300'>Share your camera or screen with the AI</p>
              </div>

              <div className='bg-white/5 rounded-lg p-6'>
                <h3 className='font-semibold text-purple-400 mb-3'>📄 Page Access</h3>
                <p className='text-sm text-gray-300'>AI can see and understand page content</p>
              </div>
            </div>
          </div>

          <div className='bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20'>
            <h2 className='text-2xl font-semibold mb-4'>How to Use</h2>
            <div className='text-left space-y-3 text-gray-300'>
              <p>1. 🎤 Click "Start Assistant" button (top-right corner)</p>
              <p>2. 🗣️ Allow microphone access when prompted</p>
              <p>3. 💬 Start talking to the AI assistant</p>
              <p>4. 📹 Optional: Enable video/screen sharing during conversation</p>
              <p>5. ⏹️ Click "Stop Assistant" when finished</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
