import { useForm } from "react-hook-form";
import { SearchFormContainer } from "./styles";
import { MagnifyingGlass } from "phosphor-react";
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const searchFormSchema = z.object({
    query: z.string(),
})

type SearchFormInput = z.infer<typeof searchFormSchema>;

export function SearchForm() {
    const {register, handleSubmit, formState : {isSubmitting}}= useForm<SearchFormInput>({
        resolver: zodResolver(searchFormSchema)
    })

    function handleSearchTransaction(data: SearchFormInput) {

    }


    return(
        <SearchFormContainer onSubmit={handleSubmit(handleSearchTransaction)}>
            <input 
                type="text" 
                placeholder="Search by transactions"
                {...register('query')}
            />

            <button type="submit" disabled={isSubmitting}>
               <MagnifyingGlass size={20}/>
               Search
            </button>
        </SearchFormContainer>
    )
}