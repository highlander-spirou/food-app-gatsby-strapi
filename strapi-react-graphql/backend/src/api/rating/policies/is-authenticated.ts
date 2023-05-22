export default async (policyContext, config, { strapi }) => {
  try {
    await strapi.plugins[
      "users-permissions"
    ].services.jwt.getToken(policyContext);
    return true;
  } catch (error) {
    console.log('authentication error')
    return false;
  }
};
