import React, { useEffect, useState } from "react";

import { getProposalList, setProposalStatus } from "./service";

import Loading from "../Loading";
import Page from "../Page";
import ProposalList from "./ProposalList";

export const ProposalListPage = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [proposals, setProposals] = useState([])

    useEffect(() => {
        setIsLoading(true);
        getProposalList().then(proposals => {
            setProposals(proposals);
        }).finally(() => {
            setIsLoading(false);
        });
    }, []);

    const updateProposalStatus = (id, status) => {
        setProposals((previousProposals) => {
            return previousProposals.map(proposal =>
                proposal.id === id ? { ...proposal, status } : proposal,
            );
        });
        setProposalStatus(id, status);
    };

    return (
        <Page title="Call for Papers">
            {isLoading
                ? <Loading/>
                : <ProposalList
                    proposals={proposals}
                    onProposalStatusUpdate={updateProposalStatus}
                />}
        </Page>
    );
}

export default ProposalListPage;
