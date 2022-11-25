import { mockData } from './mockDataStore';

export const getLists = async () => {
  await new Promise((resolve) => setTimeout(resolve, 0));
  const toReturn = mockData.map((x) => ({
    name: x.name,
    id: x.id,
    iconName: x.iconName,
    itemCount: x.items.length,
  }));
  return toReturn;
};
