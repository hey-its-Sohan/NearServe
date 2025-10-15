import React from 'react'
import { Github, Linkedin } from 'lucide-react'

function Team() {
  const teamMembers = [
    {
      name: "MD. Mahmudul Islam Sohan",
      role: "UI Design & Core Features",
      description: "Designed complete UI/UX, database schema, home page, services listing, and implemented booking, saving, and review systems.",
      image: "/images/sohan.jpg",
      borderColor: "border-purple-400",
      badgeColor: "text-purple-600 bg-purple-100",
      github: "https://github.com/hey-its-Sohan",
      linkedin: "https://www.linkedin.com/in/mahmudul-islam-sohan"
    },
    {
      name: "Dipra Chowdhury",
      role: "Layout & User Interface",
      description: "Created responsive navbar, footer, dashboard layouts, implemented dark/light theme toggles, and user profile management.",
      image: "/images/dipra.jpg",
      borderColor: "border-orange-300",
      badgeColor: "text-orange-600 bg-orange-100",
      github: "https://github.com/santuchy",
      linkedin: "https://www.linkedin.com/in/dipra-chowdhury"
    },
    {
      name: "Ratul Saha Roy",
      role: "Service Management",
      description: "Developed the complete service creation system including my services management page, about page, and service editing functionality.",
      image: "/images/ratul.jpg",
      borderColor: "border-green-400",
      badgeColor: "text-green-600 bg-green-100",
      github: "https://github.com/Ratul8863",
      linkedin: "https://www.linkedin.com/in/ratul-saha-roy"
    },
    {
      name: "Morshed Al Muktadir Rifat",
      role: "Authentication System",
      description: "Built secure authentication with NextAuth.js, Google OAuth integration, session management, and role-based access control.",
      image: "/images/rifat.jpg",
      borderColor: "border-blue-400",
      badgeColor: "text-blue-600 bg-blue-100",
      github: "https://github.com/morshedrifat1",
      linkedin: "https://www.linkedin.com/in/morshedrifat1"
    }
  ]

  return (
    <section className="py-16 fix-alignment text-center">
      <h2 className="heading">Meet Our Team</h2>
      <p className="text-gray max-w-2xl mx-auto mb-10">
        The passionate developers behind NearServe who are working to connect
        communities through technology.
      </p>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {teamMembers.map((member, index) => (
          <div key={index} className="card-animate group">
            <img
              src={member.image}
              alt={member.name}
              className={`w-32 h-32 rounded-full mx-auto object-cover border-4 ${member.borderColor} group-hover:scale-105 transition-transform duration-300`}
            />
            <h3 className="font-semibold mt-3 text-lg">{member.name}</h3>
            <p className={`text-sm py-1 px-3 rounded-full w-fit mx-auto mt-2 font-medium ${member.badgeColor}`}>
              {member.role}
            </p>
            <p className="text-gray mt-3 text-sm leading-relaxed">
              {member.description}
            </p>

            {/* Social Icons */}
            <div className="flex justify-center gap-3 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <a
                href={member.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-all duration-300 hover:scale-110 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <Github className="w-5 h-5" />
                <span className="text-xs font-medium">GitHub</span>
              </a>
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-all duration-300 hover:scale-110 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <Linkedin className="w-5 h-5" />
                <span className="text-xs font-medium">LinkedIn</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Team