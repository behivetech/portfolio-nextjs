import React, { createContext, useContext } from 'react';

type DataProviderProps = {
    children?: React.ReactNode;
} & DEFAULT_CONTEXT_PARAMS


const DEFAULT_CONTEXT: DEFAULT_CONTEXT_PARAMS = {
    skills: [],
    resume: {}
};

const DataContext = createContext(DEFAULT_CONTEXT);

export function useData() {
    return useContext(DataContext);
}

export default function DataProvider({ children, ...data }: DataProviderProps) {
    const context = { ...DEFAULT_CONTEXT, data };

    return <DataContext.Provider value={context}>{children}</DataContext.Provider>;
}
