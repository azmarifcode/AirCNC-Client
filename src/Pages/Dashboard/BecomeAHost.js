import React, { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { getImageUrl } from '../../API/imageUpload';
import { getRole, hostRequest } from '../../API/user';
import BecomeHostForm from '../../Components/Form/BecomeHostForm';
import { AuthContext } from '../../contexts/AuthProvider';

const BecomeAHost = () => {
    const { user } = useContext(AuthContext);
    const [role, setRole] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getRole(user?.email).then((data) => {
            console.log(data);
            setRole(data);
            setLoading(false);
        });
    }, [user]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const location = event.target.location.value;
        const image = event.target.image.files[0];
        getImageUrl(image).then((data) => {
            const hostData = {
                location,
                documentImage: data,
                role: 'requested',
                email: user?.email,
            };
            hostRequest(hostData)
                .then((data) =>
                {
                    console.log(data)
                    toast.success('requested successfully')
                })
                .catch(err => console.error(err))
            setRole('requested')
        })
        .catch(err => console.error(err))
    };
    return (
        <>
            {role ? (
                <div className="h-screen text-gray-600 flex flex-col justify-center items-center pb-16 text-xl lg:text-3xl">
                    Request Sent, wait for admin approval
                </div>
            ) : (
                <>
                    {!loading && <BecomeHostForm handleSubmit={handleSubmit} />}
                </>
            )}
        </>
    );
};

export default BecomeAHost;
