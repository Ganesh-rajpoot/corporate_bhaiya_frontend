import { useState } from "react";
import { stories } from "../services/stories";
import { StoryCard } from "../components/StoryCard";
import { Pagination } from "../components/Pagination";
import GodHeader from "../components/GodHeader";
import HeroBanner from "../components/HeroBanner";
import Hero from "../assets/vaishnavi-pawar-exU18-IbCk8-unsplash.jpg";
const StoriesPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const storiesPerPage = 6;

  const indexOfLast = currentPage * storiesPerPage;
  const indexOfFirst = indexOfLast - storiesPerPage;
  const currentStories = stories.slice(indexOfFirst, indexOfLast);

  return (
    <>
      <HeroBanner
        title="From a Struggling Tutor to an Award-Winning Teacher: Shamim’s Story"
        image={Hero}
        subtitle=""
        ctaText="Read More"
        ctaLink="/stories/struggling-tutor-to-award-winning-teacher-shamims-story/"
      />
      <div className="max-w-7xl mx-auto px-4 py-12">
        <GodHeader title="Stories" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {currentStories.map((story) => (
            <StoryCard key={story.id} story={story} />
          ))}
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(stories.length / storiesPerPage)}
          onPageChange={setCurrentPage}
        />
      </div>
    </>
  );
};

export default StoriesPage;
