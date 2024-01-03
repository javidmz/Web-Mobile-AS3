import { useState, useEffect } from "react";
import MyImage from "../../public/assets/portfolio-img.jpeg";

const Home = () => {
  const [myProjects, setMyProjects] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:5200/myProjects");
      if (!response.ok) throw new Error("Network response was not ok");
      const result = await response.json();
      setMyProjects(result);
    } catch (Err) {
      console.log("Fetch error: ", Err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="bg-green-900 min-h-screen">
      <div className="container mx-auto p-6">
        <div className="bg-slate-700 p-6 rounded-lg shadow-md flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 md:space-x-6 mb-8">
          <div className="text-center md:text-left">
            <div className="text-2xl font-bold text-white">
              My name is Javid Mammadzada
            </div>
            <div className="text-lg text-gray-400">
              I study at ADA University
            </div>
          </div>
          <img
            src={MyImage}
            alt="my-image"
            className="w-48 h-48 object-cover rounded-full border-4 border-white shadow-sm"
          />
        </div>
        <div>
          <div className="text-2xl font-bold mb-4">My Projects</div>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 gap-y-12">
            {myProjects &&
              myProjects.map((project) => (
                <div
                  key={project.id}
                  className="bg-orange-800 shadow-lg rounded-lg overflow-hidden transition-all duration-300 delay-150 hover:-translate-y-8"
                >
                  <a href={project.link} target="_blank">
                    <img
                      src={project.image}
                      alt="project"
                      className="w-full h-64 object-cover"
                    />
                  </a>
                  <div className="p-4">
                    <div className="font-bold text-lg mb-2">
                      {project.title}
                    </div>
                    <p className="text-white text-base mb-4">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((technology) => (
                        <span
                          key={technology}
                          className="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                        >
                          {technology}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
