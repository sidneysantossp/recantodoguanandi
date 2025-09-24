import { NextRequest, NextResponse } from 'next/server'
import { dataStore } from '@/lib/data-store'

interface RouteParams {
  params: {
    id: string
  }
}

// GET - Obter associado por ID
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const associado = dataStore.getAssociadoById(params.id)
    
    if (!associado) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Associado não encontrado' 
        },
        { status: 404 }
      )
    }
    
    return NextResponse.json({
      success: true,
      data: associado
    })
  } catch (error) {
    console.error('Erro ao buscar associado:', error)
    return NextResponse.json(
      { 
        success: false, 
        message: 'Erro ao buscar associado',
        error: error.message 
      },
      { status: 500 }
    )
  }
}

// PUT - Atualizar associado
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const body = await request.json()
    
    // Validar campos obrigatórios
    if (!body.name && !body.email && !body.phone && !body.status && !body.monthlyFee) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Pelo menos um campo deve ser atualizado' 
        },
        { status: 400 }
      )
    }
    
    // Validar email se fornecido
    if (body.email) {
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
    }
    
    // Validar status se fornecido
    if (body.status) {
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
    }
    
    // Validar mensalidade se fornecida
    if (body.monthlyFee && (typeof body.monthlyFee !== 'number' || body.monthlyFee < 0)) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Mensalidade deve ser um número positivo' 
        },
        { status: 400 }
      )
    }
    
    const updatedAssociado = dataStore.updateAssociado({
      id: params.id,
      ...body
    })
    
    return NextResponse.json({
      success: true,
      message: 'Associado atualizado com sucesso',
      data: updatedAssociado
    })
    
  } catch (error) {
    console.error('Erro ao atualizar associado:', error)
    
    if (error.message === 'Associado não encontrado') {
      return NextResponse.json(
        { 
          success: false, 
          message: error.message 
        },
        { status: 404 }
      )
    }
    
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
        message: 'Erro ao atualizar associado',
        error: error.message 
      },
      { status: 500 }
    )
  }
}

// DELETE - Deletar associado
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    dataStore.deleteAssociado(params.id)
    
    return NextResponse.json({
      success: true,
      message: 'Associado deletado com sucesso'
    })
    
  } catch (error) {
    console.error('Erro ao deletar associado:', error)
    
    if (error.message === 'Associado não encontrado') {
      return NextResponse.json(
        { 
          success: false, 
          message: error.message 
        },
        { status: 404 }
      )
    }
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'Erro ao deletar associado',
        error: error.message 
      },
      { status: 500 }
    )
  }
}