import type { FieldType } from "../FormTask";

export const sortedData = (a: FieldType, b: FieldType) => {
  const aDate = a.date.split("-");
  const bDate = b.date.split("-");
  const newADate = new Date( parseInt(aDate[0]), parseInt(aDate[1]) - 1, parseInt(aDate[2]));
  const newBDate = new Date( parseInt(bDate[0]), parseInt(bDate[1]) - 1, parseInt(bDate[2]));
  return newADate.getTime() - newBDate.getTime();
}