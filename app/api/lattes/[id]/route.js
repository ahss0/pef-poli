import { NextResponse } from 'next/server';

export async function GET(request, context) {

  const params = await context.params;
  const id = params.id;

  try {
    const res = await fetch(`https://uspaberta.ime.usp.br/api/v1/faculty-members/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: 'Erro ao buscar dados na API da USP Aberta' },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json(
      { error: 'Falha na conexão com a API' },
      { status: 500 }
    );
  }
}
