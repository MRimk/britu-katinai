import { NavLink, Route, Routes } from "react-router-dom";
import Home from "./routes/Home";
import About from "./routes/About";
import Contacts from "./routes/Contacts";
import Parents from "./routes/Cats";
import CatDetail from "./routes/CatDetail";
import Litters from "./routes/Litters";
import LitterDetail from "./routes/LitterDetail";
import Layout from "./components/Layout";

export default function App() {
  return (
    <Layout>
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/cats" element={<Parents />} />
          <Route path="/cats/:slug" element={<CatDetail />} />
          <Route path="/litters" element={<Litters />} />
          <Route path="/litters/:litterId" element={<LitterDetail />} />
        </Routes>
      </main>
    </Layout>
  );
}
