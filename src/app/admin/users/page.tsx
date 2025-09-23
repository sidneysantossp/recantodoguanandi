"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Plus, Search, MoreHorizontal, Edit, Trash2, CreditCard } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { AssociadoDialog, AssociadoFormData } from "@/components/associado-dialog"
import { CobrancaDialog } from "@/components/cobranca-dialog"
import { useToast } from "@/hooks/use-toast"

interface User {
  id: string
  email: string
  name?: string
  role: "COMMON" | "ADMIN"
}

interface Associado {
  id: string
  nome: string
  sobrenome: string
  cpf: string
  telefone: string
  imagemPerfil?: string
  loteNumero: string
  loteQuadra: string
  loteLoteamento: string
  user?: User
}

export default function UsersPage() {
  const [user, setUser] = useState<User | null>(null)
  const [associados, setAssociados] = useState<Associado[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isCobrancaDialogOpen, setIsCobrancaDialogOpen] = useState(false)
  const [editingAssociado, setEditingAssociado] = useState<Associado | null>(null)
  const [selectedAssociado, setSelectedAssociado] = useState<Associado | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    // Verificar se o usuário está autenticado
    const userData = localStorage.getItem("user")
    if (!userData) {
      router.push("/")
      return
    }

    const parsedUser = JSON.parse(userData)
    if (parsedUser.role !== "ADMIN") {
      router.push("/")
      return
    }

    setUser(parsedUser)
    // Carregar associados (mockado por enquanto)
    loadMockAssociados()
  }, [router])

  const loadMockAssociados = () => {
    // Dados mockados para demonstração
    const mockAssociados: Associado[] = [
      {
        id: "1",
        nome: "João",
        sobrenome: "Silva",
        cpf: "123.456.789-00",
        telefone: "(11) 99999-9999",
        loteNumero: "15",
        loteQuadra: "A",
        loteLoteamento: "Recanto do Guanandi",
        user: {
          id: "1",
          email: "joao.silva@email.com",
          name: "João Silva",
          role: "COMMON"
        }
      },
      {
        id: "2",
        nome: "Maria",
        sobrenome: "Santos",
        cpf: "987.654.321-00",
        telefone: "(11) 98888-8888",
        loteNumero: "23",
        loteQuadra: "B",
        loteLoteamento: "Recanto do Guanandi",
        user: {
          id: "2",
          email: "maria.santos@email.com",
          name: "Maria Santos",
          role: "COMMON"
        }
      },
      {
        id: "3",
        nome: "Pedro",
        sobrenome: "Oliveira",
        cpf: "456.789.123-00",
        telefone: "(11) 97777-7777",
        loteNumero: "08",
        loteQuadra: "C",
        loteLoteamento: "Recanto do Guanandi",
        user: {
          id: "3",
          email: "pedro.oliveira@email.com",
          name: "Pedro Oliveira",
          role: "COMMON"
        }
      }
    ]
    setAssociados(mockAssociados)
  }

  const handleLogout = () => {
    localStorage.removeItem("user")
    router.push("/")
  }

  const handleAssociadoSubmit = async (data: AssociadoFormData) => {
    setIsLoading(true)
    try {
      // Simulação de API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const newAssociado: Associado = {
        id: Date.now().toString(),
        nome: data.nome,
        sobrenome: data.sobrenome,
        cpf: data.cpf,
        telefone: data.telefone,
        loteNumero: data.loteNumero,
        loteQuadra: data.loteQuadra,
        loteLoteamento: data.loteLoteamento,
        user: {
          id: Date.now().toString(),
          email: data.email,
          name: `${data.nome} ${data.sobrenome}`,
          role: "COMMON"
        }
      }

      if (editingAssociado) {
        // Atualizar associado
        setAssociados(prev => prev.map(a => a.id === editingAssociado.id ? newAssociado : a))
        toast({
          title: "Associado atualizado com sucesso!",
          description: `${data.nome} ${data.sobrenome} foi atualizado no sistema.`
        })
      } else {
        // Adicionar novo associado
        setAssociados(prev => [...prev, newAssociado])
        toast({
          title: "Associado cadastrado com sucesso!",
          description: `${data.nome} ${data.sobrenome} foi adicionado ao sistema.`
        })
      }
      
      setEditingAssociado(null)
    } catch (error) {
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao salvar o associado.",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleEdit = (associado: Associado) => {
    setEditingAssociado(associado)
    setIsDialogOpen(true)
  }

  const handleGerarCobranca = (associado: Associado) => {
    setSelectedAssociado(associado)
    setIsCobrancaDialogOpen(true)
  }

  const filteredAssociados = associados.filter(associado =>
    associado.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    associado.sobrenome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    associado.cpf.includes(searchTerm)
  )

  const getInitials = (nome: string, sobrenome: string) => {
    return `${nome[0]}${sobrenome[0]}`.toUpperCase()
  }

  return (
    <DashboardLayout user={user || { email: "", role: "ADMIN" }} onLogout={handleLogout}>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Gestão de Associados</h1>
            <p className="text-muted-foreground">
              Gerencie os associados da Associação Recanto do Guanandi
            </p>
          </div>
          <Button 
            className="bg-green-600 hover:bg-green-700"
            onClick={() => setIsDialogOpen(true)}
          >
            <Plus className="mr-2 h-4 w-4" />
            Novo Associado
          </Button>
        </div>

        {/* Cards de Resumo */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Associados</CardTitle>
              <div className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{associados.length}</div>
              <p className="text-xs text-muted-foreground">
                +2 em relação ao mês anterior
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Mensalidades Pagas</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">18</div>
              <p className="text-xs text-muted-foreground">
                90% de adimplência
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Mensalidades em Atraso</CardTitle>
              <div className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
              <p className="text-xs text-muted-foreground">
                10% de inadimplência
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Receita Mensal</CardTitle>
              <div className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">R$ 9.000</div>
              <p className="text-xs text-muted-foreground">
                Previsto para este mês
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Barra de Pesquisa */}
        <Card>
          <CardHeader>
            <CardTitle>Lista de Associados</CardTitle>
            <CardDescription>
              Visualize e gerencie todos os associados cadastrados
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por nome, CPF..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Associado</TableHead>
                  <TableHead>CPF</TableHead>
                  <TableHead>Telefone</TableHead>
                  <TableHead>Lote</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAssociados.map((associado) => (
                  <TableRow key={associado.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarImage src={associado.imagemPerfil} />
                          <AvatarFallback>
                            {getInitials(associado.nome, associado.sobrenome)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">
                            {associado.nome} {associado.sobrenome}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {associado.user?.email}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{associado.cpf}</TableCell>
                    <TableCell>{associado.telefone}</TableCell>
                    <TableCell>
                      <p className="text-sm">
                        {associado.loteLoteamento}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Quadra {associado.loteQuadra}, Lote {associado.loteNumero}
                      </p>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        Adimplente
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Ações</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => handleEdit(associado)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleGerarCobranca(associado)}>
                            <CreditCard className="mr-2 h-4 w-4" />
                            Gerar Cobrança
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Excluir
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <AssociadoDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSubmit={handleAssociadoSubmit}
        initialData={editingAssociado ? {
          nome: editingAssociado.nome,
          sobrenome: editingAssociado.sobrenome,
          cpf: editingAssociado.cpf,
          telefone: editingAssociado.telefone,
          email: editingAssociado.user?.email || "",
          senha: "",
          loteNumero: editingAssociado.loteNumero,
          loteQuadra: editingAssociado.loteQuadra,
          loteLoteamento: editingAssociado.loteLoteamento
        } : undefined}
        isLoading={isLoading}
      />

      {selectedAssociado && (
        <CobrancaDialog
          open={isCobrancaDialogOpen}
          onOpenChange={setIsCobrancaDialogOpen}
          associado={{
            id: selectedAssociado.id,
            nome: selectedAssociado.nome,
            sobrenome: selectedAssociado.sobrenome,
            email: selectedAssociado.user?.email || ""
          }}
        />
      )}
    </DashboardLayout>
  )
}