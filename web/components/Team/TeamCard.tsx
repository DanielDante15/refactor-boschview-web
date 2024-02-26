import { Box } from "@mui/material";
import { Project, User } from "../../common/types";
import Link from "next/link";
import ViewTechStack from "../Techs/ViewTechStack";
import ViewTeam from "../Team/ViewTeam";
import styles from "../../styles/SearchProjectsPage.module.scss";
import miniStyles from "../../styles/components/ModalSearch.module.scss";
import ViewProjects from "../Projects/ViewProjects";
import PersonIcon from '@mui/icons-material/Person';
export default function TeamCard({
    members: member,
    size,
    onClick,
}: {
    members: User;
    size?: "small" | "normal";
    onClick?: (any?: any) => any;
}) {


    const renderImage = () => {

        if (member.profile_picture != undefined)
            return (
                <img
                    className={styles.cover}
                    alt={member.profile_picture}
                    src={member.profile_picture}
                    width='100%'
                    height='280rem'
                />
            );
        return (
            <div className="">
                <PersonIcon
                style={{
                    backgroundColor:"darkgray",
                    color:"#666",
                    width: '100%',
                    height: '15rem'
                }}
            />
            </div>
        );
    };

    const renderCard = () => {
        if (size == undefined || size == "normal") {
            return (
                <Box className={styles.projectCard}>

                    <Box>
                        {renderImage()}
                        <h1>{member.name}</h1>
                        <h2>Stack: {member.stack}</h2>
                    </Box>
                    <Box>
                        <h4>Projects</h4>
                        <ViewProjects project={member.projects} />
                    </Box>
                    
                </Box>
            );
        }
        if (size != undefined || size == "small") {
            return (
                <Box className={miniStyles.miniProjectCard}>
                    <h2>{member.name}</h2>
                    <h3>Stack: {member.stack}</h3>
                </Box>
            );
        }
    };
    if (onClick != undefined)
        return (
            <Link href={`/users/${member.id}/`}>
                <Box onClick={onClick}>{renderCard()}</Box>
            </Link>
        );
    else
        return <Link href={`/users/${member.id}`}>{renderCard()}</Link>;
}
