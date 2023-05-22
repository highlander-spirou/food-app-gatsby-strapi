export default {
  routes: [
    {
      // Path defined with a URL parameter
      method: "POST",
      path: "/rating-count",
      handler: "rating.exampleAction",
      config: {
        auth: false,
        policies: ["api::rating.is-authenticated"],
      },
    },
  ],
};
