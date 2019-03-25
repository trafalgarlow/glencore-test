import { StringUtils } from '.';

export interface ObjectWithId {
  id: number;
}

const findNextId = <P extends ObjectWithId>(list: P[]): number => list.reduce(
  (acc, { id }) => Math.max(acc, id),
  0,
) + 1;

const containsSameName = (list: string[], name: string): boolean => list.some(
  l => StringUtils.areEquals(l, name),
);

export {
  findNextId,
  containsSameName,
};
