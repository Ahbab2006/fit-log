'use client'

import React, { useContext } from 'react';
import { CardContext } from '../context/CardContext';

const ListedPage = () => {
    const {workouts,myPlan}=useContext(CardContext)
    console.log(workouts,myPlan,"workouts",myPlan)


    return (
        <div>
            Listed Cards
        </div>
    );
};

export default ListedPage;