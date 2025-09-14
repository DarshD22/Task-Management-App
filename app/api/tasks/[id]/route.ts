import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Task from '@/models/Task';
import { verifyToken } from '@/lib/auth';
import mongoose from 'mongoose';

type Context = {
  params: {
    id: string;
  };
};

export async function PUT(
  req: NextRequest,
  { params }: Context
) {
  try {
    const token = req.cookies.get('token')?.value;
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const payload = verifyToken(token);
    if (!payload) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    await dbConnect();
    const data = await req.json();
    
    // Convert string ID to MongoDB ObjectId
    const taskId = new mongoose.Types.ObjectId(params.id);
    
    const task = await Task.findOneAndUpdate(
      { _id: taskId, userId: payload.userId },
      data,
      { new: true }
    ).lean();

    if (!task) {
      return NextResponse.json({ error: 'Task not found' }, { status: 404 });
    }

    return NextResponse.json(task);
  } catch (error) {
    console.error('Update task error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: Context
) {
  try {
    const token = req.cookies.get('token')?.value;
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const payload = verifyToken(token);
    if (!payload) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    await dbConnect();
    
    const taskId = new mongoose.Types.ObjectId(params.id);
    
    const task = await Task.findOneAndDelete({
      _id: taskId,
      userId: payload.userId
    }).lean();

    if (!task) {
      return NextResponse.json({ error: 'Task not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Task deleted' });
  } catch (error) {
    console.error('Delete task error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}