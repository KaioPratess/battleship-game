// PubSub Module
const events = (function () {
  const events = {};

  const subscribe = function (eventName, object, callback) {
    this.events[eventName] = this.events[eventName] || [];
    this.events[eventName].push({ object, callback });
  };

  const unsubscribe = function (eventName, object, callback) {
    if (this.events[eventName]) {
      for (let i = 0; i < this.events[eventName].length; i++) {
        if (this.events[eventName][i].object === object) {
          this.events[eventName].splice(i, 1);
          break;
        }
      }
    }
  };

  const publish = function (eventName, data) {
    if (this.events[eventName]) {
      this.events[eventName].forEach((instance) => {
        instance.callback(data);
      });
    }
  };

  return {
    events, subscribe, unsubscribe, publish,
  };
}());

export default events;
