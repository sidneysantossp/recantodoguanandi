"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Upload, X } from "lucide-react"

interface AssociadoFormProps {
  onSubmit: (data: AssociadoFormData) => void
  onCancel: () => void
  initialData?: Partial<AssociadoFormData>
  isLoading?: boolean
}

export interface AssociadoFormData {
  nome: string
  sobrenome: string
  cpf: string
  telefone: string
  email: string
  senha: string
  loteNumero: string
  loteQuadra: string
  loteLoteamento: string
  loteEndereco?: string
  loteCidade?: string
  loteEstado?: string
  imagemPerfil?: string
}

export function AssociadoForm({ onSubmit, onCancel, initialData, isLoading = false }: AssociadoFormProps) {
  const [formData, setFormData] = useState<AssociadoFormData>({
    nome: initialData?.nome || "",
    sobrenome: initialData?.sobrenome || "",
    cpf: initialData?.cpf || "",
    telefone: initialData?.telefone || "",
    email: initialData?.email || "",
    senha: initialData?.senha || "",
    loteNumero: initialData?.loteNumero || "",
    loteQuadra: initialData?.loteQuadra || "",
    loteLoteamento: initialData?.loteLoteamento || "",
    loteEndereco: initialData?.loteEndereco || "",
    loteCidade: initialData?.loteCidade || "",
    loteEstado: initialData?.loteEstado || "",
    imagemPerfil: initialData?.imagemPerfil || ""
  })

  const [imagePreview, setImagePreview] = useState<string | null>(
    initialData?.imagemPerfil || null
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const handleInputChange = (field: keyof AssociadoFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        setImagePreview(result)
        handleInputChange("imagemPerfil", result)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => {
    setImagePreview(null)
    handleInputChange("imagemPerfil", "")
  }

  const formatCPF = (value: string) => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2")
  }

  const formatTelefone = (value: string) => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d)/, "$1-$2")
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>{initialData ? "Editar Associado" : "Novo Associado"}</CardTitle>
        <CardDescription>
          Preencha os dados do associado e informações do loteamento
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Foto de Perfil */}
          <div className="flex flex-col items-center space-y-4">
            <Avatar className="h-24 w-24">
              <AvatarImage src={imagePreview || undefined} />
              <AvatarFallback className="text-lg">
                {formData.nome ? formData.nome[0] : "?"}
                {formData.sobrenome ? formData.sobrenome[0] : "?"}
              </AvatarFallback>
            </Avatar>
            <div className="flex items-center space-x-2">
              <Label htmlFor="imagem" className="cursor-pointer">
                <div className="flex items-center space-x-2 px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors">
                  <Upload className="h-4 w-4" />
                  <span className="text-sm">Foto de Perfil</span>
                </div>
              </Label>
              <Input
                id="imagem"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
                disabled={isLoading}
              />
              {imagePreview && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={removeImage}
                  disabled={isLoading}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>

          {/* Dados Pessoais */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Dados Pessoais</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nome">Nome *</Label>
                <Input
                  id="nome"
                  value={formData.nome}
                  onChange={(e) => handleInputChange("nome", e.target.value)}
                  disabled={isLoading}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sobrenome">Sobrenome *</Label>
                <Input
                  id="sobrenome"
                  value={formData.sobrenome}
                  onChange={(e) => handleInputChange("sobrenome", e.target.value)}
                  disabled={isLoading}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cpf">CPF *</Label>
                <Input
                  id="cpf"
                  value={formData.cpf}
                  onChange={(e) => handleInputChange("cpf", formatCPF(e.target.value))}
                  placeholder="000.000.000-00"
                  disabled={isLoading}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="telefone">Telefone *</Label>
                <Input
                  id="telefone"
                  value={formData.telefone}
                  onChange={(e) => handleInputChange("telefone", formatTelefone(e.target.value))}
                  placeholder="(00) 00000-0000"
                  disabled={isLoading}
                  required
                />
              </div>
            </div>
          </div>

          {/* Dados de Acesso */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Dados de Acesso</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="associado@recanto.com"
                  disabled={isLoading}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="senha">Senha *</Label>
                <Input
                  id="senha"
                  type="password"
                  value={formData.senha}
                  onChange={(e) => handleInputChange("senha", e.target.value)}
                  disabled={isLoading}
                  required
                />
              </div>
            </div>
          </div>

          {/* Dados do Lote */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Dados do Lote</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="loteLoteamento">Loteamento *</Label>
                <Input
                  id="loteLoteamento"
                  value={formData.loteLoteamento}
                  onChange={(e) => handleInputChange("loteLoteamento", e.target.value)}
                  disabled={isLoading}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="loteQuadra">Quadra *</Label>
                <Input
                  id="loteQuadra"
                  value={formData.loteQuadra}
                  onChange={(e) => handleInputChange("loteQuadra", e.target.value)}
                  disabled={isLoading}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="loteNumero">Número do Lote *</Label>
                <Input
                  id="loteNumero"
                  value={formData.loteNumero}
                  onChange={(e) => handleInputChange("loteNumero", e.target.value)}
                  disabled={isLoading}
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="loteEndereco">Endereço</Label>
                <Input
                  id="loteEndereco"
                  value={formData.loteEndereco}
                  onChange={(e) => handleInputChange("loteEndereco", e.target.value)}
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="loteCidade">Cidade</Label>
                <Input
                  id="loteCidade"
                  value={formData.loteCidade}
                  onChange={(e) => handleInputChange("loteCidade", e.target.value)}
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="loteEstado">Estado</Label>
                <Select
                  value={formData.loteEstado}
                  onValueChange={(value) => handleInputChange("loteEstado", value)}
                  disabled={isLoading}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="AC">Acre</SelectItem>
                    <SelectItem value="AL">Alagoas</SelectItem>
                    <SelectItem value="AP">Amapá</SelectItem>
                    <SelectItem value="AM">Amazonas</SelectItem>
                    <SelectItem value="BA">Bahia</SelectItem>
                    <SelectItem value="CE">Ceará</SelectItem>
                    <SelectItem value="DF">Distrito Federal</SelectItem>
                    <SelectItem value="ES">Espírito Santo</SelectItem>
                    <SelectItem value="GO">Goiás</SelectItem>
                    <SelectItem value="MA">Maranhão</SelectItem>
                    <SelectItem value="MT">Mato Grosso</SelectItem>
                    <SelectItem value="MS">Mato Grosso do Sul</SelectItem>
                    <SelectItem value="MG">Minas Gerais</SelectItem>
                    <SelectItem value="PA">Pará</SelectItem>
                    <SelectItem value="PB">Paraíba</SelectItem>
                    <SelectItem value="PR">Paraná</SelectItem>
                    <SelectItem value="PE">Pernambuco</SelectItem>
                    <SelectItem value="PI">Piauí</SelectItem>
                    <SelectItem value="RJ">Rio de Janeiro</SelectItem>
                    <SelectItem value="RN">Rio Grande do Norte</SelectItem>
                    <SelectItem value="RS">Rio Grande do Sul</SelectItem>
                    <SelectItem value="RO">Rondônia</SelectItem>
                    <SelectItem value="RR">Roraima</SelectItem>
                    <SelectItem value="SC">Santa Catarina</SelectItem>
                    <SelectItem value="SP">São Paulo</SelectItem>
                    <SelectItem value="SE">Sergipe</SelectItem>
                    <SelectItem value="TO">Tocantins</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Botões */}
          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={onCancel} disabled={isLoading}>
              Cancelar
            </Button>
            <Button type="submit" className="bg-green-600 hover:bg-green-700" disabled={isLoading}>
              {isLoading ? "Salvando..." : initialData ? "Atualizar" : "Cadastrar"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}