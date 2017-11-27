/** Google Cloud API credentials that allows the application to
  * make calls to a Google API.
  * See {@link https://console.developers.google.com}
  * and replace each value with your own.
  * @todo replace each googleAuth value with your app's client credentials
  * @todo give yourself a unique secrect for your sessions
  * @module config/auth
  */
  var authConfigs = {
    googleAuth: {
      clientId: process.env.CLIENTID,
      clientSecret: process.env.CLIENTSECRET,
      callbackUrl: process.env.CALLBACKURL,
    },

    sessionVars: {
      secret: process.env.CLIENTSECRET,
    },
  };

module.exports = authConfigs;
