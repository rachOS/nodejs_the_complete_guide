import path from 'node:path'

export const getRootDir: string = path.dirname(<string>require?.main?.filename)
