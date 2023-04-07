import { ReactNode, createContext, useEffect, useState } from "react";

export interface Transaction {
    id: number;
    description: string;
    type: 'income' | 'outcome';
    price: number;
    category: string;
    createdAt: string;
}

interface TransactionsType {
    transactions: Transaction[]
}

interface TransactionsProviderProps {
    children: ReactNode
}

export const TransactionsContext = createContext({} as TransactionsType)

export function TransactionsProvider({children}:TransactionsProviderProps) {
    const [transactions, setTransactions] = useState<Transaction[]>([])
    async function loadTransactions() {
        const res = await fetch('http://localhost:3000/transactions')
        const data = await res.json()
        setTransactions(data)
    }

    useEffect(()=>{
        loadTransactions();
    },[])

    return(
        <TransactionsContext.Provider value={{transactions}}>
          {children}  
        </TransactionsContext.Provider>
    )
}