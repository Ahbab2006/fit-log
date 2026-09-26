import React from "react";
import CardData from "../shared/CardData";
import { ICard } from "@/app/types/card";

interface CardProps {
    card: ICard;
}

const Card = ({ card }: CardProps) => {
    if (!card) {
        return null;
    }

    return <CardData card={card} />;
};

export default Card;
