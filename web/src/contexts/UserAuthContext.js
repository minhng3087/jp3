import React, {
  useCallback,
  useEffect,
  useMemo,
  useState
} from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';
import { Navigate, useNavigate } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';
import { getUserToken, removeUserToken } from '../utils/userAuth';
import UserAuthAPI from '../api/UserAuthAPI';

const UserAuthContext = React.createContext();

function UserAuthProvider({ children }) {
  const [initializing, setInitializing] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const authenticated = useMemo(() => !!currentUser, [currentUser]);
  const history = useNavigate();
  const toast = useToast();

  const initAuth = async () => {
    return getUserToken()
      ? UserAuthAPI.getUser()
      : Promise.resolve(null);
  };

  const redirectWhenNoAuth = useCallback(() => {
    toast({
      title: 'You need to log in to use this',
      status: 'warning',
      duration: 3000
    });
    history('/login');
  }, [history, toast]);

  useEffect(() => {
    initAuth()
      .then((user) => {
        setCurrentUser(user);
        setInitializing(false);
      })
      .catch(() => {
        setInitializing(false);
        toast({
          title: 'Session expired!',
          description: 'Please log in again',
          status: 'warning'
        });
        removeUserToken();
        return <Navigate to="/login" />;
      });
  }, [toast]);

  return (
    <UserAuthContext.Provider
      value={{
        initializing,
        authenticated,
        currentUser,
        setCurrentUser,
        redirectWhenNoAuth
      }}
    >
      {children}
    </UserAuthContext.Provider>
  );
}

const useUserAuthContext = () => {
  const context = React.useContext(UserAuthContext);

  if (context === undefined) {
    throw new Error(`useAuth must be used within a UserAuthProvider`);
  }

  return context;
};

UserAuthProvider.propTypes = {
  children: PropTypes.element.isRequired
};

export default UserAuthProvider;
export { useUserAuthContext };
