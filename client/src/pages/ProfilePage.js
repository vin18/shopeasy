import { useState } from 'react'
import Orders from '../components/Orders'
import ProfileForm from '../components/ProfileForm'

const ProfilePage = () => {
  const [tab, setTab] = useState('profile')

  return (
    <div className="flex justify-center flex-col mt-2">
      <div className="flex justify-center mb-4">
        <button
          className={`px-4 py-2 ${
            tab === 'profile' && 'bg-indigo-500 text-indigo-50 '
          } rounded-md`}
          onClick={() => setTab('profile')}
        >
          Profile
        </button>
        <button
          className={`px-4 py-2  ${
            tab === 'orders' && 'bg-indigo-500 text-indigo-50 '
          } rounded-md`}
          onClick={() => setTab('orders')}
        >
          Orders
        </button>
      </div>
      {tab === 'profile' && <ProfileForm />}
      {tab === 'orders' && <Orders />}
    </div>
  )
}

export default ProfilePage
