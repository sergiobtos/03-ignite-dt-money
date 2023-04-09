import * as Dialog from '@radix-ui/react-dialog'
import { CloseButton, Content, Overlay, TransactionType, TransactionTypeButton } from './styles'
import { ArrowCircleDown, ArrowCircleUp, X } from 'phosphor-react'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'

const newTransactionFormSchema = z.object({
    description: z.string(),
    price: z.number(),
    category: z.string(),
    type: z.enum(['income', 'outcome']),
})

type newTransactionFormInputs = z.infer<typeof newTransactionFormSchema>;

export function NewTransactionModal() {
    const {control, register, handleSubmit, formState : {isSubmitting}}= useForm<newTransactionFormInputs>({
        resolver: zodResolver(newTransactionFormSchema),
        defaultValues:{
            type: 'income', 
        }
    })

    function handleNewTransaction(data: newTransactionFormInputs) {
        console.log(data)
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
                    <input type='text'  placeholder='Description' required {...register('description')}/>
                    <input type='number'  placeholder='Amount' required {...register('price',{valueAsNumber: true})}/>
                    <input type='text'  placeholder='Category' required {...register('category')}/>
                    <Controller control={control} name="type" render={({field})=>{
                        return(
                            <TransactionType onValueChange={field.onChange} value={field.value}>
                                <TransactionTypeButton variant='income' value='income'>
                                    <ArrowCircleUp size={24}/>
                                    In
                                </TransactionTypeButton>
                                <TransactionTypeButton variant='outcome' value='outcome'>
                                    <ArrowCircleDown size={24} />
                                    Out
                                </TransactionTypeButton>                        
                            </TransactionType>
                        )
                    }}/>
                    <button type='submit' disabled={isSubmitting}>
                        Add
                    </button>
                </form>
            </Content>
    </Dialog.Portal>
    )
}