import React from 'react'
import { Switch } from '@headlessui/react'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="my-2 rounded-md bg-red-50 p-4 dark:bg-red-900/20">
          <div className="flex flex-col items-center justify-center">
            <h3 className="mb-2 text-lg font-semibold text-red-800 dark:text-red-200">
              Unable to Load Data
            </h3>
            <p className="mb-4 text-center text-red-700 dark:text-red-300">
              {this.state.error?.message ||
                'An error occurred while loading the data. Please try switching semesters or try again.'}
            </p>
            <div className="flex flex-col items-center gap-4">
              <div className="flex items-center gap-2">
                <p className="text-sm font-semibold">Try switching semester:</p>
                <Switch
                  checked={this.props.enabled}
                  onChange={this.props.onToggle}
                  className={`${
                    this.props.enabled
                      ? 'bg-blue-600'
                      : 'bg-white dark:bg-gray-500'
                  } relative inline-flex h-6 w-11 items-center rounded-full`}
                >
                  <span
                    className={`${
                      this.props.enabled ? 'translate-x-6' : 'translate-x-1'
                    } inline-block h-4 w-4 transform rounded-full bg-gray-200 transition dark:bg-white`}
                  />
                </Switch>
                <span className="text-sm">
                  {this.props.enabled ? 'Even' : 'Odd'} Sem
                </span>
              </div>
              <button
                onClick={this.props.onRetry}
                className="rounded bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
