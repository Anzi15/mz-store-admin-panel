import React, { useEffect, useState } from "react";
import { Carousel } from "@material-tailwind/react";
import ProductCardGroup from "../components/ProductCardGroup";
import { getMultipleDocuments } from "../modules/firebase-modules/firestore";
import coverImg from "../assets/website cover.png";
import coverImg640 from "../assets/website cover 640 px.png";
import coverImg800 from "../assets/website cover 800 px.png";
import coverImgDefault from "../assets/website cover.png";
import coverImgBlur from "../assets/website cover blur 100.png";
import { Link } from "react-router-dom";
import CustomerBenefits from "../components/CustomerBenefits";
import Testimonials from "../components/Testimonials";
import CollectionCard from "../components/CollectionCard";
import CollectionCardGroup from "../components/CollectionCardGroup";
const reviews = [
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
];

const HomePage = () => {
  // const [menuOpen, setMenuOpen] = useState(false);
  const [topProducts, setTopProducts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await getMultipleDocuments("Products", 4);
        console.log(products);
        setTopProducts(products);
      } catch {
        setError(error);
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);
  return (
    <main className="hide-overflow-by-default">
      <div className="w-full flex items-center justify-center">
        <img
          src={coverImgDefault}
          srcSet={`${coverImg640} 640w, ${coverImg800} 800w, ${coverImgDefault} 1280w`}
          sizes="(max-width: 640px) 640px, (max-width: 800px) 800px, 100vw"
          alt="Website Cover"
          className="aspect-video w-full skeleton-loading"
        />
      </div>

      <ProductCardGroup
        products={topProducts}
        groupHeading={"Top products"}
        loading={loading}
        link={"/products"}
      />

      <CollectionCardGroup
        collectionsArray={[
          {
            image:
              "https://firebasestorage.googleapis.com/v0/b/al-zehra.appspot.com/o/collections-images%2FMen.png?alt=media&token=90b2211e-911e-4380-86b8-f385ea8d83e6",
            name: "men",
            slug: "men",
          },
          {
            image:
              "https://firebasestorage.googleapis.com/v0/b/al-zehra.appspot.com/o/collections-images%2Fwomen.png?alt=media&token=81a8552b-e4c4-4dc2-ab74-025dc5dd79a3",
            name: "women",
            slug: "women",
          },
          {
            image:
              "https://firebasestorage.googleapis.com/v0/b/al-zehra.appspot.com/o/collections-images%2Feastern.png?alt=media&token=5d04aef8-eec9-47c9-a1dc-1b6a5b207f29",
            name: "eastern",
            slug: "eastern",
          },
          {
            image:
              "https://firebasestorage.googleapis.com/v0/b/al-zehra.appspot.com/o/collections-images%2Fwestern.png?alt=media&token=a32f510e-56be-492a-9eb1-096307b3ac29",
            name: "western",
            slug: "western",
          },
        ]}
      />

      <ProductCardGroup
        products={topProducts}
        groupHeading={"Top products"}
        loading={loading}
        link={"/products"}
      />

      <CollectionCardGroup
        collectionsArray={[
          {
            image:
              "https://firebasestorage.googleapis.com/v0/b/al-zehra.appspot.com/o/collections-images%2Foffice.png?alt=media&token=d6ea9605-9640-4cd6-a0cc-3e215ed8e42e",
            name: "Office",
            slug: "office",
          },
          {
            image:
              "https://firebasestorage.googleapis.com/v0/b/al-zehra.appspot.com/o/collections-images%2Fschool.png?alt=media&token=e73dc7d5-96a7-4d4f-8b7a-358e2e87ab4a",
            name: "school",
            slug: "school",
          },
          {
            image:
              "https://firebasestorage.googleapis.com/v0/b/al-zehra.appspot.com/o/collections-images%2Fparty.png?alt=media&token=ce3790b6-175b-4704-abb0-89ae0c5ecd5e",
            name: "party",
            slug: "party",
          },
          {
            image:
              "https://firebasestorage.googleapis.com/v0/b/al-zehra.appspot.com/o/collections-images%2Fwedding.png?alt=media&token=d5e1b66f-35d9-4113-a38f-0a2bb8c0485f",
            name: "wedding",
            slug: "wedding",
          },
        ]}
      />

      <ProductCardGroup
        products={topProducts}
        groupHeading={"Top products"}
        loading={loading}
        link={"/products"}
      />

      <CollectionCardGroup
        collectionsArray={[
          {
            image:
              "https://firebasestorage.googleapis.com/v0/b/al-zehra.appspot.com/o/collections-images%2Fsoft.png?alt=media&token=b4041503-af4b-4d6f-a125-fada610e3f46",
            name: "Soft",
            slug: "soft",
          },
          {
            image:
              "https://firebasestorage.googleapis.com/v0/b/al-zehra.appspot.com/o/collections-images%2Fhard.png?alt=media&token=aa6dbf49-7626-4176-8497-b8d47c49c6ce",
            name: "hard",
            slug: "hard",
          },
          {
            image:
              "https://firebasestorage.googleapis.com/v0/b/al-zehra.appspot.com/o/collections-images%2Fsummer.png?alt=media&token=a45fddf6-5b9c-464d-aff7-517704588904",
            name: "summer",
            slug: "summer",
          },
          {
            image:
              "https://firebasestorage.googleapis.com/v0/b/al-zehra.appspot.com/o/collections-images%2Fwinter.png?alt=media&token=34335f97-68ab-4ae4-9f25-7c9a11d381f9",
            name: "winter",
            slug: "winter",
          },
        ]}
      />

      <section className="grid md:grid-cols-2 grid-cols-1 gap-4 p-8">
        <Link className="hover:scale-105 transition-all">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/al-zehra.appspot.com/o/collections-images%2F1.png?alt=media&token=da140821-3e2d-44fe-bf28-bb973014e2c1"
            alt="Gm foods By  | Perfume Testers | Pakistan"
            className="rounded-lg"
          />
        </Link>
        <Link className="hover:scale-105 transition-all">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/al-zehra.appspot.com/o/collections-images%2F2.png?alt=media&token=d2b7ca20-05b0-4bdb-953d-d4611e19f30e"
            alt="Gm foods By GM  | Attar | Pakistan"
            className="rounded-lg"
          />
        </Link>
      </section>

      <ProductCardGroup
        products={topProducts}
        groupHeading={"Top products"}
        loading={loading}
        link={"/products"}
      />

      <section className="w-screen md:p-8 p-4 ">
        <div className="bg-black text-white rounded-3xl flex md:flex-row flex-col items-center justify-between gap-5">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/al-zehra.appspot.com/o/collections-images%2Fpexels-yuli-sv-58861876-7941434%20(1).jpg?alt=media&token=2afc4a1a-090e-4c30-9747-530edd90e4ce"
            className="md:w-1/2 w-full aspect-square object-cover md:rounded-l-3xl rounded-t-2xl"
            alt="FREE Perfume tester | Image | Gm foods achars | Pakitan"
          />

          <div className="md:w-1/2 flex flex-col justify-center ">
            <h1 className="uppercase font-black text-white md:text-[60px] text-3xl md:text-left text-center leading-snug   ">
              Can't figure out where to begin?
            </h1>
            <div className="md:w-1/2 pl-4 flex md:justify-start justify-center my-6">
              <Link
                className="bg-brandRed text-white px-6 py-3 rounded-full hover:bg-red-800 transition-all duration-100"
                to="/collection/tester"
              >
                Try Our Samples
              </Link>
            </div>
          </div>
        </div>
      </section>
      <CustomerBenefits />
      <Testimonials reviews={reviews} bgColor="blue-500" textColor="black" />
    </main>
  );
};

export default HomePage;
