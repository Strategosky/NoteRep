import Head from 'next/head'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Login from '@/components/Login'
import { CompactHeader } from './noterepbot'
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth'
import firebase from 'firebase/compat/app'
import { firebaseConfig } from '@/firebaseconfig'
import { Button } from '@/components/Button'

// Initialize Firebase if not already done
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
} else {
  firebase.app()
}

const auth = getAuth()

export default function LoginPage() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        setUser(authUser)
      } else {
        setUser(null)
      }
      setLoading(false)
    })

    // Check for theme preference
    if (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }

    return () => unsubscribe()
  }, [])

  const handleLogin = (loggedInUser) => {
    setUser(loggedInUser)
  }

  const handleLogout = async () => {
    try {
      await signOut(auth)
      setUser(null)
      router.push('/login')
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  const handleGoToChat = () => {
    router.push('/chat')
  }

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col bg-indigo-50 dark:bg-gray-900">
        <CompactHeader />
        <div className="flex flex-1 items-center justify-center">
          <div className="text-center">
            <div className="animate-spin mb-4 h-8 w-8 rounded-full border-4 border-blue-500 border-t-transparent"></div>
            <p className="text-gray-500 dark:text-gray-400">Loading...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>NoteRep Chat - Profile & Login</title>
        <meta
          name="description"
          content="Manage your profile and login to engage in real-time chat with other students on NoteRep"
        />
        <meta name="theme-color" content="black-translucent" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="keywords"
          content="noterep, chat, student chat, real-time chat, login, profile"
        />
        <meta name="author" content="Shravan Revanna" />
      </Head>
      <main className="flex min-h-screen flex-col bg-indigo-50 dark:bg-gray-900">
        <CompactHeader />
        <section className="flex flex-1 flex-col py-3 sm:py-10">
          {user ? (
            <div className="container mx-auto max-w-md p-4">
              <h2 className="mb-6 text-center text-2xl font-bold text-gray-900 dark:text-white">
                Profile
              </h2>
              <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
                <div className="mb-6">
                  <p className="mb-2 text-lg font-medium text-gray-900 dark:text-white">
                    Display Name:{' '}
                    <span className="font-normal">
                      {user.displayName || 'User'}
                    </span>
                  </p>
                  {user.email && (
                    <p className="mb-2 text-lg font-medium text-gray-900 dark:text-white">
                      Email: <span className="font-normal">{user.email}</span>
                    </p>
                  )}
                  <p className="text-lg font-medium text-gray-900 dark:text-white">
                    Chat Username:{' '}
                    <span className="font-normal">
                      {localStorage.getItem('randomUsername') || 'Not Set'}
                    </span>
                  </p>
                </div>
                <div className="flex flex-col gap-3">
                  <Button
                    onClick={handleGoToChat}
                    className="w-full rounded-md bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-600"
                  >
                    Go to Chat
                  </Button>
                  <Button
                    onClick={handleLogout}
                    className="w-full rounded-md bg-red-500 px-4 py-2 text-white transition-colors hover:bg-red-600 dark:bg-red-700 dark:hover:bg-red-600"
                  >
                    Logout
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <Login onLogin={handleLogin} setUser={setUser} />
          )}
        </section>
      </main>
    </>
  )
}
