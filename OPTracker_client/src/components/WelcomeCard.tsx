/**
 * Welcome Card
 * Displays a welcome message and buttons for testing notifications
 * 
 * Has to be removed before production
 */

import { showNotification } from '@/utils/notifications'
import { useTranslation } from 'react-i18next'

export default function WelcomeCard() {
  const { t } = useTranslation();

  return (
    <div className="fixed bottom-4 right-4 max-w-md p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
        {t('welcome.title')}
      </h2>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        {t('welcome.description')}
      </p>
      <div className="space-x-2">
        <button
          onClick={() => showNotification.success(t('welcome.notifications.success'))}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
        >
          {t('welcome.buttons.success')}
        </button>
        <button
          onClick={() => showNotification.error(t('welcome.notifications.error'))}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
        >
          {t('welcome.buttons.error')}
        </button>
      </div>
    </div>
  )
} 