
import React, { useEffect } from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from 'react-query';


const createUserInSanity = async (user: any) => {
  // Your logic to create a user in Sanity
  // Use Sanity client or fetch API to send a request to your Sanity API
  // Example: sanityClient.create({ ... });
};

const Home = () => {
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();

  const { mutate } = useMutation(createUserInSanity);

  useEffect(() => {
    if (isAuthenticated && user) {
      mutate(user);
    }
  }, [isAuthenticated, user, mutate]);

  console.log("user ----<", user, isAuthenticated)
  return (
    <div>
      {!!isAuthenticated && "Home"}
    </div>
  )
}

export default Home
