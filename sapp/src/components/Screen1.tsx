
import React, { useState, useCallback, useMemo, useEffect } from 'react'
import { Button, Card, Icon, Title, Text } from '@gnosis.pm/safe-react-components';
import TextField from '@material-ui/core/TextField';
import { useSafe } from '@rmeissner/safe-apps-react-sdk';
import '../App.css';

interface Props {
  action: () => void
}
const Screen1: React.FC<Props> = ({action}) => {
  const safe = useSafe()
  return (
    <>
      <Text size="xl" strong>Safe24 - Your gas fee subscription service</Text>
      <br /><br />
      <Text size="md">Safe24 allows you to never mind about transaction fees again. We take care of setting the right gas price, paying the fees and making sure the transaction gets executed on time.</Text>
      <br /><br />
      <Text size="md"><b>Important:</b> Safe24 never has access to any of your funds or can initiate a transaction that was not previously confirmed by you.</Text>
      <br /><br />
      <div>
        <Button size="md" color="primary" variant="contained" onClick={action}>
          become member
    </Button>
      </div>
    </>
  )
}

export default Screen1
