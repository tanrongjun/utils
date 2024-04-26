import { useEffect, useRef, useState } from "react";
import { useRequest } from "umi";

import useReachBottom from "./useReachBottom";

const searchParam = {
  currentPage: 0,
  showNum: 10
};

const useList = (apiFn: any, props: any) => {
  const [isMore, setIsMore] = useState<boolean>(true);
  const [isText, setIsText] = useState<boolean>(false);
  const [params, setParams] = useState<any>(searchParam);
  const [dataList, setDataList] = useState<any>([]);
  const [hasFresh, setHasFresh] = useState(false)

  const { run, loading } = useRequest(apiFn, {
    manual: true,
    formatResult: res => {
      setDataList([...dataList, ...res.data])
      setIsMore(!(params.currentPage + 1 >= Math.ceil(res.dataCount / params.showNum)))
    }
  })

  const currentRef = useRef<any>(null);
  const loadingRef = useRef<any>(null);
  const isMoreRef = useRef<any>(null);

  useEffect(() => {
    setIsText(!isMore)
    isMoreRef.current = isMore;
  }, [isMore]);
  useEffect(() => {
    loadingRef.current = loading;
  }, [loading]);
  useEffect(() => {
    !hasFresh && setHasFresh(true)
    setDataList([]);
    setParams(searchParam);
    if (!params.currentPage && hasFresh) {
      getData()
    }
  }, [JSON.stringify(props)]);
  useEffect(() => {
    currentRef.current = params.currentPage
    getData()
  }, [params]);

  const handleLoadMore = () => {
    if (!loadingRef.current && isMoreRef.current) {
      const temp = currentRef.current + 1;
      setParams({
        ...params,
        currentPage: temp
      });
    };
  };
  const { showTop } = useReachBottom(handleLoadMore);
  // 这里使用了ahooks中useRequest请求库
  const getData = () => run({
    ...params,
    ...props
  })
  // 常规写法
  // const getData = () => {
  //   apiFn({
  //     ...params,
  //     ...props
  //   }).then(res => {
  //     // setDataList()
  //     // setIsMore()
  //   })
  // }

  return {
    hasFresh,
    showTop,
    loading,
    isText,
    dataList
  }
}

export default useList
