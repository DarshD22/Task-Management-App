'use client';

import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Trash2, Edit, Check, X } from 'lucide-react';
import { apiClient } from '@/lib/api-client';

interface Task {
  _id: string;
  title: string;
  description: string;
  status: 'pending' | 'done';
  createdAt: string;
}

export default function TaskCard({ task }: { task: Task }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    title: task.title,
    description: task.description,
  });
  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationFn: async (updates: Partial<Task>) => {
      try {
        const response = await apiClient.updateTask(task._id, updates);
        return response;
      } catch (error) {
        console.error('Update request failed:', error);
        throw error;
      }
    },
    onMutate: async (updates) => {
      await queryClient.cancelQueries({ queryKey: ['tasks'] });
      const previousTasks = queryClient.getQueryData(['tasks']);
      
      queryClient.setQueryData(['tasks'], (old: any) => {
        if (!old || !old.tasks) return old;
        return {
          ...old,
          tasks: old.tasks.map((t: Task) =>
            t._id === task._id ? { ...t, ...updates } : t
          ),
        };
      });
      
      return { previousTasks };
    },
    onError: (err, updates, context) => {
      console.error('Update task error:', err);
      queryClient.setQueryData(['tasks'], context?.previousTasks);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async () => {
      try {
        const response = await apiClient.deleteTask(task._id);
        return response;
      } catch (error) {
        console.error('Delete request failed:', error);
        throw error;
      }
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['tasks'] });
      const previousTasks = queryClient.getQueryData(['tasks']);
      
      queryClient.setQueryData(['tasks'], (old: any) => {
        if (!old || !old.tasks) return old;
        return {
          ...old,
          tasks: old.tasks.filter((t: Task) => t._id !== task._id),
          pagination: {
            ...old.pagination,
            total: (old.pagination?.total || 0) - 1
          }
        };
      });
      
      return { previousTasks };
    },
    onError: (err, variables, context) => {
      console.error('Delete task error:', err);
      queryClient.setQueryData(['tasks'], context?.previousTasks);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  const handleStatusToggle = async () => {
    try {
      await updateMutation.mutateAsync({
        status: task.status === 'pending' ? 'done' : 'pending',
      });
    } catch (error) {
      console.error('Failed to update task status:', error);
    }
  };

  const handleSaveEdit = () => {
    updateMutation.mutate(editForm);
    setIsEditing(false);
  };

  return (
    <div className={`border rounded-lg p-4 ${task.status === 'done' ? 'bg-gray-50' : 'bg-white'}`}>
      {isEditing ? (
        <div className="space-y-2">
          <input
            type="text"
            value={editForm.title}
            onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
            className="w-full px-3 py-1 border rounded text-gray-500"
          />
          <textarea
            value={editForm.description}
            onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
            className="w-full px-3 py-1 border rounded text-gray-500"
            rows={2}
          />
          <div className="flex gap-2">
            <button
              onClick={handleSaveEdit}
              className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              <Check size={16} />
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-start mb-2 text-black">
            <h3 className={`text-lg font-semibold ${task.status === 'done' ? 'line-through text-gray-500' : ''}`}>
              {task.title}
            </h3>
            <div className="flex gap-2">
              <button
                onClick={() => setIsEditing(true)}
                className="text-blue-500 hover:text-blue-700"
              >
                <Edit size={18} />
              </button>
              <button
                onClick={() => {
                  if (window.confirm('Are you sure you want to delete this task?')) {
                    deleteMutation.mutate();
                  }
                }}
                className="text-red-500 hover:text-red-700"
                disabled={deleteMutation.isPending}
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
          <p className="text-gray-500 mb-3">{task.description}</p>
          <div className="flex justify-between items-center">
            <button
              onClick={handleStatusToggle}
              disabled={updateMutation.isPending}
              className={`px-3 py-1 rounded text-sm ${
                task.status === 'pending'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-green-100 text-green-800'
              } ${updateMutation.isPending ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {updateMutation.isPending 
                ? 'Updating...' 
                : task.status === 'pending' 
                  ? 'Mark as Done' 
                  : 'Mark as Pending'
              }
            </button>
            <span className="text-xs text-gray-400">
              {new Date(task.createdAt).toLocaleDateString()}
            </span>
          </div>
        </>
      )}
    </div>
  );
}