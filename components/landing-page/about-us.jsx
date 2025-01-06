"use client"
import { Icon } from "@iconify/react"
import Image from "next/image"
import label1 from "@/public/images/landing-page/auth-label-1.png"
import label2 from "@/public/images/landing-page/author-label-2.png"
import label3 from "@/public/images/landing-page/label-3.png"
import label4 from "@/public/images/landing-page/label-4.png"
import label5 from "@/public/images/landing-page/label-5.png"
import featured from "@/public/images/landing-page/featured.png"
import { cn } from "@/lib/utils"
const AboutUs = () => {
  const data = [
    {
      title: "Exclusive Author",
      image: label1
    },
    {
      title: "Weekly Top Seller",
      image: label2
    },
    {
      title: "Featured Author",
      image: label3
    },
    {
      title: "6 Years Membership",
      image: label4
    },
    {
      title: "Trendsetter",
      image: label5
    },
  ]
  return (
    <section className="bg-[#F8F4F3] dark:bg-card pt-16 2xl:pt-[120px]">
      <div className="max-w-[670px] mx-auto px-3">
        <h2 className="text-center text-xl xl:text-3xl xl:leading-[46px] font-semibold text-default-900 mb-3">
          A Legacy of  <span className="text-primary">Trust</span>
        </h2>
        <p className="text-base xl:leading-7 text-center text-default-700 ">
          Premium, budget-friendly solutions for web applications, regardless of size, utilizing the most trusted frameworks and familiar tools.
        </p>
      </div>


      <div className="mt-12 flex justify-center items-center gap-3 lg:gap-16 px-3">
        {
          data.map((item, index) => (
            <div
              key={`label-image-${index}`}
              className="flex flex-col items-center text-center"
            >
              <div className={cn("w-8 h-10 md:w-fit md:h-fit", {
                "w-10 h-14 md:w-fit md:h-fit": index == 2
              })}>
                <Image src={item.image} alt="image" />
              </div>
              <p className="text-xs lg:text-base font-medium text-default-700 mt-1 lg:mt-4">{item.title}</p>
            </div>
          ))
        }
      </div>
      <div className="mt-12 flex flex-wrap justify-center gap-9 text-center">
        <div className="bg-background border border-primary py-5 px-6 rounded">
          <span className="block text-lg xl:text-2xl font-semibold text-default-900">+7 Years</span>
          <span className="block mt-1 text-sm font-medium text-default-800 whitespace-nowrap">On ThemeForest</span>
        </div>
        <div className="bg-background border border-primary py-5 px-6 rounded">
          <span className="block text-lg xl:text-2xl font-semibold text-default-900">10k+</span>
          <span className="block mt-1 text-sm font-medium text-default-800 whitespace-nowrap">End Users</span>
        </div>
        <div className="bg-background border border-primary py-5 px-6 rounded">
          <span className="block text-lg xl:text-2xl font-semibold text-default-900">5k+</span>
          <span className="block mt-1 text-sm font-medium text-default-800 whitespace-nowrap">Love Codeshaper</span>
        </div>
        <div className="bg-background border border-primary py-5 px-6 rounded">
          <span className="block text-lg xl:text-2xl font-semibold text-default-900">200+</span>
          <span className="flex items-center mt-1 text-sm font-medium text-default-800 whitespace-nowrap">
            5 <Icon icon="heroicons:star" className="w-4 h-4 text-yellow-400" /> Reviews</span>
        </div>
      </div>
      <div className="h-fit w-full mt-14">

        <Image src={featured} alt="featured" className="w-full h-full object-cover" />

      </div>
    </section>
  );
};

export default AboutUs;