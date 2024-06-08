import axios from "axios";
import Cookies from "universal-cookie";


export const findUsers = async (page, adminToken) => {
    try {

        return await axios.get(
            'http://localhost:7777/user/find?size=8&page=' + page,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${adminToken}`,
                }, 
            }
        );
    } catch (e) {
        const cookies = new Cookies();
        cookies.remove("jwt_authorization");
        window.location.href = "/sign-in";
    }
};

export const findUsersWithS = async (page, s, adminToken) => {
    try {
        let url = 'http://localhost:7777/user/find?size=8&page=' + page;
        if (s !== '') {
            url += '&s=' + s;
        }
        console.log(url)
        return await axios.get(
            url,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${adminToken}`,
                }, 
            }
        );
    } catch (e) {
        window.location.href = "/sign-in";
        const cookies = new Cookies();
        cookies.remove("jwt_authorization");
        window.location.href = "/sign-in";
    }
};

export const signin = async (username, password) => {
    try {

        const requestBody = {
            'username': username,
            'password': password
        };

        const response = await axios.post(
            'http://localhost:7777/admin/generate-token',
            requestBody,
            {
                headers: {
                    'Content-Type': 'application/json'
                }, 
            }
        );
        return response.data.accessToken;
    } catch (e) {
        throw e;
    }
};

export const unassignRole = async (username, roleName, adminToken) => {
    try {

        return await axios.delete(
            'http://localhost:7777/role/unassign-role',
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${adminToken}`,
                }, 
                params: {
                    username: username,
                    roleName: roleName
                }
            }
        );
    } catch (e) {
        const cookies = new Cookies();
        cookies.remove("jwt_authorization");
        window.location.href = "/sign-in";
    }
};


export const assignRoles = async (username, roles, adminToken) => {
    try {

        const requestBody = {
            'username': username,
            'roleNames': roles
        };

        return await axios.post(
            'http://localhost:7777/role/assign-roles',
            requestBody,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${adminToken}`,
                }, 
            }
        );
    } catch (e) {
        const cookies = new Cookies();
        cookies.remove("jwt_authorization");
        window.location.href = "/sign-in";
    }
};

export const findRolesToAssign = async (username, adminToken) => {
    try {
        const response = await axios.get(
            'http://localhost:7777/role/find-beside-roles/' + username,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${adminToken}`,
                }, 
            }
        );
        return response;
    } catch (e) {
        const cookies = new Cookies();
        cookies.remove("jwt_authorization");
        window.location.href = "/sign-in";
    }
};

export const fetchDeleteUser = async (username, adminToken) => {
    try {
        const response = await axios.delete(
            'http://localhost:7777/user/delete/' + username,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${adminToken}`,
                }, 
            }
        );
        return response;
    } catch (e) {
        const cookies = new Cookies();
        cookies.remove("jwt_authorization");
        window.location.href = "/sign-in";
    }
};

export const fetchAddUser = async (username, password, adminToken) => {
    try {

        const requestBody = {
            'username': username,
            'password': password
        };

        const response = await axios.post(
            'http://localhost:7777/auth/add-user',
            requestBody,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${adminToken}`,
                }, 
            }
        );
        return response;
    } catch (e) {
        throw e;
    }
};

// unassignRole, findRolesToAssign, assignRoles, findUsersWithS, fetchDeleteUser, fetchAddUser

export const unassignPermission = async (role, permission, adminToken) => {
    try {

        return await axios.delete(
            'http://localhost:7777/role/unassign-permission',
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${adminToken}`,
                }, 
                params: {
                    permissionName: permission,
                    roleName: role
                }
            }
        );
    } catch (e) {
        const cookies = new Cookies();
        cookies.remove("jwt_authorization");
        window.location.href = "/sign-in";   
    }
};

export const findPermissionsToAssign = async (role, adminToken) => {
    try {
        const response = await axios.get(
            'http://localhost:7777/permission/find-beside-permissions/' + role,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${adminToken}`,
                }, 
            }
        );
        return response;
    } catch (e) {
        const cookies = new Cookies();
        cookies.remove("jwt_authorization");
        window.location.href = "/sign-in";
    }
};

export const assignPermissions = async (role, permissions, adminToken) => {
    try {

        const requestBody = {
            'roleName': role,
            'permissionNames': permissions
        };

        return await axios.post(
            'http://localhost:7777/role/assign-permissions',
            requestBody,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${adminToken}`,
                }, 
            }
        );
    } catch (e) {
        const cookies = new Cookies();
        cookies.remove("jwt_authorization");
        window.location.href = "/sign-in";
    }
};

export const findRolesWithS = async (page, s, adminToken) => {
    try {
        let url = 'http://localhost:7777/role/find?size=8&page=' + page;
        if (s !== '') {
            url += '&s=' + s;
        }
        console.log(url)
        return await axios.get(
            url,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${adminToken}`,
                }, 
            }
        );
    } catch (e) {
        const cookies = new Cookies();
        cookies.remove("jwt_authorization");
        window.location.href = "/sign-in";
    }
};

export const fetchDeleteRole = async (role, adminToken) => {
    try {
        const response = await axios.delete(
            'http://localhost:7777/role/delete/' + role,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${adminToken}`,
                }, 
            }
        );
        return response;
    } catch (e) {
        const cookies = new Cookies();
        cookies.remove("jwt_authorization");
        window.location.href = "/sign-in";    }
};

export const fetchAddRole = async (role, adminToken) => {
    try {

        const requestBody = {
            'name': role,
        };

        const response = await axios.post(
            'http://localhost:7777/role/create-role',
            requestBody,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${adminToken}`,
                }, 
            }
        );
        return response;
    } catch (e) {
        const cookies = new Cookies();
        cookies.remove("jwt_authorization");
        window.location.href = "/sign-in";    }
};

// findUsersWithS, fetchDeleteUser, fetchAddUser

export const findPermissionsWithS = async (page, s, adminToken) => {
    try {
        let url = 'http://localhost:7777/permission/find?size=30&page=' + page;
        if (s !== '') {
            url += '&s=' + s;
        }
        console.log(url)
        return await axios.get(
            url,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${adminToken}`,
                }, 
            }
        );
    } catch (e) {
        const cookies = new Cookies();
        cookies.remove("jwt_authorization");
        window.location.href = "/sign-in";
    }
};

export const fetchDeletePermission = async (permission, adminToken) => {
    try {
        const response = await axios.delete(
            'http://localhost:7777/permission/delete/' + permission,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${adminToken}`,
                }, 
            }
        );
        return response;
    } catch (e) {
        const cookies = new Cookies();
        cookies.remove("jwt_authorization");
        window.location.href = "/sign-in";
    }
};

export const fetchAddPermission = async (permission, adminToken) => {
    try {

        const requestBody = {
            'name': permission,
        };

        const response = await axios.post(
            'http://localhost:7777/permission/add-permission',
            requestBody,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${adminToken}`,
                }, 
            }
        );
        return response;
    } catch (e) {
        const cookies = new Cookies();
        cookies.remove("jwt_authorization");
        window.location.href = "/sign-in";    }
};

export const fetchUserCount = async (adminToken) => {
    try {
        const response = await axios.get(
            'http://localhost:7777/user/users-amount',
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${adminToken}`,
                }, 
            }
        );
        return response;
    } catch (e) {
        const cookies = new Cookies();
        cookies.remove("jwt_authorization");
        window.location.href = "/sign-in";    }
};