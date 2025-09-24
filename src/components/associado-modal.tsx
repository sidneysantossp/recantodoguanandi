'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { AssociadoForm } from './associado-form'
import { Associado } from '@/lib/data-store'

interface AssociadoModalProps {
  isOpen: boolean
  onClose: () => void
  associado?: Associado | null
  onSave: (associado: Associado) => void
}

export function AssociadoModal({ isOpen, onClose, associado, onSave }: AssociadoModalProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleSave = (savedAssociado: Associado) => {
    setIsLoading(false)
    onSave(savedAssociado)
    onClose()
  }

  const handleCancel = () => {
    setIsLoading(false)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {associado ? 'Editar Associado' : 'Novo Associado'}
          </DialogTitle>
          <DialogDescription>
            {associado 
              ? 'Atualize as informações do associado abaixo.'
              : 'Preencha os dados para cadastrar um novo associado.'
            }
          </DialogDescription>
        </DialogHeader>
        
        <AssociadoForm
          associado={associado}
          onSave={handleSave}
          onCancel={handleCancel}
          isLoading={isLoading}
        />
      </DialogContent>
    </Dialog>
  )
}