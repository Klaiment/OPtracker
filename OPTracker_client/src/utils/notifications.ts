/**
 * Notifications
 * Utility functions for displaying notifications
 */

import toast from 'react-hot-toast'

export const showNotification = {
  success: (message: string) => {
    toast.success(message, {
      duration: 4000,
      style: {
        background: '#10B981',
        color: '#fff',
      },
    })
  },
  
  error: (message: string) => {
    toast.error(message, {
      duration: 4000,
      style: {
        background: '#EF4444',
        color: '#fff',
      },
    })
  },
  
  loading: (message: string) => {
    return toast.loading(message, {
      style: {
        background: '#6B7280',
        color: '#fff',
      },
    })
  }
} 