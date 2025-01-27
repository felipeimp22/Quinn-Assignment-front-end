// pages/_app.tsx
import { AuthProvider } from '../context/AuthContext';
import type { AppProps } from 'next/app';
import { AuthGuard } from '@/common/guards/AuthGuard';
import { ThemeProvider, DefaultTheme } from 'styled-components'
import defaultTheme from '@/styles/themes/default'
import usePersistedState from '@/hooks/usePersistedState';
import Header from '@/components/header/header';
import GlobalStyle from '@/styles/global'

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [theme,] = usePersistedState<DefaultTheme>({ key: 'theme', initialState: defaultTheme })
  return (
    <AuthProvider>
      <AuthGuard>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <Header />
        <Component {...pageProps} />
        </ThemeProvider>
      </AuthGuard>
    </AuthProvider>
  );
};

export default MyApp;
