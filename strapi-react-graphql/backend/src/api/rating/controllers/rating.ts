/**
 * rating controller
 */

import { factories } from "@strapi/strapi";

type Rating = {
  id: number;
  rating: number;
};

type Q = {
  id: number;
  ratings: Rating[];
};

export default factories.createCoreController(
  "api::rating.rating",
  ({ strapi }) => ({
    // Method 1: Creating an entirely custom action
    async exampleAction(ctx) {
      const calculateRating = (data) => {
        const numbers = {
          5: 0,
          4: 0,
          3: 0,
          2: 0,
          1: 0,
          0: 0,
        };
        let sumWeight: number;
        if (data && Array.isArray(data)) {
          data.forEach((entry) => {
            numbers[entry.rating + ""] += 1;
          });
          sumWeight = Object.keys(numbers).reduce((currValue, iter) => {
            return currValue + parseInt(iter) * numbers[iter];
          }, 0);
        }

        return sumWeight / data.length;
      };
      try {
        const q = ctx.request.body as { id: number };
        const entries: Q = await strapi.entityService.findOne(
          "api::dish.dish",
          q.id,
          {
            fields: ["id"],
            populate: {
              ratings: {
                fields: ["rating"],
              },
            },
          }
        );
        ctx.body = {
          weight: calculateRating(entries.ratings),
        };
      } catch (err) {
        ctx.body = err;
      }
    },
  })
);
