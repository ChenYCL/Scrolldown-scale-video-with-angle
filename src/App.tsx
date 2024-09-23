import './App.css';
import ScrollAnimatedVideo from './component/ScrollAnimatedVideo';

function App() {
  return (
    <>
      <div className="min-h-screen">
        <div className="h-screen flex items-center justify-center">
          <h1 className="text-4xl font-bold">
            Scroll down to see the animation
          </h1>
        </div>
        <ScrollAnimatedVideo
          videoSrc="https://www.reweb.so/videos/hero.mp4"
          posterSrc="https://www.reweb.so/images/landing/hero.png"
          initialTiltAngle={80}
        />
        <div
          style={{
            height: '1000px',
          }}
        ></div>
      </div>
    </>
  );
}

export default App;
