const facebookAppId = process.env.REACT_APP_FACEBOOK_APP_ID;

export function initFacebookSdk() {
  return new Promise((resolve) => {
    console.log(facebookAppId)
    // wait for facebook sdk to initialize before starting the react app
    window.fbAsyncInit =  () => {
      window.FB.init({
        appId: facebookAppId,
        cookie: true,
        xfbml: true,
        version: 'v14.0',
      });
      window.FB.AppEvents.logPageView();
      //   auto authenticate with the api if already logged in with facebook
      resolve(getLoginStatus());
    };

    (function(d, s, id){
       const fjs = d.getElementsByTagName(s)[0];
       if (d.getElementById(id)) {return;}
       const js = d.createElement(s); js.id = id;
       js.src = "https://connect.facebook.net/en_US/sdk.js";
       fjs.parentNode.insertBefore(js, fjs);
     }(document, 'script', 'facebook-jssdk'));
  });
}

export function getLoginStatus() {
  return new Promise((resolve, reject) => {
    window.FB.getLoginStatus(authResponse => {
      if(authResponse) resolve(authResponse);
    });
  });

}
export async function fbLogin(force=false) {
  const authResponse = await getLoginStatus();
  console.log(authResponse)
  if(authResponse && authResponse.status === 'connected' && force) {
    console.log(await fbLogout());
  }
  return new Promise((resolve, reject) => {
    // login with facebook then authenticate with the API to get a JWT auth token
    if(!authResponse || force) {
      window.FB.login((response) => {
        console.debug()
        resolve(response);
      });
    }
  });

}

export function fbLogout() {
  return new Promise((resolve, reject) => {
    // revoke app permissions to logout completely because FB.logout() doesn't remove FB cookie
    window.FB.api('/me/permissions', 'delete', null, () => window.FB.logout((response) => {
      resolve(response);
    }));
  })
}