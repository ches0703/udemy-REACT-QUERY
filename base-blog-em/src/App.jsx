import { Posts } from "./Posts";
import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryCline = new QueryClient();

function App() {
  return (
    // provide React Query client to App
    <QueryClientProvider client={queryCline}>
      <div className="App">
        <h1>Blog &apos;em Ipsum</h1>
        <Posts />
      </div>
    </QueryClientProvider>
  );
}

export default App;
