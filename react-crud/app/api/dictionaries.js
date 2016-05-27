export default {
  fetchStatuses: () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
          resolve({statuses: [{key: "neworder", value:"neworder"},
          {key: "pendingorder", value:"pendingorder"},{key: "sentorder", value:"sentorder"},{key: "completedorder", value:"completedorder"}]})
      }, 1000);
    })
  }
}
