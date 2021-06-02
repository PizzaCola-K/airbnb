import { useState, createContext, Dispatch, SetStateAction, useContext} from 'react'

interface IChildren {
    children: React.ReactNode;
}

interface ContextType {
    range: number[][];
    setRange: Dispatch<SetStateAction<number[][]>>;
}

export const PriceContext = createContext<ContextType | null>(null);

export const PriceProvider = ({children}:IChildren) => {
    const [range, setRange] = useState<number[][]>([[50000],[500000]])

    return (
        <PriceContext.Provider value={{range, setRange}}>
            {children}
        </PriceContext.Provider>
    )
}

export const usePriceState = () => {
    const priceState = useContext(PriceContext);
    if(!priceState) throw new Error('Not priceState');
    return priceState;
}