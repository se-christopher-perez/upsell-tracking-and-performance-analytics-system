
import { React } from "react";


function TermCard({ term }) {

    return (

        <>

            <div className="term-card-container">

                <div className="term-list-container">

                    <p>{term.term}</p>

                </div>

            </div>

        </>

    )

}

export default TermCard