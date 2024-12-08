import React, { createContext, useContext, useState } from 'react';

// Translations object
const translations = {
  en: {
    siteName: "Aharathi",
    navigation: {
      home: "Home",
      works: "Works",
      books: "Books",
      about: "About",
      contact: "Contact"
    },
    loading: "Loading...",
    tryAgain: "Try Again",
    errors: {
      failedToLoad: "Failed to load content",
    },
    home: {
      hero: {
        greeting: "Welcome to",
        title: "My Literary Space",
        subtitle: "Exploring thoughts and stories through words",
        cta: "Explore My Works"
      },
      featured: {
        sectionLabel: "Featured Works",
        title: "Latest Articles & Stories",
        description: "Discover my recent writings and creative explorations",
        readMore: "Read Article",
        viewAll: "View All Works",
        readingTime: "min read",
        categories: {
          ESSAY: "Essay",
          POEM: "Poetry",
          SHORT_STORY: "Short Story"
        }
      },
      latestBooks: {
        sectionLabel: "Latest Books",
        title: "Published Books",
        description: "Explore my published collections and literary works",
        viewDetails: "View Details",
        viewAll: "View All Books",
        pages: "pages",
        releaseDate: "Released"
      }
    },
    about: {
      pageTitle: "About Me",
      pageDescription: "Learn more about my journey and work",
      label: "About",
      title: "Writer & Author",
      subtitle: "Exploring literature through various forms and perspectives",
      bio: {
        text1: "A passionate writer with over a decade of experience in crafting stories that resonate with readers across cultures.",
        text2: "My work spans multiple genres, from poetry to prose, always seeking to explore the depths of human experience."
      },
      stats: {
        years: "Years Writing",
        works: "Published Works",
        books: "Books Published"
      },
      recognition: {
        title: "Recognition & Awards",
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
          },
          {
            year: "2021",
            title: "Creative Writing Award",
            description: "For exceptional poetry collection"
          }
        ]
      }
    },
    works: {
      pageTitle: "Literary Works",
      pageDescription: "Explore our collection of poems, short stories, and essays",
      heroTitle: "Literary",
      heroTitleAccent: "Works",
      heroSubtitle: "A collection of poems, short stories, and essays exploring various themes",
      featuredWork: "Featured Work",
      browseByCategory: "Browse by Category",
      categories: {
        all: "All Works",
        POEM: "Poetry",
        SHORT_STORY: "Short Story",
        ESSAY: "Essay"
      },
      readMore: "Read More",
      readFullArticle: "Read Full Article",
      noWorksFound: "No works found",
      noWorksInCategory: "No works available in this category yet",
      viewAllWorks: "View All Works"
    },
    books: {
      pageTitle: "Published Books",
      pageDescription: "Browse my collection of published books",
      heroTitle: "Published",
      heroTitleAccent: "Books",
      heroSubtitle: "Explore my collection of published works available in stores",
      latestRelease: "Latest Release",
      moreBooks: "More Books",
      buyOn: "Buy on",
      price: "Price",
      author: "Author",
      availableAt: "Available at",
      buyNow: "Buy Now",
      preview: "Preview",
      pages: "pages",
      publishedBy: "Published by"
    },
    common: {
      minuteRead: "min read",
    },
    footer: {
      sections: {
        about: {
          title: "About",
          description: "Exploring literature through various forms and perspectives"
        },
        quickLinks: {
          title: "Quick Links",
          home: "Home",
          works: "Works",
          books: "Books",
          about: "About"
        },
        connect: {
          title: "Connect",
          email: "Email",
          twitter: "Twitter",
          instagram: "Instagram"
        }
      },
      copyright: {
        rights: "All rights reserved",
        text: "© 2024 Aharathi. Literary Portfolio."
      },
      newsletter: {
        title: "Subscribe to Newsletter",
        description: "Get notified about new works and updates",
        placeholder: "Enter your email",
        button: "Subscribe",
        success: "Thank you for subscribing!",
        error: "Subscription failed. Please try again."
      }
    }
  },
  ta: {
    siteName: "அகராதி",
    navigation: {
      home: "முகப்பு",
      works: "படைப்புகள்",
      books: "புத்தகங்கள்",
      about: "பற்றி",
      contact: "தொடர்பு"
    },
    loading: "ஏற்றுகிறது...",
    tryAgain: "மீண்டும் முயற்சிக்கவும்",
    errors: {
      failedToLoad: "உள்ளடக்கத்தை ஏற்ற முடியவில்லை",
    },
    home: {
      hero: {
        greeting: " ",
        title: "எனது இலக்கிய வெளி",
        subtitle: "சொற்களால் சிந்தனைகளையும் கதைகளையும் ஆராய்தல்",
        cta: "படைப்புகளை காண"
      },
      featured: {
        sectionLabel: "சிறப்பு படைப்புகள்",
        title: "சமீபத்திய கட்டுரைகள் & கதைகள்",
        description: "எனது சமீபத்திய எழுத்துக்களையும் படைப்பாக்கங்களையும் கண்டறியுங்கள்",
        readMore: "கட்டுரையைப் படிக்க",
        viewAll: "அனைத்து படைப்புகளையும் காண",
        readingTime: "நிமிட வாசிப்பு",
        categories: {
          ESSAY: "கட்டுரை",
          POEM: "கவிதை",
          SHORT_STORY: "சிறுகதை"
        }
      },
      latestBooks: {
        sectionLabel: "சமீபத்திய புத்தகங்கள்",
        title: "வெளியிடப்பட்ட புத்தகங்கள்",
        description: "எனது வெளியிடப்பட்ட தொகுப்புகளையும் இலக்கியப் படைப்புகளையும் ஆராயுங்கள்",
        viewDetails: "விவரங்களைக் காண",
        viewAll: "அனைத்து புத்தகங்களையும் காண",
        pages: "பக்கங்கள்",
        releaseDate: "வெளியிடப்பட்டது"
      }
    },
    about: {
      pageTitle: "என்னைப் பற்றி",
      pageDescription: "என் பயணம் மற்றும் படைப்புகளைப் பற்றி மேலும் அறியவும்",
      label: "பற்றி",
      title: "எழுத்தாளர்",
      subtitle: "பல்வேறு வடிவங்கள் மற்றும் பார்வைகள் மூலம் இலக்கியத்தை ஆராய்தல்",
      bio: {
        text1: "பல்வேறு கலாச்சாரங்களைச் சேர்ந்த வாசகர்களுடன் தொடர்புகொள்ளும் கதைகளை உருவாக்குவதில் பத்தாண்டுகளுக்கும் மேலான அனுபவம் கொண்ட ஆர்வமுள்ள எழுத்தாளர்.",
        text2: "கவிதை முதல் உரைநடை வரை, மனித அனுபவத்தின் ஆழங்களை ஆராய எப்போதும் முயற்சிக்கும் என் படைப்புகள் பல்வேறு வகைகளை உள்ளடக்கியது."
      },
      stats: {
        years: "ஆண்டுகள் எழுதுகிறேன்",
        works: "வெளியிடப்பட்ட படைப்புகள்",
        books: "வெளியிடப்பட்ட புத்தகங்கள்"
      },
      recognition: {
        title: "விருதுகள் & அங்கீகாரங்கள்",
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
          },
          {
            year: "2021",
            title: "படைப்பாக்க எழுத்து விருது",
            description: "சிறந்த கவிதைத் தொகுப்புக்காக"
          }
        ]
      }
    },
    works: {
      pageTitle: "இலக்கியப் படைப்புகள்",
      pageDescription: "கவிதைகள், சிறுகதைகள் மற்றும் கட்டுரைகளின் தொகுப்பு",
      heroTitle: "இலக்கியப்",
      heroTitleAccent: "படைப்புகள்",
      heroSubtitle: "பல்வேறு கருப்பொருள்களை ஆராயும் கவிதைகள், சிறுகதைகள் மற்றும் கட்டுரைகளின் தொகுப்பு",
      featuredWork: "சிறப்பு படைப்பு",
      browseByCategory: "வகைகளின்படி உலாவுக",
      categories: {
        all: "அனைத்து படைப்புகளும்",
        POEM: "கவிதை",
        SHORT_STORY: "சிறுகதை",
        ESSAY: "கட்டுரை"
      },
      readMore: "மேலும் படிக்க",
      readFullArticle: "முழு கட்டுரையையும் படிக்க",
      noWorksFound: "படைப்புகள் எதுவும் கிடைக்கவில்லை",
      noWorksInCategory: "இந்த வகையில் படைப்புகள் எதுவும் இல்லை",
      viewAllWorks: "அனைத்து படைப்புகளையும் காண"
    },
    books: {
      pageTitle: "வெளியிடப்பட்ட புத்தகங்கள்",
      pageDescription: "எனது வெளியிடப்பட்ட புத்தகங்களை பார்வையிடவும்",
      heroTitle: "வெளியிடப்பட்ட",
      heroTitleAccent: "புத்தகங்கள்",
      heroSubtitle: "கடைகளில் கிடைக்கும் எனது புத்தகங்களை கண்டறியுங்கள்",
      latestRelease: "புதிய வெளியீடு",
      moreBooks: "மேலும் புத்தகங்கள்",
      buyOn: "இங்கே வாங்க",
      price: "விலை",
      author: "ஆசிரியர்",
      availableAt: "கிடைக்கும் இடங்கள்",
      buyNow: "இப்போதே வாங்க",
      preview: "முன்னோட்டம்",
      pages: "பக்கங்கள்",
      publishedBy: "வெளியீடு"
    },
    common: {
      minuteRead: "நிமிட வாசிப்பு",
    },
    footer: {
      sections: {
        about: {
          title: "பற்றி",
          description: "பல்வேறு வடிவங்கள் மற்றும் பார்வைகள் மூலம் இலக்கியத்தை ஆராய்தல்"
        },
        quickLinks: {
          title: "விரைவு இணைப்புகள்",
          home: "முகப்பு",
          works: "படைப்புகள்",
          books: "புத்தகங்கள்",
          about: "பற்றி"
        },
        connect: {
          title: "தொடர்பு கொள்ள",
          email: "மின்னஞ்சல்",
          twitter: "ட்விட்டர்",
          instagram: "இன்ஸ்டாகிராம்"
        }
      },
      copyright: {
        rights: "அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை",
        text: "© 2024 அகராதி. இலக்கிய தளம்."
      },
      newsletter: {
        title: "செய்திமடலுக்கு பதிவு செய்க",
        description: "புதிய படைப்புகள் மற்றும் புதுப்பிப்புகளைப் பெறுங்கள்",
        placeholder: "உங்கள் மின்னஞ்சலை உள்ளிடவும்",
        button: "பதிவு செய்",
        success: "பதிவு செய்தமைக்கு நன்றி!",
        error: "பதிவு தோல்வியடைந்தது. மீண்டும் முயற்சிக்கவும்."
      }
    }
  }
};

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('ta'); // Changed default to 'ta' for Tamil

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'ta' : 'en');
  };

  // Translation function
  const t = (key) => {
    const keys = key.split('.');
    let value = translations[language];
    
    for (const k of keys) {
      value = value?.[k];
      if (!value) break;
    }
    
    return value || key;
  };

  const value = {
    language,
    toggleLanguage,
    t,
    isEnglish: language === 'en',
    isTamil: language === 'ta',
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
} 