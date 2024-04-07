import Error404 from "../components/Error404";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function NotFound() {
  return (
    <div>
        <header>
          <Header />
        </header>
        <main className="flex-1">
          <Error404 />
        </main>
        <Footer />
      </div>
  );
}