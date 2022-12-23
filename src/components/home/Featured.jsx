import { Carrousel } from "utils/Carrousel";

export const Featured = () => {
  const carrouselItems = [
    {
      img: "/images/featured/featured_home.jpg",
      title: "Fender",
      subtitle: "Custm shop",
      linkTitle: "Shop Now",
      linkTo: "/shop",
    },
    {
      img: "/images/featured/featured_home_2.jpg",
      title: "B-Stock",
      subtitle: "Awesome discounts",
      linkTitle: "View offers",
      linkTo: "/shop",
    },
    {
      img: "/images/featured/featured_home_3.jpg",
      title: "Fender",
      subtitle: "Custm shop",
      linkTitle: "Shop Now",
      linkTo: "/shop",
    },
  ];
  return (
    <div>
      <Carrousel items={carrouselItems} />
    </div>
  );
};
