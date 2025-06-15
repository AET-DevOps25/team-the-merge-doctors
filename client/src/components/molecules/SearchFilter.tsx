import { Checkbox, Input, Space } from 'antd';
import { useState } from 'react';

interface SearchFilterProps<T extends ItemType> {
  placeholder: string;
  title: string;
  items: T[];
}

interface ItemType {
  id: string;
  name: string;
}

export function SearchFilter<T extends ItemType>({
  placeholder,
  items,
  title,
}: SearchFilterProps<T>) {
  const [filterInput, setFilterInput] = useState<string>('');
  const [selectedItems, setSelectedItems] = useState<T[]>([]);

  const filteredItems = filterItems(items, filterInput, selectedItems).slice(
    0,
    10,
  );

  return (
    <Space direction="vertical">
      <div style={{ fontWeight: 'bold' }}>{title}</div>
      <Input
        placeholder={placeholder}
        value={filterInput}
        onChange={(e) => setFilterInput(e.target.value)}
      />
      {filteredItems.map((item) => (
        <Checkbox
          key={item.id}
          onChange={(e) => {
            if (e.target.checked) {
              setSelectedItems([...selectedItems, item]);
            } else {
              setSelectedItems(
                selectedItems.filter(
                  (selectedSkill) => selectedSkill.id !== item.id,
                ),
              );
            }
          }}
        >
          {item.name}
        </Checkbox>
      ))}
    </Space>
  );
}

function filterItems<T extends ItemType>(
  items: T[],
  input: string,
  selectedItems: T[],
): T[] {
  return items.filter(
    (item) =>
      item.name.toLowerCase().includes(input.toLowerCase()) ||
      selectedItems.some((selectedItem) => selectedItem.id == item.id),
  );
}
