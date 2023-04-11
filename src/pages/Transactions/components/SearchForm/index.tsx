import { useForm } from 'react-hook-form'
import { SearchFormContainer } from './styles'
import { MagnifyingGlass } from 'phosphor-react'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { TransactionsContext } from '../../../../contexts/TransactionsContext'
import { useContextSelector } from 'use-context-selector'
import { memo } from 'react'

const searchFormSchema = z.object({
  query: z.string(),
})

type SearchFormInput = z.infer<typeof searchFormSchema>

function SearchFormComponent() {
  const { fetchTransactions } = useContextSelector(
    TransactionsContext,
    (context) => {
      return {
        fetchTransactions: context.fetchTransactions,
      }
    },
  )

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SearchFormInput>({
    resolver: zodResolver(searchFormSchema),
  })

  async function handleSearchTransaction(data: SearchFormInput) {
    await fetchTransactions(data.query)
  }

  return (
    <SearchFormContainer onSubmit={handleSubmit(handleSearchTransaction)}>
      <input
        type="text"
        placeholder="Search by transactions"
        {...register('query')}
      />

      <button type="submit" disabled={isSubmitting}>
        <MagnifyingGlass size={20} />
        Search
      </button>
    </SearchFormContainer>
  )
}

export const SearchForm = memo(SearchFormComponent)
