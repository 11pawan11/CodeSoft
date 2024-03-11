import { CgDesignmodo } from "react-icons/cg";
import { IoCodeSlashSharp } from "react-icons/io5";

// this is mywork section
export const seemore = "See More";
export const previous = "Previous";
export const work = "My Project";

// this is footer section
export const emailss = "pawanupreti35@gmail.com";
export const contact = "Contact Info";
export const phoneno = "+977-9866284088";
export const sendMessage = "Send Message";
export const copyRight = "Copyright @2024 to";
export const MyName = "Pawan Upreti";
export const downloadCv = "Download CV";
export const contactForm = "Contact Form";

// this is services section
export const services = "My Services";
const whiteImageStyle = {
  filter: "brightness(0) saturate(100%) invert(100%)",
};

export const ServicesRoute = [
  {
    id: 1,
    topic: "Web Design",
    subtopic:
    `Web design involves creating visually appealing, user-friendly websites that effectively 
      communicate information and provide a seamless browsing experience.`,
    icon: <IoCodeSlashSharp />,
    path: "See More",
  },
  {
    id: 2,
    topic: "DevOps",
    subtopic:
      "DevOps is a software development approach that combines development (Dev) with operations (Ops) to streamline the software delivery process. It emphasizes collaboration, automation, and continuous integration/continuous delivery (CI/CD) to enable faster and more reliable software releases.",
    icon: (
      <img
        src="/devops.png"
        alt="devops"
        className="mb-4 h-5 w-5"
        style={whiteImageStyle}
      />
    ),
    path: "See More",
  },

  {
    id: 3,
    topic: "App Design",
    subtopic:
      "App design involves creating user interfaces and experiences for mobile applications. It focuses on usability, aesthetics, and functionality to ensure a seamless and engaging user experience on smartphones and tablets.",
    icon: <CgDesignmodo />,
    path: "See More",
  },
];


// this is about section
export const about = "About Me";
export const AboutMy = `With a solid background in IT 👨‍💻. I've skills in Python, DevOps, JavaScript and its library for building user interfaces React.js, 
                        TypeScript, MS Word, All kinds of Tender related stuff. My expertise extends to
                           troubleshooting computer hardware issues and managing networking intricacies. As a dedicated officer, I
                           thrive in the dynamic landscape of technology procurement and implementation. Outside the tech world, I
                           enjoy playing football ⚽️, engaging in chess ♟️ matches, solving Rubik's cubes, and diving into books.
                           Whether strumming the guitar 🎸 or troubleshooting network problems, I find joy in a mix of interests,
                           reflecting my commitment to learning and embracing technology from various angles.`;
// this is my skills section
export const skillData =  [
        {
            "category": "Programming Language",
            "skills": ["HTML", "CSS, Tailwind CSS, Bootstrap", "Javascript, React Js, Typescript", "Python"]
          },
          {
            "category": "Networking",
            "skills": ["Ethical Hacking", "DevOps"]
          },
          {
            "category": "Operating System",
            "skills": ["Both Windows & Linux OS"]
          }    

];


// this is my experience section

export const experienceData = 
[
    {
      "duration": "2 years",
      "position": "IT consultant and Procurement Officer",
      "employer": "Janamukti Health Enterprises"
    },
    {
      "duration": "Currently Working (3 months)",
      "position": "Frontend Developer",
      "employer": "Silicontech Pvt. Ltd."
    }
  ];

// this is my education section

export const educationData =
[
    {
      "year": "2013",
      "qualification": "SLC",
      "institution": "Tripura Glorious Academy, Charikot, Dolakha"
    },
    {
      "year": "2015",
      "qualification": "+2 Science",
      "institution": "Capital College and Research Center"
    },
    {
      "year": "2016",
      "qualification": "Bachelor in Engineering Information Technology (BEIT)",
      "institution": "NCIT"
    }
  ];

//   this is my header section

export const position = "Frontend Developer & DevOps Enthusiastic";
export const Mine = "Its Me Pawan";
export const country = "Nepal";
  
// this is the certifications section
export const certifications = "My Certification";



// this is the userprofile section

export const userProfile = [
{
  "link" : '/myprofile',
  "title" : 'My Profile'
  },
{
  "link" : '/myAccount',
  "title" : 'My Account'
},
{
  "link" : '/logout',
  "title" : 'Logout'
}

]

// this is dashboard sidebar section

export const dashboards = "Dashboard";
export const addImage = "Update Image";
export const addText = "Update Text";
export const Notificationss= "Notifications";
export const EditAbout = "Edit About Section";
export const EditServices = "Edit Service Section";
export const EditMyWork = "Edit Work Section";
export const EditCertification = "Edit Certification Section";
export const EditContactForm = "Edit Contact Section";
export const EditSkill = "Update Skill";
export const EditExperience = "Update Experience";
export const EditEducation = "Update Education";

//this is the section for firebae update 

export const updateNow = "Update Now"


// this is add work section

export const AddProjects = "Add New Projects";
export const AddProject = "Add Project";


// this is the service section
export const ServiceHeaderName= "Service Name";
export const ServicePreviewSection = "View Data";
export const ServiceLinks = "Links";
export const ServiceDescription = "Service Description";
export const ServiceImage = "Image";
export const save = "Save";
export const edit = "Edit";
export const deleted = "Delete";
export const submits = "Submit";
export const addService = "Add Service";

// this is the contact link section

export const LinkedinLink = "https://www.linkedin.com/authwall?trk=bf&trkInfo=AQE2NpUaulYLowAAAY4uXGFwKyQKy5RWy4D6y6CQDuBLD2f-Ce0brwIh_HhJzyVDmUnl-kNueu2WUnPJqCcq7XXaEkgHPUpyblt5iA8w90Ln-GrIDA627e9EeeYkMgcjG_Cs-_Q=&original_referer=&sessionRedirect=https%3A%2F%2Fwww.linkedin.com%2Fin%2Fpawan-upreti-303ba317b";
export const TelegramLink = "https://pawan_11.t.me/";
export const FacebookLink = "https://www.facebook.com/Pawaan11?mibextid=ZbWKwL";
export const GithubLink= "https://github.com/11pawan11";











