export type User = {
    id?: string,
    firstName: string,
    lastName: string,
    emailId: string,
    password: string,
    expenses?: Expense[]
}

export type Expense = {
    id?: string,
    reason: string
    cost: number,
    date: string
}

export const STORAGE_USER =  'USER_STORAGE'
export const STORAGE_EXPENSE = 'USER_EXPENSE_STORAGE'