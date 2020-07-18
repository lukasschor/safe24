
import React, { useState, useCallback, useMemo, useEffect } from 'react'
import { Button, Card, Icon, Title, Select, Text } from '@gnosis.pm/safe-react-components';
import TextField from '@material-ui/core/TextField';
import styled from 'styled-components';
import { useSafe } from '@rmeissner/safe-apps-react-sdk';
import time from './image4.svg';
import '../App.css';

type SelectItem = {
  id: string;
  label: string;
  iconUrl?: string;
}
interface Props {
  action: () => void
}
const Screen2: React.FC<Props> = ({ action }) => {
  const safe = useSafe();
  const items: Array<SelectItem> = [
    { id: '1', label: '1 week ($5)' },
    { id: '2', label: '1 month ($20)' },
  ];

  const TextContainer = styled.div`
  display: flex;
  justify-content: start;
  margin: 0rem 0 0rem 0;
  align-items: center
`;

  const [activeItemId, setActiveItemId] = useState('');
  return (
    <>
      <Text size="xl" strong>Safe24 Membership</Text>
      <br /><br />
      <Text size="lg">Your membership is valid for:</Text>
      <br /><br />
      <TextContainer>
        <div justify-content="left" style={{ margin: "8px" }}>
          <img src={time} alt="image"></img>
        </div>
        <div justify-content="left" style={{ margin: "8px" }}>
          <Text size="lg" strong>No membership activated for this Safe</Text>
        </div>
      </TextContainer>
      <br /><br />
      <Text size="xl" strong>Top up</Text>
      <br /><br />
      <Text size="lg">Extend your Safe24 membership for an additional week ($5) or month ($20).</Text>
      <br /><br />


      <TextContainer>
        <div>
          <Select
            items={items}
            activeItemId={activeItemId}
            onItemClick={(id) => {
              setActiveItemId(id);
            }}
          />
        </div>
        <div style={{ margin: "8px", flex: "1 1 0px"}}>
          <Button size="lg" color="primary" variant="contained" onClick={action}>
            Extend membership
    </Button>
        </div>
      </TextContainer>





    </>
  )
}

export default Screen2
