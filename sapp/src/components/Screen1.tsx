
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
      <Text size="xl" strong>Safe24 - Your Gas Subscription Service</Text>
      <br />
      <Text size="lg">This Safe App allows you to never mind about transaction fees again. Safe24 takes care of setting the right gas price, paying the fees and making sure the transaction gets executed on time. No need to hold ETH on your signer wallet to execute transactions.</Text>
      <br />
      <Text size="lg"><b>Important:</b> <br /> <ul> <li>Safe24 never has access to any of your funds or can initiate a transaction that was not previously confirmed by you. </li> <li>Safe24 just relays transactions that have already been signed.</li> <li>To get your transactions relayed by Safe24, collect all signatures and with the last signature, uncheck the checkbox to execute the transaction.</li> <li> Safe24 only works if your Safe requires > 1 signatures.</li> </ul> </Text>
      <div style={{ margin: "16px 0px 16px"}}>
        <Button size="lg" color="primary" variant="contained" onClick={action}>
          Membership Dashboard
    </Button>
      </div>

      <Divider />

      <Text size="xl" strong>How it works</Text>


      <TextContainer>
        <div justify-content="center" style={{ margin: "8px", flex: "1 1 0px"}}>
        <img src={onboarding1} alt="image" style={{ margin: "16px 0px 16px"}}></img>
          <Text size="xl" strong center>
            1) Join Safe24
          </Text>
          <Text size="lg" center>
          <br />Become a member of Safe24 for just $5 per week
          </Text>
        </div>

        <div justify-content="center" style={{ margin: "8px", flex: "1 1 0px" }}>
        <img src={onboarding3} alt="image" style={{ margin: "16px 0px 16px"}}></img>
          <Text size="xl" strong center>
            2) Enjoy free transactions
  </Text>
          <Text size="lg" center>
          <br />Safe24 covers all your transaction fees.
  </Text>
        </div>

        <div justify-content="center" style={{ margin: "8px", flex: "1 1 0px" }}>
        <img src={onboarding2} alt="image" style={{ margin: "16px 0px 16px"}}></img>
          <Text size="xl" strong center>
            3) Top up membership
          </Text>
          <Text size="lg" center>
          <br />Extend your membership on a weekly or monthly basis
          </Text>
        </div>


      </TextContainer>

    </>
  )
}

export default Screen1
