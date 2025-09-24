import { NextRequest, NextResponse } from 'next/server'
import { dataStore } from '@/lib/data-store'

// GET - Listar todos os associados
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search')
    
    let associados = dataStore.getAssociados()
    
    // Filtrar por busca se houver
    if (search) {
      associados = associados.filter(associado =>
        associado.name.toLowerCase().includes(search.toLowerCase()) ||
        associado.email.toLowerCase().includes(search.toLowerCase()) ||
        associado.phone.includes(search)
      )
    }
    
    return NextResponse.json({
      success: true,
      data: associados,
      total: associados.length
    })
  } catch (error) {
    console.error('Erro ao listar associados:', error)
    return NextResponse.json(
      { 
        success: false, 
        message: 'Erro ao listar associados',
        error: error.message 
      },
      { status: 500 }
    )
  }
}

// POST - Criar novo associado
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validar campos obrigatórios
    const requiredFields = ['name', 'email', 'phone', 'status', 'monthlyFee']
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { 
            success: false, 
            message: `O campo ${field} é obrigatório` 
          },
          { status: 400 }
        )
      }
    }
    
    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Email inválido' 
        },
        { status: 400 }
      )
    }
    
    // Validar status
    const validStatuses = ['ativo', 'inativo', 'pendente']
    if (!validStatuses.includes(body.status)) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Status inválido. Use: ativo, inativo ou pendente' 
        },
        { status: 400 }
      )
    }
    
    // Validar mensalidade
    if (typeof body.monthlyFee !== 'number' || body.monthlyFee < 0) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Mensalidade deve ser um número positivo' 
        },
        { status: 400 }
      )
    }
    
    const newAssociado = dataStore.createAssociado(body)
    
    return NextResponse.json({
      success: true,
      message: 'Associado criado com sucesso',
      data: newAssociado
    }, { status: 201 })
    
  } catch (error) {
    console.error('Erro ao criar associado:', error)
    
    if (error.message === 'Email já cadastrado') {
      return NextResponse.json(
        { 
          success: false, 
          message: error.message 
        },
        { status: 409 }
      )
    }
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'Erro ao criar associado',
        error: error.message 
      },
      { status: 500 }
    )
  }
}