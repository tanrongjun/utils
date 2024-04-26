// 触底加载hook
import { useEffect, useState } from 'react';
import { throttle } from 'lodash-es';

const useReachBottom = (fn: Function, height?: number, domId?: string) => {
  height = height || 100
  const [showTop, setShowTop] = useState<boolean>(false);

  const dom: any = document.querySelector(domId!) || ''

  const isReachBottom = (handler: Function) => {
    if ((dom.scrollTop || document.documentElement.scrollTop) > 600) {
      setShowTop(true);
    } else {
      setShowTop(false);
    }

    // 文档显示区域高度
    const showHeight = dom.clientHeight || document.documentElement.clientHeight;
    // 网页卷曲高度
    const scrollTopHeight = dom.scrollTop || document.body.scrollTop || document.documentElement.scrollTop;
    // 所有内容高度
    const allHeight = dom.scrollHeight || document.body.scrollHeight;
    // (所有内容高度 = 文档显示区域高度 + 网页卷曲高度) 时即为触底
    if (allHeight <= showHeight + scrollTopHeight + height) {
      handler();
    }
  };

  const useFn = throttle(() => {
    if (typeof fn === 'function') {
      isReachBottom(fn);
    };
  }, 200);

  useEffect(() => {
    (dom || document).addEventListener('scroll', useFn);
    return () => {
      (dom || document).removeEventListener('scroll', useFn);
    };
  });

  return {
    showTop
  }
};

export default useReachBottom;