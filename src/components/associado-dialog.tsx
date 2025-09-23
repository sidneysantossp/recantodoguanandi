"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { AssociadoForm, AssociadoFormData } from "./associado-form"

interface AssociadoDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (data: AssociadoFormData) => void
  initialData?: Partial<AssociadoFormData>
  isLoading?: boolean
}

export function AssociadoDialog({
  open,
  onOpenChange,
  onSubmit,
  initialData,
  isLoading
}: AssociadoDialogProps) {
  const handleSubmit = (data: AssociadoFormData) => {
    onSubmit(data)
    onOpenChange(false)
  }

  const handleCancel = () => {
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {initialData ? "Editar Associado" : "Cadastrar Novo Associado"}
          </DialogTitle>
          <DialogDescription>
            {initialData 
              ? "Atualize as informações do associado selecionado."
              : "Preencha todas as informações para cadastrar um novo associado."
            }
          </DialogDescription>
        </DialogHeader>
        <AssociadoForm
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          initialData={initialData}
          isLoading={isLoading}
        />
      </DialogContent>
    </Dialog>
  )
}