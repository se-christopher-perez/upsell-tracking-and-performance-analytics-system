

import { React } from "react";
import TermCard from "./TermCard";


function InteractionCard({ interaction }) {

    return (

        <>

            <div className="interaction-card-container">

                <h3>Interactions: </h3>

                <div className="interaction-list-container">

                    <p><b>Approuch:</b> {interaction.approach}</p>
                    <p><b>Repeat Customer:</b> {interaction.customer_repeat ? "Yes" : "No"}</p>
                    <p><b>Gender:</b> {interaction.customer_gender ? "Female" : "Male"}</p>
                    <p><b>Customer Carded:</b> {interaction.customer_carded ? "Yes" : "No"}</p>
                    <p><b>Upsold:</b> {interaction.upsell ? "Yes" : "No"}</p>

                </div>

                <div className="main-term-container">

                    <h3>Terms: </h3>

                    {interaction.terms.map((term) => {

                        return <TermCard key={term.id} term={term} />

                    })}

                </div>

            </div>

        </>

    )

}

export default InteractionCard