import React, { useState, useEffect } from 'react'
import firebase from 'firebase/compat/app'
import { firebaseConfig } from '@/firebaseconfig'
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  updateProfile,
} from 'firebase/auth'
import { getFirestore, getDoc, doc, setDoc } from 'firebase/firestore/lite'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { getOrCreateUserId, generateRandomUsername } from '@/utils/user'

const googleProvider = new GoogleAuthProvider()

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
} else {
  firebase.app()
}

const auth = getAuth()
const db = getFirestore()

function Login({ onLogin, setUser }) {
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user)
        handleUserData(user)
      } else {
        setUser(null)
      }
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

  const handleUserData = async (user) => {
    const deviceId = getOrCreateUserId()
    const userRef = doc(db, 'sisusers', user.uid)
    const userDoc = await getDoc(userRef)

    if (!userDoc.exists()) {
      let randomUsername = localStorage.getItem('randomUsername')
      if (!randomUsername) {
        randomUsername = generateRandomUsername()
        localStorage.setItem('randomUsername', randomUsername)
      }

      await setDoc(userRef, {
        id: user.uid,
        displayName: user.displayName || 'User',
        email: user.email || '',
        phoneNumber: user.phoneNumber || '',
        deviceId: deviceId,
        trackingUsername: randomUsername,
        createdAt: new Date().toISOString(),
        isAdmin: false,
      })
    }

    if (typeof onLogin === 'function') {
      onLogin(user)
    }
  }

  const handleGoogleLogin = async () => {
    setLoading(true)
    try {
      const result = await signInWithPopup(auth, googleProvider)
      const user = result.user
      if (!user.displayName || user.displayName === 'User') {
        const randomName = generateRandomUsername()
        await updateProfile(user, { displayName: randomName })
      }
    } catch (error) {
      console.error('Google sign-in error:', error)
      toast.error('Error signing in with Google. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 dark:bg-gray-900 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <img
            src="/icon-192x192.png"
            alt="NoteRep Logo"
            className="mx-auto mb-4 h-16 w-auto"
          />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Welcome to NoteRep
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Sign in with Google to continue
          </p>
        </div>

        <div className="mt-8 rounded-lg bg-white p-6 shadow-xl dark:bg-gray-800">
          <button
            className="flex w-full items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 dark:bg-blue-700 dark:hover:bg-blue-800"
            onClick={handleGoogleLogin}
            disabled={loading}
          >
            {loading ? (
              'Signing in...'
            ) : (
              <>
                <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Sign in with Google
              </>
            )}
          </button>
        </div>
        <ToastContainer position="top-right" autoClose={5000} />
      </div>
    </div>
  )
}

export default Login
