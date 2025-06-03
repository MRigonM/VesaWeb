import {News} from "@/api/models/News";
import {createContext, ReactNode, useContext, useState} from "react";

interface NewsContextType {
    news : News[];
    setNews : React.Dispatch<React.SetStateAction<News[]>>;
}

const NewContext = createContext<NewsContextType | undefined>(undefined);

export const NewsProvider = ({children} : {children: ReactNode}) => {
    const [news, setNews] = useState<News[]>([]);
    return (
        <NewContext.Provider value={{news, setNews}}>
            {children}
        </NewContext.Provider>
    );
};

export const useNewsContext = () => {
    const context = useContext(NewContext);
    if (!context){
        throw new Error("useNewsContext must be used within a NewsProvider");
    }
    return context;
}