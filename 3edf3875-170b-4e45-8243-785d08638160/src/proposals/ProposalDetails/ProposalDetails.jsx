import React from "react";

import DetailsSection from "../DetailsSection";

import "./ProposalDetails.css";

const ProposalDetails = ({ talk }) => {
    const { speaker, description, category } = talk;
    const paragraphs = description.trim().split(/\n\s*\n/);

    return (
        <div data-testid="proposal-details" className="ProposalDetails">
            <DetailsSection
                className="ProposalDetails__speaker"
                name="speaker"
            >
                <span className="ProposalDetails__speaker__value">
                    {speaker}
                </span>
            </DetailsSection>
            <DetailsSection
                className="ProposalDetails__category"
                name="category"
            >
                <div className="ProposalDetails__category__value">
                    {category}
                </div>
            </DetailsSection>
            <DetailsSection
                className="ProposalDetails__description"
                name="description"
            >
                <div className="ProposalDetails__description__value">
                {paragraphs.map((para, index) => (
                    <p key={index}>{para.trim()}</p>
                ))}
                </div>
            </DetailsSection>
        </div>
    );
};

export default ProposalDetails;
