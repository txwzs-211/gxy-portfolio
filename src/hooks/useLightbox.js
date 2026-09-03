import { useState, useCallback } from 'react';

/**
 * 分区隔离的大图浏览状态。
 * 每个资产分区（或每个角色）各自持有一个实例，因此浏览范围只在当前分区内循环。
 */
export function useLightbox() {
  const [state, setState] = useState({ list: null, index: 0 });

  const open = useCallback((list, index = 0) => setState({ list, index }), []);
  const close = useCallback(() => setState({ list: null, index: 0 }), []);
  const next = useCallback(
    () => setState((s) => (s.list ? { ...s, index: (s.index + 1) % s.list.length } : s)),
    []
  );
  const prev = useCallback(
    () =>
      setState((s) =>
        s.list ? { ...s, index: (s.index - 1 + s.list.length) % s.list.length } : s
      ),
    []
  );

  return { list: state.list, index: state.index, open, close, next, prev };
}
