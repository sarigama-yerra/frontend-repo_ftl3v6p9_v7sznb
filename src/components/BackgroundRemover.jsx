import React, { useEffect, useRef, useState } from 'react'
import { RemoveBackground } from '@imgly/background-removal'

export default function BackgroundRemover() {
  const inputRef = useRef(null)
  const canvasRef = useRef(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [resultUrl, setResultUrl] = useState('')

  const onSelectFile = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setError('')
    setResultUrl('')
    setLoading(true)
    try {
      const imageBitmap = await createImageBitmap(file)
      const remover = await RemoveBackground({ debug: false })
      const result = await remover(imageBitmap)
      // result is an ImageData; draw to canvas to get PNG URL
      const canvas = canvasRef.current
      canvas.width = result.width
      canvas.height = result.height
      const ctx = canvas.getContext('2d')
      ctx.putImageData(result, 0, 0)
      const url = canvas.toDataURL('image/png')
      setResultUrl(url)
    } catch (err) {
      console.error(err)
      setError(err?.message || 'Не удалось обработать изображение')
    } finally {
      setLoading(false)
    }
  }

  const download = () => {
    if (!resultUrl) return
    const a = document.createElement('a')
    a.href = resultUrl
    a.download = 'background-removed.png'
    a.click()
  }

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-6 shadow-xl">
      <div className="space-y-4">
        <div>
          <label className="block text-sm text-blue-200 mb-2">Загрузите изображение</label>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={onSelectFile}
            className="block w-full text-sm text-blue-100 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 cursor-pointer"
          />
        </div>

        {loading && (
          <div className="text-blue-200">Обработка изображения… это займёт несколько секунд</div>
        )}

        {error && (
          <div className="text-red-300">{error}</div>
        )}

        <canvas ref={canvasRef} className="w-full rounded-lg bg-slate-900/30" />

        {resultUrl && (
          <div className="flex gap-3">
            <button onClick={download} className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700">Скачать PNG</button>
            <a href={resultUrl} target="_blank" rel="noreferrer" className="px-4 py-2 rounded-lg bg-slate-700 text-white hover:bg-slate-600">Открыть в новой вкладке</a>
          </div>
        )}
      </div>
    </div>
  )
}
