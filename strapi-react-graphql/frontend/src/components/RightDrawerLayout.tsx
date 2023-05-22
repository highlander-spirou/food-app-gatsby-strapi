import { useQuery } from "@apollo/client";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { GET_DISHES, VND, destructureDishesData } from "../utils";
import { DishesArr } from "../types";


interface RightDrawerLayoutProps {
  children: JSX.Element;
}

interface ItemDisplayProps {
  cartItem: { id: number | string; quantity: number }
  storeData: DishesArr[]
}

const AdjustQuantityBtn = ({
  id,
  quantity,
}: {
  id: string | number;
  quantity: number;
}) => {
  const { increaseCartQuantity, decreaseCartQuantity } = useShoppingCart();
  return (
    <div className="btn-group flex items-center font-bold">
      <button
        onClick={() => decreaseCartQuantity(id)}
        className="btn btn-info btn-outline bg-white border-l-2 border-y-2 border-r-0 border-gray-300 rounded-md text-lg"
      >
        -
      </button>
      <div className="px-3 border-y-2 h-12 flex items-center border-gray-300">
        {quantity}
      </div>
      <button
        onClick={() => increaseCartQuantity(id)}
        className="btn btn-info btn-outline bg-white border-r-2 border-y-2 border-l-0 border-gray-300 rounded-md text-lg "
      >
        +
      </button>
    </div>
  );
};

const ItemDisplay = ({ cartItem, storeData }: ItemDisplayProps) => {
  const lookup = storeData.find((x: DishesArr) => x.id === cartItem.id);
  return (
    <div className="grid grid-cols-3 items-center my-6">
      <div className="avatar">
        <div className="w-24 rounded">
          <img src={"http://localhost:1337" + lookup?.img.url} />
        </div>
      </div>
      <div className="flex flex-col -m-10">
        <div className="text-xl font-semibold">{lookup?.name}</div>
        {lookup?.price && (
          <div className="text-lg">{VND.format(cartItem.quantity * lookup?.price)}</div>
        )}
      </div>
      <AdjustQuantityBtn id={cartItem.id} quantity={cartItem.quantity} />
    </div>
  );
};

const RightDrawerLayout = ({ children }: RightDrawerLayoutProps) => {
  const { data } = useQuery(GET_DISHES)
  const { cartItems, cartQuantity } = useShoppingCart();

  const totalPrice = cartItems.reduce((currValue, iterator) => {
    const price = destructureDishesData(data)?.find((x) => x.id === iterator.id)?.price || 0;
    return currValue + iterator.quantity * price;
  }, 0);

  return (
    <div className="drawer drawer-end">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">{children}</div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-4" className="drawer-overlay"></label>
        <div className="grid grid-row-2 p-4 w-[2/3] md:w-[500px] bg-base-100 text-base-content">
          <div className=" h-[100%] overflow-y-scroll no-scrollbar">
            {cartItems.map((item, index) => {
              return <ItemDisplay key={index} cartItem={item} storeData={destructureDishesData(data)} />;
            })}
          </div>
          {cartQuantity > 0 && (
            <div>
              <div className="divider"></div>
              <div className="flex justify-between">
                <div className="stat-title text-lg">Total</div>
                <div className="stat-title text-lg font-extrabold">
                  {VND.format(totalPrice)}
                </div>
              </div>
              <button className="btn w-full">Purchase</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RightDrawerLayout;
