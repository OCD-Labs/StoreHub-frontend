"use client";
import Image from "next/image";
import search from "@public/assets/icons/search.svg";
import filter from "@public/assets/icons/filter.svg";
import uptrend from "@public/assets/icons/uptrend.svg";
import star from "@public/assets/icons/star.svg";
import { GetAllReviews } from "@app/apis/Inventory";
import { useSearchParams } from "next/navigation";
import { OPTIONS } from "@app/apis";
import useProfile from "@hooks/useProfile";
import { useEffect, useState } from "react";



const Reviews = () => {
  type ReviewStatType = {
    average_rating: string;
    total_reviews: number;
    total_reviews_today: number;
  };

  const [loading, setloading] = useState<boolean>(true);
  const [reviews, serReviews] = useState<[]>([]);
  const [metadata, setMetadata] = useState<{}>({});
  const [reviewStats, setReviewStats] = useState<ReviewStatType | undefined>(
    {} as ReviewStatType
  );

  const user_id: string | null = useSearchParams().get("id");

  // The comments below, where highlighted because they had Bug, please fix:

  // const GET_OPTIONS: OPTIONS = {
  //   method: "GET",
  //   headers: {
  //     "Content-Type": "application/json",
  //     Authorization: `Bearer ${useProfile().getSession()?.access_token}`,
  //   },
  // };

  type ReviewsType = {
    data: {
      message: string;
      result: {
        aggregated_reviews: {};
        reviews: [];
        metadata: {};
      };
    };
    status: string;
  };
// The comments below, where highlighted because they had Bug, please fix:

  // const getReviews = async (): Promise<any> => {
  //   try {
  //     const reviews: ReviewsType = await GetAllReviews(user_id, GET_OPTIONS);
  //     serReviews(reviews.data.result.reviews);
  //     setMetadata(reviews.data.result.metadata);
  //     const aggregatedReviews = reviews.data?.result
  //       .aggregated_reviews as ReviewStatType;
  //     setReviewStats(aggregatedReviews);
  //   } catch (error) {
  //     console.log(error, "reviews");
  //   }
  // };

  // useEffect(() => {
  //   getReviews();
  // }, []);
  // console.log(reviews, metadata, reviewStats);

  const numberOfStars = (num: number): JSX.Element => {
    const stars: JSX.Element[] = [];

    for (let i = 0; i < num; i++) {
      stars.push(<Image src={star} alt="stars" />);
    }

    return <>{stars}</>;
  };

  type SingleReviewType = {
    first_name: string;
    last_name: string;
    profile_image_url: string;
    comment: string;
    rating: string;
    created_at: string;
    store_id: number;
    item_id: number;
  };

  const reviewsList = reviews?.map((review: SingleReviewType) => {
    return (
      <div className="border rounded-md p-3 sm:px-5">
        <section className="flex justify-between items-center mb-2 sm:mb-4">
          <div className="flex gap-1 items-center">
            <p className="text-l font-bold">{`${review.first_name} ${review.last_name}`}</p>
            <img
              className="h-8 w-8 rounded-full"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt=""
            />
            <span className="flex gap-1">
              {numberOfStars(Math.floor(parseFloat(review.rating)))}
            </span>
          </div>

          <div>dot</div>
        </section>

        <section>
          <p>{review.comment}</p>
        </section>
      </div>
    );
  });
  return (
    <div className="px-6">
      <section>
        <span className="relative w-[70%] sm:w-[75%]">
          <input
            className="border w-full h-[35px] rounded-[5px] pl-[30px] sm:pl-[40px] pr-[30px] sm:pr-[35px]"
            placeholder="Search product name, category, ID, status"
          />
          <Image
            src={search}
            alt="search product"
            height={20}
            width={20}
            className="absolute top-0 left-2 sm:left-3"
          />
          <Image
            src={filter}
            alt="search product"
            height={20}
            width={20}
            className="absolute top-0 right-2"
          />
        </span>
      </section>

      {/* review analytics  */}
      <section className="flex flex-col">
        <div className="flex-1 w-full overflow-x-scroll scroll-smooth">
          <div className="flex justify-between py-2 min-w-[540px]">
            <div className="px-4 py-2 rounded mr-5 w-[200px]">
              <span className="flex items-center">
                <p className="font-semibold">Total Reviews</p>
              </span>
              <span className="flex items-end justify-between mt-2">
                <p className="font-bold text-xl">
                  {reviewStats?.total_reviews}
                </p>
                <span className="flex items-center ml-6 bg-green-100 px-2 rounded-[39px]">
                  <Image src={uptrend} alt="sales drop" />
                  <p className="text-green-500 text-[8px] ml-1">10%</p>
                </span>
              </span>
            </div>

            <hr
              className="h-[65px] text-gray w-[1px] my-auto"
              style={{ backgroundColor: "#d6d6d6" }}
            />

            <div className="px-4 py-2 rounded mr-5 w-[200px]">
              <span className="flex items-center">
                <p className="font-semibold">Reviews Today</p>
              </span>
              <span className="flex items-end justify-between mt-2">
                <p className="font-bold text-xl">
                  {reviewStats?.total_reviews_today}
                </p>
                <span className="flex items-center ml-6 bg-green-100 px-2 rounded-[39px]">
                  <Image src={uptrend} alt="sales drop" />
                  <p className="text-green-500 text-[8px] ml-1">10%</p>
                </span>
              </span>
            </div>

            <hr
              className="h-[65px] text-gray w-[1px] my-auto"
              style={{ backgroundColor: "#d6d6d6" }}
            />

            <div className="px-4 py-2 rounded mr-5 w-[200px]">
              <span className="flex items-center">
                <p className="font-semibold">Average Rating</p>
              </span>
              <span className="flex items-center mt-2">
                <p className="font-bold text-2xl mr-2">
                  {Number(reviewStats?.average_rating).toFixed(1)}
                </p>
                <span className="flex items-center gap-1">
                  {numberOfStars(
                    reviewStats?.average_rating
                      ? Math.floor(parseFloat(reviewStats.average_rating))
                      : 0
                  )}
                </span>
              </span>
            </div>
          </div>

          {/* <hr className="h-[65px] text-gray w-[1px] my-auto" style={{backgroundColor: '#d6d6d6'}}/> */}
        </div>
        <hr />

        <div>
          <p className="text-xl font-bold text-black my-4">Customer Reviews</p>
          <div className="flex flex-col gap-2 sm:gap-4">{reviewsList}</div>
        </div>
      </section>
    </div>
  );
};

export default Reviews;
