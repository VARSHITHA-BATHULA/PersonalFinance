import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import { Transaction } from '@/lib/types';
import { ObjectId } from 'mongodb';
import { z } from 'zod';

// Validation schema for POST and PUT requests
const transactionSchema = z.object({
  amount: z.number().min(0.01, 'Amount must be greater than 0'),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format (YYYY-MM-DD)'),
  description: z.string().min(1, 'Description is required'),
  category: z.string().min(1, 'Category is required'),
  _id: z.string().optional(),
});


export async function POST(request: Request) {
  try {
    const data = await request.json();
    console.log("Incoming data:", data);
    const validatedData = transactionSchema.parse(data);
    const db = await getDb();
    const result = await db.collection<Transaction>('transactions').insertOne({
      ...validatedData,
      date: new Date(validatedData.date).toISOString(),
    });
    return NextResponse.json({ _id: result.insertedId.toString(), ...validatedData });
  } catch (error) {
    console.error('POST /api/transactions error:', error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to create transaction' }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const db = await getDb();
    const transactions = await db.collection<Transaction>('transactions').find().toArray();
    return NextResponse.json(transactions);
  } catch (error) {
    console.error('GET /api/transactions error:', error);
    return NextResponse.json({ error: 'Failed to fetch transactions' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const data = await request.json();
        console.log("Incoming data:", data);
    const validatedData = transactionSchema.parse(data);
    if (!validatedData._id) {
      return NextResponse.json({ error: 'Transaction ID is required' }, { status: 400 });
    }
    const db = await getDb();
    const result = await db.collection<Transaction>('transactions').updateOne(
      { _id: new ObjectId(validatedData._id) as any }, // Cast to bypass TypeScript error
      {
        $set: {
          amount: validatedData.amount,
          date: new Date(validatedData.date).toISOString(),
          description: validatedData.description,
          category: validatedData.category,
        },
      }
    );
    if (result.modifiedCount === 0) {
      return NextResponse.json({ error: 'Transaction not found' }, { status: 404 });
    }
    return NextResponse.json(validatedData);
  } catch (error) {
    console.error('PUT /api/transactions error:', error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to update transaction' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    if (!id || typeof id !== 'string') {
      return NextResponse.json({ error: 'Valid transaction ID is required' }, { status: 400 });
    }
    const db = await getDb();
    const result = await db.collection<Transaction>('transactions').deleteOne({
      _id: new ObjectId(id) as any, // Cast to bypass TypeScript error
    });
    if (result.deletedCount === 0) {
      return NextResponse.json({ error: 'Transaction not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Transaction deleted' });
  } catch (error) {
    console.error('DELETE /api/transactions error:', error);
    return NextResponse.json({ error: 'Failed to delete transaction' }, { status: 500 });
  }
}
