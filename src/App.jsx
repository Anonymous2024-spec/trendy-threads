import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      
      <div className="flex flex-col flex-1">
        <Header />
        
        <main className="flex-1 overflow-auto">
        </main>
        
        <Footer />
      </div>
    </div>
  );
}

export default App;
