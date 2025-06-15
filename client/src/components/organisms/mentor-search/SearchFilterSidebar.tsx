import { SearchFilter } from '@/components/molecules/SearchFilter';
import type { Category, Skill } from '@/types/types';
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
  const skills: Skill[] = [
    { id: '1', name: 'Testing' },
    { id: '2', name: 'Swift' },
    { id: '3', name: 'Java' },
    { id: '4', name: 'C++' },
    { id: '5', name: 'C' },

    // Software Engineering / Development
    { id: '6', name: 'Python' },
    { id: '7', name: 'JavaScript' },
    { id: '8', name: 'TypeScript' },
    { id: '9', name: 'React' },
    { id: '10', name: 'Node.js' },
    { id: '11', name: 'Kotlin' },
    { id: '12', name: 'Go' },
    { id: '13', name: 'Rust' },

    // DevOps / Infrastructure
    { id: '14', name: 'Docker' },
    { id: '15', name: 'Kubernetes' },
    { id: '16', name: 'AWS' },
    { id: '17', name: 'Terraform' },
    { id: '18', name: 'CI/CD' },

    // Data Science / Analytics
    { id: '19', name: 'SQL' },
    { id: '20', name: 'Pandas' },
    { id: '21', name: 'R' },
    { id: '22', name: 'Tableau' },
    { id: '23', name: 'Power BI' },
    { id: '24', name: 'Data Visualization' },
    { id: '25', name: 'Machine Learning' },

    // Design / Creative
    { id: '26', name: 'Figma' },
    { id: '27', name: 'Adobe Photoshop' },
    { id: '28', name: 'Adobe Illustrator' },
    { id: '29', name: 'UI/UX Design' },
    { id: '30', name: 'Prototyping' },

    // Business / Management
    { id: '31', name: 'Project Management' },
    { id: '32', name: 'Agile Methodology' },
    { id: '33', name: 'Scrum' },
    { id: '34', name: 'Business Strategy' },
    { id: '35', name: 'Market Research' },

    // Soft Skills / Professional
    { id: '36', name: 'Communication' },
    { id: '37', name: 'Teamwork' },
    { id: '38', name: 'Leadership' },
    { id: '39', name: 'Problem Solving' },
    { id: '40', name: 'Time Management' },
  ];

  const categories: Category[] = [
    { id: '1', name: 'Engineer' },
    { id: '2', name: 'Founder' },
    { id: '3', name: 'Testing Person' },
    { id: '4', name: 'Marketing Genius' },
    { id: '5', name: 'Marketing Magician' },

    // Expanded & normalized list
    { id: '6', name: 'Software Engineer' },
    { id: '7', name: 'Data Scientist' },
    { id: '8', name: 'Product Manager' },
    { id: '9', name: 'UX Designer' },
    { id: '10', name: 'UI Designer' },
    { id: '11', name: 'Graphic Designer' },
    { id: '12', name: 'DevOps Engineer' },
    { id: '13', name: 'Quality Assurance Engineer' },
    { id: '14', name: 'Technical Writer' },
    { id: '15', name: 'Frontend Developer' },
    { id: '16', name: 'Backend Developer' },
    { id: '17', name: 'Full Stack Developer' },
    { id: '18', name: 'Mobile Developer' },
    { id: '19', name: 'Data Analyst' },
    { id: '20', name: 'Machine Learning Engineer' },

    // Business & Operations
    { id: '21', name: 'Business Analyst' },
    { id: '22', name: 'Operations Manager' },
    { id: '23', name: 'Sales Executive' },
    { id: '24', name: 'Account Manager' },
    { id: '25', name: 'Customer Success Manager' },

    // Marketing & Creative
    { id: '26', name: 'Marketing Manager' },
    { id: '27', name: 'Content Strategist' },
    { id: '28', name: 'SEO Specialist' },
    { id: '29', name: 'Social Media Manager' },
    { id: '30', name: 'Brand Strategist' },

    // Executive / Leadership
    { id: '31', name: 'CTO' },
    { id: '32', name: 'CEO' },
    { id: '33', name: 'CFO' },
    { id: '34', name: 'COO' },
    { id: '35', name: 'Head of Engineering' },
    { id: '36', name: 'Head of Marketing' },

    // Support / Others
    { id: '37', name: 'Technical Support' },
    { id: '38', name: 'Recruiter' },
    { id: '39', name: 'HR Manager' },
    { id: '40', name: 'Legal Counsel' },
  ];

  return (
    <>
      <SearchFilter
        placeholder="Search for categories"
        items={categories}
        title="Categories"
      />
      <Divider />
      <SearchFilter
        placeholder="Search for skills"
        items={skills}
        title="Skills"
      />
    </>
  );
}
