import * as api from "../api/httpApi";

const proposalStatusFrom = (rawStatus) => {
    switch (rawStatus) {
        case "pending":
            return "to be decided";
        case "accepted":
            return "accepted";
        case "rejected":
            return "rejected";
        default:
            return "(unknown)";
    }
};

/**
 * @returns promise of ConferenceTalkProposal[]
 */
export const getProposalList = async () => {
    const talks = await api.getTalks();
    const talksWithStatus = await api.getCallForPapers();

    return talks.map(talk => {
        const status = talksWithStatus.byTalkId[talk.id]?.status;

        return {
            ...talk,
            status: proposalStatusFrom(status),
        };
    });
};

/**
 * @returns void
 */
export const setProposalStatus =
    async (proposalId, status) => {
        await api.putCallForPapersEntry(proposalId, status);
    };

/**
 * @returns promise of ConferenceTalkDetails OR undefined
 */
export const getTalk =
    async (talkId) => {
        try {
            const data = await api.getTalk(talkId);
            return { ...data };
        } catch (ignoredError) {
            return undefined;
        }
    };
