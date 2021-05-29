export default {
  methods: {
    isExisted(obj, prop) {
      return Object.prototype.hasOwnProperty.call(obj, prop);
    },
  },
};
