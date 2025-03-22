import React from "react";
import classNames from "classnames";

import "./ProposalRow.css";

const withoutEventDefault = (callback) =>
    event => {
        event.preventDefault();
        callback();
    };

const defineStatusColor = (status) => {
    switch (status) {
        case "accepted":
            return "ProposalRow--accepted";
        case "rejected":
            return "ProposalRow--rejected";
        case "pending":
            return "ProposalRow--neutral";
        default:
            return "ProposalRow--neutral";
    }
}

const ProposalRow = ({ proposal, onStatusUpdate }) => {
    const { id, title, speaker, category, status } = proposal;

    return (
        <div data-testid={`proposal-id-${id}`} className={classNames("ProposalRow", defineStatusColor(status))}>
            <div className="ProposalsRow__status_indicator"/>
            <div className="ProposalsRow__title">
                {title}
            </div>
            <div className="ProposalsRow__speaker">
                {speaker}
            </div>
            <div className="ProposalsRow__category">
                Category: {category}
            </div>
            <div className="ProposalsRow__status">
                status: {status}
            </div>
            {
                status === "accepted" &&
                <button disabled className="ProposalsRow__accept_button_placeholder">
                    Accept
                </button>
            }
            {
                status === "rejected" &&
                <button disabled className="ProposalsRow__reject_button_placeholder">
                    Reject
                </button>
            }
            {
                ["to be decided", "pending"].includes(status) &&
                <button
                    className="ProposalsRow__accept_button"
                    onClick={withoutEventDefault(() => onStatusUpdate(id, "accepted"))}
                >
                    Accept
                </button>
            }
            {
                ["to be decided", "pending"].includes(status) &&
                <button
                    className="ProposalsRow__reject_button"
                    onClick={withoutEventDefault(() => onStatusUpdate(id, "rejected"))}
                >
                    Reject
                </button>
            }
        </div>
    );
};

export default ProposalRow;
