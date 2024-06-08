import React, { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import { useNavigate , Link} from "react-router-dom";
import "./Users.css";
import logo from "../assets/logo.png";
import loop from "../assets/loop.png";
import left from "../assets/left2.png";
import right from "../assets/right2.png";
import { findUsers, unassignRole, findRolesToAssign, assignRoles, findUsersWithS, fetchDeleteUser, fetchAddUser  } from '../services/services';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [roles, setRoles] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const [showPopup, setShowPopup] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedRoles, setSelectedRoles] = useState([]);
    const [showInput, setShowInput] = useState(false);
    const [showAddUserPopup, setShowAddUserPopup] = useState(false);
    const [newUsername, setNewUsername] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [totalElements, setTotalElements] = useState(0);

    const navigate = useNavigate();

    const handleLogout = () => {
        const cookies = new Cookies();
        cookies.remove("jwt_authorization");
        navigate("/sign-in");
    };

    const cookies = new Cookies();    
    const jwtToken = cookies.get("jwt_authorization");

    if (!jwtToken) {
        navigate("/sign-in");
    }

    const fetchUsersWithS = async (page, s) => {
        try {
            findUsersWithS(page, s, jwtToken).then(res => {
                setUsers(res.data.content);
                setTotalPages(res.data.totalPages);
                setTotalElements(res.data.totalElements);
            });
        } catch (error) {
            navigate("/sign-in");
        }
    }

    const fetchRolesToAssign = async (username, adminToken) => {
        try {
            findRolesToAssign(username, adminToken).then(res => {
                setRoles(res.data);
            });
        } catch (error) {
            navigate("/sign-in");
        }
    }

    const handleUnassignRole = async (username, roleName, adminToken) => {
        await unassignRole(username, roleName, jwtToken);
        window.location.reload();
    }

    useEffect(() => {
        fetchUsersWithS(currentPage, '');
    }, []);

    const handleAssignRoleClick = async (user) => {
        await fetchRolesToAssign(user.username, jwtToken);
        setSelectedUser(user);
        setShowPopup(true);
    };

    const closePopup = () => {
        setShowPopup(false);
        setSelectedUser(null);
        setSelectedRoles([]);
    };

    const handleAddRole = (role) => {
        if (selectedRoles.includes(role)) {
            setSelectedRoles(prevRoles => prevRoles.filter(r => r !== role));
        } else {
            setSelectedRoles(prevRoles => [...prevRoles, role]);
        }
    };

    const fetchAddRoles = () => {
        assignRoles(selectedUser.username, selectedRoles, jwtToken);
        closePopup();
        window.location.reload();
        window.location.reload();
        window.location.reload();
        window.location.reload();
        window.location.reload();
        window.location.reload();
    };

    const handleSearchChange = (event) => {
        setSearchValue(event.target.value);
        setCurrentPage(0);
    }

    const handleEnterPress = (event) => {
        if (event.key === 'Enter') {
            fetchUsersWithS(0, searchValue);
        }
    }
    
    const handleLoopClick = () => {
        setShowInput(true);
    };

    const deleteUser = async (username) => {
        await fetchDeleteUser(username, jwtToken);
        window.location.reload();
    }

    const addUser = async () => {
        try {
            await fetchAddUser(newUsername, newPassword, jwtToken);
            setShowAddUserPopup(false);
            setNewUsername("");
            setNewPassword("");
            setErrorMessage("");
            window.location.reload();
        } catch (error) {
            setErrorMessage("Error: Try again.");
        }
    }

    const openAddUserPopup = () => {
        setShowAddUserPopup(true);
    }

    const closeAddUserPopup = () => {
        setShowAddUserPopup(false);
        setNewUsername("");
        setNewPassword("");
        setErrorMessage("");
    }

    const handlePageChange = (direction) => {
        if(currentPage + direction + 1 > totalPages){
            return;
        }
        if (currentPage + direction > -1) {
            fetchUsersWithS(currentPage + direction, searchValue);
            setCurrentPage(currentPage + direction);
        }
    };

    const quickstart = () => {
        navigate('/quickstart');
    };
    
    return (
        <div className="container">
            <div className="cmenucontainer">
                <div className="cmenu">
                    <img src={logo} alt="" height={50} />
                </div>
                <div className="cmenu2">
                    <button className="quickstart" onClick={quickstart}>
                        <div className="clbn">Quickstart</div>
                    </button>
                    <button className="clb" onClick={handleLogout}>
                        <div className="clbn">Sign out</div>
                    </button>
                </div>
            </div>
            <div className="mainview">
                <div className="sidebar">
                    <div className="authGuardText">Dashboard</div>
                    <div className="describeText">Set here auth for app, with no bullshit code, and annoying configurations.</div>
                    <Link to="/users" className="sidebarButtons">
                        <div className="sidebarButtonsText">Users</div>
                    </Link>

                    <Link to="/roles" className="sidebarButtons">
                        <div className="sidebarButtonsText">Roles</div>
                    </Link>

                    <Link to="/permissions" className="sidebarButtons">
                        <div className="sidebarButtonsText">Permissions</div>
                    </Link>
                </div>
                <div className="dashboarddcontainer">
                    <div className="dashboardhead">
                        <div className="headtext">Users</div>
                        <div className="describetext">Here are all users in your app, you can here manage them.</div>
                    </div>
                    <div className="optionsContainer">
                        <div className="counter">Total: {totalElements} Page: {currentPage + 1} / {totalPages}</div>
                         <div className="arrow1" onClick={() => handlePageChange(-1)}>
                            <img src={left} alt="" height={22} />
                        </div>
                        <div className="arrow2" onClick={() => handlePageChange(1)}>
                            <img src={right} alt="" height={22} />
                        </div>
                    <button className="addUserButton" onClick={openAddUserPopup}>Add</button>
                        <div className="search">
                            {showInput && (
                                <input className="input" type="text" id="s" placeholder="Search" value={searchValue} onChange={handleSearchChange} onKeyDown={handleEnterPress}/>
                            )}    
                            <div className={`loop ${showInput ? "movedRight" : ""}`} onClick={handleLoopClick}>
                                <img src={loop} alt="" height={25} />
                            </div>
                        </div>
                    </div>
                    <div className="userscontainer">
                        <div className="tags">
                            <div className="lefttag">Username</div>
                            <div className="righttag">Roles</div>
                        </div>
                        <div className="userscontainer2">
                            {users.length > 0 ? (
                                users.map((element, index) => (
                                    <div className="data" key={index}>
                                        <div className="username">
                                            {element.username}
                                        </div>
                                        <div className="roles">
                                            {element.roles.map((role, index) => (
                                                <div key={index} className="role">
                                                    <div className="">{role}</div>
                                                    <div className="deleteRole" onClick={() => handleUnassignRole(element.username, role, jwtToken)}>x</div>
                                                </div>
                                            ))}
                                            <div className="assignRole" onClick={() => handleAssignRoleClick(element)}>+</div>
                                            <div className="deleteUser" onClick={() => deleteUser(element.username)}>x</div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="noresults2">No results..</div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {showPopup && (
                <div className="popup">
                    <div className="popup-content">
                        <span className="close" onClick={closePopup}>&times;</span>
                        <h2>Assign Roles</h2>
                        <p>Assign a new roles to {selectedUser.username}</p>
                        <div className="rolesList">
                            {roles && roles.length > 0 ? (
                                roles.map((role, index) => (
                                    <div key={index} className={`role2 ${selectedRoles.includes(role) ? 'selected' : ''}`} onClick={() => handleAddRole(role)}>
                                        {role}
                                    </div>                        
                                ))
                            ) : (
                                <div className="noresults">No results..</div>
                            )}
                        </div>
                        {roles && roles.length > 0 && (
                        <div className="addButton" onClick={() => fetchAddRoles()}>ADD</div>)}
                    </div>
                </div>
            )}
            {showAddUserPopup && (
                <div className="popup-add-user">
                    <div className="popup-add-user-content">
                        <span className="close" onClick={closeAddUserPopup}>&times;</span>
                        <h2>Add User</h2>
                        <input 
                            type="text" 
                            placeholder="Username" 
                            value={newUsername} 
                            onChange={(e) => setNewUsername(e.target.value)} 
                        />
                        <input 
                            type="password" 
                            placeholder="Password" 
                            value={newPassword} 
                            onChange={(e) => setNewPassword(e.target.value)} 
                        />
                        <button onClick={addUser}>ADD</button>
                        {errorMessage && <div className="error-message">{errorMessage}</div>}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Users;
