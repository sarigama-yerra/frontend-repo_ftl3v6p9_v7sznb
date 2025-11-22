import React from 'react'

export default function Header() {
  return (
    <header className="py-10 text-center">
      <div className="inline-flex items-center justify-center mb-4">
        <img src="/flame-icon.svg" alt="Flames" className="w-16 h-16 drop-shadow-[0_0_20px_rgba(59,130,246,0.5)]" />
      </div>
      <h1 className="text-4xl font-bold text-white tracking-tight">Удаление фона</h1>
      <p className="text-blue-200 mt-2">На основе @imgly/background-removal</p>
    </header>
  )
}
