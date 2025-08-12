import { useState, useEffect } from 'react';

const RotatingIngredients = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageErrors, setImageErrors] = useState({});
  const [imagesLoaded, setImagesLoaded] = useState({});

  // Array of ingredient images with descriptions
  const ingredients = [
    {
      src: "https://images.pexels.com/photos/4187779/pexels-photo-4187779.jpeg?auto=compress&cs=tinysrgb&w=1000&h=750",
      alt: "Artisan Cheeses",
      title: "Premium Cheeses",
      description: "Aged brie, manchego, and gouda"
    },
    {
      src: "https://images.pexels.com/photos/31709928/pexels-photo-31709928.jpeg?auto=compress&cs=tinysrgb&w=1000&h=750", 
      alt: "Cured Meats",
      title: "Cured Meats",
      description: "Prosciutto, salami, and chorizo"
    },
    {
      src: "https://plus.unsplash.com/premium_photo-1671379041175-782d15092945?q=80&w=1000&h=750&auto=format&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Fresh Fruits",
      title: "Seasonal Fruits", 
      description: "Grapes, figs, and berries"
    },
    {
      src: "https://images.pexels.com/photos/691142/pexels-photo-691142.jpeg?auto=compress&cs=tinysrgb&w=1000&h=750",
      alt: "Artisan Crackers",
      title: "Artisan Crackers",
      description: "Handmade water crackers and crostini"
    }
  ];

  // Preload images for better performance
  useEffect(() => {
    ingredients.forEach((ingredient, index) => {
      const img = new Image();
      img.onload = () => setImagesLoaded(prev => ({ ...prev, [index]: true }));
      img.onerror = () => setImageErrors(prev => ({ ...prev, [index]: true }));
      img.src = ingredient.src;
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === ingredients.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000); // Change every 4 seconds

    return () => clearInterval(interval);
  }, [ingredients.length]);

  const currentIngredient = ingredients[currentIndex];

  return (
    <div className="relative w-full h-full overflow-hidden shadow-2xl">
      {/* Main ingredient image */}
      <div className="relative w-full h-full">
        {imageErrors[currentIndex] ? (
          // Fallback when image fails to load
          <div className="absolute inset-0 w-full h-full bg-gray-200 flex items-center justify-center">
            <div className="text-gray-500 text-center">
              <div className="text-4xl mb-2">🧀</div>
              <div>Image unavailable</div>
            </div>
          </div>
        ) : (
          <img
            src={currentIngredient.src}
            alt={currentIngredient.alt}
            loading="eager"
            decoding="async"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              imagesLoaded[currentIndex] ? 'opacity-100' : 'opacity-50'
            }`}
            onError={() => setImageErrors(prev => ({ ...prev, [currentIndex]: true }))}
          />
        )}
        
        {/* Overlay with gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
        
        {/* Text overlay */}
        <div className="absolute bottom-6 left-6 right-6 text-white">
          <h3 className="text-2xl font-serif font-bold mb-2">
            {currentIngredient.title}
          </h3>
          <p className="text-lg opacity-90">
            {currentIngredient.description}
          </p>
        </div>
      </div>

      {/* Dots indicator */}
      <div className="absolute bottom-6 right-6 flex space-x-2">
        {ingredients.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'bg-white scale-125' 
                : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`View ingredient ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default RotatingIngredients;