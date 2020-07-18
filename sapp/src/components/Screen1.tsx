
import React, { useState, useCallback, useMemo, useEffect } from 'react'
import { Button, Card, Icon, Title, Divider, Text } from '@gnosis.pm/safe-react-components';
import TextField from '@material-ui/core/TextField';
import styled from 'styled-components';
import onboarding1 from './image1.svg';
import onboarding2 from './image2.svg';
import onboarding3 from './image3.svg';
import { useSafe } from '@rmeissner/safe-apps-react-sdk';
import '../App.css';


interface Props {
  action: () => void
}

const TextContainer = styled.div`
display: flex;
justify-content: space-evenly;
text-align: center;
margin: 0rem 0 0rem 0;
`;

const Screen1: React.FC<Props> = ({ action }) => {
  const safe = useSafe()
  return (
    <>
      <Text size="xl" strong>Safe24 - Your gas fee subscription service</Text>
      <br /><br />
      <Text size="lg">Safe24 allows you to never mind about transaction fees again. We take care of setting the right gas price, paying the fees and making sure the transaction gets executed on time.</Text>
      <br /><br />
      <Text size="lg"><b>Important:</b> Safe24 never has access to any of your funds or can initiate a transaction that was not previously confirmed by you. Safe24 just relays transactions that have already been signed for this Safe but not yet executed. </Text>
      <div style={{ margin: "32px 0px 32px"}}>
        <Button size="lg" color="primary" variant="contained" onClick={action}>
          Membership Dashboard
    </Button>
      </div>

      <Divider />

      <Text size="xl" strong>How it works</Text>


      <TextContainer>
        <div justify-content="center" style={{ margin: "8px", flex: "1 1 0px"}}>
        <img src={onboarding1} alt="image" style={{ margin: "16px 0px 32px"}}></img>
          <Text size="xl" strong center>
            1) Join Safe24
          </Text>
          <Text size="lg" center>
            Become a member of Safe24 for just $5 per week
          </Text>
        </div>

        <div justify-content="center" style={{ margin: "8px", flex: "1 1 0px" }}>
        <img src={onboarding2} alt="image" style={{ margin: "16px 0px 32px"}}></img>
          <Text size="xl" strong center>
            2) Top up weekly or monthly
          </Text>
          <Text size="lg" center>
            You can extend your membership on a weekly or monthly basis
          </Text>
        </div>

        <div justify-content="center" style={{ margin: "8px", flex: "1 1 0px" }}>
        <img src={onboarding3} alt="image" style={{ margin: "16px 0px 32px"}}></img>
          <Text size="xl" strong center>
            3) Enjoy free transactions
  </Text>
          <Text size="lg" center>
            We will cover all your transaction fees.
  </Text>
        </div>
      </TextContainer>

    </>
  )
}

export default Screen1
