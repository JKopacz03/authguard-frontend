import React, { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import { useNavigate, Link } from "react-router-dom";
import "./Permission.css";
import logo from "../assets/logo.png";
import loop from "../assets/loop.png";
import left from "../assets/left2.png";
import right from "../assets/right2.png";
import { findPermissionsWithS, fetchDeletePermission, fetchAddPermission  } from '../services/services';

const Roles = () => {
    const [permissions, setPermissions] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const [showPopup, setShowPopup] = useState(false);
    const [showInput, setShowInput] = useState(false);
    const [showAddPermissionPopup, setShowAddPermissionPopup] = useState(false);
    const [newName, setNewName] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [totalPages, setTotalPages] = useState(0);
    const [totalElements, setTotalElements] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);

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

    const fetchPermissionsWithS = async (page, s) => {
        try {
            findPermissionsWithS(page, s, jwtToken).then(res => {
                setPermissions(res.data.content);
                setTotalPages(res.data.totalPages);
                setTotalElements(res.data.totalElements);
            });
        } catch (error) {
            navigate("/sign-in");
        }
    }

    useEffect(() => {
        fetchPermissionsWithS(currentPage, '');
    }, []);

    const closePopup = () => {
        setShowPopup(false);
    };

    const handleSearchChange = (event) => {
        setSearchValue(event.target.value);
        setCurrentPage(0);
    }

    const handleEnterPress = (event) => {
        if (event.key === 'Enter') {
            fetchPermissionsWithS(0, searchValue);
        }
    }
    
    const handleLoopClick = () => {
        setShowInput(true);
    };

    const deletePermission = async (name) => {
        await fetchDeletePermission(name, jwtToken);
        window.location.reload();
    }

    const addPermission = async () => {
        try {
            await fetchAddPermission(newName, jwtToken);
            setShowAddPermissionPopup(false);
            setNewName("");
            setErrorMessage("");
            window.location.reload();
        } catch (error) {
            setErrorMessage("Error: Try again.");
        }
    }

    const openAddPermissionPopup = () => {
        setShowAddPermissionPopup(true);
    }

    const closeAddPermissionPopup = () => {
        setShowAddPermissionPopup(false);
        setNewName("");
        setErrorMessage("");
    }

    const handlePageChange = (direction) => {
        if(currentPage + direction + 1 > totalPages){
            return;
        }
        if (currentPage + direction > -1) {
            fetchPermissionsWithS(currentPage + direction, searchValue);
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
                        <div className="headtext">Permissions</div>
                        <div className="describetext">So what you want to allow my friend, maybe JUMP?</div>
                    </div>
                    <div className="optionsContainer">
                        <div className="counter">Total: {totalElements} Page: {currentPage + 1} / {totalPages}</div>
                         <div className="arrow1" onClick={() => handlePageChange(-1)}>
                            <img src={left} alt="" height={22} />
                        </div>
                        <div className="arrow2" onClick={() => handlePageChange(1)}>
                            <img src={right} alt="" height={22} />
                        </div>
                    <button className="addUserButton" onClick={openAddPermissionPopup}>Add</button>
                        <div className="search">
                            {showInput && (
                                <input className="input" type="text" id="s" placeholder="Search" value={searchValue} onChange={handleSearchChange} onKeyDown={handleEnterPress}/>
                            )}    
                            <div className={`loop ${showInput ? "movedRight" : ""}`} onClick={handleLoopClick}>
                                <img src={loop} alt="" height={25} />
                            </div>
                        </div>
                    </div>
                    <div className="userscontainerPermissions">
                        <div className="tags">
                            <div className="lefttag">Permissions</div>
                        </div>
                        <div className="userscontainer2s">
                        {permissions.length > 0 ? (
                                        <div className="permissions">
                                            {permissions.map((permission, index) => (
                                                <div key={index} className="rolePermissions">
                                                    <div className="">{permission.name}</div>
                                                    <div className="deleteRole" onClick={() => deletePermission(permission.name)}>x</div>
                                                </div>
                                            ))}
                                        </div>
                                        ) : (
                                            <div className="noresults2">No results..</div>
                        )}
                        </div>
                    </div>
                </div>
            </div>
            {showAddPermissionPopup && (
                <div className="popup-add-user">
                    <div className="popup-add-user-content">
                        <span className="close" onClick={closeAddPermissionPopup}>&times;</span>
                        <h2>Add Permission</h2>
                        <input 
                            type="text" 
                            placeholder="Name" 
                            value={newName} 
                            onChange={(e) => setNewName(e.target.value)} 
                        />
                        <button onClick={addPermission}>ADD</button>
                        {errorMessage && <div className="error-message">{errorMessage}</div>}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Roles;
