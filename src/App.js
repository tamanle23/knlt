// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import ScrollToTop from './components/ScrollToTop';
import { BaseOptionChartStyle } from './components/chart/BaseOptionChart';
import { GlobalStateProvider } from './GlobalState';

// ----------------------------------------------------------------------

export default function App() {
  return (
    <GlobalStateProvider>
      <ThemeProvider>
        <ScrollToTop />
        <BaseOptionChartStyle />
        <Router />
      </ThemeProvider>
    </GlobalStateProvider>
  );
}
