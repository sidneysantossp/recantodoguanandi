// Sistema de armazenamento de dados usando localStorage
// Funciona como um banco de dados simples para o sistema

export interface Associado {
  id: string
  name: string
  email: string
  phone: string
  status: 'ativo' | 'inativo' | 'pendente'
  joinDate: string
  lastPayment: string
  monthlyFee: number
  address?: string
  city?: string
  state?: string
  cep?: string
}

export interface CreateAssociadoData {
  name: string
  email: string
  phone: string
  status: 'ativo' | 'inativo' | 'pendente'
  monthlyFee: number
  address?: string
  city?: string
  state?: string
  cep?: string
}

export interface UpdateAssociadoData extends Partial<CreateAssociadoData> {
  id: string
}

const STORAGE_KEY = 'recanto_associados'

class DataStore {
  // Obter todos os associados
  getAssociados(): Associado[] {
    try {
      if (typeof window === 'undefined') {
        // No servidor, retornar dados padrão
        return this.getServerDefaultData()
      }
      
      const data = localStorage.getItem(STORAGE_KEY)
      if (!data) {
        return this.initializeDefaultData()
      }
      return JSON.parse(data)
    } catch (error) {
      console.error('Erro ao recuperar associados:', error)
      return this.getServerDefaultData()
    }
  }

  // Obter associado por ID
  getAssociadoById(id: string): Associado | null {
    const associados = this.getAssociados()
    return associados.find(a => a.id === id) || null
  }

  // Criar novo associado
  createAssociado(data: CreateAssociadoData): Associado {
    const associados = this.getAssociados()
    
    // Verificar se email já existe
    if (associados.some(a => a.email === data.email)) {
      throw new Error('Email já cadastrado')
    }

    const newAssociado: Associado = {
      id: this.generateId(),
      ...data,
      joinDate: new Date().toISOString().split('T')[0],
      lastPayment: new Date().toISOString().split('T')[0]
    }

    associados.push(newAssociado)
    this.saveAssociados(associados)
    
    return newAssociado
  }

  // Atualizar associado
  updateAssociado(data: UpdateAssociadoData): Associado {
    const associados = this.getAssociados()
    const index = associados.findIndex(a => a.id === data.id)
    
    if (index === -1) {
      throw new Error('Associado não encontrado')
    }

    // Verificar se email já existe (se estiver sendo alterado)
    if (data.email && data.email !== associados[index].email) {
      if (associados.some(a => a.email === data.email && a.id !== data.id)) {
        throw new Error('Email já cadastrado')
      }
    }

    associados[index] = {
      ...associados[index],
      ...data
    }

    this.saveAssociados(associados)
    return associados[index]
  }

  // Deletar associado
  deleteAssociado(id: string): boolean {
    const associados = this.getAssociados()
    const index = associados.findIndex(a => a.id === id)
    
    if (index === -1) {
      throw new Error('Associado não encontrado')
    }

    associados.splice(index, 1)
    this.saveAssociados(associados)
    return true
  }

  // Salvar associados no localStorage
  private saveAssociados(associados: Associado[]): void {
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(associados))
      }
    } catch (error) {
      console.error('Erro ao salvar associados:', error)
      throw new Error('Erro ao salvar dados')
    }
  }

  // Gerar ID único
  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2)
  }

  // Inicializar dados padrão
  private initializeDefaultData(): Associado[] {
    const defaultAssociados = this.getServerDefaultData()
    
    if (typeof window !== 'undefined') {
      this.saveAssociados(defaultAssociados)
    }
    
    return defaultAssociados
  }

  // Obter dados padrão para servidor
  private getServerDefaultData(): Associado[] {
    return [
      {
        id: '1',
        name: 'João Silva',
        email: 'joao.silva@email.com',
        phone: '(11) 99999-8888',
        status: 'ativo',
        joinDate: '2023-01-15',
        lastPayment: '2024-11-15',
        monthlyFee: 150.00,
        address: 'Rua das Flores, 123',
        city: 'São Paulo',
        state: 'SP',
        cep: '01234-567'
      },
      {
        id: '2',
        name: 'Maria Santos',
        email: 'maria.santos@email.com',
        phone: '(11) 98888-7777',
        status: 'ativo',
        joinDate: '2023-03-20',
        lastPayment: '2024-11-10',
        monthlyFee: 150.00,
        address: 'Av. Paulista, 456',
        city: 'São Paulo',
        state: 'SP',
        cep: '01310-100'
      },
      {
        id: '3',
        name: 'Pedro Oliveira',
        email: 'pedro.oliveira@email.com',
        phone: '(11) 97777-6666',
        status: 'pendente',
        joinDate: '2023-06-10',
        lastPayment: '2024-10-15',
        monthlyFee: 150.00,
        address: 'Rua Augusta, 789',
        city: 'São Paulo',
        state: 'SP',
        cep: '01304-000'
      },
      {
        id: '4',
        name: 'Ana Costa',
        email: 'ana.costa@email.com',
        phone: '(11) 96666-5555',
        status: 'inativo',
        joinDate: '2023-02-28',
        lastPayment: '2024-08-15',
        monthlyFee: 150.00,
        address: 'Alameda Santos, 321',
        city: 'São Paulo',
        state: 'SP',
        cep: '01419-000'
      },
      {
        id: '5',
        name: 'Carlos Ferreira',
        email: 'carlos.ferreira@email.com',
        phone: '(11) 95555-4444',
        status: 'ativo',
        joinDate: '2023-04-05',
        lastPayment: '2024-11-12',
        monthlyFee: 150.00,
        address: 'Rua Oscar Freire, 654',
        city: 'São Paulo',
        state: 'SP',
        cep: '01432-000'
      }
    ]
  }
}

// Exportar instância única
export const dataStore = new DataStore()