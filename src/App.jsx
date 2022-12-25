import { Route, Routes } from "react-router-dom";
import { Header } from "components/navigation/Header";
import { Footer } from "components/navigation/Footer";
import { Home } from "components/home";
import { Layout } from "hoc/Layout";

const App = () => {
  return (
    <div className="App">
      <Header />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<p>Not found</p>} />
        </Routes>
      </Layout>

      <Footer />
    </div>
  );
};

export default App;

// const { createProxyMiddleware } = require("http-proxy-middleware");
// module.exports = function (app) {
//   app.use(
//     ["/api", "/auth/google"],
//     createProxyMiddleware({
//       target: "http://localhost:3001",
//     })
//   );
// };
