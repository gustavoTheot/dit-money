import { useContextSelector } from 'use-context-selector'
import { TransactionsContext } from '../contexts/TransactionsContext'
import { useMemo } from 'react'

export function useSummary() {
  const transactions = useContextSelector(TransactionsContext, (context) => {
    return context.transactions
  })

  const summary = useMemo(() => {
    return transactions.reduce(
      (acumulator, transaction) => {
        if (transaction.type === 'income') {
          acumulator.income += transaction.price
          acumulator.total += transaction.price
        } else if (transaction.type === 'outcome') {
          acumulator.outcome += transaction.price
          acumulator.total -= transaction.price
        }

        return acumulator
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      },
    )
  }, [transactions])

  return summary
}
