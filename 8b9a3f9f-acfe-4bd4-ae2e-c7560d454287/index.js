const pooledDownload = async (connect, save, downloadList, maxConcurrency) => {
  const connections = []

  for (let i = 0; i < maxConcurrency; i++) {
    try {
      const connection = await connect()
      connections.push(connection)
    } catch (err) {
      break
    }
  }

  if (connections.length === 0) {
    throw new Error("connection failed")
  }

  const downloadQueue = [...downloadList]
  let errorOccurred = null

  const worker = async (connection) => {
    const { download, close } = connection
    try {
      while (downloadQueue.length > 0) {
        const url = downloadQueue.shift()
        const file = await download(url)
        await save(file)
      }
    } catch (err) {
      errorOccurred = err
    } finally {
      close()
    }
  }

  const workers = connections.map(worker)

  await Promise.allSettled(workers)

  if (errorOccurred) {
    throw errorOccurred
  }
}

module.exports = pooledDownload
