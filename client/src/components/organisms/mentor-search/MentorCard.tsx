import {Button, Card, Col, Divider, Row, Space, Tag} from 'antd';
import '@/components/organisms/mentor-search/MentorCard.css';
import {useNavigate} from '@tanstack/react-router';
import type {MentorCategory, MentorProfile, Skill} from '@/api/mentor';
import {useGetUser} from '@/api/user';

interface MentorCardProps {
    mentor: MentorProfile;
}

export function MentorCard({mentor}: MentorCardProps) {
    // getAverageRating(mentorId)
    // getNumberOfReviews(mentorId)
    // getMentor(mentorId): should include categories, skills, bio, etc.

    // const {data: userData} = useGetUser({req: {userId: mentor.id}});

    return (
        <Card
            title={
                <Row>
                    {/* TODO: add name once its updated in schema */}
                    {/* <Col span={24}>{userData?.data.user?.userName}</Col> */}
                    {mentor.mentorCategory !== undefined && (
                        <Col span={24}>
                            <MentorCategoryPill category={mentor.mentorCategory}/>
                        </Col>
                    )}
                </Row>
            }
        >
            <Space direction="vertical">
                <div>
                    <div style={{fontWeight: 'bold'}}>About</div>
                    <div className="mentorBio">{mentor.bio}</div>
                </div>
                {mentor.skills !== undefined && <MentorSkills skills={mentor.skills}/>}
                <ViewProfileButton mentor={mentor}/>
            </Space>
        </Card>
    );
}

interface MentorSkillsProps {
    skills: Skill[];
}

function MentorSkills({skills}: MentorSkillsProps) {
    return (
        <div>
            <div style={{fontWeight: 'bold'}}>Skills</div>
            {skills?.map((skill) => <SkillPill key={skill?.id} skill={skill}/>)}
        </div>
    );
}

interface MentorCategoryPillProps {
    category: MentorCategory;
}

function MentorCategoryPill({category}: MentorCategoryPillProps) {
    return (
        <Tag>
            {category.category?.name}
            <Divider type="vertical" size="large"/>
            {category.yearsOfExperience} years
        </Tag>
    );
}

interface SkillPillProps {
    skill: Skill;
}

function SkillPill({skill}: SkillPillProps) {
    return <Tag>{skill.name}</Tag>;
}

interface ViewProfileButtonProps {
    mentor: MentorProfile;
}

function ViewProfileButton({mentor}: ViewProfileButtonProps) {
    const navigate = useNavigate();

    return (
        <div style={{textAlign: 'right'}}>
            <Button
                type="primary"
                onClick={() => {
                    if (mentor.id !== undefined) {
                        navigate({
                            to: '/mentor/$mentorId',
                            params: {mentorId: mentor.id},
                        });
                    }
                }}
            >
                View Profile
            </Button>
        </div>
    );
}
