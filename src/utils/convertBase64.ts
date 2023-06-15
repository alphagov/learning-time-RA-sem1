import { Buffer } from 'buffer'

export const convertBase64ToString = (data: string) =>
  Buffer.from(data, 'base64').toString('utf-8')
