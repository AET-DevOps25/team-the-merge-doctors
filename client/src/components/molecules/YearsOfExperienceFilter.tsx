import { ComparisonFilterOperator, type ComparisonFilter } from '@/api/mentor';
import { Checkbox, Space } from 'antd';
import type { Dispatch, SetStateAction } from 'react';

interface YearsOfExperienceFilterProps {
  selectedExperienceFilter: ComparisonFilter | undefined;
  setSelectedExperienceFilter: Dispatch<
    SetStateAction<ComparisonFilter | undefined>
  >;
}

export function YearsOfExperienceFilter({
  selectedExperienceFilter,
  setSelectedExperienceFilter,
}: YearsOfExperienceFilterProps) {
  const filters: ComparisonFilter[] = [
    { operator: ComparisonFilterOperator.GREATER_THAN_OR_EQUAL, value: 1 },
    { operator: ComparisonFilterOperator.GREATER_THAN_OR_EQUAL, value: 3 },
    { operator: ComparisonFilterOperator.GREATER_THAN_OR_EQUAL, value: 5 },
    { operator: ComparisonFilterOperator.GREATER_THAN_OR_EQUAL, value: 10 },
  ];

  return (
    <Space direction="vertical">
      <div style={{ fontWeight: 'bold' }}>Experience</div>
      {filters.map((filter, index) => (
        <Checkbox
          key={index}
          checked={
            selectedExperienceFilter?.operator === filter.operator &&
            selectedExperienceFilter?.value === filter.value
          }
          onChange={(e) => {
            if (e.target.checked) {
              setSelectedExperienceFilter(filter);
            } else {
              setSelectedExperienceFilter(undefined)
            }
          }}
        >
          {comparisonFilterToString(filter)}
        </Checkbox>
      ))}
    </Space>
  );
}

function comparisonFilterToString(filter: ComparisonFilter) {
  switch (filter.operator) {
    case ComparisonFilterOperator.GREATER_THAN_OR_EQUAL:
      return `≥ ${filter.value} years`;
    case ComparisonFilterOperator.GREATER_THAN:
      return `> ${filter.value} years`;
    case ComparisonFilterOperator.EQUAL:
      return `= ${filter.value} years`;
    case ComparisonFilterOperator.LESS_THAN:
      return `< ${filter.value} years`;
    case ComparisonFilterOperator.LESS_THAN_OR_EQUAL:
      return `≤ ${filter.value} years`;
  }
}
