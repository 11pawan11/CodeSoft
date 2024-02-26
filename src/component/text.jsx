import { CgDesignmodo } from "react-icons/cg";
import { IoCodeSlashSharp } from "react-icons/io5";

// this is mywork section
export const seemore = "See More";
export const previous = "Previous";

// this is footer section
export const email = "pawanupreti35@gmail.com";
export const contact = "Contact Me";
export const phoneno = "+977-9866284088";
export const sendMessage = "Send Message";
export const copyRight = "Copyright @2024 to";
export const MyName = "Pawan Upreti";
export const downloadCv = "Download CV";

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
      "Web design involves creating visually appealing, user-friendly websites that effectively communicate information and provide a seamless browsing experience.",
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

export const test = "";
