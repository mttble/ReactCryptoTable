import { DataTableDemo } from "./components/Home";

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
      <DataTableDemo />
    </div>
    </>
  );
}

export default App;
