'use client'

import React, { createContext, useState } from 'react';


export const CardContext = createContext({});


const CardProvider = ({ children }: { children: React.ReactNode }) => {

    const [workouts, setWorkouts] = useState([]);
    const [myPlan, setMyPlan] = useState([]);


    const shardData = {
        workouts,
        setWorkouts,
        myPlan,
        setMyPlan
    }


    return (
        <CardContext.Provider value={shardData}>{children}</CardContext.Provider>
    );
};

export default CardProvider;