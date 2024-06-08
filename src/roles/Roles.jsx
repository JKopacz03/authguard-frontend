import React, { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import { useNavigate, Link } from "react-router-dom";
import "./Roles.css";
import logo from "../assets/logo.png";
import loop from "../assets/loop.png";
import left from "../assets/left2.png";
import right from "../assets/right2.png";
import { unassignPermission, findPermissionsToAssign, assignPermissions, findRolesWithS, fetchDeleteRole, fetchAddRole  } from '../services/services';

const Roles = () => {
    const [roles, setRoles] = useState([]);
    const [permissions, setPermissions] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const [showPopup, setShowPopup] = useState(false);
    const [selectedRole, setSelectedRole] = useState(null);
    const [selectedPermissions, setSelectedPermissions] = useState([]);
    const [showInput, setShowInput] = useState(false);
    const [showAddRolePopup, setShowAddRolePopup] = useState(false);
    const [newName, setNewName] = useState("");
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

    const fetchRolesWithS = async (page, s) => {
        try {
            findRolesWithS(page, s, jwtToken).then(res => {
                setRoles(res.data.content);
                setTotalPages(res.data.totalPages);
                setTotalElements(res.data.totalElements);
            });
        } catch (error) {
            navigate("/sign-in");
        }
    }

    const fetchPermissionsToAssign = async (name, adminToken) => {
        try {
            findPermissionsToAssign(name, adminToken).then(res => {
                setPermissions(res.data);
            });
        } catch (error) {
            navigate("/sign-in");
        }
    }

    const handleUnassignPermission = async (role, permission, adminToken) => {
        await unassignPermission(role, permission, jwtToken);
        window.location.reload();
    }

    useEffect(() => {
        fetchRolesWithS(currentPage, '');
    }, []);

    const handleAssignPermissionClick = async (role) => {
        await fetchPermissionsToAssign(role.name, jwtToken);
        setSelectedRole(role);
        setShowPopup(true);
    };

    const closePopup = () => {
        setShowPopup(false);
        setSelectedRole(null);
        setSelectedPermissions([]);
    };

    const handleAddPermission = (permission) => {
        if (selectedPermissions.includes(permission)) {
            setSelectedPermissions(prevPermissions => prevPermissions.filter(r => r !== permission));
        } else {
            setSelectedPermissions(prevPermissions => [...prevPermissions, permission]);
        }
    };

    const fetchAddPermissions = () => {
        assignPermissions(selectedRole.name, selectedPermissions, jwtToken);
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
            fetchRolesWithS(0, searchValue);
        }
    }
    
    const handleLoopClick = () => {
        setShowInput(true);
    };

    const deleteRole = async (name) => {
        await fetchDeleteRole(name, jwtToken);
        window.location.reload();
    }

    const addRole = async () => {
        try {
            await fetchAddRole(newName, jwtToken);
            setShowAddRolePopup(false);
            setNewName("");
            setErrorMessage("");
            window.location.reload();
        } catch (error) {
            setErrorMessage("Error: Try again.");
        }
    }

    const openAddRolePopup = () => {
        setShowAddRolePopup(true);
    }

    const closeAddRolePopup = () => {
        setShowAddRolePopup(false);
        setNewName("");
        setErrorMessage("");
    }

    const handlePageChange = (direction) => {
        if(currentPage + direction + 1 > totalPages){
            return;
        }
        if (currentPage + direction > -1) {
            fetchRolesWithS(currentPage + direction, searchValue);
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
                        <div className="headtext">Roles</div>
                        <div className="describetext">Be carefull, don't assign by accident admin role to user!</div>
                    </div>
                    <div className="optionsContainer">
                        <div className="counter">Total: {totalElements} Page: {currentPage + 1} / {totalPages}</div>
                         <div className="arrow1" onClick={() => handlePageChange(-1)}>
                            <img src={left} alt="" height={22} />
                        </div>
                        <div className="arrow2" onClick={() => handlePageChange(1)}>
                            <img src={right} alt="" height={22} />
                        </div>
                    <button className="addUserButton" onClick={openAddRolePopup}>Add</button>
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
                            <div className="lefttag">Name</div>
                            <div className="righttag">Permissions</div>
                        </div>
                        <div className="userscontainer2">
                            {roles.length > 0 ? (
                                roles.map((element, index) => (
                                    <div className="data" key={index}>
                                        <div className="username">
                                            {element.name}
                                        </div>
                                        <div className="roles">
                                            {element.permissions.map((permission, index) => (
                                                <div key={index} className="roleRoles">
                                                    <div className="">{permission}</div>
                                                    <div className="deleteRole" onClick={() => handleUnassignPermission(element.name, permission, jwtToken)}>x</div>
                                                </div>
                                            ))}
                                            <div className="assignRole" onClick={() => handleAssignPermissionClick(element)}>+</div>
                                            <div className="deleteUser" onClick={() => deleteRole(element.name)}>x</div>
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
                        <h2>Assign Permissions</h2>
                        <p>Assign a new permissions to {selectedRole.name}</p>
                        <div className="rolesList">
                            {permissions && permissions.length > 0 ? (
                                permissions.map((permission, index) => (
                                    <div key={index} className={`role2 ${selectedPermissions.includes(permission) ? 'selected' : ''}`} onClick={() => handleAddPermission(permission)}>
                                        {permission}
                                    </div>                        
                                ))
                            ) : (
                                <div className="noresults">No results..</div>
                            )}
                        </div>
                        {permissions && permissions.length > 0 && (
                        <div className="addButton" onClick={() => fetchAddPermissions()}>ADD</div>)}
                    </div>
                </div>
            )}
            {showAddRolePopup && (
                <div className="popup-add-user">
                    <div className="popup-add-user-content">
                        <span className="close" onClick={closeAddRolePopup}>&times;</span>
                        <h2>Add Role</h2>
                        <input 
                            type="text" 
                            placeholder="Name" 
                            value={newName} 
                            onChange={(e) => setNewName(e.target.value)} 
                        />
                        <button onClick={addRole}>ADD</button>
                        {errorMessage && <div className="error-message">{errorMessage}</div>}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Roles;
