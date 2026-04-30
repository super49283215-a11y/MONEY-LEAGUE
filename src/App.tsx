/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import LeagueInfo from "./pages/LeagueInfo";
import News from "./pages/News";
import Admin from "./pages/Admin";
import History from "./pages/History";
import Match from "./pages/Match";
import { CMSProvider } from "./context/CMSContext";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <CMSProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <ScrollToTop />
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/info" element={<LeagueInfo />} />
              <Route path="/history" element={<History />} />
              <Route path="/match" element={<Match />} />
              <Route path="/news" element={<News />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </CMSProvider>
  );
}
