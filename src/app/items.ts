type Item = {
  id: number;
  title: string;
  date: string;
  path: string;
}

let items: Item[] = [];

export function setItems(newItems: Item[]) {
  items = newItems;
}

export default function getItems() {
  return items;
}
