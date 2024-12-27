import '@/styles/globals.css';
import React from 'react';
import App from 'next/app';
import { ErrorBoundary } from 'react-error-boundary';
import { AuthProvider } from '@/components/Provider/AuthProvider';
import { ThemeProvider } from '@/components/Provider/ThemeProvider';

class MyApp extends App {
  componentDidCatch(error: any, info: any) {
    // You can log the error here or send it to a monitoring service
    console.error('An error occurred:', error, info);
  }

  render() {
    const { Component, pageProps, err } = this.props;

    return (
      <ErrorBoundary fallback={<div>error</div>}>
        <ThemeProvider>
          <AuthProvider>
            <Component {...pageProps} />
          </AuthProvider>
        </ThemeProvider>
      </ErrorBoundary>
    );
  }
}

export default MyApp;
