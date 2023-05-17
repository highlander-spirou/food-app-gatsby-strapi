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

    const token = 'f52bcfcc83992590f14dcf646879153d266d66320b2bce91cf3c94b42fa2f73ef96326be225f6e13bf6e73c5670a78da0d26f7e24a2fb8e636b0d1bf8c1d97a08869405f91d7799b4077157bcbe85af4b03ac465cb69e9fd0f890c28aee364598e8f853568f3de811156220ff5d3235941d9597f00107a13ef68952ff27d7dc5'
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
