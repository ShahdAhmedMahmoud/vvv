import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";


import Home from "../pages/public/Home/Home.jsx";
import Footer from "../components/Footer/Footer.jsx";

import CursorSpotlight from "../components/CursorSpotlight/CursorSpotlight.jsx";
import Projects from "../pages/public/Projects/Projects.jsx";
import ProjectDetails from "../pages/public/Projects/ProjectDetails.jsx";
import ScrollToTop from "../components/ScrollToTop/ScrollToTop.jsx";
import LanguageProvider from "../locales/LanguageContext/LanguageContext.jsx";
import Careers from "../pages/public/Careers/Careers.jsx";
import JobDetails from "../pages/public/JobDetails/JobDetails.jsx";
import Contact from "../pages/public/Contact/Contact.jsx"
import News from "../pages/public/News/News.jsx";
import NewsDetails from "../pages/public/News/NewsDetails.jsx";
import AddSupplier from "../pages/public/Suppliers/AddSupplier/AddSupplier";
import BIM from "../pages/public/BIM/BIM.jsx";
import MarketingProvider from "../features/marketing/MarketingProvider.jsx";
import MarketingLayout from "../pages/admin/marketing/MarketingLayout.jsx";
import DashboardPage from "../pages/admin/marketing/DashboardPage.jsx";
import { NewsEditorPage, NewsListPage } from "../pages/admin/marketing/NewsPages.jsx";
import { ProjectEditorPage, ProjectListPage } from "../pages/admin/marketing/ProjectPages.jsx";
import HeroPage from "../pages/admin/marketing/HeroPage.jsx";
import InquiriesPage from "../pages/admin/marketing/InquiriesPage.jsx";
import TrafficPage from "../pages/admin/marketing/TrafficPage.jsx";
import HomepageContentPage from "../pages/admin/marketing/ContentPages.jsx";
import TrackVisits from "../components/TrackVisits/TrackVisits.jsx";
import Navbar from "../components/Navbar/Navbar.jsx";

function PublicSite() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
    <ScrollToTop />
    {/* <CursorSpotlight /> */}
    <LanguageProvider>
      <MarketingProvider>
      <TrackVisits />
      <Routes>
        <Route path="/admin/marketing" element={<MarketingLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="news" element={<NewsListPage />} />
          <Route path="news/:id" element={<NewsEditorPage />} />
          <Route path="projects" element={<ProjectListPage />} />
          <Route path="projects/:id" element={<ProjectEditorPage />} />
          <Route path="hero" element={<HeroPage />} />
          <Route path="homepage" element={<HomepageContentPage />} />
          <Route path="inquiries" element={<InquiriesPage />} />
          <Route path="traffic" element={<TrafficPage />} />
        </Route>
        <Route element={<PublicSite />}>
          <Route path="/" element={<Home />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/careers/:jobId" element={<JobDetails />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:id" element={<ProjectDetails />} />
          <Route path="/news" element={<News />} />
          <Route path="/news/:id" element={<NewsDetails />} />
          <Route path="/suppliers/add" element={<AddSupplier />} />
          <Route path="/bim" element={<BIM />} />
        </Route>
      </Routes>
      </MarketingProvider>
      </LanguageProvider>
    </BrowserRouter>
  );
}