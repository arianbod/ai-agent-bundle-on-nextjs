// File location: src/app/about/page.tsx
export default function AboutPage() {
  return (
    <main className='min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-800 text-white'>
      <div className='container mx-auto px-4 py-8'>
        <div className='max-w-4xl mx-auto'>
          <h1 className='text-4xl font-bold mb-8'>About Us</h1>

          <div className='bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20'>
            <p className='text-lg mb-6'>
              This is the about page. The global voice assistant button is still available in the
              top-right corner - it follows you across all pages!
            </p>

            <p className='text-gray-300 mb-4'>Try asking the AI assistant about:</p>

            <ul className='list-disc list-inside text-gray-300 space-y-2'>
              <li>"What can you tell me about this page?"</li>
              <li>"How can I navigate back to the homepage?"</li>
              <li>"What features does this website have?"</li>
              <li>"Can you help me find specific information?"</li>
            </ul>

            <div className='mt-8 p-4 bg-white/5 rounded-lg'>
              <h3 className='font-semibold text-green-400 mb-2'>💡 Pro Tip</h3>
              <p className='text-sm text-gray-300'>
                The AI can see this entire page and understand its content. It knows you're on the
                "About" page and can help you with navigation or answer questions about our company.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
