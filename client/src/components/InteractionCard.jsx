

import { React } from "react";
import TermCard from "./TermCard";


function InteractionCard({ interaction }) {

    return (

        <>

            <div className="interaction-card-container">

                <div className="interaction-list-container">

                    <p>Approuch: {interaction.approach}</p>
                    <p>Repeat Customer: {interaction.customer ? "Yes" : "No"}</p>
                    <p>Gender: {interaction.customer_gender ? "Female" : "Male"}</p>
                    <p>Customer Carded: {interaction.customer_carded ? "Yes" : "No"}</p>
                    <p>Upsold: {interaction.upsell ? "Yes" : "No"}</p>

                </div>

                <div className="main-term-container">

                    {interaction.terms.map((term) => {

                        return <TermCard key={term.id} term={term} />

                    })}

                </div>

            </div>

        </>

    )

}

export default InteractionCard