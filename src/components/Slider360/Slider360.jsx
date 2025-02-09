import React, { useState, useEffect } from "react";
import "./Slider360.css";
import mursImg from "../../images/murs-preview-img.webp";
import ethixImg from "../../images/ethix-preview-img.webp";
import rageImg from "../../images/rage-preview-img.webp";
import comingSoon from "../../images/Coming-soon.jpg";
const Slider360 = () => {
  const slides = [
    {
      id: 1,
      image: mursImg,

      // title: "MURS NFT Marketplace ",
      url: "https://nft-artwork-web.surge.sh/theme/index.html",
    },
    {
      id: 2,
      image: ethixImg,
      // title: "Ethix – NFT Marketplace",
      url: "https://ethix-nftmarketplace.surge.sh/theme/index.html",
    },
    {
      id: 3,
      image: rageImg,
      // title: "RAGE – Gaming Project",
      url: "https://livestream-gamingwebsite.surge.sh/theme/index.html",
    },
    {
      id: 4,
      image: comingSoon,
      // title: "Beautiful Landscape 4",
      url: "",
    },
    {
      id: 5,
      image: comingSoon,
      url: "",
    },
    {
      id: 6,
      image: comingSoon,
      url: "",
    },
    {
      id: 7,
      image: comingSoon,
      url: "",
    },
    {
      id: 8,
      image: comingSoon,
      url: "",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Autoplay functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 2000); // Change slide every 2 seconds

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <>
      <div className="bg-black ">
        <div className="custom-container mx-auto max-w-[1440px] px-[20px]">
          <div className="text-center pt-[96px] max-sm:pt-[40px]">
            <p className="hero-heading font-bold text-white  text-[40px] leading-[50px] max-md:text-[27px] max-md:leading-[37px] ]">
              Why Choose Me?
            </p>
            <p className="parallex-desc py-[27px]  max-md:py-[15px] font-medium font-normal text-[18px] leading-[27px] text-[#ffffff] max-xxsm:text-[16px]">
              You see my custom 360 slider. It’s a combination of CSS (X, Y, and
              Z axes), React state hooks, and a custom formula I created to
              achieve a unique way of presenting my projects to you. Click on
              the slide, and it will redirect you to the live link of the
              project. Now you know why I mentioned at the start of my website:
              I am able to bring unique ideas to reality with my experience in
              coding. Thank you.
            </p>
          </div>
          <div className="banner pt-[96px] max-sm:pt-[60px] pb-[350px] max-1460:pb-[250px] max-1360:pb-[200px] max-sm:!pb-[100px]">
            <div
              className="slider"
              style={{
                "--quantity": slides.length,
                "--currentIndex": currentIndex,
              }}
            >
              {slides.map((slide) => (
                <div
                  className="item"
                  style={{ "--position": slide.id }}
                  key={slide.id}
                >
                  <a href={slide.url} target="_blank" rel="noopener noreferrer">
                    <img
                      src={slide.image}
                      className="rounded-[11px] border border-[#e5e5e5]"
                      alt={slide.title}
                    />
                    <h3 className="slide-title flex justify-center pt-[7px]">
                      {slide.title}
                    </h3>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Slider360;
