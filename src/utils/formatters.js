export const formatCategory = (category) => {
  if (!category) return '';
  return category
    .split('_')
    .map(word => word.charAt(0) + word.slice(1).toLowerCase())
    .join(' ');
};

export const formatDate = (date, language = 'en') => {
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };

  const dateObj = new Date(date);
  
  if (language === 'ta') {
    // Tamil date formatting
    const tamilMonths = [
      'ஜனவரி', 'பிப்ரவரி', 'மார்ச்', 'ஏப்ரல்', 'மே', 'ஜூன்',
      'ஜூலை', 'ஆகஸ்ட்', 'செப்டம்பர்', 'அக்டோபர்', 'நவம்பர்', 'டிசம்பர்'
    ];
    
    return `${dateObj.getDate()} ${tamilMonths[dateObj.getMonth()]}, ${dateObj.getFullYear()}`;
  }

  return dateObj.toLocaleDateString('en-US', options);
};

export const formatNumber = (number, language = 'en') => {
  if (language === 'ta') {
    // Tamil number formatting
    const tamilNumerals = ['௦', '௧', '௨', '௩', '௪', '௫', '௬', '௭', '௮', '௯'];
    return number.toString().split('').map(digit => 
      isNaN(digit) ? digit : tamilNumerals[parseInt(digit)]
    ).join('');
  }

  return number.toLocaleString('en-US');
};

export const formatReadingTime = (minutes, language = 'en') => {
  if (language === 'ta') {
    return `${formatNumber(minutes, 'ta')} நிமிட வாசிப்பு`;
  }
  return `${minutes} min read`;
}; 