import React from "react";

interface ResponsiveVideoProps {
  src: string;
  title?: string;
  type?: "youtube" | "mp4";
  className?: string;
}

const getEmbedUrl = (src: string): string => {
  const match = src.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/);
  return match ? `https://www.youtube.com/embed/${match[1]}` : src;
};

const ResponsiveVideo: React.FC<ResponsiveVideoProps> = ({
  src,
  title = "Video",
  type = "mp4",
  className = "",
}) => {
  const videoSrc = type === "youtube" ? getEmbedUrl(src) : src;

  return (
    <div className="w-full flex justify-center py-10">
      <div
        className={`w-full md:w-1/2 aspect-video rounded-2xl overflow-hidden shadow-xl bg-black ${className}`}
      >
        {type === "youtube" ? (
          <iframe
            className="w-full h-full"
            src={videoSrc}
            title={title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        ) : (
          <video
            src={videoSrc}
            controls
            className="w-full h-full object-cover"
            title={title}
          />
        )}
      </div>
    </div>
  );
};

export default ResponsiveVideo;
