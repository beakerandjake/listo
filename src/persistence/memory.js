const items = [
  { id: '123', name: 'baboon' },
  { id: '456', name: 'beaker' },
  { id: '789', name: 'coyote' },
];

export async function initialize() {
  return Promise.resolve();
}

export async function close() {
  return Promise.resolve();
}

export async function getItems() {
  return items;
}

export async function addItem(item) {
  if (items.find((x) => x.name.toLowerCase() === item.name.toLowerCase())) {
    return false;
  }

  items.push(item);

  return true;
}

export async function removeItem(id) {
  const index = items.findIndex((x) => x.id === id);

  if (index > -1) {
    items.splice(index, 1);
    return true;
  }

  return false;
}
