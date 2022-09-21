import React from 'react';
import Gun from 'gun/gun';
import { v4 as uuidv4 } from 'uuid';

const getAppId = (gun) => {
  return new Promise((resolve) => {
    if(gun) {
      gun.get("appId").on(appId => {
        if(appId) resolve(appId);
        else resolve(uuidv4());
      });
    }
  });
};

const gun = new Gun(["http://localhost:8080/gun"]);
const appId = await getAppId();
const defaultState = {
  authenticated: false,
  facebookAuth: {
    authenticated: false,
    accessToken: '',
    pages: []
  },
  appId,
  gun
};

export const GlobalStateContext = React.createContext(defaultState);
export const DispatchStateContext = React.createContext(undefined);

export const GlobalStateProvider = ({ children }) => {
  // Request persistent storage for site
  if (navigator.storage && navigator.storage.persist) {
    navigator.storage.persist().then(isPersisted => {
      console.log(`Persisted storage granted: ${isPersisted}`);
    });
  }
  const [state, dispatch] = React.useReducer(
    (state, newValue) => ({ ...state, ...newValue }),
    defaultState
  );
  return (
    <GlobalStateContext.Provider value={state}>
      <DispatchStateContext.Provider value={dispatch}>
        {children}
      </DispatchStateContext.Provider>
    </GlobalStateContext.Provider>
  );
};

export const useGlobalState = () => [
  React.useContext(GlobalStateContext),
  React.useContext(DispatchStateContext)
];