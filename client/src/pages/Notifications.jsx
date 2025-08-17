import React from 'react'
import { Bell } from 'lucide-react'

const Notifications = () => {
  return (
    <section className="h-[100%] flex p-4">
      <div className="flex flex-col items-center justify-center space-y-4 w-full p-3 bg-white">
        <div className="bg-blue-100 p-4 rounded-full">
          <Bell className="w-8 h-8 text-blue-500" />
        </div>
        <h2 className="text-xl font-semibold text-gray-800">No Notifications</h2>
        <p className="text-sm text-gray-500">
          You're all caught up. We'll let you know when something new comes in.
        </p>
      </div>
    </section>
  )
}

export default Notifications
