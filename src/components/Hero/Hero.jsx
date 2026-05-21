import "../../App.css";
import Tilt from "react-parallax-tilt";
import Typewriter from "typewriter-effect";
import profileImg from "../../images/Profile-img.jpeg";

const Hero = () => {
  return (
    <div className="hero-otr pt-[96px] max-sm:pt-[40px]">
      <div className="custom-container mx-auto max-w-[1440px] px-[20px]">
        <div className="hero-inr flex justify-between items-center gap-[40px] max-md:gap-[20px] max-md:pr-[23px] max-sm:flex-col-reverse max-sm:!pr-[0px]">
          <div className="hero-content max-w-[647px] max-sm:max-w-full max-sm:text-center">
            <p className="hero-heading font-bold font-normal text-[56px] leading-[66px] max-md:text-[37px] max-md:leading-[41px] max-xxsm:!text-[27px] max-xxsm:!leading-[31px]">
              Hello, I'm Muhammad Lutaf Ullah,{" "}
             <Typewriter
  options={{
    strings: ["AI & Frontend Developer", "React Developer", "RAG Chatbot Specialist", "Full Stack (FastAPI + React)"],
    autoStart: true,
    loop: true,
    deleteSpeed: 50,
  }}
/>
            </p>

           <p className="parallex-desc py-[27px] max-md:py-[15px] font-medium font-normal text-[18px] leading-[27px] text-[#555555] max-xxsm:text-[16px]">
  Currently working as a Junior AI Developer specializing in RAG-based chatbots, embeddings, and data insights. 
  With 2 years of experience in frontend development (React, Next.js) and 1 year of hands-on experience in AI/ML, 
  I bridge the gap between intelligent backend systems and modern frontend interfaces. 
  On the backend, I work with Python (FastAPI) along with SQL and NoSQL databases (MongoDB, Supabase) to build 
  scalable, full-stack AI applications. I specialize in turning complex ideas into production-ready solutions 
  that deliver real business value.
</p>
            <div className="action-otr flex max-sm:justify-center">
              <a
                href="https://drive.google.com/file/d/1WHSEGxdRIY1Pwhl9YmjxClijfKmNRtJX/view?usp=drivesdk"
                target="_blank"
                className="action-inr h-[50px] overflow-hidden cursor-pointer text-[18px] max-xxsm:text-[15px] font-medium font-normal leading-[30px] text-white py-[10px] px-[24px] rounded-[8px] bg-slate-950"
              >
                <p className="btn-default-txt">Download CV</p>
                <p className="pt-[11px] btn-hover-txt">One Click Away</p>
              </a>
            </div>
          </div>
          <Tilt
            className="hero-img tilt-effect"
            tiltMaxAngleX={20}
            tiltMaxAngleY={20}
            perspective={1000}
            scale={1.1}
            transitionSpeed={1000}
            glareEnable={true}
            glareMaxOpacity={0.3}
            glareColor="#ffffff"
            glarePosition="bottom"
            gyroscope={true}
          >
            <img
              src={profileImg}
              alt="Muhammad Lutaf Ullah"
              className="hero-img bg-black rounded-full w-[550px] h-[550px] max-md:w-[421px] max-md:h-[421px] max-sm:!w-[200px] max-sm:!h-[200px] object-cover"
              style={{ objectPosition: "center 25%" }}
            />
          </Tilt>
        </div>
      </div>
    </div>
  );
};

export default Hero;