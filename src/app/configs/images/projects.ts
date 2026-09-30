import { projectList } from "../projects";

export type projectImagesType = {
  name: projectList;
  typeShow: "gallery" | "preview";
};

export const getImages = (project: projectImagesType) => {
  return Object.entries(PathImages[project.name][project.typeShow]);
};

const PathImages = {
  ai_deviation_intake: {
    preview: {
      home: "/projects/ai_deviation_intake/home.jpg",
    },
    gallery: {
      home: "/projects/ai_deviation_intake/home.jpg",
    },
  },
  quizpitara: {
    preview: {
      home: "/projects/quizpitara/home.jpg",
    },
    gallery: {
      home: "/projects/quizpitara/home.jpg",
    },
  },
  flight_search_service: {
    preview: {
      home: "/projects/flight_search_service/home.jpg",
    },
    gallery: {
      home: "/projects/flight_search_service/home.jpg",
    },
  },
  apniduniya: {
    preview: {
      home: "/projects/apniduniya/home.jpg",
    },
    gallery: {
      home: "/projects/apniduniya/home.jpg",
    },
  },
  twitter_backend: {
    preview: {
      home: "/projects/twitter_backend/home.jpg",
    },
    gallery: {
      home: "/projects/twitter_backend/home.jpg",
    },
  },
};
