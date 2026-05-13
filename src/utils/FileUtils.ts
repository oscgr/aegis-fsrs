export default {
  toBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      const cleanup = () => {
        reader.removeEventListener('load', onLoad)
        reader.removeEventListener('error', onError)
      }

      const onLoad = () => {
        cleanup()
        resolve(reader.result as string) // readAsDataURL returns a string
      }

      const onError = () => {
        cleanup()
        reject(reader.error)
      }

      reader.addEventListener('load', onLoad)
      reader.addEventListener('error', onError)

      reader.readAsDataURL(file)
    })
  },

  async compressBlobWithGzip(originalBlob: Blob) {
    const stream = originalBlob.stream()
    const compressionStream = new CompressionStream('gzip')
    const compressedStream = stream.pipeThrough(compressionStream)
    const response = new Response(compressedStream)
    return await response.blob()
  },
  async decompressBlobWithGzip(compressedBlob: Blob) {
    const decompressionStream = new DecompressionStream('gzip')
    const decompressedStream = compressedBlob.stream().pipeThrough(decompressionStream)
    const response = new Response(decompressedStream)
    return await response.blob()
  },

  async classicDownload(blob: Blob, filename: string) {
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.style.display = 'none'
    a.href = url
    a.download = filename
    document.body.append(a)
    a.click()
    a.remove()
    setTimeout(() => URL.revokeObjectURL(url), 100)
  },

  async uploadDexieDB() {
    try {
      // @ts-expect-error showSaveFilePicker does not exist anywhere except chromium-based browsers
      const [fileHandle] = await window.showOpenFilePicker({
        types: [
          {
            description: 'Gzip Archive',
            accept: {
              'application/gzip': ['.gz'],
            },
          },
        ],
        multiple: false,
      })

      // 2. Get and return the actual File object
      return await fileHandle.getFile() as Blob
    } catch(error: any) {
      // Gracefully handle user cancellations or API errors
      if (error.name !== 'AbortError') {
        console.error('Failed to open the file picker:', error)
      }
      return null
    }
  },
  async downloadDexieDB(blob: Blob, suggestedFilename: string) {
    // @ts-expect-error showSaveFilePicker does not exist anywhere except chromium-based browsers
    if (!window.showSaveFilePicker) {
      console.warn('[FileUtils] File System Access API not supported. Falling back to classic download.')
      return this.classicDownload(blob, suggestedFilename)
    }

    try {
    // @ts-expect-error showSaveFilePicker does not exist anywhere except chromium-based browsers
      const fileHandle = await window.showSaveFilePicker({
        suggestedName: suggestedFilename,
        types: [
          {
            description: 'Compressed database export',
            accept: {
              'application/gzip': ['.gz'],
            },
          },
        ],
      })

      const writableStream = await fileHandle.createWritable()
      await writableStream.write(blob)
      await writableStream.close()
    } catch(error: any) {
      if (error.name !== 'AbortError') {
        console.error('An error occurred while saving the file:', error)
      }
    }
  },
}
