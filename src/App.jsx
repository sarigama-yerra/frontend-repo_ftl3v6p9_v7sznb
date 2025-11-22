import React from 'react'
import Header from './components/Header'
import BackgroundRemover from './components/BackgroundRemover'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05),transparent_50%)]"></div>

      <div className="relative min-h-screen flex items-center justify-center p-6">
        <div className="max-w-3xl w-full">
          <Header />
          <BackgroundRemover />
          <div className="text-center mt-6 text-blue-300/60 text-sm">
            Работает локально в браузере, без отправки изображений на сервер
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
