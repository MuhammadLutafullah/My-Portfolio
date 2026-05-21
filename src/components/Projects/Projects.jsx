import React, { useState } from "react";
import Tilt from "react-parallax-tilt";
import "./Projects.css";
import img4 from "../../images/6.png";
import img5 from "../../images/7.png";
import ats from "../../images/ATS-image.png";
import portfolio from "../../images/portfolio-image.png";

const Projects = () => {
  const [hoveredProject, setHoveredProject] = useState(null);
  const [activeTab, setActiveTab] = useState("ai");

  const projects = [
    // AI PROJECTS
    {
      id: 1,
      title: "Personal ATS System",
      description: "AI-powered resume screening system that matches resumes with job descriptions using RAG technology. Provides percentage match analysis and missing keywords identification.",
      imgSrc: ats,
      liveLink: "https://resume-genius-ai-three.vercel.app/",
      tags: ["Python", "Streamlit", "RAG", "OpenRouter API", "PyPDF2"],
      category: "ai",
    },
    {
      id: 2,
      title: "AI Portfolio Chatbot",
      description: "Interactive portfolio chatbot powered by OpenRouter API that answers questions based on CV/Resume content with real-time responses and context-aware conversations.",
      imgSrc: portfolio,
      liveLink: "https://muhammadlutafullah.vercel.app/",
      tags: ["React", "OpenRouter API", "TailwindCSS", "AI"],
      category: "ai",
    },
    
    // FRONTEND / FULL STACK PROJECTS
    {
      id: 3,
      title: "Skyy Go",
      description: "Flight booking platform where users can search flights, compare prices, and book tickets effortlessly with secure payment options for seamless travel planning.",
      imgSrc: img4,
      liveLink: "https://www.skyygo.com/development",
      tags: ["React", "Travel", "API Integration", "Payment"],
      category: "frontend",
    },
    {
      id: 4,
      title: "Gaming Character",
      description: "React-based platform for selling gaming artwork with user dashboard for sellers and admin dashboard for monitoring activities and managing listings.",
      imgSrc: img5,
      liveLink: "https://gamming-charecter.vercel.app/",
      tags: ["React", "Dashboard", "Admin Panel", "Firebase"],
      category: "frontend",
    },
  ];

  // Filter projects based on active tab
  const filteredProjects = projects.filter(project => project.category === activeTab);

  // Tab configuration
  const tabs = [
    { id: "ai", label: "AI Projects", icon: "🤖" },
    { id: "frontend", label: "Full Stack Projects", icon: "💻" }
  ];

  return (
    <>
      <div className="pt-[96px] max-sm:pt-[40px] bg-white">
        <div className="custom-container mx-auto max-w-[1440px] px-[20px]">
          <div className="text-center">
            {/* Section Badge */}
            <div className="inline-flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2 mb-6">
              <div className="w-2 h-2 rounded-full bg-black animate-pulse"></div>
              <span className="text-black text-sm font-semibold uppercase tracking-wider">
                My Work
              </span>
            </div>

            <p className="hero-heading font-bold text-[40px] leading-[50px] max-md:text-[27px] max-md:leading-[37px] text-black">
              My Portfolio
            </p>
            <p className="parallex-desc py-[27px] max-md:py-[15px] font-medium text-[18px] leading-[27px] text-gray-600 max-xxsm:text-[16px] max-w-4xl mx-auto">
              This portfolio showcases two sides of my work — <strong>AI Projects</strong> featuring RAG-based chatbots, 
  embeddings, and intelligent automation systems, and <strong>Frontend Projects</strong> featuring responsive, 
  pixel-perfect web applications. As a <strong>Full Stack Developer</strong>, I combine both worlds to create 
  complete, production-ready solutions that are both intelligent and user-friendly.
            </p>
          </div>

          {/* Two Tab Navigation */}
         <div className="flex justify-center gap-3 sm:gap-4 mb-8 sm:mb-12 px-4 sm:px-0">
  {tabs.map((tab) => (
    <button
      key={tab.id}
      onClick={() => setActiveTab(tab.id)}
      className={`group relative px-4 sm:px-6 md:px-8 py-2 sm:py-2.5 md:py-3 rounded-full font-semibold transition-all duration-300 text-sm sm:text-base md:text-lg ${
        activeTab === tab.id
          ? "bg-black text-white scale-105"
          : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-black hover:scale-105"
      }`}
    >
      <span className="flex items-center gap-1.5 sm:gap-2">
        <span className="text-lg sm:text-xl md:text-xl">{tab.icon}</span>
        <span className="text-xs sm:text-sm md:text-base">{tab.label}</span>
      </span>
      
      {/* Active indicator */}
      {activeTab === tab.id && (
        <div className="absolute -bottom-1.5 sm:-bottom-2 left-1/2 transform -translate-x-1/2 w-6 sm:w-8 h-0.5 sm:h-1 bg-black rounded-full"></div>
      )}
    </button>
  ))}
</div>
          {/* Projects Grid - 2x2 Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="group w-full transition-all duration-300 hover:-translate-y-1"
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                <div 
                  className="h-full flex flex-col justify-between p-6 bg-white rounded-2xl border border-[#e5e5e5] transition-all duration-300 hover:border-transparent relative overflow-hidden"
                  style={{ boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px" }}
                >
                  
                  {/* Subtle gradient overlay on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br from-gray-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl`} />
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${
                      project.category === "ai" 
                        ? "bg-purple-50 text-purple-700 border-purple-200" 
                        : "bg-blue-50 text-blue-700 border-blue-200"
                    }`}>
                      {project.category === "ai" ? "🤖 AI Project" : "💻 Full Stack"}
                    </span>
                  </div>

                  <div className="relative z-0">
                    <Tilt
                      className="parallax-effect rounded-xl overflow-hidden"
                      perspective={1100}
                      glareEnable={true}
                      glareMaxOpacity={0.15}
                      scale={1.02}
                      tiltMaxAngleX={5}
                      tiltMaxAngleY={5}
                      transitionSpeed={2000}
                    >
                      <div className="relative">
                        <img
                          className="rounded-xl h-[240px] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          src={project.imgSrc}
                          alt={project.title}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
                      </div>
                    </Tilt>
                    
                    <p className="text-black text-[22px] font-bold leading-[30px] pt-4 pb-2 transition-colors group-hover:text-gray-700">
                      {project.title}
                    </p>
                    
                    <p className="text-gray-600 text-[14px] font-normal leading-[26px] pb-3 line-clamp-3">
                      {project.description}
                    </p>
                    
                    {/* Tech Stack Tags */}
                    {project.tags && project.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 pb-4">
                        {project.tags.slice(0, 4).map((tech, idx) => (
                          <span
                            key={idx}
                            className="text-xs font-medium px-2.5 py-1 rounded-full bg-gray-100 text-gray-700 border border-gray-200 group-hover:bg-gray-200 group-hover:text-black transition-colors duration-200"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.tags.length > 4 && (
                          <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-gray-100 text-gray-500 border border-gray-200">
                            +{project.tags.length - 4}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex items-center gap-3 mt-2">
                    <a
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/btn relative overflow-hidden cursor-pointer text-[15px] font-semibold leading-[30px] text-white py-2.5 px-6 rounded-xl bg-black hover:bg-gray-800 transition-all duration-300 shadow-md hover:shadow-gray-300"
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        <span>Live Preview</span>
                        <svg className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredProjects.length === 0 && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🚀</div>
              <p className="text-gray-600 text-lg">No projects found in this category.</p>
              <p className="text-gray-500 text-sm mt-2">Check back soon for more updates!</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Projects;