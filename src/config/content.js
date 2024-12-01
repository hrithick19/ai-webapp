export const siteContent = {
  en: {
    meta: {
      author: "Aharathi",
      siteTitle: "Literary Portfolio",
      siteDescription: "A collection of literary works, poems, and stories"
    },
    hero: {
      title: "Welcome to my Literary Space",
      subtitle: "Exploring thoughts and stories through words",
      description: "Join me on a journey through poetry, prose, and contemplation",
      ctaText: "Explore My Works",
      ctaLink: "/works",
      backgroundImage: "/images/hero-bg.jpg"
    },
    about: {
      stats: [
        {
          number: "10+",
          label: "Years Writing"
        },
        {
          number: "50+",
          label: "Published Works"
        },
        {
          number: "5",
          label: "Books Published"
        }
      ],
      biography: {
        intro: "A passionate writer with over a decade of experience...",
        paragraphs: [
          "My journey in literature began...",
          "Through my works, I explore..."
        ]
      },
      awards: [
        {
          year: "2023",
          title: "Literary Excellence Award",
          description: "For outstanding contribution to Tamil literature"
        },
        {
          year: "2022",
          title: "Best Author Award",
          description: "For innovative storytelling in modern literature"
        }
      ]
    },
    contact: {
      email: "author@example.com",
      social: {
        twitter: "https://twitter.com/author",
        instagram: "https://instagram.com/author"
      }
    }
  },
  ta: {
    meta: {
      author: "அகராதி",
      siteTitle: "இலக்கிய தளம்",
      siteDescription: "இலக்கியப் படைப்புகள், கவிதைகள் மற்றும் கதைகளின் தொகுப்பு"
    },
    hero: {
      title: "எனது இலக்கிய வெளிக்கு வரவேற்கிறேன்",
      subtitle: "சொற்களால் சிந்தனைகளையும் கதைகளையும் ஆராய்தல்",
      description: "கவிதை, உரைநடை மற்றும் சிந்தனை வழியாக என் பயணத்தில் இணையுங்கள்",
      ctaText: "படைப்புகளை காண",
      ctaLink: "/works",
      backgroundImage: "/images/hero-bg.jpg"
    },
    about: {
      stats: [
        {
          number: "10+",
          label: "ஆண்டுகள் எழுதுகிறேன்"
        },
        {
          number: "50+",
          label: "வெளியிடப்பட்ட படைப்புகள்"
        },
        {
          number: "5",
          label: "வெளியிடப்பட்ட புத்தகங்கள்"
        }
      ],
      biography: {
        intro: "பத்தாண்டுகளுக்கும் மேலான அனுபவம் கொண்ட ஆர்வமுள்ள எழுத்தாளர்...",
        paragraphs: [
          "இலக்கியத்தில் என் பயணம் தொடங்கியது...",
          "என் படைப்புகள் வழியாக ஆராய்கிறேன்..."
        ]
      },
      awards: [
        {
          year: "2023",
          title: "இலக்கிய சிறப்பு விருது",
          description: "தமிழ் இலக்கியத்திற்கான சிறந்த பங்களிப்புக்காக"
        },
        {
          year: "2022",
          title: "சிறந்த எழுத்தாளர் விருது",
          description: "நவீன இலக்கியத்தில் புதுமையான கதை சொல்லலுக்காக"
        }
      ]
    },
    contact: {
      email: "author@example.com",
      social: {
        twitter: "https://twitter.com/author",
        instagram: "https://instagram.com/author"
      }
    }
  }
};

export const getContent = (language = 'en') => {
  return siteContent[language] || siteContent.en;
}; 