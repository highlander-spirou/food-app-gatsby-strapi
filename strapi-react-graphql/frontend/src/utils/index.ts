import { gql } from "@apollo/client";
import { Dishes, DishesArr } from "../types";

export const VND = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
});

export const decimalSep = (num: number) => {
    const integerPart = Math.floor(num);
    const fraction = num - integerPart;
    let roundedFraction
    if (fraction <= 0.25) {
        roundedFraction = 0
    } else if ((fraction > 0.25) && (fraction <= 0.8)) {
        roundedFraction = 0.5
    } else {
        roundedFraction = 1
    }
    return [integerPart, roundedFraction]
}


export const getImgFromStrapi = (obj: any, imgSize: "thumbnail" | "small" | "medium" | "large") => {
    return obj.img.data.attributes.formats[imgSize].url
}

export const destructureDishesData = (dishesData: Dishes): DishesArr[] => {
    return dishesData.dishes.data.map(x => { return { id: x.id, ...x.attributes, img: x.attributes.img.data.attributes } })
  }

export const GET_DISHES = gql`
query Dishes {
  dishes {
    data {
      id
      attributes {
        name
        price
        description
        updatedAt
        img {
          data {
            attributes {
              url
            }
          }
        }
      }
    }
  }
}
`;