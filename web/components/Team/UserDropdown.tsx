import React, { useEffect, useState } from 'react';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { User } from '../../common/types';
import { Avatar, CircularProgress } from '@mui/material';
import axios from 'axios';

const UserDropdown = ({ users, callback }: { users?: User[], callback: (any?: any) => any }) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedMembers, setSelectedMembers] = useState<User[]>([]);
    const [members, setMembers] = useState([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);



    useEffect(() => {

        const getData = async () => {
            try {
                const response = await axios.get(`https://digi-pro-dev-webapp-backend.azurewebsites.net/users/`);
                setMembers(response.data)
                setError(null);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        getData();

        setSelectedMembers(users ?? [])
    }, [])




    const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const handleAddMember = (member: User) => {
        if (!selectedMembers.some((m) => m.id === member.id)) {
            setSelectedMembers([...selectedMembers, member]);
            callback([...selectedMembers, member])

        }

        handleCloseMenu();
    };

    const handleDeleteMember = (member: User) => {
        const updatedMembers = selectedMembers.filter((m) => m.id !== member.id);
        setSelectedMembers(updatedMembers);
        callback(updatedMembers);
        handleCloseMenu();
    }; 

    const listedusers: User[] = members


    if (error) return <div>Error</div>;
    if (loading || members == undefined)
        return (
            <div
                style={{
                    display: "flex",
                    height: "10vh",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <CircularProgress />
            </div>
        );

    return (
        <div>

            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleCloseMenu}>
                {listedusers.map((user) => (
                    <MenuItem key={user.id} onClick={() => {
                        handleAddMember(user)

                    }
                    }>
                        <img src={user.profile_picture} alt={user.name} style={{ width: 20, height: 20, marginRight: 8 }} />
                        {user.name}
                    </MenuItem>
                ))}
            </Menu>

            <h2>Team</h2>
            <div>
                {selectedMembers.map((user, index) => (

                    <Chip style={{ marginRight: 6 }} key={index} onDelete={() => {
                        handleDeleteMember(user)
                    }} label={user.name} avatar={<Avatar
                        src={user.profile_picture}
                    />} />
                ))}

                <Chip label={"+"} onClick={handleOpenMenu} />

            </div>
        </div>
    );
};

export default UserDropdown;
