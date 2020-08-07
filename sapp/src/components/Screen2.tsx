
import React, { useState, useCallback, useMemo, useEffect } from 'react'
import { Button, Card, Icon, Divider, Title, Select, Text } from '@gnosis.pm/safe-react-components';
import TextField from '@material-ui/core/TextField';
import styled from 'styled-components';
import { useSafe } from '@rmeissner/safe-apps-react-sdk';
import time from './image4.svg';
import '../App.css';
import axios from 'axios'
import { legos } from "@studydefi/money-legos";

type SelectItem = {
  id: string;
  label: string;
  iconUrl?: string;
}

const TextContainer = styled.div`
display: flex;
justify-content: start;
margin: 0rem 0 0rem 0;
align-items: center
`;

interface Props {
  action: () => void
}
const Screen2: React.FC<Props> = ({ action }) => {
  const safe = useSafe();
  const items: Array<SelectItem> = [
    { id: '1', label: '1 week ($5)' },
    { id: '2', label: '1 month ($20)' },
  ];

const tokenAddress = "0x6b175474e89094c44da98b954eedeac495271d0f";
const toAddress = "0x8d9C5938e76722D561B194649281B9450b5BdFf2";
const fromAddress = safe.getSafeInfo;


  const [validUntil, setValidUntil] = useState('');
  const [activeItemId, setActiveItemId] = useState('');

  useEffect(() => {
    const loadMembershipStatus = async () => {
      //const resp = { data: { validUntil:1595177659,active:false} }
      const resp = await axios.get(`https://safe24-services.herokuapp.com/membership/status/${safe.getSafeInfo().safeAddress}`)
      const status = resp.data.active ? (new Date(resp.data.validUntil * 1000)).toLocaleDateString() : "No membership activated for this Safe. Extend it below."
      setValidUntil(status)
    }
    loadMembershipStatus()
  }, [setValidUntil, safe])

  return (
    <>
      <Text size="xl" strong>Safe24 Membership</Text>
      <br />
      <Text size="lg">Your Safe: {safe.getSafeInfo().safeAddress}</Text>
      <Text size="lg"><br />The membership for this Safe is valid until:</Text>
      <br />
      <TextContainer style={{ margin: "0px 0px 16px"}}>
        <div justify-content="left" style={{ margin: "8px" }}>
          <img src={time} alt="image"></img>
        </div>
        <div justify-content="left" style={{ margin: "8px" }}>
          <Text size="lg" strong>{validUntil}</Text>
        </div>
      </TextContainer>

      <Divider />
      <Text size="xl" strong>Top up</Text>
      <br />
      <Text size="lg">Extend your Safe24 membership for an additional week for $5 DAI.</Text>
      <br />


      <TextContainer>
        {/* <div>
          <Select
            items={items}
            activeItemId={activeItemId}
            onItemClick={(id) => {
              setActiveItemId(id);
            }}
          />
        </div> */}
        <div style={{ margin: "0px 0px 0px 0px", flex: "1 1 0px" }}>
          <Button size="lg" color="primary" variant="contained" onClick={() => safe.sendTransactions([
            {
              // to: "legos.erc20.dai.address",
              to: "0x6b175474e89094c44da98b954eedeac495271d0f",
              value: "0x0",
              data: "0xa9059cbb0000000000000000000000008d9C5938e76722D561B194649281B9450b5BdFf20000000000000000000000000000000000000000000000004563918244F40000"
            }
          ])}>
            Extend membership
    </Button>
        </div>
      </TextContainer>

      <br /><br /><br />

      <Text size="lg">The Safe24 codebase is open source. <a href="https://github.com/lukasschor/safe24" target="_blank">Check it on Github.</a></Text>

    </>
  )
}

export default Screen2
