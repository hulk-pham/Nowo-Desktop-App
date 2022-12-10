import React, { FC } from 'react';

function List<T>({
  data,
  renderFunc,
  emptyComp,
}: {
  data: T[];
  renderFunc: (item: T, index: number) => any;
  emptyComp?: () => FC;
}) {
  if (data?.length === 0 && emptyComp) {
    return <>{emptyComp()}</>;
  }
  return <>{data.map(renderFunc)}</>;
}
export default List;
