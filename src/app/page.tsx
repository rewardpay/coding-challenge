import AccountInfo from "./components/Account/AccountInfo";
import Footer from "./components/Footer";
import Header from "./components/Header";

export default function Home() {
  return (
    <div className="layout">
      <header>
        <Header />
      </header>
      <main>
        <AccountInfo />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}
