import { useEffect, useRef } from "react";
import SharedBookmarkGrid from "../components/organisms/SharedBookmarkGrid";
import { recentBoookmark } from "../apis/bookmark";
import { useInfiniteQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import cookies from "react-cookies";

const FirstAccessPage = () => {
  const navigate = useNavigate();
  const accessToken = cookies.load("accessToken");

  const { data, fetchNextPage, hasNextPage, isFetching, refetch } =
    useInfiniteQuery(
      ["bookmarkList", accessToken],
      ({ pageParam = 0 }) => recentBoookmark({ page: pageParam }),
      {
        getNextPageParam: lastPage => {
          if (!lastPage) return undefined;
          // console.log("lastPage", lastPage);
          const currentPage = lastPage.data?.response?.pageInfo?.currentPage;
          const totalPages = lastPage.data?.response?.pageInfo?.totalPages;
          return currentPage < totalPages - 1 ? currentPage + 1 : undefined;
        },
        onSuccess: res => {
          const status = res.pages[0]?.status;

          if (status === 404) {
            navigate("/notfound");
          } else if (status === 403) {
            navigate("/forbidden");
          }
        },
      }
    );

  const refetchData = async () => {
    await refetch();
  };

  useEffect(() => {
    if (accessToken) {
      refetchData();
    }
  }, [accessToken]);

  const bottomObserver = useRef();
  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.5,
  };

  const handleObserver = entities => {
    const target = entities[0];
    if (target.isIntersecting && hasNextPage) {
      fetchNextPage();
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, options);
    if (bottomObserver.current) {
      observer.observe(bottomObserver.current);
    }
    return () => {
      if (bottomObserver.current) {
        observer.unobserve(bottomObserver.current);
      }
    };
  }, [bottomObserver, hasNextPage, fetchNextPage]);

  const bookmarkList = [];
  data?.pages?.forEach(page => {
    if (page) {
      page.data?.response?.bookmarkContents?.forEach(data => {
        bookmarkList.push(data);
      });
    }
  });

  return (
    <div className="flex flex-col items-center mx-auto">
      <h1 className="m-4 text-3xl">최근 추가한 북마크</h1>
      <SharedBookmarkGrid bookmarkList={bookmarkList} />
      <div ref={bottomObserver} style={{ height: "20px" }}>
        {isFetching && "Loading more..."}
      </div>
    </div>
  );
};

export default FirstAccessPage;
