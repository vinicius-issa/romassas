import React from 'react';
import { Container } from '@material-ui/core';
import AddSnack from './AddSnack';
import ListSnack from './ListSnack';

export default () => (
    <Container>
        <AddSnack />
        <ListSnack />
    </Container>
)