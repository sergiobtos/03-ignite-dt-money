import { HeaderContainer, HeaderContent, NewTransactionButton } from './styles'
import * as Dialog from '@radix-ui/react-dialog'
import logoImg from '../../assets/logo.svg'
import { NewTransactionModal } from '../NewTransactionModal'
import { useState } from 'react'

export function Header() {
  const [open, setOpen] = useState(false)

  function handleClose() {
    setOpen(false)
  }

  return (
    <HeaderContainer>
      <HeaderContent>
        <img src={logoImg} alt="logo" />
        <Dialog.Root open={open} onOpenChange={setOpen}>
          <Dialog.Trigger asChild>
            <NewTransactionButton>New Transaction</NewTransactionButton>
          </Dialog.Trigger>
          <NewTransactionModal handleClose={handleClose} />
        </Dialog.Root>
      </HeaderContent>
    </HeaderContainer>
  )
}
