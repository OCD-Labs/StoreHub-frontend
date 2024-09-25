// components/MainSection.tsx
// import nearlogo from '../images/nearlogo.jpg';

const Video = () => {
  return (
    <div className="video-container flex justify-center items-center mb-[100px]">
      <div className="relative w-full max-w-[80%] h-[500px] bg-black rounded-[50px] overflow-hidden shadow-lg">
        {/* Top Overlay */}
        <div className="absolute top-0 left-0 w-full h-[70px] bg-black bg-opacity-60"></div>

        {/* The YouTube Video */}
        <iframe
          className="w-full h-full rounded-t-lg"
          src="https://www.youtube.com/embed/xNRJwmlRBNU?si=bjzfE9UiptH6bRBo"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
        ></iframe>
        {/* Bottom Overlay */}
        <div className="absolute bottom-0 left-0 w-full h-[52px] bg-black bg-opacity-60 flex justify-between items-center px-4"></div>
      </div>
    </div>
  );
};

export default Video;
