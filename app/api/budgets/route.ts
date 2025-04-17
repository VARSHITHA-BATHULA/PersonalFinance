import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import { Budget } from '@/lib/types';
import { ObjectId } from 'mongodb';
import { z } from 'zod';

// Validation schema for POST and PUT requests
const budgetSchema = z.object({
  category: z.string().min(1, 'Category is required'),
  amount: z.number().min(0, 'Amount must be non-negative'),
  month: z.string().regex(/^\d{4}-\d{2}$/, 'Invalid month format (YYYY-MM)'),
  _id: z.string().optional(),
});

export async function GET() {
  try {
    const db = await getDb();
    const budgets = await db
      .collection<Budget>('budgets')
      .find({})
      .sort({ month: -1 }) // Optional: most recent budgets first
      .toArray();
    return NextResponse.json(budgets);
  } catch (error) {
    console.error('GET /api/budgets error:', error);
    return NextResponse.json({ error: 'Failed to fetch budgets' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const validatedData = budgetSchema.parse(data);
    const db = await getDb();
    const result = await db.collection<Budget>('budgets').insertOne(validatedData);
    return NextResponse.json({ _id: result.insertedId.toString(), ...validatedData });
  } catch (error) {
    console.error('POST /api/budgets error:', error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to create budget' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const data = await request.json();
    const validatedData = budgetSchema.parse(data);
    if (!validatedData._id) {
      return NextResponse.json({ error: 'Budget ID is required' }, { status: 400 });
    }
    const db = await getDb();
    const result = await db.collection<Budget>('budgets').updateOne(
      { _id: new ObjectId(validatedData._id) as any }, // Cast to bypass TypeScript error
      {
        $set: {
          category: validatedData.category,
          amount: validatedData.amount,
          month: validatedData.month,
        },
      }
    );
    if (result.modifiedCount === 0) {
      return NextResponse.json({ error: 'Budget not found' }, { status: 404 });
    }
    return NextResponse.json(validatedData);
  } catch (error) {
    console.error('PUT /api/budgets error:', error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to update budget' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    if (!id || typeof id !== 'string') {
      return NextResponse.json({ error: 'Valid budget ID is required' }, { status: 400 });
    }
    const db = await getDb();
    const result = await db.collection<Budget>('budgets').deleteOne({
      _id: new ObjectId(id) as any, // Cast to bypass TypeScript error
    });
    if (result.deletedCount === 0) {
      return NextResponse.json({ error: 'Budget not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Budget deleted' });
  } catch (error) {
    console.error('DELETE /api/budgets error:', error);
    return NextResponse.json({ error: 'Failed to delete budget' }, { status: 500 });
  }
}
