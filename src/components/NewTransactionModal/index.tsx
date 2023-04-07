import * as Dialog from '@radix-ui/react-dialog'
import * as RadioGroup from "@radix-ui/react-radio-group"
import { CloseButton, Content, Overlay, TransactionType, TransactionTypeButton } from './styles'
import { ArrowCircleDown, ArrowCircleUp, X } from 'phosphor-react'

export function NewTransactionModal() {
    return (
        <Dialog.Portal>
        <Overlay />
            <Content>
                <Dialog.Title>New Transaction</Dialog.Title>
                <CloseButton>
                   <X size={24} /> 
                </CloseButton>
                <form action=''>
                    <input type='text'  placeholder='Description' required/>
                    <input type='number'  placeholder='Amount' required/>
                    <input type='text'  placeholder='Category' required/>
                    <TransactionType>
                        <TransactionTypeButton variant='income' value='income'>
                            <ArrowCircleUp size={24}/>
                            In
                        </TransactionTypeButton>
                        <TransactionTypeButton variant='outcome' value='outcome'>
                            <ArrowCircleDown size={24} />
                            Out
                        </TransactionTypeButton>                        
                    </TransactionType>
                    <button type='submit'>
                        Add
                    </button>
                </form>
            </Content>
    </Dialog.Portal>
    )
}