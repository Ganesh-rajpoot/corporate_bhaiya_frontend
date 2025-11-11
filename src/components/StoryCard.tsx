type Story = {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  link: string;
  date: string;
};

export const StoryCard = ({ story }: { story: Story }) => (
  <div className="glow-card-red rounded-2xl p-4 shadow-md transition-all hover:shadow-xl hover:scale-[1.02]">
    <img
      src={story.image}
      alt={story.title}
      className="w-full h-48 object-cover rounded-md"
    />
    <h3 className="mt-4 text-lg font-semibold text-gray-800 dark:text-white">
      {story.title}
    </h3>
    <p className="text-gray-600 dark:text-gray-300 mt-2">{story.excerpt}</p>
    <a
      href={story.link}
      className="inline-block mt-3 text-orange-600 dark:text-orange-400 font-medium hover:underline"
    >
      Read More →
    </a>
  </div>
);
