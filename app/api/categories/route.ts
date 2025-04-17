import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import { Category } from '@/lib/types';

export async function GET() {
  try {
    const db = await getDb();
    const categories = await db.collection<Category>('categories').find({}).toArray();
    
    if (!categories || categories.length === 0) {
      return NextResponse.json({ message: 'No categories found' }, { status: 404 });
    }

    return NextResponse.json({ categories }, { status: 200 });
  } catch (error) {
    console.error('Error fetching categories:', error); // More detailed error log
    return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 });
  }
}

export async function POST() {
  try {
    const db = await getDb();
    const predefinedCategories: Category[] = [
      { name: 'Food' },
      { name: 'Transportation' },
      { name: 'Housing' },
      { name: 'Entertainment' },
      { name: 'Utilities' },
      { name: 'Other' },
    ];

    // Insert predefined categories if they don't already exist
    const existingCategories = await db.collection<Category>('categories').find({}).toArray();
    if (existingCategories.length === 0) {
      const result = await db.collection<Category>('categories').insertMany(predefinedCategories);
      return NextResponse.json({ message: `Successfully inserted ${result.insertedCount} categories.` }, { status: 201 });
    }

    return NextResponse.json({ message: 'Categories already exist.' }, { status: 200 });
  } catch (error) {
    console.error('Error inserting categories:', error); // More detailed error log
    return NextResponse.json({ error: 'Failed to create categories' }, { status: 500 });
  }
}
