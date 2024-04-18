import CryptoDataTable from "./components/CryptoTable";
import CryptoTableInfinite from "./components/CryptoTableInfinite";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import PeopleTable from "./components/PeopleTable";

const queryClient1 = new QueryClient();
const queryClient2 = new QueryClient();

function App() {
  return (
    <>
      <div style={{ width: '80%', margin: 'auto' }}>
        <h1 className="text-4xl font-bold">React Crypto Table Demo</h1>
        <p className="text-gray-500">
          This is a demo of a table component built with React Table.
        </p>
      </div>
      <div style={{ width: '80%', margin: 'auto' }}>
        <CryptoDataTable/>
      </div>
      <QueryClientProvider client={queryClient1}>
          <CryptoTableInfinite/>
      </QueryClientProvider>
      <QueryClientProvider client={queryClient2}>
          <PeopleTable/>
      </QueryClientProvider>
    </>
  );
}

export default App;