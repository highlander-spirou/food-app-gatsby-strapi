import axios, { AxiosError } from "axios";
import { ReactNode, createContext, useContext } from "react";
import useSWR, { Fetcher } from "swr";

interface Dish {
    id: number
    attributes: {
        name: string
        price: number
        description: string
        image: object
        updatedAt: string
    }
}

type StoreActions = {
    data: Dish[] | undefined
    error: AxiosError | undefined
};

const StoreContext = createContext({} as StoreActions);


export const useStore = () => {
    return useContext(StoreContext);
};

export const StoreProvider = ({ children }: { children: ReactNode }) => {

    const token = 'a85d61268971fc729cb5c874de03a02cfca708f83d4d87a7125e029d5985329462ea78909b8c4091a7d261bf77f25272e23992c1e98578967f47fb3c6bc3129d33e79a8e497d2c1afe73f31de41ad10b58812fe27e4f133abec968a0dde8e1a7e097ae8808f8dc6c946b778e71c0bbc758d7c03ddc1319cedc0af87f04f3c641'
    const fetcher: Fetcher<Dish[], string> = (url: string) => axios.get(url, { headers: { Authorization: 'bearer ' + token } }).then(res => res.data.data)

    const { data, error } = useSWR(
        [`http://localhost:1337/api/dishes?populate=*`],
        fetcher
    );

    return (
        <StoreContext.Provider
            value={{
                data, error
            }}
        >
            {children}
        </StoreContext.Provider>
    );
};
