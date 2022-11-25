import { lists } from './mockDataStore';

console.log('mock lists', lists);

async function getLists() {
  await new Promise((resolve) => setTimeout(resolve, 0));
  const toReturn = lists.map((x) => ({
    name: x.name,
    id: x.id,
    iconName: x.iconName,
    itemCount: x.items.length,
  }));
  return toReturn;
}

const api = {
  getLists,
};

export default api;
