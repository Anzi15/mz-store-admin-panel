import { Star } from "lucide-react";

const StarRating = ({ rating }) => {
  const fullStars = Math.floor(rating); // Full stars
  const halfStar = rating % 1 !== 0; // Half star check
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0); // Remaining empty stars

  return (
    <div className="flex items-center">
      {/* Full stars */}
      {[...Array(fullStars)].map((_, i) => (
        <Star key={i} className="text-yellow-900 w-5 h-5 fill-current" />
      ))}

      {/* Half Star - Two overlapping layers */}
      {halfStar && (
        <div className="relative w-5 h-5">
          <Star className="absolute left-0 top-0 text-yellow-900 w-5 h-5 stroke-current" />
          <Star
            className="absolute left-0 top-0 text-yellow-900 w-5 h-5 fill-current"
            style={{ clipPath: "inset(0 50% 0 0)" }} // Half-filled effect
          />
        </div>
      )}

      {/* Empty stars */}
      {[...Array(emptyStars)].map((_, i) => (
        <Star key={i} className="text-yellow-900 w-5 h-5 stroke-current" />
      ))}
    </div>
  );
};

export default StarRating;
