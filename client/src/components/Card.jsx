import React, { useState } from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

const Card = ({ item }) => {
  const { title, description, price, imageUrl, category, cuisine } = item;
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(null);
  const [reviewsCount, setReviewsCount] = useState(Math.floor(Math.random() * 45) + 12);
  const [rated, setRated] = useState(false);

  const handleRatingClick = (selectedRating) => {
    if (rated) return;
    setRating(selectedRating);
    setReviewsCount(prev => prev + 1);
    setRated(true);
  };

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-[#B89C72]/20 hover:border-[#D96B43]/35 transition-all duration-500 flex flex-col h-full transform hover:-translate-y-1.5">
      
      {/* Aspect Ratio Box to Eliminate Layout Shift (CLS) */}
      <div className="relative w-full aspect-[4/3] overflow-hidden bg-[#FAF6F0]">
        <img
          src={imageUrl}
          alt={title}
          width="400"
          height="300"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
          loading="lazy"
        />
        {/* Badges */}
        <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-[#1E1A17] text-[10px] tracking-widest font-sans font-extrabold uppercase py-1.5 px-4 rounded-full border border-[#B89C72]/30 shadow-xs">
          {cuisine}
        </span>
        <span className="absolute bottom-4 right-4 bg-[#D96B43]/90 text-white text-[10px] tracking-widest font-sans font-extrabold uppercase py-1.5 px-4 rounded-full shadow-xs">
          {category}
        </span>
      </div>

      {/* Details Box */}
      <div className="p-6 flex flex-col flex-grow">
        
        {/* Title & Price */}
        <div className="flex justify-between items-start gap-4 mb-3">
          <h3 className="font-serif text-2xl font-bold tracking-wide text-[#1E1A17] group-hover:text-[#D96B43] transition-colors duration-300">
            {title}
          </h3>
          <span className="font-sans text-base font-extrabold text-[#D96B43] whitespace-nowrap bg-[#FAF6F0] px-3.5 py-1.5 rounded-lg border border-[#B89C72]/15">
            Rs. {price.toLocaleString()}
          </span>
        </div>
        
        {/* Description */}
        <p className="font-sans text-xs text-[#3A3530]/80 leading-relaxed flex-grow mb-6">
          {description}
        </p>

        {/* 5-Star Interactive Review Module */}
        <div className="pt-4 border-t border-[#B89C72]/15 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-wider font-semibold text-[#1E1A17]/50 mb-1">
              {rated ? 'Rated!' : 'Rate this dish'}
            </span>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => handleRatingClick(star)}
                  onMouseEnter={() => !rated && setHoverRating(star)}
                  onMouseLeave={() => !rated && setHoverRating(null)}
                  className={`transition-colors duration-250 ${
                    rated ? 'cursor-default' : 'cursor-pointer'
                  }`}
                >
                  <FaStar
                    size={14}
                    className={
                      star <= (hoverRating || rating)
                        ? 'text-[#D4AF37]'
                        : 'text-[#B89C72]/20'
                    }
                  />
                </button>
              ))}
            </div>
          </div>
          
          <span className="font-sans text-[11px] text-[#3A3530]/65 font-bold">
            ({reviewsCount} reviews)
          </span>
        </div>

      </div>
    </div>
  );
};

export default Card;
