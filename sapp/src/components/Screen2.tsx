
import React, { useState, useCallback, useMemo, useEffect } from 'react'
import { Button, Card, Icon, Title, Select, Text } from '@gnosis.pm/safe-react-components';
import TextField from '@material-ui/core/TextField';
import { useSafe } from '@rmeissner/safe-apps-react-sdk';
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
    { id: '1', label: '1 week' },
    { id: '2', label: '1 month' },
    { id: '3', label: '1 year' },
  ];
  const [activeItemId, setActiveItemId] = useState('');
  return (
    <>
      <Text size="xl" strong>Safe24 Membership</Text>
      <br /><br />
      <Text size="md">Your Safe24 membership is valid for:</Text>
      <br /><br />
      <Text size="xl" strong>Top up</Text>
      <br /><br />
      <Text size="md">Add more funds to extend your Safe24 membership.</Text>
      <br /><br />


      <Select
        items={items}
        activeItemId={activeItemId}
        onItemClick={(id) => {
          setActiveItemId(id);
        }}
      />
      <br /><br />


      <div>
        <Button size="md" color="primary" variant="contained" onClick={action}>
          Pay
    </Button>
      </div>
    </>
  )
}

export default Screen2
