import { async } from '@firebase/util';

// request set
export const hostRequest = async (hostData) => {
    const url = `${process.env.REACT_APP_API_URL}/user/${hostData?.email}`;
    const response = await fetch(url, {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(hostData),
    });
    const data = await response.json();
    return data;
};

// get user role
export const getRole = async (email) => {
    const url = `${process.env.REACT_APP_API_URL}/user/${email}`;
    const response = await fetch(url);
    const user = await response.json();
    return user?.role;
};

// get All user
export const getAllUsers = async () => {
    const url = `${process.env.REACT_APP_API_URL}/users`;
    const res = await fetch(url);
    const users = await res.json();
    return users
};

// make a host

export const makeHost = async (user) =>
{
    console.log(user);
    delete user._id;
    const response = await fetch(
        `${process.env.REACT_APP_API_URL}/user/${user?.email}`,
        {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({ ...user, role: 'host' }),
        },
    );
    const users = await response.json();

    return users;
};