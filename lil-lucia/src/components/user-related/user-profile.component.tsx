import {
  Alert,
  Box,
  Button,
  Card,
  CircularProgress,
  Typography,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Edit } from "@mui/icons-material";

import { AuthContext } from "../../common/context/authentication-context";
import { useHttpClient } from "../../common/hooks/http-hook";
import { User } from "../../models/user";

const UserProfile = () => {
  const authContext = useContext(AuthContext);
  const { isLoading, error, sendRequest } = useHttpClient();
  const { user } = authContext;
  const [fetchedUser, setFetchedUser] = useState<User>();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const responseData = await sendRequest(
          `http://ec2-54-80-72-110.compute-1.amazonaws.com:5000/api/user/${user.UserID}`
        );

        setFetchedUser(responseData.user);
      } catch (err) {}
    };

    fetchUser();
  }, [sendRequest, user]);

  return (
    <>
      {error && <Alert severity="error">{(error as any).message}</Alert>}
      {isLoading && (
        <Box sx={{ display: "flex", justifyContent: "center", py: 27 }}>
          <CircularProgress />
        </Box>
      )}
      {!isLoading && fetchedUser && (
        <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
          <Card>
            <Box m={4}>
              <Typography variant="h6" component="h2">
                Hi, {fetchedUser.FirstName} {fetchedUser.LastName}
              </Typography>
              <Typography variant="subtitle2" color="text.secondary">
                {fetchedUser.Email}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {fetchedUser.Address}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "center", p: 1 }}>
              <Link to="/profile/edit">
                <Button variant="outlined">
                  <Edit /> Edit
                </Button>
              </Link>
            </Box>
          </Card>
        </Box>
      )}
    </>
  );
};

export default UserProfile;
