import { ITransaction } from "./types/types"

const TRANSACTIONS = 'transactions'
export const Storage = {
  prepare(items) {
    try {
      return JSON.stringify(items)
    } catch {
      return "Invalid data"
    }
  },
  parse(data:string):[] {
    if (!data) return []
    try {
      return JSON.parse(data)
    } catch {
      return []
    }
  },
  get(key: string):ITransaction[] {
    return this.parse(localStorage.getItem(key))
  },
  save(key: string, items: []) {
    localStorage.setItem(key, this.prepare(items))
  },
  getTransactions(): ITransaction[] {
    return this.get(TRANSACTIONS)
  },
  saveTransactions(items: ITransaction[]) {
    if  (!Array.isArray(items)) return
    return this.save(TRANSACTIONS, items)
  }
}