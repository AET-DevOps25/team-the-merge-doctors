import { SearchCategory } from '@/components/molecules/SearchCategory';
import { SearchSkills } from '@/components/molecules/SearchSkills';
import { Divider } from 'antd';

export function SearchFilterSidebar() {
  // TODO:
  // General Search?
  // Select: category
  // Select: Skills
  // Select: years of experience

  // searchMentors(categories: [category id], yearsOfExperience: [int], skills: [skill ids]): [mentorId]
  // searchCategories(input: string): [Category]
  // searchSkills(input: string): [Skill]
  return (
    <>
      <SearchSkills />
      <Divider />
      <SearchCategory />
    </>
  );
}
