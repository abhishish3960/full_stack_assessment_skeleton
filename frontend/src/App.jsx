import React from 'react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import HomesForUser from './components/HomesForUser';

const queryClient = new QueryClient();

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <HomesForUser />
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
