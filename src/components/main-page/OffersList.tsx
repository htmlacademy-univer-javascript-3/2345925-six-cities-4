import { FC, useState } from "react"
import Card, { OfferData } from "./Card"

export interface OffersListProps {
    offers: OfferData[]
}

const OffersList: FC<OffersListProps> = ({
    offers
}) => {
    const [activeOfferId, setActiveOfferId] = useState<Number | null>(null)
    return (
        <div className="cities__places-list places__list tabs__content">
              {offers.map((card) => (
                <Card key={card.id} offer={card} onMouseEnter={setActiveOfferId}/>
              ))}
        </div>
    )
}

export default OffersList