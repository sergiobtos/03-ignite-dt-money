import * as Dialog from '@radix-ui/react-dialog'
import {
  CloseButton,
  Content,
  Overlay,
  TransactionType,
  TransactionTypeButton,
} from './styles'
import { ArrowCircleDown, ArrowCircleUp, X } from 'phosphor-react'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { TransactionsContext } from '../../contexts/TransactionsContext'
import { useContextSelector } from 'use-context-selector'

const newTransactionFormSchema = z.object({
  description: z.string(),
  price: z.number(),
  category: z.string(),
  type: z.enum(['income', 'outcome']),
})

type newTransactionFormInputs = z.infer<typeof newTransactionFormSchema>

export function NewTransactionModal({ handleClose }: any) {
  const { createTransaction } = useContextSelector(
    TransactionsContext,
    (context) => {
      return {
        createTransaction: context.createTransaction,
      }
    },
  )
  const {
    control,
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<newTransactionFormInputs>({
    resolver: zodResolver(newTransactionFormSchema),
    defaultValues: {
      type: 'income',
    },
  })

  async function handleNewTransaction(data: newTransactionFormInputs) {
    const { description, price, category, type } = data
    createTransaction({
      description,
      price,
      category,
      type,
    })
    reset()
    handleClose()
  }

  return (
    <Dialog.Portal>
      <Overlay />
      <Content>
        <Dialog.Title>New Transaction</Dialog.Title>
        <CloseButton>
          <X size={24} />
        </CloseButton>
        <form onSubmit={handleSubmit(handleNewTransaction)}>
          <input
            type="text"
            placeholder="Description"
            required
            {...register('description')}
          />
          <input
            type="number"
            placeholder="Amount"
            required
            {...register('price', { valueAsNumber: true })}
          />
          <input
            type="text"
            placeholder="Category"
            required
            {...register('category')}
          />
          <Controller
            control={control}
            name="type"
            render={({ field }) => {
              return (
                <TransactionType
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <TransactionTypeButton variant="income" value="income">
                    <ArrowCircleUp size={24} />
                    In
                  </TransactionTypeButton>
                  <TransactionTypeButton variant="outcome" value="outcome">
                    <ArrowCircleDown size={24} />
                    Out
                  </TransactionTypeButton>
                </TransactionType>
              )
            }}
          />
          <button type="submit" disabled={isSubmitting}>
            Add
          </button>
        </form>
      </Content>
    </Dialog.Portal>
  )
}
