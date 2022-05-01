class FitlitAPI {
  constructor() {
  }

  static getUserData() {
    return fetch('https://fitlit-api.herokuapp.com/api/v1/users')
      .then(response => response.json())
      .catch(error => console.log(error));
  }

  static getSleepData() {
    return fetch('https://fitlit-api.herokuapp.com/api/v1/sleep')
      .then(response => response.json())
      .catch(error => console.log(error));
  }

  static getActivityData() {
    return fetch('https://fitlit-api.herokuapp.com/api/v1/activity')
      .then(response => response.json())
      .catch(error => console.log(error));
  }

  static getHydrationData() {
    return fetch('https://fitlit-api.herokuapp.com/api/v1/hydration')
      .then(response => response.json())
      .catch(error => console.log(error));
  }
}

export default FitlitAPI;