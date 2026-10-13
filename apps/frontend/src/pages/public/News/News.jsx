import FlowScroll, { FlowSection } from "../../../components/FlowScroll/FlowScroll";
import NewsFeed from "../../../components/NewsFeed/NewsFeed";
import NewsHero from "../../../components/NewsHero/NewsHero";

export default function News() {
  return (
    <FlowScroll aria-label="News and insights">
      <FlowSection aria-label="News introduction" className="bg-black">
        <NewsHero />
      </FlowSection>
      <FlowSection aria-label="Latest construction and real estate stories" className="bg-white">
        <NewsFeed />
      </FlowSection>
    </FlowScroll>
  );
}