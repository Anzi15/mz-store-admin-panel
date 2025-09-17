import { Carousel } from "@material-tailwind/react";
import StarRating from "./StarRating";

const Testimonials = ({
  reviews = [
    {
      stars: 5,
      text: "I was really impressed with the timely delivery and good packaging of my order from Gm foods By GM. The product was delivered on the promised date and was well-protected during shipping.",
      author: "Saad Arain",
    },
    {
      stars: 5,
      text: "I have been a customer of Gm foods by GM for many years and I have always been happy with the service. The order is always delivered on time and is packaged well. They do a great job of assisting to get the perfect fragrance for their loved ones.",
      author: "Rahat Raja",
    },
    {
      stars: 5,
      text: "I had a great experience shopping with Gm foods by GM. The shopping experience was a breeze and the product quality was excellent. their team asked the next day for reviews of the perfume. Great service.",
      author: "Waqas Ashraf",
    },
    {
      stars: 5,
      text: "The scent collection at Gm foods by GM is absolutely amazing. I ordered a few achars, and each one exceeded my expectations. The customer support was very responsive and helped me choose the best fragrances for my needs. Highly recommended!",
      author: "Fatima Malik",
    },
    {
      stars: 4,
      text: "I ordered a perfume from Gm foods by GM, and while the delivery took a bit longer than expected, the quality of the fragrance made up for it. I will definitely be ordering again. The scent is long-lasting and exactly what I was looking for.",
      author: "Ahmed Khan",
    },
    {
      stars: 5,
      text: "Gm foods by GM never disappoints! The achars are of top-notch quality, and the prices are very reasonable. I’ve recommended this store to all my friends, and they love it too. Great job!",
      author: "Sara Sheikh",
    },
    {
      stars: 5,
      text: "I recently purchased a gift set from Gm foods by GM, and it was beautifully packaged and delivered on time. The recipient loved the fragrance. I'll definitely be coming back for more.",
      author: "Naveed Anwar",
    },
  ],
  bgColor = "#5E2C05",
  textColor = "white",
}) => {
  return (
    <section
      className="my-20 max-w-screen"
      style={{ backgroundColor: bgColor }}
    >
      <h1
        className={`py-8 text-3xl font-bold uppercase text-[${textColor}] md:w-1/2 m-auto`}
        style={{ color: textColor }}
      >
        We take pride in our customer's words
      </h1>
      <Carousel
        loop={true}
        autoplay={true}
        autoplayDelay={5000}
        className="rounded-xl h-[20rem] aspect-video"
        navigation={({ setActiveIndex, activeIndex, length }) => (
          <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
            {new Array(length).fill("").map((_, i) => (
              <span
                key={i}
                className={`block h-1 cursor-pointer rounded-2xl transition-all ${
                  activeIndex === i ? "w-8 bg-white/50" : "w-4 bg-white/60"
                }`}
                onClick={() => setActiveIndex(i)}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
        )}
      >
        {reviews.map((review, index) => (
          <div
            key={index}
            className={`flex w-full p-8 items-center justify-center flex-col h-[15rem] gap-4 text-[${textColor}]`}
            aria-labelledby={`review-${index}`}
            style={{ color: textColor }}
          >
            <StarRating activeStars={review.stars} />
            <p className="md:w-[50%] w-[90%]">{review.text}</p>
            <b className="uppercase">{review.author}</b>
          </div>
        ))}
      </Carousel>
    </section>
  );
};

export default Testimonials;
