
let items = [
    { id: "123", name: "baboon" },
    { id: "456", name: "beaker" },
    { id: "789", name: "coyote" },
];


export function getAll() {
    return items;
}

export function add(item) {
    if (items.find(x => x.name.toLowerCase() == item.name.toLowerCase())) {
        return false;
    }

    items.push(item);

    return true;
}

export function remove(id) {
    const index = items.findIndex(x => x.id == id);

    if (index > -1) {
        items.splice(index, 1);
        return true;
    }

    return false
}