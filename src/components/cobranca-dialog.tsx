"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Copy, Check } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"

interface CobrancaDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  associado: {
    id: string
    nome: string
    sobrenome: string
    email: string
  }
}

interface CobrancaData {
  descricao: string
  valor: number
  dataVencimento: Date
  tipo: "MENSALIDADE" | "TAXA_EXTRA" | "OUTRO"
}

export function CobrancaDialog({ open, onOpenChange, associado }: CobrancaDialogProps) {
  const [formData, setFormData] = useState<CobrancaData>({
    descricao: "",
    valor: 0,
    dataVencimento: new Date(),
    tipo: "MENSALIDADE"
  })
  const [pixCode, setPixCode] = useState<string>("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsGenerating(true)
    
    try {
      // Simular geração de código PIX
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Gerar código PIX aleatório para demonstração
      const randomPixCode = `00020126360014BR.GOV.BCB.PIX0114+12345678900002052040000530398654041${formData.valor.toFixed(2)}5802BR5925Associação Recanto do Guanandi6009São Paulo62070503***6304${Math.floor(Math.random() * 10000)}`
      
      setPixCode(randomPixCode)
      
      toast({
        title: "Cobrança gerada com sucesso!",
        description: "O código PIX foi gerado e está pronto para envio."
      })
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível gerar a cobrança. Tente novamente.",
        variant: "destructive"
      })
    } finally {
      setIsGenerating(false)
    }
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(pixCode)
      setCopied(true)
      toast({
        title: "Copiado!",
        description: "Código PIX copiado para a área de transferência."
      })
      
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível copiar o código.",
        variant: "destructive"
      })
    }
  }

  const handleInputChange = (field: keyof CobrancaData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Gerar Cobrança via PIX</DialogTitle>
          <DialogDescription>
            Crie uma nova cobrança para {associado.nome} {associado.sobrenome}
          </DialogDescription>
        </DialogHeader>

        {!pixCode ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Dados da Cobrança</CardTitle>
                <CardDescription>
                  Preencha as informações para gerar o código PIX
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="tipo">Tipo de Cobrança *</Label>
                    <Select
                      value={formData.tipo}
                      onValueChange={(value) => handleInputChange("tipo", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="MENSALIDADE">Mensalidade</SelectItem>
                        <SelectItem value="TAXA_EXTRA">Taxa Extra</SelectItem>
                        <SelectItem value="OUTRO">Outro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="valor">Valor (R$) *</Label>
                    <Input
                      id="valor"
                      type="number"
                      step="0.01"
                      min="0.01"
                      value={formData.valor || ""}
                      onChange={(e) => handleInputChange("valor", parseFloat(e.target.value) || 0)}
                      placeholder="0,00"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="descricao">Descrição *</Label>
                  <Textarea
                    id="descricao"
                    value={formData.descricao}
                    onChange={(e) => handleInputChange("descricao", e.target.value)}
                    placeholder="Descreva o propósito da cobrança..."
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>Data de Vencimento *</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !formData.dataVencimento && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.dataVencimento ? (
                          format(formData.dataVencimento, "dd/MM/yyyy")
                        ) : (
                          <span>Selecione uma data</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={formData.dataVencimento}
                        onSelect={(date) => {
                          if (date) {
                            handleInputChange("dataVencimento", date)
                          }
                        }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Resumo da Cobrança</h4>
                  <div className="space-y-1 text-sm">
                    <p><span className="font-medium">Associado:</span> {associado.nome} {associado.sobrenome}</p>
                    <p><span className="font-medium">Email:</span> {associado.email}</p>
                    <p><span className="font-medium">Tipo:</span> {formData.tipo === "MENSALIDADE" ? "Mensalidade" : formData.tipo === "TAXA_EXTRA" ? "Taxa Extra" : "Outro"}</p>
                    <p><span className="font-medium">Valor:</span> R$ {formData.valor.toFixed(2)}</p>
                    <p><span className="font-medium">Vencimento:</span> {formData.dataVencimento ? format(formData.dataVencimento, "dd/MM/yyyy") : "Não selecionado"}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancelar
              </Button>
              <Button 
                type="submit" 
                className="bg-green-600 hover:bg-green-700"
                disabled={isGenerating || !formData.descricao || !formData.valor || !formData.dataVencimento}
              >
                {isGenerating ? "Gerando..." : "Gerar Código PIX"}
              </Button>
            </div>
          </form>
        ) : (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Código PIX Gerado</CardTitle>
                <CardDescription>
                  Copie o código abaixo ou envie para o associado
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <Label className="font-medium">Código PIX Copia e Cola</Label>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={copyToClipboard}
                      className="flex items-center gap-2"
                    >
                      {copied ? (
                        <>
                          <Check className="h-4 w-4" />
                          Copiado
                        </>
                      ) : (
                        <>
                          <Copy className="h-4 w-4" />
                          Copiar
                        </>
                      )}
                    </Button>
                  </div>
                  <Textarea
                    value={pixCode}
                    readOnly
                    className="min-h-[100px] font-mono text-xs"
                  />
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">Instruções</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Copie o código PIX acima</li>
                    <li>• Envie para o associado por email ou WhatsApp</li>
                    <li>• O associado deverá colar o código no app do banco</li>
                    <li>• O pagamento será confirmado automaticamente</li>
                  </ul>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Valor:</span>
                    <p className="text-lg font-semibold">R$ {formData.valor.toFixed(2)}</p>
                  </div>
                  <div>
                    <span className="font-medium">Vencimento:</span>
                    <p>{format(formData.dataVencimento, "dd/MM/yyyy")}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Fechar
              </Button>
              <Button 
                onClick={() => {
                  setPixCode("")
                  setIsGenerating(false)
                }}
                variant="outline"
              >
                Gerar Nova Cobrança
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}