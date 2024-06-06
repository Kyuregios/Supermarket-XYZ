import React from 'react';

const About = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">About Me</h1>
        <div className="flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/3 md:mr-8 mb-6 md:mb-0">
            <img src="avatar.png" alt="Mi Foto" className="rounded-lg" />
          </div>
          <div className="w-full md:w-2/3">
            <p className="text-lg text-gray-700 mb-4">
              Hi I'm Jose, a junior web programmer
            </p>
            <p className="text-lg text-blue-500 mb-4">
              <a href="https://linkedin.com/in/fusjo">My Linkedin</a>
            </p>
            <p className="text-lg text-blue-500 mb-4">
              <a href="https://github.com/Kyuregios">My Github</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
