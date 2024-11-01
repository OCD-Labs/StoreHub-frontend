const Video = () => {
  return (
    <div className="video-container flex justify-center items-center mb-[50px] md:mb-[100px] px-4 md:px-0">
      <div className="relative w-full  md:max-w-[70%] h-[300px] sm:h-[300px] md:h-[500px] bg-black rounded-[20px] sm:rounded-[30px] md:rounded-[50px] overflow-hidden shadow-lg">
        {/* Top Overlay */}
        <div className="absolute top-0 left-0 w-full h-[40px] sm:h-[50px] md:h-[70px] bg-black bg-opacity-60"></div>

        {/* The YouTube Video */}
        {/* <iframe
          className="w-full h-full rounded-t-lg"
          src="https://www.youtube.com/embed/xNRJwmlRBNU?si=bjzfE9UiptH6bRBo"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe> */}

        <iframe
          src="https://player.vimeo.com/video/1024813355?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
          allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
          className="w-full h-full rounded-t-lg"
          title="StoreHub Demo- 30/10/2024, 17:40:21"
        ></iframe>

        {/* Bottom Overlay */}
        <div className="absolute bottom-0 left-0 w-full h-[40px] sm:h-[50px] md:h-[52px] bg-black bg-opacity-60 flex justify-between items-center px-4"></div>
      </div>
    </div>
  );
};

export default Video;
