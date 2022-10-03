import { lists } from './mockDataStore';

export async function getLists() {
  await new Promise((resolve) => setTimeout(resolve, 0));
  const toReturn = lists.map((x) => ({
    name: x.name,
    id: x.id,
    iconName: x.iconName,
    itemCount: x.items.length,
  }));
  return toReturn;
}
