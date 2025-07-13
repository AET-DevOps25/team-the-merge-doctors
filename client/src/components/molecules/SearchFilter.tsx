import { Checkbox, Input, Space } from 'antd';
import { useState, type Dispatch, type SetStateAction } from 'react';

interface SearchFilterProps<T extends ItemType> {
  placeholder: string;
  selectedItems: T[];
  setSelectedItems: Dispatch<SetStateAction<T[]>>;
  title: string;
  items: T[];
}

interface ItemType {
  id?: string;
  name?: string;
}

export function SearchFilter<T extends ItemType>({
  placeholder,
  selectedItems,
  setSelectedItems,
  items,
  title,
}: SearchFilterProps<T>) {
  const [filterInput, setFilterInput] = useState<string>('');

  // TOOD: maybe change this to always include selected items
  const filteredItems = filterItems(items, filterInput, selectedItems).slice(
    0,
    7,
  );

  return (
    <Space direction="vertical">
      <div style={{ fontWeight: 'bold' }}>{title}</div>
      <Input
        placeholder={placeholder}
        value={filterInput}
        onChange={(e) => setFilterInput(e.target.value)}
        allowClear
        data-testid="search-filter-input"
      />
      {filteredItems.map((item) => (
        <Checkbox
          key={item.id}
          data-testid="search-filter-option"
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
  const unselected = items.filter(
    (item) =>
      item.name?.toLowerCase().includes(input.toLowerCase()) &&
      !selectedItems.some((selectedItem) => selectedItem.id == item.id),
  );

  return [...selectedItems, ...unselected];
}
