
const axios = require('axios');
const AxiosLogger = require('axios-logger');
const qs = require('qs');

AxiosLogger.setGlobalConfig({headers: true})

async function getAccessToken(req, res, db) {
  try {

    const instance = axios.create();
    instance.interceptors.request.use(AxiosLogger.requestLogger,AxiosLogger.errorLogger);
    instance.interceptors.response.use(AxiosLogger.responseLogger,AxiosLogger.errorLogger);

    const body={
      grant_type: "password",
      username: "keltur@mail.ru",
      password: ".joinrpg."
    }

    const options = {
      method: 'POST',
      url: 'https://joinrpg.ru/x-api/token',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: qs.stringify(body)
    };
      const result = await instance(options);
      console.log(result)

      res.send({ message: 'good' });
  } catch (e) {
    console.log(`getAccessToken has error: ${e}`);
    res.send({ message: 'bad' });
  }
}

module.exports = getAccessToken;
