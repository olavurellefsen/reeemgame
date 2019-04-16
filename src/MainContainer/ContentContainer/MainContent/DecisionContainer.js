import React from "react";
import { Subscription } from "react-apollo";
import gql from "graphql-tag";
import { Container } from "./DecisionContainer.style";

export const Subscription_Get_Groupings = gql`
  subscription game_decision($year: Int) {
    game_decision_year(where: { year: { _eq: $year } }) {
      decision_intro_text
      decision_year_options(order_by: { decision_year_option_id: asc }) {
        option_text
      }
    }
  }
`;

export const DecisionContainer = () => (
  <Container>
    <Subscription
      subscription={Subscription_Get_Groupings}
      variables={{ year: 2020 }}
    >
      {sub => {
        if (sub.loading) return <p>Loading.. Please have patience</p>;
        const decisions = sub.data.game_decision_year;
        console.log(decisions);
        if (decisions.length > 0) {
          return decisions[0].decision_intro_text;
        }
      }}
    </Subscription>
  </Container>
);
