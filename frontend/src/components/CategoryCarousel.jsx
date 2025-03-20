import React from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";
import { Button } from "./ui/button";

const Category = [
  "Frontend Devloper",
  "backend Devloper",
  "Full Stack Devloper",
  "Mobile Devloper",
  "Data Science",
  "graphic Design",
  "UI/UX Design",
  "Game Devloper",
    "DevOps",
    "Cyber Security",
    "Digital Marketing",
    "Content Writing",
    "Video Editing",
    "Photography",
    "Music Production",
    "3D Modelling",
    "Animation",
    "Motion Graphics",
    "VFX",
    "Interior Design",
    "Architecture",
];
const CategoryCarousel = () => {
  return (
    <div>
      <Carousel className="w-full max-w-xl mx-auto my-20">
        <CarouselContent>
          {Category.map((cat, index) => (
            <CarouselItem className=" md:basis-1/2 lg-basis-1/3">
              <Button variant="outline" className="rounded-full">{cat}</Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious/>
        <CarouselNext/>
      </Carousel>
    </div>
  );
};

export default CategoryCarousel;
