import "../../css/ProviderList.css";
import ProviderCard from "./ProviderCard";

function ProviderList({ providers = [] }) {

    // No providers found
    if (providers.length === 0) {

        return (

            <div className="provider-empty">

                <h4>
                    No providers found
                </h4>

                <p>
                    Try increasing your search radius
                    or selecting another service.
                </p>

            </div>

        );

    }


    return (

        <div className="provider-grid">

            {providers.map((provider) => (

                <ProviderCard
                    key={provider._id}
                    provider={provider}
                />

            ))}

        </div>

    );

}

export default ProviderList;