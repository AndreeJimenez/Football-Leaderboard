import type { NotificationProps } from '../types/Notification'

export const Notification = ({ message, type }: NotificationProps) => {
  const borderColor = {
    success: 'border-green-500',
    error: 'border-red-500',
    info: 'border-blue-500',
  }[type]

  const iconColor = {
    success: 'text-green-500',
    error: 'text-red-500',
    info: 'text-blue-500',
  }[type]

  const Icon = {
    success: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    ),
    error: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
    ),
    info: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  }[type]

  return (
    <div className={`fixed top-4 right-4 max-w-xs bg-white rounded-lg shadow-lg p-4 border-l-4 z-50 transform transition-transform duration-300 ${borderColor}`}>
      <div className="flex items-center">
        <div className={`flex-shrink-0 ${iconColor}`}>
          {Icon}
        </div>
        <div className="ml-3">
          <p className="text-sm text-gray-700">{message}</p>
        </div>
      </div>
    </div>
  )
}
