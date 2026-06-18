import Navbar from "./components/layout/Navbar";
import { AppRouter } from "./components/routes/AppRoutes";
import Footer from "./components/layout/Footer";

function App() {
  return (
    <div className="d-flex flex-column vh-100">
      <Navbar />

      <main className="flex-grow-1">
        <AppRouter />
      </main>

      <Footer />
    </div>
  );
}
export default App;
