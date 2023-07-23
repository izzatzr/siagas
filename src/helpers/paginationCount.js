function getPageStart(pageSize, pageNr) {
  return pageSize * pageNr;
}

export const  getPageLabel = (total, pageSize, pageNr) => {
  const start = Math.max(getPageStart(pageSize, pageNr), 0);
  const end = Math.min(getPageStart(pageSize, pageNr + 1), total);

  return `${start + 1} sampai ${end}`;
}

